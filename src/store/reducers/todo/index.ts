import { combineReducers } from 'redux'
import tasks from './tasks'
import subTasks from './subTasks'
import status from './status'
import filter from './filter'
import comments from './comments'

const todoReducer = combineReducers({
    tasks,
    subTasks,
    status,
    comments,
    filter
})

export default todoReducer
