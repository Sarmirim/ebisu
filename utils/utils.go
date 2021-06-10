package utils

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"strconv"
	"strings"
)

type Coin struct {
	Symbol string `json:"symbol"`
	Price  string `json:"price"`
}

func Price(symbol string) Coin {
	client := &http.Client{}
	coin := Coin{}
	symbol = strings.ToUpper(symbol)
	if len(symbol) < 5 {
		symbol = symbol + "USDT"
	}

	link := fmt.Sprintf("https://api.binance.com/api/v3/ticker/price?symbol=%s", symbol)

	req, err := http.NewRequest("GET", link, nil)
	if err != nil {
		println(err)
		return Coin{}
	}

	req.Header.Set("User-Agent", "Ebisu")
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")

	resp, err := client.Do(req)
	if err != nil {
		return Coin{}
	}

	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return Coin{}
	}

	jsonErr := json.Unmarshal(body, &coin)
	if jsonErr != nil {
		return Coin{}
	}

	println("Symbol=", coin.Symbol, "Price=", coin.Price)
	return coin
}

func Time() map[string]int64 {
	body := GetToData("https://api.binance.com/api/v3/time")

	answer := map[string]int64{}
	jsonErr := json.Unmarshal(body, &answer)
	if jsonErr != nil {
		return nil
	}

	return answer
}

func Ping() map[string]interface{} {
	body := GetToData("https://api.binance.com/api/v3/ping")

	answer := map[string]interface{}{}
	// var answer map[string]interface{}
	jsonErr := json.Unmarshal(body, &answer)
	if jsonErr != nil {
		return nil
	}

	return answer
}

func GetToData(link string) []byte {
	client := &http.Client{}

	req, err := http.NewRequest("GET", link, nil)
	if err != nil {
		println(err)
		return nil
	}

	req.Header.Set("User-Agent", "Ebisu")
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")

	resp, err := client.Do(req)
	if err != nil {
		return nil
	}

	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return nil
	}
	return body
}

func (c *Coin) PriceToFloat() float32 {
	value, err := strconv.ParseFloat(c.Price, 32)
	if err != nil {
		return -1
	}
	return float32(value)
}
