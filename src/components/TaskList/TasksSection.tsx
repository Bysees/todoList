import { FC } from 'react'
import cn from 'classnames'
import { ITask, TStatusIds } from '@/types/Todo'
import { useTypedDispatch, useTypedSelector } from '@/store/hooks'
import { addTask, removeActiveTaskId, removeTask, setActiveTaskId } from '@/store/actions'
import TaskList from './TaskList'
import TaskItem from './TaskItem'
import TaskAdding from './TaskAdding'
import styles from './tasks.module.scss'

interface Props {
  statusId: TStatusIds
}

const TasksSection: FC<Props> = ({ statusId }) => {
  const dispatch = useTypedDispatch()

  const title = useTypedSelector((state) => state.todo.status.entities[statusId].title)

  const openTask = (taskId: ITask['id']) => {
    dispatch(setActiveTaskId(taskId))
  }

  const openNewTask = (statusId: TStatusIds) => () => {
    const taskId = Date.now().toString()
    const createdAt = Date.now()

    dispatch(addTask(statusId, taskId, createdAt))
    dispatch(setActiveTaskId(taskId))
  }

  const _removeTask = (taskId: ITask['id'], statusId: TStatusIds, shouldRemoveActiveTask: boolean) => {
    if (shouldRemoveActiveTask) {
      dispatch(removeActiveTaskId())
    }
    dispatch(removeTask(taskId, statusId))
  }

  return (
    <section className={styles.column}>
      <h2 className={cn(styles.column__title, styles[`column__title_${statusId}`])}>{title}</h2>
      <TaskList statusId={statusId}>
        {(taskId, index) => (
          <TaskItem
            key={taskId}
            index={index}
            taskId={taskId}
            statusId={statusId}
            openTask={openTask}
            removeTask={_removeTask}
          />
        )}
      </TaskList>
      <TaskAdding openNewTask={openNewTask(statusId)} />
    </section>
  )
}

export default TasksSection
