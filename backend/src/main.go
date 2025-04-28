package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"
	"log"
	"net/http"
	"strings"
	"time"
)

var db *sql.DB // Global Variable

type Character struct {
	CharacterId   int      `json:"characterId"`
	PicturePath   string   `json:"picturePath"`
	CharacterName string   `json:"characterName"`
	AnimeName     string   `json:"animeName"`
	Genre         string   `json:"genre"`
	Rating        float32  `json:"rating"`
	Hulu          string   `json:"hulu"`
	Crunchyroll   string   `json:"crunchyroll"`
	Other         string   `json:"other"`
}

func initDB() error {
	var err error
	dsn := "root:CSCI367@tcp(mysql:3306)/CSCI367MBTI"

	// Try
	tryTimes := 5
	for i := 0; i < tryTimes; i++ {
		// Open databse
		db, err = sql.Open("mysql", dsn)
		if err != nil {
			log.Printf("Attempt %d: cannot open DB: %v", i+1, err)
			time.Sleep(2 * time.Second)
			continue
		}
		// Check connection
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


func getCharacters(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")

	// Handle argument
	mbti := strings.TrimSpace(r.URL.Query().Get("mbti"))
	genresParam := r.URL.Query().Get("genres")
	var genres []string
	if genresParam != "" {
		for _, g := range strings.Split(genresParam, ",") {
			genres = append(genres, strings.TrimSpace(g))
		}
	}

	// Build SQL
	baseSQL := `
      SELECT c.CharacterID, c.CharacterName, a.AnimeName, g.Genre, a.Rating, a.Hulu, a.Crunchyroll, a.Other
      FROM Characters c
      JOIN Animes a   ON c.AnimeID = a.AnimeID
      JOIN Genres g   ON a.GenreID = g.GenreID
        WHERE TRIM(c.MBTI) = ?
	`
	args := []interface{}{mbti}
	if len(genres) > 0 {
		ph := strings.Repeat("?,", len(genres))
		ph = ph[:len(ph)-1]
		baseSQL += " AND TRIM(g.Genre) IN (" + ph + ")"
		for _, g := range genres {
			args = append(args, g)
		}
	}

	// Log
	log.Printf("Executing SQL: %s\nWith args: %v", baseSQL, args)

	rows, err := db.Query(baseSQL, args...)
	if err != nil {
		log.Printf("Failed to search: %v", err)
		http.Error(w, "query error", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	// Iterate result
	var result []Character
	for rows.Next() {
		var c Character
		if err := rows.Scan(
			&c.CharacterId,
			&c.CharacterName,
			&c.AnimeName,
			&c.Genre,
			&c.Rating,
			&c.Hulu,
			&c.Crunchyroll,
			&c.Other,
		); err != nil {
			log.Printf("Failed to scan rows: %v", err)
			continue
		}
		c.PicturePath = fmt.Sprintf("images/%s/%s.png", c.AnimeName, c.CharacterName)

		result = append(result, c)
	}

	// Return Json
	resp := map[string]interface{}{
		"success": true,
		"data":    result,
	}
	if err := json.NewEncoder(w).Encode(resp); err != nil {
		log.Printf("Failed to write to json: %v", err)
	}
}

func main() {
	// Connect to db
	err := initDB()
	if err != nil {
		log.Fatal("cannot connect to server", err)
	}
	defer db.Close()

	r := mux.NewRouter()
	r.HandleFunc("/api/characters", getCharacters).Methods("GET")
	fmt.Println("Server is listening on port 8080 ...")
	log.Fatal(http.ListenAndServe(":8080", r))
}