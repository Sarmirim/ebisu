package db

import (
	"fmt"
)

func PrintAffectedRows(rows int64) {
	fmt.Println("Number of affected rows: ", rows)
}
