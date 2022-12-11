import { Droppable } from 'react-beautiful-dnd'
import { FC, ReactNode } from 'react'
import cn from 'classnames'
import { ITask, TStatusIds } from '@/types/Todo'
import { useTypedSelector } from '@/store/hooks'
import { store } from '@/store'
import styles from './tasks.module.scss'

interface Props {
  statusId: TStatusIds
  children: (taskId: ITask['id'], index: number) => ReactNode
}

const TaskList: FC<Props> = ({ children, statusId }) => {
  const taskIds = useTypedSelector((state) => state.todo.status.entities[statusId].taskIds)
  const filterText = useTypedSelector((state) => state.todo.filter.text)
  const tasks = store.getState().todo.tasks.entities // Суть: Работать с актуальным значением без лишних ререндеров.

  const filtredTaskIds = taskIds.reduce((result, taskId) => {
    const task = tasks[taskId]
    const title = task.title.toLocaleLowerCase()
    const filter = filterText.toLocaleLowerCase()
    
    if(title.includes(filter)) {
      return [...result, taskId]
    }
    
    return result
  }, [] as ITask['id'][])
  

  return (
    <Droppable droppableId={statusId} >
      {(provided, snapshot) => (
        <ul
          className={cn(styles.taskList, {[styles.taskList_isDragOver]: snapshot.isDraggingOver})}
          ref={provided.innerRef}
          {...provided.droppableProps}>
          {filtredTaskIds.map((taskId, index) => children(taskId, index))}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  )
}

export default TaskList
