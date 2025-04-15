package main

import (
	"time"
	"database/sql"
	//"encoding/json"
	"fmt"
	"log"
	//"net/http" 
	//"github.com/gorilla/mux"
	_ "github.com/go-sql-driver/mysql"
	
)

var db *sql.DB

func initDB() error {
	var err error
	dsn := "root:CSCI367@tcp(mysql:3306)/CSCI367MBTI"

	// Try
	tryTimes := 5
	for i:= 0; i < tryTimes; i++ {
		// Open databse
		db, err = sql.Open("mysql", dsn)
		if err != nil {
			log.Printf("Attempt %d: cannot open DB: %v", i+1, err)
            time.Sleep(2 * time.Second)
            continue
		}

		// Check connection
		err = db.Ping()
		if err != nil{
			log.Printf("Attempt %d: cannot ping DB: %v", i+1, err)
            time.Sleep(2 * time.Second)
            continue
		}
		log.Println("Connect to db")
		return nil
	}
	return fmt.Errorf("cannot connect to db after multiple attempts: %v", err)
}

func test() {}

func main() {
	// Connect to db
	err := initDB()
	if err != nil{
		log.Fatal("cannot connect to server", err)
	}
	defer db.Close()

}