package main

import (
	"fmt"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type Token struct {
	ID     int
	Symbol string
	Price  float32
	Trade  string
	Time   string
}

var dsn = "host=localhost user=admin password=admin dbname=ebisu port=32000 sslmode=disable TimeZone=Asia/Shanghai"
var db, _ = gorm.Open(postgres.Open(dsn), &gorm.Config{})

func PrintAll() {
	// dsn := "host=localhost user=admin password=admin dbname=ebisu port=32000 sslmode=disable TimeZone=Asia/Shanghai"
	// db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	var tokens []Token
	db.Table("tokens").Select("*").Scan(&tokens)
	println()
	for _, value := range tokens {
		fmt.Println(value)
	}
}

func DeleteToken(token *Token) {
	db.Delete(&Token{}, token.ID)
}

func AddToken(token *Token) {
	result := db.Create(&token)
	println(result.RowsAffected)
	if result.RowsAffected <= 0 {
		println("ERROR")
	}
}

func main() {
	PrintAll()
	AddToken(&Token{ID: 5, Symbol: "mytest", Time: "2021-06-16 18:39:54+02"})
	// DeleteToken(&Token{ID: 0})
	PrintAll()
	AddToken(&Token{ID: 4, Symbol: "mytest", Time: "2021-06-16 18:39:54+02"})
	PrintAll()
}
