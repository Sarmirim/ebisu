package db

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"

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

// var dsn = "host=localhost user=admin password=admin dbname=ebisu port=32000 sslmode=disable TimeZone=Etc/UTC"
// var DB, ERROR = gorm.Open(postgres.Open(dsn), &gorm.Config{})
var (
	dsn   = "host=localhost user=admin password=admin dbname=ebisu port=32001 sslmode=disable TimeZone=Etc/UTC"
	DB    = &gorm.DB{}
	ERROR = &DB.Error
	ERR   = *new(error)
)

func init() {
	DB, ERR = gorm.Open(postgres.Open(dsn), &gorm.Config{})
}

func Prepare() {
	if ERR != nil {
		println("DB ERROR")
	} else {
		println("DB CONNECTED")
	}
}

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

// TODO: make generic in go v1.17
func BatchDeleteToken(some map[string]interface{}) (result *gorm.DB) {
	for k, v := range some {
		query := fmt.Sprintf("%v like '%%%v%%'", k, v)
		println(query)
		result = DB.Where(query).Delete(&Token{})
	}
	return result
}

func AddToken(token *Token) {
	result := DB.Create(&token)
	if result.RowsAffected <= 0 {
		println("ERROR")
		return
	}
	PrintAffectedRows(result.RowsAffected)
}

func UpdateToken(some map[string]interface{}) (result *gorm.DB) {
	for k, v := range some {
		query := fmt.Sprintf("%v = '%v'", k, v)
		println(query)
		result = DB.Where(query).Delete(&Token{})
	}
	return result
}

func GetArray(link string) {
	client := &http.Client{}
	newArray := &[]EasyToken{}
	// newArray := &easyArray{}

	req, err := http.NewRequest("GET", link, nil)
	if err != nil {
		println(err)
	}

	req.Header.Set("User-Agent", "Ebisu")
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")

	resp, err := client.Do(req)
	if err != nil {
		println(err)
	}

	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		println(err)
	}

	er := json.Unmarshal(body, &newArray)
	if er != nil {
		fmt.Printf("err = %v\n", er)
	}
	fmt.Printf("members = %#v\n", newArray)
	println("a")
}

func ParseTokensArray(array *[]Token) {

}

// func main() {
// 	// PrintAll()
// 	// AddToken(&Token{Symbol: "mytest", Time: "2021-06-16 18:39:54+02"})
// 	DeleteToken(&Token{ID: 15})
// 	// PrintAll()
// 	// AddToken(&Token{ID: 4, Symbol: "mytest", Time: "2021-06-16 18:39:54+02"})
// 	PrintAll()
// }
