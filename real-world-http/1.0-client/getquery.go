package main

import (
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
)

func main() {
	values := url.Values{
		"query": {"hello world"},
	}
	resp, _ := http.Get("http://localhost:18888" + "?" + values.Encode())
	defer resp.Body.Close()
	// bodyの内容をバイト列として読み込む
	body, _ := ioutil.ReadAll(resp.Body)
	log.Println(string(body))
	log.Println("Status:", resp.Status)
	log.Println("StatusCode:", resp.StatusCode)
	log.Println("Headers:", resp.Header)
	log.Println("Content-Length:", resp.Header.Get("Content-Length"))
}
