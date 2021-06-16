package db

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
var DB, _ = gorm.Open(postgres.Open(dsn), &gorm.Config{})

func PrintAll() {
	var tokens []Token
	DB.Table("tokens").Select("*").Scan(&tokens)
	println()
	for _, value := range tokens {
		fmt.Println(value)
	}
}

func GetTokens() (tokens []Token) {
	DB.Table("tokens").Select("*").Scan(&tokens)
	return tokens
}

func DeleteToken(token *Token) {
	result := DB.Delete(Token{}, &token)
	PrintAffectedRows(result.RowsAffected)
}

func AddToken(token *Token) {
	result := DB.Create(&token)
	if result.RowsAffected <= 0 {
		println("ERROR")
		return
	}
	PrintAffectedRows(result.RowsAffected)
}

// func main() {
// 	// PrintAll()
// 	// AddToken(&Token{Symbol: "mytest", Time: "2021-06-16 18:39:54+02"})
// 	DeleteToken(&Token{ID: 15})
// 	// PrintAll()
// 	// AddToken(&Token{ID: 4, Symbol: "mytest", Time: "2021-06-16 18:39:54+02"})
// 	PrintAll()
// }
