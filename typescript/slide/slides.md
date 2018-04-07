# TypeScriptさわってみた
- - -

---

質問に答えられない場合があります。

---
## Agenda
- TypeScript とは
- 使ってみる
- テスト
---
## TypeScript とは

---
### TypeScript とは
- TypeScript は、プレーンな JavaScript にコンパイルできる JavaScript に型が付いたスーパーセットです。
- Microsoft が開発。2018/03/18 現在 2.7 が最新
  - Anders Hejlsberg (C#, Delphi, Turbo Pascal)
- Apache License 2.0
- [Playground](https://www.typescriptlang.org/play/index.html)

---
### TypeScript とは
- Starts and ends with JavaScript
- Strong tools for large apps
- State of the art JavaScript

---
### Starts and ends with JavaScript
- 任意のブラウザ、Node.js、またはECMAScript3以上をサポートする JavaScript エンジンで動くクリーンでシンプルな JavaScript にコンパイルでされる。

---
### Strong tools for large apps
型があるので
- 生産性の高い開発ツールを使用できる。
- コードの静的チェックやリファクタリングがしやすい。
- コンポーネント間のインターフェースが定義できる。

---
### State of the art JavaScript
- 最新の JavaScript をサポート

---
> もし5行だけのコードを書くのであれば、それはTypeScriptの導入という努力には値しないでしょう…… プロジェクトが大きくなればなるほど、TypeScriptの有用性は上がっていきます。さきに私が述べたように、数千行のコードになるまでには、スラム・ダンク(大成功)になっているでしょう。
> Anders Hejlsberg

---
### デメリット?
- トランスパイルにかかる負荷
- パフォーマンス
- 迅速性

[TypeScript を使ったほうがいいケースとは？](https://postd.cc/when-should-i-use-typescript/)

---
## 使ってみる

---
### インストール
```bash
// グローバルにインストールしたくなかったら -g を消してください
$ npm install -g typescript

// ハンズオン用
$ cd ts-hands-on/tutorial
```

---
### コンパイルしてみよう
```ts
$ cat src/sample1.ts
function greeter(name) {
    return `Hello, I'm ${name}`
}

const name = "Ironman"

console.log(greeter(name))

// コンパイル
$ tsc
```

---
### 失敗する 😢
```bash
../../.nodebrew/node/v8.9.4/lib/node_modules/typescript/lib/lib.d.ts(19270,15): error TS2451: Cannot redeclare block-scoped variable 'name'.
src/sample1.ts(5,7): error TS2451: Cannot redeclare block-scoped variable 'name'.
```
- TypeScript がコンパイルする時にインクルードするライブラリで`name`が使われてしまっているらしい。

---
### tsconfig.json
- コンパイルするために必要なルートファイルとオプションを指定する
- tsconfig.json があるディレクトリがプロジェクトのルートとなる。
```json
{
    "compilerOptions": {
        "target": "es5",
        "module": "commonjs",
        "sourceMap": true,
        "lib": [
            "es6"
        ]
    },
    "include": [
        "src/**/*"
    ],
    "exclude": [
        "node_modules"
    ]
}
```

### コンパイル…😢
```bash
$ tsc
src/sample.ts(7,1): error TS2304: Cannot find name 'console'.
```
(たぶん)インクルードするライブラリを変えたので、定義が見つからなくなってしまった

---
### 型宣言ファイル
- .d.ts という拡張子で定義されたファイル
  - インターフェースとか書かれています。
- js で書かれている外部パッケージ等を TypeScript で使うために必要となってくる

```bash
// 多分 node の基本的なやつがはいってる
$ npm install @types/node
```

---
### コンパイル 😄
```bash
$ tsc
$ ls src/
sample.js      sample.js.map  sample.ts
$ node src/sample.js
Hello, I'm Ironman
```

---
### コンパイルされたものと比較
```ts
function greeter(name) {
    return `Hello, I'm ${name}`;
}

 const name = "Ironman"

console.log(greeter(name));
```
```js
function greeter(name) {
    return "Hello, I'm " + name;
}
var name = "Ironman";
console.log(greeter(name));
//# sourceMappingURL=sample.js.map
```

---
### sourceMap
- コンパイル前と後の対応関係が書かれているファイル
- デバッグ時にコンパイル前の該当箇所に飛んでくれる
- TypeScript に限った話ではなくて他のコンパイルするような言語なら使えるらしい

---
### 型をつける
```bash
$ cp sample/sample2.ts.sample src/sample.ts
```
```ts
function greeter(name: string): string {
    return `Hello, I'm ${name}`;
}

const name = "Ironman"
// const name = [0, 1, 2];

console.log(greeter(name));
```
コメントアウトを外してコンパイルするとエラー
```
error TS2345: Argument of type 'number[]' is not assignable to parameter of type 'string'.
```

---
### 基本的な型
```ts
let isDone: boolean = false;

let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;

let color: string = "blue";

let list: number[] = [1, 2, 3];

enum Color {Red, Green, Blue}
let c: Color = Color.Green;

let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false; // okay, definitely a boolean

let u: undefined = undefined;
let n: null = null;
```

---
### インターフェース
```bash
$ cp sample/sample3.ts.sample src/sample.ts
```
```ts
interface Hero {
    name: string;
    trueName:string;
}

function greeter(hero: Hero) {
    return `Hello, I'm ${hero.trueName}, a.k.a ${hero.name}`;
}

const hero = {
    name: "Ironman",
    trueName: "Tony Stark"
};

console.log(greeter(hero));
```

---
### インターフェース（コンパイル後）
```js
function greeter(hero) {
    return "Hello, I'm " + hero.trueName + ", a.k.a " + hero.name;
}
var hero = {
    name: "Ironman",
    trueName: "Tony Stark"
};
console.log(greeter(hero));
//# sourceMappingURL=sample.js.map
```

---
### クラス
```bash
$ cp sample/sample4.ts.sample src/sample.ts
```
```ts
interface Hero {
    name: string;
    trueName: string;
}

class Team {
    name: string;
    member: Hero[];
    constructor(name: string) {
        this.name = name;
        this.member = [];
    }
    public enlistment(hero: Hero): void {
        this.member.push(hero);
    }
    public teamIntroduction(): void {
        console.log(`We are ${this.name}`);
        if (this.member.length > 0) {
            console.log("=== Team Member ===");
            for (const hero of this.member) {
                console.log(greeter(hero));
            }
        }
    }
}

function greeter(hero: Hero): string {
    return `Hello, I'm ${hero.trueName}, a.k.a ${hero.name}`;
}

const avengers = new Team("Avengers");
avengers.teamIntroduction();
avengers.enlistment({ name: "Ironman", trueName: "Tony Stark" });
avengers.enlistment({ name: "Captain America", trueName: "Steve Rogers" });
avengers.teamIntroduction();
```

---
### クラス（コンパイル後）
```js
var Team = /** @class */ (function () {
    function Team(name) {
        this.name = name;
        this.member = [];
    }
    Team.prototype.enlistment = function (hero) {
        this.member.push(hero);
    };
    Team.prototype.teamIntroduction = function () {
        console.log("We are " + this.name);
        if (this.member.length > 0) {
            console.log("=== Team Member ===");
            for (var _i = 0, _a = this.member; _i < _a.length; _i++) {
                var hero = _a[_i];
                console.log(greeter(hero));
            }
        }
    };
    return Team;
}());
function greeter(hero) {
    return "Hello, I'm " + hero.trueName + ", a.k.a " + hero.name;
}
var avengers = new Team("Avengers");
avengers.teamIntroduction();
avengers.enlistment({ name: "Ironman", trueName: "Tony Stark" });
avengers.enlistment({ name: "Captain America", trueName: "Steve Rogers" });
avengers.teamIntroduction();
//# sourceMappingURL=sample.js.map
```

---
### ほかにもできること
- Generics
- Namespaces
- Mixins
いろいろ

---
## テスト

---
### 準備
```bash
$ cd test-tutorial/
$ npm i
``` 

---
### テスト対象① hero.ts
```ts
export class Hero {
    constructor(public name: string, public comic: string) {
    }
}
```
public にするとメンバ変数として扱える?

---
### テスト対象② hero-db.ts
```ts
import { Hero } from './hero';

export class HeroDb {
    constructor() {
    }

    public findByComic(comic: string): Hero[] {
        throw new Error('DBなんてないよ');
    }
}
```
側だけ

---
### テスト対象③ hero-manager.ts
```ts
import { Hero } from './hero';
import { HeroDb } from './hero-db';

export class HeroManager {
    constructor(private db: HeroDb) {
    }

    /**
     * 与えられたヒーローがMarvelならtrueを返す
     * @param {hero} Hero
     * @returns {boolean} true なら marvel
     */
    public isMarvel(hero: Hero): boolean {
        return hero.comic === 'marvel';
    }

    /**
     * Marvelのヒーロー達を返す
     * @returns {Hero[]} ヒーロー配列
     */
    public getMarvelHeros(): Hero[] {
        const heros = this.db.findByComic('marvel');
        return heros;
    }
}
```

---
### テスト方法
```json
"scripts": {
    "build": "tsc",
    "test": "tsc && mocha ./dist/test/*.test.js",
    "coverage": "istanbul cover _mocha -- ./dist/test/*.test.js && remap-istanbul -i ./coverage/coverage.json -o ./coverage/ts-report -t html"
},
```
コンパイル後のjsを使ってテストを行う

---
### モックとか
```ts
import * as chai from 'chai';
import * as typemoq from "typemoq";
import { HeroDb } from '../src/hero-db';
import { HeroManager } from '../src/hero-manager';

describe('HeroManager', () => {
    describe('getMarvelGeros', () => {
        const marvelHeros = [
            { name: 'Ironman', comic: 'marvel' },
            { name: 'Captain America', comic: 'marvel' }
        ];

        it('marvel のヒーローが取得できる', () => {
            // モックを作る
            const dbMock: typemoq.IMock<HeroDb> = typemoq.Mock.ofType<HeroDb>();
            // marvel が引数できたら marvelHeros を返す
            dbMock.setup(x => x.findByComic(typemoq.It.isValue('marvel'))).returns(() => marvelHeros);

            const heroManager = new HeroManager(dbMock.object);
            chai.expect(heroManager.getMarvelHeros()).to.deep.equal(marvelHeros);

            dbMock.verifyAll();
        });
    });
});
```

---
### テスト実行
```bash
$ npm test



  HeroManager
    isMarvel
      ✓ marvel なら true をかえす
      ✓ marvel ではないなら false をかえす
    getMarvelGeros
      ✓ marvel のヒーローが取得できる


  3 passing (11ms)
```
```bash
$ open ./coverage/lcov-report/index.html
```

---
### TypeScriptファイルで結果をみる
```bash
$ npm run coverage

  HeroManager
    isMarvel
      ✓ marvel なら true をかえす
      ✓ marvel ではないなら false をかえす
    getMarvelGeros
      ✓ marvel のヒーローが取得できる


  3 passing (20ms)

=============================================================================
=============================================================================

=============================== Coverage summary ===============================
Statements   : 94.44% ( 17/18 )
Branches     : 100% ( 0/0 )
Functions    : 85.71% ( 6/7 )
Lines        : 94.44% ( 17/18 )
================================================================================
```
```bash
$ open ./coverage/ts-report/index.html
```

---
## おわり

---
### 補足
今まで reveal-ck 使って中央寄せになってこまっていたんですが、環境を作り直してバージョンが新しくなったのか、### だと実は左寄せになっていたのかとにかく左寄せになりました。☺️

---
### 参考
- [TypeScript in 5 minutes](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)
- [ユニットテストを書こう](http://blog.catalyst-system.jp/useful-001/)