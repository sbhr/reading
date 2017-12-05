// コラッツの予想
// 自然数ｎについて、
// ｎが偶数の場合、ｎを2で割る
// ｎが奇数の場合、ｎに3をかけて1を足す
// という操作を繰り返すと初期値がどんな数であっても必ず1に到達する

// これに、初期値が偶数の場合、初回のみｎに3をかけて1を足すことから初めて、
// 最初の数に戻るものを考える
// 10000以下の偶数の内、最初の数に戻る数は幾つ有るか

const whenEven = n => n / 2;
const whenOdd = n => n * 3 + 1;

let count = 0;
for (let i = 2; i <= 10000; i += 2) {
    let num = i;
    if (i % 2 == 0) {
        num = whenOdd(i);
    }
    while (num != 1) {
        num = num % 2 == 0 ? whenEven(num) : whenOdd(num);
        if (num == i) break;
    }
    if (num == i) {
        count++;
    }
}
console.log(count);