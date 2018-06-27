package main

import(
 "fmt"
 "database/sql"
 _ "mysql-master"
)
var currentId int

var users Users

// Give us some seed data
func init() {
	//RepoCreateUser(User{Name: "febin",Password: "febin123"})
	//RepoCreateUser(User{Name: "saleel",Password: "saleel123"})
}


//this is bad, I don't think it passes race condtions
func RepoCreateUser(t User) User {
	
	users = append(users, t)
	name := t.Name
	fmt.Println(name)
	fmt.Println(t.Password)
	
	db, err := sql.Open("mysql", "febin:hello123@tcp(127.0.0.1:3306)/testDb")
	if err != nil {
        panic(err.Error())
    }
    defer db.Close()
    insert, err := db.Query("INSERT INTO user VALUES ( ? , SHA1(?) )",t.Name,t.Password)
    if err != nil {
        panic(err.Error())
    }else{
        fmt.Println("Data added Successfully\n")
    }
	defer insert.Close()
	return t
}
func RepoCheckLogin(t User) string{
	db, err := sql.Open("mysql", "febin:hello123@tcp(127.0.0.1:3306)/testDb")
	if err != nil {
        panic(err.Error())
    }
    defer db.Close()
    query,err := db.Query("SELECT password FROM user WHERE user_name = ? and password = SHA1(?)",t.Name,t.Password)
    if err != nil {
		fmt.Println("ERROR IN EXECUTING QUERY")
        panic(err.Error())
		return "NOT REGISTERED"
    }else{
		if(query.Next()){
			fmt.Println("REGISTERED USER")
			return "REGISTERED"
		}else{
		
			fmt.Println("USER NAME OR PASSWORD IS WRONG")
			return "NOT REGISTERED"
		}
    }
	
}

