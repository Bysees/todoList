import { ISubTask } from '@/types/Task'
import { ActionTypes } from '@/store/index'

type SubTasksState = {
  [subTaskId: ISubTask['id']]: ISubTask
}

const subTasks = (state = {} as SubTasksState, action: ActionTypes): SubTasksState => {
  switch (action.type) {
    case 'TODO/ADD_SUBTASK': {
      const newSubTask: ISubTask = {
        id: action.subTaskId,
        body: '',
        isDone: false
      }

      return {
        ...state,
        [action.subTaskId]: newSubTask
      }
    }

    case 'TODO/EDIT_SUBTASK': {
      const subTask = state[action.subTaskId]

      return {
        ...state,
        [action.subTaskId]: {
          ...subTask,
          ...action.subTask
        }
      }
    }

    case 'TODO/REMOVE_SUBTASK': {
      const cloneState = { ...state }
      delete cloneState[action.subTaskId]

      return cloneState
    }

    default: {
      return state
    }
  }
}

export default subTasks
