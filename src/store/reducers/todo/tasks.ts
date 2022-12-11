import { ITask } from '@/types/Todo'
import { ActionTypes } from '@/store'

type TasksState = {
  activeTaskId: ITask['id'] | null
  entities: {
    [taskId: ITask['id']]: ITask
  }
  ids: ITask['id'][]
}

const initialState: TasksState = {
  activeTaskId: null,
  entities: {},
  ids: []
}

const tasks = (state = initialState, action: ActionTypes): TasksState => {
  switch (action.type) {
    case 'TODO/ADD_TASK': {

      const newTask: ITask = {
        id: action.taskId,
        createdAt: action.createdAt,
        completedAt: null,
        priory: 'ordinary',
        title: '',
        body: '',
        statusId: action.statusId,
        subTaskIds: [],
        commentIds: []
      }

      return {
        ...state,
        entities: {
          ...state.entities,
          [action.taskId]: newTask
        },
        ids: [...state.ids, action.taskId]
      }
    }

    case 'TODO/EDIT_TASK': {
      const task = state.entities[action.taskId]

      return {
        ...state,
        entities: {
          ...state.entities,
          [action.taskId]: {
            ...task,
            ...action.task
          }
        }
      }
    }

    case 'TODO/EDIT_TASK_POSITION': {
      const { taskId, startStatusId, endStatusId } = action

      if (startStatusId === endStatusId) {
        return state
      }

      const task = { ...state.entities[taskId] }

      //TODO переименовать статусы нормально
      task.statusId = endStatusId

      if (endStatusId === 'done') {
        task.completedAt = Date.now()
      } else {
        task.completedAt = null
      }

      return {
        ...state,
        entities: {
          ...state.entities,
          [taskId]: {
            ...task
          }
        }
      }
    }

    case 'TODO/REMOVE_TASK': {
      const copiedEntities = { ...state.entities }
      delete copiedEntities[action.taskId]

      return {
        ...state,
        entities: {
          ...copiedEntities
        },
        ids: state.ids.filter((taskId) => taskId !== action.taskId)
      }
    }

    case 'TODO/ADD_SUBTASK': {
      const task = state.entities[action.taskId]

      return {
        ...state,
        entities: {
          ...state.entities,
          [action.taskId]: {
            ...task,
            subTaskIds: [...task.subTaskIds, action.subTaskId]
          }
        }
      }
    }

    case 'TODO/REMOVE_SUBTASK': {
      const task = state.entities[action.taskId]

      return {
        ...state,
        entities: {
          ...state.entities,
          [action.taskId]: {
            ...task,
            subTaskIds: task.subTaskIds.filter((subTaskId) => subTaskId !== action.subTaskId)
          }
        }
      }
    }

    case 'TODO/SET_ACTIVE_TASK_ID': {
      return {
        ...state,
        activeTaskId: action.activeTaskId
      }
    }

    case 'TODO/REMOVE_ACTIVE_TASK_ID': {
      return {
        ...state,
        activeTaskId: null
      }
    }

    case 'TODO/ADD_COMMENT': {
      const task = state.entities[action.taskId]

      return {
        ...state,
        entities: {
          ...state.entities,
          [action.taskId]: {
            ...task,
            commentIds: [...task.commentIds, action.commentId]
          }
        }
      }
    }

    default: {
      return state
    }
  }
}

export default tasks
