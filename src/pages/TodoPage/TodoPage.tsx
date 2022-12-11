import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { TStatusIds } from '@/types/Todo'
import { useTypedDispatch, useTypedSelector } from '@/store/hooks'
import { editTaskPosition } from '@/store/actions/todo'
import { Storage } from '@/services/Storage'
import TasksSection from '@/components/TaskList/TasksSection'
import FilterSection from '@/components/Filter/FilterSection'
import { ActiveTask } from '@/components/ActiveTask'
import styles from './todoPage.module.scss'

const TodoPage = () => {
  const dispatch = useTypedDispatch()
  const statusIds = useTypedSelector((state) => state.todo.status.ids)

  const dragEndHandler = ({ draggableId, source, destination }: DropResult) => {
    if (!destination) {
      return
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return
    }

    dispatch(
      editTaskPosition({
        startStatusId: source.droppableId as TStatusIds,
        endStatusId: destination.droppableId as TStatusIds,
        endIndex: destination.index,
        taskId: draggableId
      })
    )
  }

  return (
    <div className={styles.wrapper}>
      <ClearState />
      <FilterSection />
      <div className={styles.todoWrapper}>
      <DragDropContext  onDragEnd={dragEndHandler}>
        {statusIds.map((statusId) => (
          <TasksSection
            key={statusId}
            statusId={statusId}
          />
        ))}
      </DragDropContext>
      <ActiveTask />
      </div>
    </div>
  )
}

export default TodoPage

const ClearState = () => {
  return (
    <button
      className={styles.clearState}
      onClick={() => {
        Storage.clearState()
        // eslint-disable-next-line no-restricted-globals
        location.reload()
      }}>
      Clear State
    </button>
  )
}
