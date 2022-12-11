import { combineReducers } from 'redux'
import tasks from './tasks'
import subTasks from './subTasks'
import statusColums from './statusColums'
import filter from './filter'
import comments from './comments'

const todoReducer = combineReducers({
    tasks,
    subTasks,
    statusColums,
    comments,
    filter
})

export default todoReducer
