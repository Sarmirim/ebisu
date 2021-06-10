# Ebisu
Ebisu is the Japanese god of fishermen and luck ([wiki](https://en.wikipedia.org/wiki/Ebisu_(mythology))).

Table of Contents
- [Ebisu](#ebisu)
  - [Download](#download)
  - [Features](#features)
  - [Docker](#docker)
  - [Variables](#variables)
  - [DEV](#dev)

---

## Download 
```bash
git clone https://github.com/Sarmirim/Ebisu.git
```

---

## Features
* REST (Currently only GET)
* WEBSOCKET (Subscribe/Unsubscribe to a stream, Listing Subscriptions) control via REST API

---

## Docker
```bash
docker-compose up
```

---

## Variables
```
.env/BOT="put your telegram bot key" //works with docker only
.env/PORT=8765 //by default
```

---

## DEV
```go
go tool dist list
go env GOOS GOARCH
go env -w GOOS=linux/windows
```