import { FC } from 'react'
import styles from './tasks.module.scss'

interface Props {
  openNewTask: () => void
}

const TaskAdding: FC<Props> = ({ openNewTask }) => {
  return (
    <div className={styles['task-create']}>
      <button tabIndex={0} onClick={openNewTask}>+ New task</button>
    </div>
  )
}

export default TaskAdding
