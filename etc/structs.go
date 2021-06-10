package structs

import (
	"fmt"
	"strings"

	"github.com/sarmirim/ebisu/channels"
)

type JSONStruct struct {
	Method string   `json:"method"`
	Params []string `json:"params"`
	ID     int      `json:"id"`
}

type Answer struct {
	Stream string `json:"stream"`
	Data   Data   `json:"data"`
	ID     int16  `json:"id"`
	Error  Error  `json:"error"`
}

type Data struct {
	EType                    string   `json:"e"`
	ETime                    int64    `json:"E"`
	TTime                    int64    `json:"T"`
	Symbol                   string   `json:"s"`
	Number                   int32    `json:"t"`
	Price                    string   `json:"p"`
	Quantity                 string   `json:"q"`
	What                     string   `json:"X"`
	Isthebuyerthemarketmaker bool     `json:"m"`
	Error                    Error    `json:"error"`
	ID                       int      `json:"id"`
	Result                   []string `json:"result"`
}

type Error struct {
	Code int    `json:"code"`
	Msg  string `json:"msg"`
}

type PrintME interface {
	Print()
}

func (object JSONStruct) Print() {
	fmt.Printf("%+v\n", object)
}

func (object Data) SendToResponseChannel() {
	channels.ResponseChannel <- channels.RESTCommand{
		Data:   strings.Join(object.Result[:], ","),
		Action: "Listing",
		Status: true,
	}
}
