package main

import (
	"time"
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http" 
	"github.com/gorilla/mux"
	_ "github.com/go-sql-driver/mysql"
	
)

// Global db connection instance
var db *sql.DB

func initDB() error {
    var err error
    dsn := "root:243629511@tcp(mysql:3306)/rose_shop"
    for i := 0; i < 5; i++ {
        db, err = sql.Open("mysql", dsn)
        if err != nil {
            log.Printf("Attempt %d: cannot open DB: %v", i+1, err)
            time.Sleep(2 * time.Second)
            continue
        }
        err = db.Ping()
        if err != nil {
            log.Printf("Attempt %d: cannot ping DB: %v", i+1, err)
            time.Sleep(2 * time.Second)
            continue
        }
        log.Println("Connect to db")
        return nil
    }
    return fmt.Errorf("cannot connect to db after multiple attempts: %v", err)
}


func getRosePrice(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET")

	date := r.URL.Query().Get("date")

	if date == ""{
		http.Error(w, "no date param", http.StatusBadRequest)
		return
	}

	// DB query
	var price float64
	err := db.QueryRow("SELECT price FROM rose_shop WHERE date = ?", date).Scan(&price)
    if err != nil {
        log.Printf("查询错误：%v", err)  // 打印详细错误信息
        if err == sql.ErrNoRows {
            http.Error(w, "cannot find", http.StatusNotFound)
        } else {
            http.Error(w, "query error", http.StatusNotFound)
    }
    return
}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)

	response := map[string]interface{}{
		"success": true,
		"price":   price,
	}

	json.NewEncoder(w).Encode(response)
}

func main() {
	// Connect to db
	err := initDB()
	if err != nil{
		log.Fatal("cannot connect to server", err)
	}
	defer db.Close()

	r := mux.NewRouter()
	r.HandleFunc("/api/rose-price", getRosePrice).Methods("GET")
	
	// 添加静态文件服务
	fs := http.FileServer(http.Dir("./"))
	r.PathPrefix("/").Handler(http.StripPrefix("/", fs))
	
	fmt.Println("Server is listening on port 8080 ...")
	log.Fatal(http.ListenAndServe(":8080", r))
}

