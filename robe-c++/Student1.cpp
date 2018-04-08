#include <iostream>
using namespace std;

const int MAX_NAME = 16;

struct Student {
    char name[MAX_NAME + 1];
    int scoreJapanese;
    int scoreMath;
    int scoreEnglish;
};

void Show(const Student& student) {
    cout << "名前: " << student.name << endl
         << " 国語: " << student.scoreJapanese << "点"
         ", 数学: " << student.scoreMath << "点"
         ", 英語: " << student.scoreEnglish << "点" << endl;
}

int main() {
    Student student[] = {
        { "John", 11, 22, 33, },
        { "Bob", 44, 55, 66, }
    };
    int size = sizeof student  / sizeof *student;

    for(int i = 0; i < size; ++i) {
        Show(student[i]);
    }
}