package api

import (
	"fmt"

	gotime "time"

	"github.com/gin-gonic/gin"
	"github.com/sarmirim/ebisu/utils"
)

func Connect(c *gin.RouterGroup) {
	c.GET("/ping", ping)
	c.GET("/time", time)
	c.GET("/trade", trade)
}

func ping(c *gin.Context) {
	answer := utils.Ping()
	fmt.Printf("ANSWER %+v\n", &answer)
	response := gin.H{"ping": false}
	if len(answer) == 0 {
		response = gin.H{"ping": true}
	}
	c.JSON(200, response)
}

func time(c *gin.Context) {
	answer := utils.Time()
	fmt.Printf("ANSWER %+v\n", &answer)
	for k, v := range answer {
		c.JSON(200, gin.H{
			k: gotime.Unix(v/1000, 0),
		})
	}
	// enc := json.NewEncoder(os.Stdout)
	// err := enc.Encode(answer)
	// if err != nil {
	// 	fmt.Println(err.Error())
	// }
}

func trade(c *gin.Context) {
	symbol := c.Query("symbol")
	println("Symbol=", symbol)
	answer := utils.Price(symbol)
	c.JSON(200, gin.H{
		"Symbol": answer.Symbol,
		"Price":  answer.Price,
	})
}
