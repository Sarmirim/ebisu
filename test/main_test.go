package main_test

import (
	"strings"
	"testing"

	"github.com/sarmirim/ebisu/utils"
)

type testpair struct {
	symbol string
	price  float32
}

var tests = []testpair{
	{symbol: "dogeusdt", price: 0.02},
	{"btcusdt", 10000.0},
	{"ethusdt", 1000.0},
	{price: 0.000001, symbol: "iqbnb"},
}

func TestMain(t *testing.T) {
	for _, test := range tests {
		// go func(a testpair) {
		coin := utils.Price(test.symbol)

		if float32(coin.PriceToFloat()) < test.price {
			t.Error(
				"\nFor", strings.ToUpper(test.symbol),
				"\nexpected", ">", test.price,
				"\ngot", coin.Price,
			)
		}
		// }(test)
	}
}
