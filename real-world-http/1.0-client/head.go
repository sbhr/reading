package main

import (
	"log"
	"net/http"
)

func main() {
	resp, _ := http.Head("http://localhost:18888")
	defer resp.Body.Close()
	// bodyの内容をバイト列として読み込む
	log.Println("Status:", resp.Status)
	log.Println("Headers:", resp.Header)
}
