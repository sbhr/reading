#include <iostream>
#include <cstdlib>
#include <cstring>
using namespace std;

class IntArray {
public:
    IntArray(int size);
    ~IntArray();

public:
    int Get(int i);
    void Set(int i, int value);

private:
    void CheckIndex(int i);

private:
    int* m_array;
    int m_size;
};

IntArray::IntArray(int size) {
    m_array = new int[size];
    m_size = size;
    cout << "要素は" << m_size << endl;
}

IntArray::~IntArray() {
    delete [] m_array;
    cout << "要素は" << m_size << "でした" << endl;
}

int IntArray::Get(int i) {
    CheckIndex(i);
    return m_array[i];    
}

void IntArray::Set(int i, int value) {
    CheckIndex(i);
    m_array[i] = value;
}

void IntArray::CheckIndex(int i) {
    if(0 <= i && i < m_size) {

    } else {
        cout << "不正 " <<  i << endl;
        exit(EXIT_FAILURE);
    }
}

void Viss(int num) {
    cout << "No. " << num << endl;
}

IntArray a(10);

int main() {
    Viss(1);

    IntArray b(20);
    Viss(2);

    IntArray c(30);
    Viss(3);
    {
        IntArray d(40);
        Viss(4);
    }
    Viss(5);
}