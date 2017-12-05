// 1000円を両替する。
// 500, 100, 50, 10円が十分なだけあり、最大で15枚使って両替する
// 組み合わせは何通りか

let count = 0;
for (let i = 0; i <= 2; i++) {
    for (let j = 0; j <= 10; j++) {
        for (let k = 0; k <= 15; k++) {
            for (let l = 0; l <= 15; l++) {
                if ((i + j + k + l) <= 15 &&
                (i * 500 + j * 100 + k * 50 + l * 10) == 1000) {
                    count++;
                }
            }
        }
    }
}

console.log(count);