import { ITask } from '@/types/Task'
import { ActionTypes } from '@/store'

const QUEUE = 'queue'
const DEVELOPMENT = 'development'
const DONE = 'done'

const initialState = {
  entities: {
    [QUEUE]: {
      id: QUEUE,
      title: 'queue',
      taskIds: [] as ITask['id'][]
    },
    [DEVELOPMENT]: {
      id: DEVELOPMENT,
      title: 'development',
      taskIds: [] as ITask['id'][]
    },
    [DONE]: {
      id: DONE,
      title: 'done',
      taskIds: [] as ITask['id'][]
    }
  },
  ids: [QUEUE, DEVELOPMENT, DONE]
} as const

type StatusesState = typeof initialState

const statusColums = (state = initialState, action: ActionTypes): StatusesState => {
  switch (action.type) {
    case 'TODO/ADD_TASK': {
      const statusColumn = state.entities[action.statusColumnId]

      return {
        ...state,
        entities: {
          ...state.entities,
          [action.statusColumnId]: {
            ...statusColumn,
            taskIds: [...statusColumn.taskIds, action.taskId]
          }
        }
      }
    }

    case 'TODO/REMOVE_TASK': {
      const statusColumn = state.entities[action.statusColumnId]

      return {
        ...state,
        entities: {
          ...state.entities,
          [action.statusColumnId]: {
            ...statusColumn,
            taskIds: statusColumn.taskIds.filter((taskId) => taskId !== action.taskId)
          }
        }
      }
    }

    case 'TODO/EDIT_TASK_POSITION': {
      const { startColumnId, endColumnId, taskId } = action
      let { endIndex } = action

      //? FIXME Такая себе логика, мб потом переписать...
      const startColumn = state.entities[startColumnId]
      const startColumnTaskIds = startColumn.taskIds.filter(_taskId => _taskId !== taskId)

      const endColumn = state.entities[endColumnId]
      const endColumnTaskIds = [...endColumn.taskIds]

      if(endIndex === undefined) {
        endIndex = endColumnTaskIds.length
      }
      
      if (startColumnId === endColumnId) {
        startColumnTaskIds.splice(endIndex, 0, taskId)

        return {
          ...state,
          entities: {
            ...state.entities,
            [startColumnId]: {
              ...startColumn,
              taskIds: startColumnTaskIds
            }
          }
        }
      } else {
        endColumnTaskIds.splice(endIndex, 0, taskId)

        return {
          ...state,
          entities: {
            ...state.entities,
            [startColumnId]: {
              ...startColumn,
              taskIds: startColumnTaskIds
            },
            [endColumnId]: {
              ...endColumn,
              taskIds: endColumnTaskIds
            }
          }
        }
      }
    }

    default: {
      return state
    }
  }
}

export default statusColums
