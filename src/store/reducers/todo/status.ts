import { ITask } from '@/types/Todo'
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

type StatusState = typeof initialState

const status = (state = initialState, action: ActionTypes): StatusState => {
  switch (action.type) {
    case 'TODO/ADD_TASK': {
      const statusEntity = state.entities[action.statusId]

      return {
        ...state,
        entities: {
          ...state.entities,
          [action.statusId]: {
            ...statusEntity,
            taskIds: [...statusEntity.taskIds, action.taskId]
          }
        }
      }
    }

    case 'TODO/REMOVE_TASK': {
      const statusEntity = state.entities[action.statusId]

      return {
        ...state,
        entities: {
          ...state.entities,
          [action.statusId]: {
            ...statusEntity,
            taskIds: statusEntity.taskIds.filter((taskId) => taskId !== action.taskId)
          }
        }
      }
    }

    case 'TODO/EDIT_TASK_POSITION': {
      const { startStatusId, endStatusId, taskId } = action
      let { endIndex } = action

      //? FIXME Такая себе логика, мб потом переписать...
      const startEntity = state.entities[startStatusId]
      const startTaskIds = startEntity.taskIds.filter(_taskId => _taskId !== taskId)

      const endEntity = state.entities[endStatusId]
      const endTaskIds = [...endEntity.taskIds]

      if(endIndex === undefined) {
        endIndex = endTaskIds.length
      }
      
      if (startStatusId === endStatusId) {
        startTaskIds.splice(endIndex, 0, taskId)

        return {
          ...state,
          entities: {
            ...state.entities,
            [startStatusId]: {
              ...startEntity,
              taskIds: startTaskIds
            }
          }
        }
      } else {
        endTaskIds.splice(endIndex, 0, taskId)

        return {
          ...state,
          entities: {
            ...state.entities,
            [startStatusId]: {
              ...startEntity,
              taskIds: startTaskIds
            },
            [endStatusId]: {
              ...endEntity,
              taskIds: endTaskIds
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

export default status
