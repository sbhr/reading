#include "TaskManager.h"

// タスクの実行
void TaskManager::Execute() {
    for(SizeType i = 0; i < m_task.size(); ) {
        if(m_task[i]()) {
            ++i;
        } else {
            Unregister(i);
        }
    }
}

// タスクの登録
void TaskManager::Register(FpTask task) {
    m_task.push_back(task);
}