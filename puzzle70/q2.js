// 1000 ~ 9999のうち、数字の各桁の間に四則演算子をいれて
// 元の数の桁を逆から並べた数字となるものを求める

const operater = ['+', '-', '*', '/', ''];

for (let i = 1000; i < 10000; i++) {
    const str = String(i);
    operater.forEach(op1 => {
        operater.forEach(op2 => {
            operater.forEach(op3 => {
                const formula = `${str.charAt(0)}${op1}${str.charAt(1)}${op2}${str.charAt(2)}${op3}${str.charAt(3)}`;
                const reverseStr = str.split('').reverse().join('');
                if (formula.length > 4 &&
                    reverseStr === String(eval(formula))) {
                   console.log(`${i}: ${formula} = ${reverseStr}`);
                }
            });
        });
    });
}