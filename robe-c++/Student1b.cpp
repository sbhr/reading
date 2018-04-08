#include <iostream>
using namespace std;

const int MAX_NAME = 16;

struct Student {
    char name[MAX_NAME + 1];
    int scoreJapanese;
    int scoreMath;
    int scoreEnglish;
};

void Show(const Student* pointer) {
    cout << "名前: " << pointer->name << endl
         << " 国語: " << pointer->scoreJapanese << "点"
         ", 数学: " << pointer->scoreMath << "点"
         ", 英語: " << pointer->scoreEnglish << "点" << endl;
}

int main() {
    Student student[] = {
        { "John", 11, 22, 33, },
        { "Bob", 44, 55, 66, }
    };
    int size = sizeof student  / sizeof *student;

    for(int i = 0; i < size; ++i) {
        Show(&student[i]);
    }
}