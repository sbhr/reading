// 1 ~ 100までの番号が書かれた100枚のカードを
// n番目のカードからn-1枚おきにカードを裏返す操作を
// カードの向きが変わらなくなるまで続けたとき、裏向きになっているカードの番号を求める

const cards = new Array(100);
cards.fill(false);

for (let i = 2; i < 101; i++) {
    let j = i - 1;
    while (j < 100) {
        cards[j] = !cards[j];
        j += i; 
    }
}
cards.forEach((card, index) => {
    if (!card) {
        console.log(index + 1);
    }
});