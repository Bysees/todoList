import { ITask } from '@/types/Task'
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
      const hasTasks = Boolean(Object.keys(state.entities).length)
      const nextNumber = hasTasks
        ? Object.values(state.entities).reduce((maxNumber, todo) => Math.max(todo.number, maxNumber), -1) + 1
        : 1

      const newTask: ITask = {
        id: action.taskId,
        createdAt: action.createdAt,
        completedAt: null,
        number: nextNumber,
        priory: 'ordinary',
        title: '',
        body: '',
        files: [],
        statusColumnId: action.statusColumnId,
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

      if(action.task.files)  {
        action.task.files = [...task.files ,...action.task.files]
      }

      // TODO: В будущем попробывать измерить нагрузку редактирования тасок с закоментированным вариантом
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

      // HINT Может быть так меньше назгруки?
      // const cloneState = {...state}
      // cloneState.entities[action.taskId] = {
      //   ...cloneState.entities[action.taskId],
      //   ...action.task
      // }

      // return cloneState
    }

    case 'TODO/EDIT_TASK_POSITION': {
      const { taskId, startColumnId, endColumnId } = action

      if (startColumnId === endColumnId) {
        return state
      }

      const task = { ...state.entities[taskId] }

      //TODO переименовать статусы нормально
      task.statusColumnId = endColumnId

      if (endColumnId === 'done') {
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
