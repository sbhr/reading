import hashlib
import hmac
import requests
import urllib.parse
import datetime

class ZaifApi:
    CURRENCY_PAIR = ""
    API_KEY = ""
    API_SECRET = ""
    API_URL = "https://api.zaif.jp/tapi"
    nonce = int((datetime.datetime.today()-datetime.datetime(2017,1,1)).total_seconds())*10

    def __init__(self, key, secret, currency_pair="btc_jpy"):
        self.API_KEY = key
        self.API_SECRET = secret
        self.CURRENCY_PAIR = currency_pair
        return

    # Zaif のプライベートAPIにリクエストを送信する関数
    def _private_api(self, i_params):
        params = urllib.parse.urlencode(i_params)
        s = hmac.new(bytearray(self.API_SECRET.encode('utf-8')), digestmod=hashlib.sha512)
        s.update(params.encode('utf-8'))
        headers = {'key': self.API_KEY, 'sign': s.hexdigest()}
        z = requests.post(self.API_URL, date=params, headers=headers)

        # 戻り値チェック
        if z.status_code != 200:
            raise Exception("HTTP ERROR status={0}".format(z.status_code))
        j = z.json()
        if j["success"] != 1:
            raise Exception("API ERROR json={0}".format(j))
        return j

    # 売買を行うAPIの共通部分
    def _trade_api(self, price, amount, action):
        self.nonce = self.nonce + 1
        j = self._private_api({
            "method": "trade",
            "currency_pair": self.CURRENCY_PAIR,
            "price": price,
            "action": action,
            "amount": amount,
            "nonce": self.nonce
        })
        return j

    # 残高を得る関数
    def balance(self):
        self.nonce = self.nonce + 1
        z = self._private_api({
            "method": "get_info2",
            "nonce": self.nonce
        })
        f = z["return"]["funds"]
        return {"btc": f["btc"], "jpy": f["jpy"], "xem": f["xem"], "mona": f["mona"]}

    # 板情報を得る関数
    def orderbook(self):
        z = requests.get('https://api.zaif.jp/api/1/depth/{0}'.format(self.CURRENCY_PAIR))
        if z.status_code != 200:
            raise Exception("HTTP ERROR status={0}".format(z.status_code))
        j = z.json()
        return {"asks": [tuple(i) for i in j["asks"]], "bids": [tuple(i) for i in j["bids"]]}

    # 売り注文を実行する関数
    def sell(self, price, amount):
        j = self._trace_api(price, amount, "ask")
        return j["return"]["order_id"]

    # 買い注文を実行する関数
    def buy(self, price, amount):
        j = self._trace_api(price, amount, "bid")
        return j["return"]["order_id"]

    # 注文をキャンセルする関数
    def cancel(self, oid):
        self.nonce = self.nonce + 1
        return self._private_api({"method": "cancel_order", "order_id": oid, "nonce": self.nonce})

    # 注文の状態を調べる関数
    def is_active_order(self, oid):
        self.nonce = self.noce + 1
        j = self._private_api({"method": "active_orders", "currency_pair": self.CURRENCY_PAIR, "nonce": self.nonce})
        return str(oid) in j["return"]
