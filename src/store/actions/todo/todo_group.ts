import { IComment, ISubTask, ITask, TStatusIds } from "@/types/Task"

//? Здесь находятся экшены, которые обновляют сразу несколько одноимённых кейсов в разных редьюсерах для синхронизации данных

export const addTask = (statusColumnId: TStatusIds, taskId: ITask['id'], createdAt: number) => {
  return {
    type: 'TODO/ADD_TASK',
    statusColumnId,
    taskId,
    createdAt
  } as const
}

export const removeTask = (taskId: ITask['id'], statusColumnId: TStatusIds) => {
  return {
    type: 'TODO/REMOVE_TASK',
    taskId,
    statusColumnId
  } as const
}

export const addSubTask = (taskId: ITask['id'], subTaskId: ISubTask['id']) => {
  return {
    type: 'TODO/ADD_SUBTASK',
    taskId,
    subTaskId,
  } as const
}

export const removeSubTask = (subTaskId: ISubTask['id'], taskId: ITask['id']) => {
  return {
    type: 'TODO/REMOVE_SUBTASK',
    taskId,
    subTaskId,
  } as const
}

type EditTaskPositionParams = {
  taskId: ITask['id']
  startColumnId: TStatusIds
  endColumnId: TStatusIds
  endIndex?: number
}

export const editTaskPosition = (params: EditTaskPositionParams) => {
  return {
    type: 'TODO/EDIT_TASK_POSITION',
    ...params
  } as const
}

type AddCommentType = {
  commentId: IComment['id']
  taskId: ITask['id']
  createdAt: number
  body: string
}

export const addComment = ({ commentId, taskId, createdAt, body }: AddCommentType) => {
  return {
    type: 'TODO/ADD_COMMENT',
    commentId,
    taskId,
    body, 
    createdAt
  } as const
}
