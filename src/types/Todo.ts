export interface ITask {
  id: string
  title: string
  body: string
  createdAt: number
  completedAt: number | null
  priory: TPrioty
  statusId: TStatusIds
  subTaskIds: ISubTask['id'][]
  commentIds: IComment['id'][]
}

export type TStatusIds = 'queue' | 'development' | 'done'
export type TPrioty = 'important' | 'ordinary'

export interface ISubTask {
  id: string
  isDone: boolean
  body: string
}

export interface IComment {
  id: string
  body: string
  createdAt: number
  replyIds: IComment['id'][]
}