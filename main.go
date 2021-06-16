package main

import (
	"fmt"
	"math/rand"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/sarmirim/ebisu/api"
	"github.com/sarmirim/ebisu/bot"
	"github.com/sarmirim/ebisu/channels"
	db "github.com/sarmirim/ebisu/gorm"
	"github.com/sarmirim/ebisu/websocket"
)

func main() {
	db.PrintAll()
	prepare()
}

func prepare() {
	// bot launch
	bot.Prepare()
	// websocket launch
	go websocket.Start()
	go channels.Prepare()

	// TODO: check jsoniter (gin-gonic/gin/readme.md Build with jsoniter)
	r := gin.Default()
	r.StaticFile("/favicon.ico", "./resources/favicon.ico")
	r.LoadHTMLGlob("resources/*")
	r.Static("/assets", "./assets")
	r.GET("/", slash)
	api.Connect(r.Group("/api"))
	r.GET("/ws", websocketAPI)
	r.Run(":8765")
	// go r.Run(":9876") goroutine for second server
}

func slash(c *gin.Context) {
	now := time.Now().Format("15:04:05 02/01/2006")
	c.HTML(http.StatusOK, "index.tmpl", gin.H{
		"title":   "SLASH",
		"time":    now,
		"message": "WELCOME TO EBISU",
	})
}

func websocketAPI(c *gin.Context) {
	action := c.Query("action")
	data := c.Query("data")
	println("Action=", action, "Data=", data)

	newID := rand.Intn(100)
	request := &channels.RESTCommand{
		Action: action,
		Data:   data,
		ID:     newID,
	}

	go func() {
		channels.RequestChannel <- *request
	}()

	go func() {
		response := <-channels.ResponseChannel
		fmt.Printf("%+v\n", response)

		if response.ID == newID {
			c.JSON(200, gin.H{
				"Action": response.Action,
				"Data":   response.Data,
				"Status": response.Status,
			})
		}
	}()

	for {
		response := <-channels.ResponseChannel
		fmt.Printf("%+v\n", response)
		if response.ID == newID {
			c.JSON(200, gin.H{
				"Action": response.Action,
				"Data":   response.Data,
				"Status": response.Status,
			})
			return
		} else {
			channels.ResponseChannel <- response
		}
	}
}
