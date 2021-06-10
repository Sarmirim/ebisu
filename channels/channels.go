package channels

import (
	"os"
	"os/signal"
)

var RequestChannel = make(chan RESTCommand)
var ResponseChannel = make(chan RESTCommand)
var Interrupt = make(chan os.Signal, 1)

type RESTCommand struct {
	Action string
	Data   string
	ID     int
	Status bool
}

func Prepare() {
	signal.Notify(Interrupt, os.Interrupt)
}
