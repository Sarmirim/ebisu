package settings

type Settings struct {
	Port int
}

func GetSettings() Settings {
	return Settings{Port: 9876}
}
