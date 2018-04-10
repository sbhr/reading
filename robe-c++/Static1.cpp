#include <iostream>
#include <algorithm>
using namespace std;

//////////////////
// アドレスが常に一定かどうか
void CheckAddress_Sub();
void CheckAddress_Sub2();

void CheckAddress() {
    cout << "アドレスが常に一定かどうか" << endl;

    CheckAddress_Sub();
    CheckAddress_Sub2();
    CheckAddress_Sub();
}

// 静的変数 a と自動変数 b のアドレスを出力
void CheckAddress_Sub() {
    static int a;
    int        b;
    cout << "&a = " << (size_t)&a << endl;
    cout << "&b = " << (size_t)&b << endl;
}

// この変数の中からCheckAddress_Subを呼んだ時に
// 変数 a と b のアドレスがどうなるか
void CheckAddress_Sub2() {
    cout << "in Sub2" << endl;
    CheckAddress_Sub();
}


/////////////////////////////////////
// 初期化が１回しかされないかのチェック

void CheckInitOnece_Sub();

void CheckInitOnce() {
    cout << endl << "初期化が１回しかされないかのチェック" << endl;

    CheckInitOnece_Sub();
    CheckInitOnece_Sub();
}

// ++a と ++b の影響が２回目以降の呼び出しに影響するかチェック
void CheckInitOnece_Sub() {
    static int a = 3;
    int        b = 3;
    cout << "a = " << a << endl
         << "b = " << b << endl;
    ++a;
    ++b;
}

///////////////////////////////////////////
// 0で初期化されるか
// 偶然0だったときのために４個くらいつくる
// 自動変数も一緒に確認する

void CheckZeroInit_Sub();
void CheckZeroInit_Sub2();

void CheckZeroInit() {
    cout << endl << "0で初期化されるかのチェック" << endl;

    CheckZeroInit_Sub();
    CheckZeroInit_Sub2();
}

// 静的変数が何で初期化されているかのチェック
void CheckZeroInit_Sub() {
    static int a, b, c, d;
    cout << a << "," << b << "," << c << "," << d << endl;
}

// 自動変数が何で初期化されているかのチェック
void CheckZeroInit_Sub2() {
    int a, b, c, d;
    cout << a << "," << b << "," << c << "," << d << endl;
}

//////////////////////////////////
// 値が保証されるかチェック

void CheckInvariant_Sub(int*& pa, int*& pb);
void CheckInvariant_Sub2();

void CheckInvariant() {
    cout << endl << "値が保証されるかチェック" << endl;

    int *pa, *pb;
    CheckInvariant_Sub(pa, pb);
    CheckInvariant_Sub2();
    // CheckInvariant_Sub2を呼んでも
    // a と b の値が保証されるかチェック

    // 場合によってはチェックに失敗するかも？
    cout << "*pa = " << *pa << endl
         << "*pb = " << *pb << endl;
}

// 静的変数 a と 自動変数 b のアドレスを引数をとおして返す
// int*& は int* への参照
void CheckInvariant_Sub(int*& pa, int*& pb) {
    static int a = 9;
    int        b = 9;
    pa = &a;
    pb = &b;
}

// 大きな変数を作ってそれを全て０で埋める
// fill_n は指定したデータでで配列を埋める関数のようなもの
void CheckInvariant_Sub2() {
    int dummy[100];
    fill_n(dummy, 100, 0);
}

int main() {
    CheckAddress();
    CheckInitOnce();
    CheckZeroInit();
    CheckInvariant();
}