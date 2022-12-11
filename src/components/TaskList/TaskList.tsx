import { Droppable } from 'react-beautiful-dnd'
import { FC, ReactNode } from 'react'
import cn from 'classnames'
import { ITask, TStatusIds } from '@/types/Task'
import { useTypedSelector } from '@/store/hooks'
import { store } from '@/store'
import styles from './tasks.module.scss'

interface Props {
  statusColumnId: TStatusIds
  children: (taskId: ITask['id'], index: number) => ReactNode
}

const TaskList: FC<Props> = ({ children, statusColumnId }) => {
  const taskIds = useTypedSelector((state) => state.todo.statusColums.entities[statusColumnId].taskIds)
  const filterText = useTypedSelector((state) => state.todo.filter.text)
  const tasks = store.getState().todo.tasks.entities // Суть: Работать с актуальным значением без лишних ререндеров.

  const filtredTaskIds = taskIds.reduce((result, taskId) => {
    const task = tasks[taskId]
    const taskNumber = String(task.number)
    const title = task.title.toLocaleLowerCase()
    const filter = filterText.toLocaleLowerCase()
    
    if(taskNumber === filter || title.includes(filter)) {
      return [...result, taskId]
    }
    
    return result
  }, [] as ITask['id'][])
  

  return (
    <Droppable droppableId={statusColumnId} >
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
