import { ChangeEventHandler, FC, useState } from 'react'
import { ITask, TPrioty, TStatusIds } from '@/types/Task'
import { getTaskField } from '@/store/selectors/todo'
import { useTypedSelector } from '@/store/hooks'
import styles from './activeTask.module.scss'

interface Props {
  taskId: ITask['id']
  setStatus: (prevStatusColumnId: TStatusIds, statusColumnId: TStatusIds) => void
  setPriory: (priory: TPrioty) => void
}

const Status: FC<Props> = ({ taskId, setStatus, setPriory }) => {
  const priory = useTypedSelector(getTaskField(taskId, 'priory'))
  const statusColumnId = useTypedSelector(getTaskField(taskId, 'statusColumnId'))

  const statuses = useTypedSelector(
    (state) => {
      return Object.values(state.todo.statusColums.entities).map((statusColumn) => ({
        title: statusColumn.title,
        id: statusColumn.id
      }))
    },
    () => true
  )

  const [currentPriory, setCurrentPriory] = useState<TPrioty>(priory)

  // const statuses : TStatusIds[] = ['queue', 'development', 'done']
  const priories: TPrioty[] = ['ordinary', 'important']

  const onChangeStatusHandler: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const newStatus = e.target.value as TStatusIds
    setStatus(statusColumnId, newStatus)
  }

  const onChangePrioryHandler: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const newPriory = e.target.value as TPrioty
    setCurrentPriory(newPriory)
    setPriory(newPriory)
  }

  return (
    <div className={styles.state}>
      <div className={styles.state__status}>
        <select
          value={statusColumnId}
          onChange={onChangeStatusHandler}>
          {statuses.map((status) => {
            return (
              <option
                key={status.id}
                value={status.id}>
                {status.title}
              </option>
            )
          })}
        </select>
      </div>

      <div className={styles.state__priory}>
        <select
          value={currentPriory}
          onChange={onChangePrioryHandler}>
          {priories.map((priory) => {
            return (
              <option
                key={priory}
                value={priory}>
                {priory}
              </option>
            )
          })}
        </select>
      </div>
    </div>
  )
}

export default Status
