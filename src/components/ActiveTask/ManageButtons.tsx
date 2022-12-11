import { FC } from 'react'
import { ITask, TStatusIds } from '@/types/Todo'
import { store } from '@/store'
import styles from './activeTask.module.scss'

interface Props {
  removeTask: (statusId: TStatusIds) => void
  hideTask: () => void
  taskId: ITask['id']
}

const ManageButtons: FC<Props> = ({ removeTask, hideTask, taskId }) => {
  const statusId = store.getState().todo.tasks.entities[taskId].statusId

  const _removeTask = () => removeTask(statusId)
  
  return (
    <div className={styles.manageButtons}>
      <button
        className={styles.manageButtons__hide}
        onClick={hideTask}>
        Esc
      </button>
      <button
        className={styles.manageButtons__remove}
        onClick={_removeTask}>
        Delete
      </button>
    </div>
  )
}

export default ManageButtons
