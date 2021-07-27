package websocket

import (
	"encoding/json"
	"flag"
	"fmt"
	"log"
	"net/url"
	"time"

	"github.com/gorilla/websocket"
	"github.com/sarmirim/ebisu/channels"
	structs "github.com/sarmirim/ebisu/etc"
)

var addr = flag.String("addr", "fstream.binance.com", "Ebisu")

// addr := "stream.binance.com:9443"

var (
	done = make(chan struct{})
)

// func main() {
// 	Prepare()
// }

type WSController struct {
	Conn *websocket.Conn
}

func Prepare() {
	var ws = new(WSController)
	ws.Start()
}

func (ws *WSController) Start() {
	flag.Parse()
	log.SetFlags(0)

	connection := "/stream" // "/ws" or "/stream"
	u := url.URL{Scheme: "wss", Host: *addr, Path: connection}
	log.Printf("connecting to %s", u.String())

	var err error
	ws.Conn, _, err = websocket.DefaultDialer.Dial(u.String(), nil)
	if err != nil {
		log.Fatal("dial:", err)
	}
	defer ws.Conn.Close()

	go func() {
		defer close(done)
		for {
			_, message, err := ws.Conn.ReadMessage()
			if err != nil {
				log.Println("read:", err)
				return
			}
			var answer structs.Answer
			var data structs.Data
			if connection == "/ws" {
				var data structs.Data
				if err := json.Unmarshal(message, &data); err != nil {
					fmt.Println(err)
				}
				log.Printf("\\ws: %s", message)
			} else {
				if err := json.Unmarshal(message, &answer); err != nil {
					fmt.Println(err)
				}
				data = answer.Data

				log.Printf("\\stream: %s", message)
			}

			if data.ID > 0 {
				go data.SendToResponseChannel()
			}
		}
	}()

	go func() {
		for {
			data := <-channels.RequestChannel
			switch data.Action {
			case "subscribe":
				subErr := ws.Conn.WriteJSON(Sub(data.Data))
				if subErr != nil {
					log.Println("Subscription error:", subErr)
				}
				data.Status = true
				channels.ResponseChannel <- data
			case "unsubscribe":
				unsubErr := ws.Conn.WriteJSON(Unsub(data.Data))
				if unsubErr != nil {
					log.Println("Unsubscription error:", unsubErr)
				}
				data.Status = true
				channels.ResponseChannel <- data
			case "listing":
				listSub := ws.Conn.WriteJSON(List())
				if listSub != nil {
					log.Println("List of subscriptions error:", listSub)
				}
				data.Status = true
				channels.ResponseChannel <- data
			}
			fmt.Printf("GlobalChannel websocket info: %+v\n", data)
		}
	}()

	ticker := time.NewTicker(time.Second * 5)
	defer ticker.Stop()

	// sub := &structs.JSONStruct{
	// 	Method: "SUBSCRIBE",
	// 	Params: []string{"btcusdt@trade"},
	// 	ID:     5}

	// json, _ := json.Marshal(sub)
	// stringJSON := string(json)
	// fmt.Println("JSON:", stringJSON)

	// ws.Conn.WriteJSON(Sub("btcusdt@trade"))

	// listSub := ws.Conn.WriteJSON(List())
	// if listSub != nil {
	// 	log.Println("List of subscriptions error:", listSub)
	// }

	for {
		select {
		case <-done:
			return
		// case t := <-ticker.C:
		// 	err := ws.Conn.WriteMessage(websocket.TextMessage, []byte(t.String()))
		// 	if err != nil {
		// 		log.Println("write:", err)
		// 		return
		// 	}
		case <-channels.Interrupt:
			log.Println("interrupt")

			// Cleanly close the connection by sending a close message and then
			// waiting (with timeout) for the server to close the connection.
			err := ws.Conn.WriteMessage(websocket.CloseMessage, websocket.FormatCloseMessage(websocket.CloseNormalClosure, ""))
			if err != nil {
				log.Println("write close:", err)
				return
			}
			select {
			case <-done:
			case <-time.After(time.Second):
			}

			return
		}
	}
}

func (ws *WSController) Stop() {
	log.Println("ws.Close")
	err := ws.Conn.WriteMessage(websocket.CloseMessage, websocket.FormatCloseMessage(websocket.CloseNormalClosure, ""))
	if err != nil {
		log.Println("write close:", err)
		return
	}
	ws.Conn.Close()
}

func List() structs.JSONStruct {
	request := &structs.JSONStruct{
		Method: "LIST_SUBSCRIPTIONS",
		ID:     999}
	request.Print()
	return *request
}

func Unsub(params string) structs.JSONStruct {
	request := &structs.JSONStruct{
		Method: "UNSUBSCRIBE",
		Params: []string{params},
		ID:     100}
	request.Print()
	return *request
}

func Sub(params string) structs.JSONStruct {
	request := &structs.JSONStruct{
		Method: "SUBSCRIBE",
		Params: []string{params},
		ID:     1}
	request.Print()
	return *request
}

func Universal(method, params string) structs.JSONStruct {
	return structs.JSONStruct{
		Method: method,
		Params: []string{params},
		ID:     0}
}
