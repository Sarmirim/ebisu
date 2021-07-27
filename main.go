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
	prepare()
}

func CORS() gin.HandlerFunc {
	return func(c *gin.Context) {
		// allowedOrigin := os.Getenv("ALLOWED_ORIGIN")
		// c.Writer.Header().Set("Access-Control-Allow-Origin", allowedOrigin)
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		// c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")

		// Handle browser preflight requests, where it asks for allowed origin.
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}

func prepare() {
	// bot launch
	go bot.Prepare()
	// websocket launch
	go websocket.Prepare()

	go channels.Prepare()

	go db.Prepare()
	// TODO: check jsoniter (gin-gonic/gin/readme.md Build with jsoniter)
	r := gin.Default()
	// TODO: make/find solution for CORS
	r.Use(CORS())
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

	for {
		response := <-channels.ResponseChannel
		fmt.Printf("resp %+v\n", response)
		if response.ID == newID { //response.ID == newID
			c.JSON(200, gin.H{
				"Action": response.Action,
				"Data":   response.Data,
				"Status": response.Status,
			})
			return
		}
		// else {
		// 	channels.ResponseChannel <- response
		// }
	}
}
