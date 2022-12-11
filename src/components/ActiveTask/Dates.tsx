import Timer from 'react-timestamp'
import { FC } from 'react'
import { ITask } from '@/types/Todo'
import { getTaskField } from '@/store/selectors/todo'
import { useTypedSelector } from '@/store/hooks'
import styles from './activeTask.module.scss'

interface Props {
  taskId: ITask['id']
}

const Dates: FC<Props> = ({taskId }) => {
  const createdAt = useTypedSelector(getTaskField(taskId, 'createdAt'))
  const completedAt = useTypedSelector(getTaskField(taskId, 'completedAt'))

  const createdAtDate = new Date(createdAt)
  const currentDate = new Date()
  let completedAtDate = null
  let relativeToDate = currentDate

  if (completedAt) {
    completedAtDate = new Date(completedAt)
    relativeToDate = completedAtDate 
  }

  return (
    <section className={styles.dates}>
      <span>Date Created</span>
      <Timer
        date={createdAtDate}
        options={{ includeDay: true, twentyFourHour: true }}
      />

      <span>Time Spent</span>
      <Timer
        date={createdAtDate}
        relativeTo={relativeToDate}
      />

      <span>Done At</span>
      {completedAtDate ? (
          <Timer
            date={completedAtDate}
            options={{ includeDay: true, twentyFourHour: true }}
          />
      ): (
        'Not completed'
      )}
    </section>
  )
}

export default Dates
