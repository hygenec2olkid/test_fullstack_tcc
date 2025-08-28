package database

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/go-sql-driver/mysql"
)

var DB *sql.DB

func Connect() {
	var err error
	dsn := "root:P@ssw0rd@tcp(localhost:3306)/productdb"

	DB, err = sql.Open("mysql", dsn)
	if err != nil {
		log.Fatal("Failed to connect DB:", err)
	}

	// test connection
	if err = DB.Ping(); err != nil {
		log.Fatal("DB unreachable:", err)
	}

	// create table if not exists
	createTable := `
	CREATE TABLE IF NOT EXISTS products (
		id INT AUTO_INCREMENT PRIMARY KEY,
		code VARCHAR(36) NOT NULL
	);`
	_, err = DB.Exec(createTable)
	if err != nil {
		log.Fatal("Failed to create table:", err)
	}

	fmt.Println("Connected to MySQL database!")
}
