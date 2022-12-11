import { Draggable } from 'react-beautiful-dnd'
import { FC, memo, KeyboardEventHandler } from 'react'
import cn from 'classnames'
import { ITask, TStatusIds } from '@/types/Task'
import { getTaskField } from '@/store/selectors/todo'
import { useTypedSelector } from '@/store/hooks'
import styles from './tasks.module.scss'

interface Props {
  openTask: (taskId: ITask['id']) => void
  removeTask: (taskId: ITask['id'], statusColumnId: TStatusIds, shouldRemoveActiveTask: boolean) => void
  taskId: ITask['id']
  index: number
  statusColumnId: TStatusIds
}

const TaskItem: FC<Props> = memo(({ removeTask, openTask, taskId, index, statusColumnId }) => {
  const title = useTypedSelector(getTaskField(taskId, 'title'))
  const number = useTypedSelector(getTaskField(taskId, 'number'))
  const isActiveTask = useTypedSelector((state) => state.todo.tasks.activeTaskId === taskId)

  const _openTask = () => {
    openTask(taskId)
  }

  const handleKeyDown: KeyboardEventHandler<HTMLLIElement> = (e) => {
    if(e.key === 'Enter') {
      _openTask()
    }
  }

  return (
    <Draggable
      draggableId={taskId}
      index={index}>
      {(provided) => (
        <li
          className={cn(styles.task, { [styles.task_active]: isActiveTask })}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          onClick={_openTask}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          >
          {number}. {title || 'Untitled'}
        </li>
      )}
    </Draggable>
  )
})

export default TaskItem
