package db_test

import (
	"fmt"
	"testing"
	"time"

	db "github.com/sarmirim/ebisu/gorm"
)

var testTokens = []db.Token{
	{Symbol: "AddedToBeingDeleted0", Price: 0, Time: time.Now().Format(time.RFC3339)},
	{Symbol: "AddedToBeingDeleted1", Price: 100, Time: time.Now().Format(time.RFC3339)},
	{Symbol: "AddedToBeingDeleted2", Price: -100, Time: time.Now().Format(time.RFC3339)},
	{Symbol: "AddedToBeingDeleted3", Price: 0.2314734, Time: time.Now().Format(time.RFC3339)},
}

func TestMain(t *testing.T) {
	db.PrintAll()
	// t.Error()
}

func TestPrintAll(t *testing.T) {
	for _, token := range db.GetTokens() {
		fmt.Println(token)
		t.Log(token)
	}
	db.PrintAll()

}

func TestGetTokens(t *testing.T) {
	db.GetTokens()
}

func TestAddToken(t *testing.T) {
	affectedRows := 0
	for _, token := range testTokens {
		db.AddToken(&token)
		affectedRows++
	}
	db.PrintAll()
}

func TestDeleteToken(t *testing.T) {
	var query = map[string]interface{}{
		"symbol": "AddedToBeingDeleted",
	}
	result := db.BatchDeleteToken(query)
	println("Rows affected: ", result.RowsAffected)
	// if int(result.RowsAffected) != len(query) {
	// 	t.Error(
	// 		"\nTestDeleteToken ERROR",
	// 	)
	// }
}
