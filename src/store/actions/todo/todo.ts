import { IComment, ISubTask, ITask } from '@/types/Task'

export const setActiveTaskId = (activeTaskId: ITask['id']) => {
  return {
    type: 'TODO/SET_ACTIVE_TASK_ID',
    activeTaskId
  } as const
}

export const removeActiveTaskId = () => {
  return {
    type: 'TODO/REMOVE_ACTIVE_TASK_ID',
  } as const
}

export const editTask = (taskId: ITask['id'], task: Partial<Pick<ITask, 'body' | 'title' | 'priory' |'files' >>) => {
  return {
    type: 'TODO/EDIT_TASK',
    taskId,
    task
  } as const
}

export const editSubTask = (subTaskId: ISubTask['id'], taskId: ITask['id'], subTask: Partial<ISubTask>) => {
  return {
    type: 'TODO/EDIT_SUBTASK',
    taskId,
    subTaskId,
    subTask
  } as const
}

type AddReplyType = {
  replyId: IComment['id']
  commentId: IComment['id']
  taskId: ITask['id']
  createdAt: number
  body: string
}

export const addReply = ({ replyId, commentId, taskId, createdAt, body }: AddReplyType) => {
  return {
    type: 'TODO/ADD_REPLY',
    replyId,
    commentId,
    taskId,
    createdAt,
    body
  } as const
}

export const setFilterText = (text: string) => {
  return {
    type: 'TODO/SET_FILTER_TEXT',
    text
  } as const
}
