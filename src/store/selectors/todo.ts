import { ITask } from '@/types/Task'
import { RootState } from '@/store'

export const getActiveTask = (state: RootState) => state.todo.tasks.activeTaskId

export function getTaskField<K extends keyof ITask>(taskId: ITask['id'], field: K) {
  return (state: RootState) => state.todo.tasks.entities[taskId][field] 
}

// TODO: Скорее всего надо сделать селекторы для всего приложения
// TODO: Разбить на файлы по группам

