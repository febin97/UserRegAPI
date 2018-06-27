package main

//import "time"

type User struct {
	Name      string    `json:"name"`
	Password  string    `json:"password"`
}

type Users []User
