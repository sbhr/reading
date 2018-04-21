#include "TaskManager.h"
#include <iostream>
using namespace std;

class CountDown {
public:
    // カウントダウンしていき、０になったら登録解除
    static bool Task() {
        cout << m_count << endl;
        if(m_count == 0) {
            return false;
        }
        --m_count;
        return true;
    }

    // 初期値を指定して登録
    static void Register(TaskManager& manager, int count) {
        m_count = count;
        manager.Register(Task);
    }

private:
    static int m_count;
};

bool Hello() {
    cout << "Hello" << endl;
    return true;
}

int main() {
    TaskManager manager;

    CountDown::Register(manager, 3);
    manager.Register(Hello);

    for(int i = 0; i < 5; ++i) {
        manager.Execute();
    }
}