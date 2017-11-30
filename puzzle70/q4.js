// 長さn cmの1本の棒を1 cm単位に切り分けることを考える
// 1本の棒を1度に切ることが出来るのは1人だけ
// 切り分けた棒が3本あれば3人切れる
// 最大m人の人がいるとき、最短何回で切り分けられるか


// センスの無い解答
let n = 20, m = 3;

let sticks = [n];
let count = 0;

function divide(arr) {
    count++;
    const max = arr.length < m ? arr.length : m;
    for (let i = 0; i < max; i++) {
        const num = arr.shift();
        if (num != 1) {
            arr.push(Math.floor(num / 2));
            if (num % 2 == 0) {
                arr.push(Math.floor(num / 2));
            } else {
                arr.push(Math.ceil(num / 2));
            }
        } else {
            arr.push(num);
        }
    }
    sticks = arr.sort((a, b) => {
        if (a > b) return -1;
        if (a < b) return 1;
        return 0;
    });
    if (!sticks.every(elem => elem === 1)) {
        divide(sticks);
    }
}
divide(sticks);
console.log(count, sticks);

// お手本
function cutStick(n, m, now) {
    if (now < n) {
        if (now < m) {
            return 1 + cutStick(n ,m, now * 2);
        } else {
            return 1 + cutStick(n, m, now + m);
        }
    } else {
        return 0;
    }
}
console.log(cutStick(20, 3, 1));
console.log(cutStick(100, 5, 1));