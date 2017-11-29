// Question
// 10進数、2進数、8進数のいずれで表現しても回分数となる数のうち、10進数以上の10以上で最小の値を求めてください。

/* 文字列型に逆順を返すメソッドを追加 */
String.prototype.reverse = function (){
  return this.split("").reverse().join("");
}

/* 11から探索開始 */
const num = 11;
while (true){
  if ((num.toString() == num.toString().reverse()) &&
      (num.toString(8) == num.toString(8).reverse()) &&
      (num.toString(2) == num.toString(2).reverse())){
    console.log(num);
    break;
  }
  /* 奇数だけを探すため、2つずつ増やす */
  num += 2;
}
