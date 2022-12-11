import { FC } from 'react'
import cn from 'classnames'
import { ITask, TStatusIds } from '@/types/Task'
import { useTypedDispatch, useTypedSelector } from '@/store/hooks'
import { addTask, removeActiveTaskId, removeTask, setActiveTaskId } from '@/store/actions'
import TaskList from './TaskList'
import TaskItem from './TaskItem'
import TaskAdding from './TaskAdding'
import styles from './tasks.module.scss'

interface Props {
  statusColumnId: TStatusIds
}

const TasksSection: FC<Props> = ({ statusColumnId }) => {
  const dispatch = useTypedDispatch()

  const title = useTypedSelector((state) => state.todo.statusColums.entities[statusColumnId].title)

  const openTask = (taskId: ITask['id']) => {
    dispatch(setActiveTaskId(taskId))
  }

  const openNewTask = (statusColumnId: TStatusIds) => () => {
    const taskId = Date.now().toString()
    const createdAt = Date.now()

    dispatch(addTask(statusColumnId, taskId, createdAt))
    dispatch(setActiveTaskId(taskId))
  }

  const _removeTask = (taskId: ITask['id'], statusColumnId: TStatusIds, shouldRemoveActiveTask: boolean) => {
    if (shouldRemoveActiveTask) {
      dispatch(removeActiveTaskId())
    }
    dispatch(removeTask(taskId, statusColumnId))
  }

  return (
    <section className={styles.column}>
      <h2 className={cn(styles.column__title, styles[`column__title_${statusColumnId}`])}>{title}</h2>
      <TaskList statusColumnId={statusColumnId}>
        {(taskId, index) => (
          <TaskItem
            key={taskId}
            index={index}
            taskId={taskId}
            statusColumnId={statusColumnId}
            openTask={openTask}
            removeTask={_removeTask}
          />
        )}
      </TaskList>
      <TaskAdding openNewTask={openNewTask(statusColumnId)} />
    </section>
  )
}

export default TasksSection
