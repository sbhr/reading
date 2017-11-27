package main

import (
	"log"
	"net/http"
	"net/http/httputil"
)

func main() {
	client := &http.Client{}
	request, err := http.NewRequest("POST", "http://localhost:18888", nil)
	if err != nil {
		panic(err)
	}
	// 任意のヘッダー
	request.Header.Add("Content-Type", "image/jpeg")
	// BASIC認証
	request.SetBasicAuth("USER", "PASSWORD")
	// 任意のクッキー
	request.AddCookie(&http.Cookie{Name: "test", Value: "value"})

	resp, err := client.Do(request)
	if err != nil {
		panic(err)
	}
	dump, err := httputil.DumpRequest(resp, true)
	if err != nil {
		panic(err)
	}
	log.Println(string(fump))
}
