package bot

import (
	"fmt"
	"log"
	"os"

	tgbotapi "github.com/go-telegram-bot-api/telegram-bot-api"
	"github.com/sarmirim/ebisu/utils"
)

func Prepare() {
	go Start()
}

func getENV(name string) string {
	value := os.Getenv(name)
	return value
	// return "you_can_add_your_bot_key_on_return"
}

func printBotName(botName string) {
	if botName != "" {
		line := fmt.Sprintf("Authorized on account: %v\n", botName)
		utils.GreenPrint(line)
	} else {
		utils.RedPrint("BOT token: empty")
	}
}

func Start() {
	token := getENV("BOT")

	// TODO: test recover
	defer func() {
		if err := recover(); err != nil {
			log.Println("Panic occurred:", err)
		}
	}()

	bot, err := tgbotapi.NewBotAPI(token)
	if err != nil {
		utils.RedPrint("BOT ERROR")
	}

	bot.Debug = true

	printBotName(bot.Self.UserName)

	u := tgbotapi.NewUpdate(0)
	u.Timeout = 60

	updates, err := bot.GetUpdatesChan(u)
	if err != nil {
		println(err)
	}
	for update := range updates {
		print("Channel ")
		println(update.ChannelPost)
		if update.Message == nil { // ignore any non-Message Updates
			continue
		}
		fmt.Printf("Message  %+v\n", update.Message)
		// println("type" + update.ChannelPost.Chat.Type)

		// TODO: add Channel chat
		// if update.ChannelPost.Chat.Type == "channel" {
		// 	println("YEEP")
		// 	msg := tgbotapi.NewMessage(update.Message.Chat.ID, "answer")
		// 	msg.ReplyToMessageID = update.ChannelPost.ReplyToMessage.MessageID
		// 	bot.Send(msg)
		// }

		log.Printf("[%s] %s\n", update.Message.From.UserName, update.Message.Text)

		answer := BotRequest(update.Message.Text)

		msg := tgbotapi.NewMessage(update.Message.Chat.ID, answer)
		msg.ParseMode = "HTML"
		msg.ReplyToMessageID = update.Message.MessageID

		bot.Send(msg)
	}
}

func BotRequest(symbol string) string {
	coin := utils.Price(symbol)
	answer := MessageParser(coin.Symbol, coin.Price)
	return answer
}

func MessageParser(symbol, price string) string {
	if len(price) < 1 {
		return "Pair doesn't exist\nPlease try something like \"doge\" or \"dogebtc\" or \"dogeusdt\""
	}
	// return fmt.Sprintf("Pair: %s \nPrice: <b>%f</b>", symbol, price)
	return "Pair: " + symbol + " \nPrice: <b>" + price + "</b>"
}
