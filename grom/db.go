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

func Connection() {
	dsn := "host=localhost user=admin password=admin dbname=ebisu port=32000 sslmode=disable TimeZone=Asia/Shanghai"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	var tokens []Token
	db.Table("tokens").Select("*").Scan(&tokens)
	// db.Last(&tokens)
	for _, value := range tokens {
		fmt.Println(value)
	}
	fmt.Print(db, err)
}

func main() {
	Connection()
}
