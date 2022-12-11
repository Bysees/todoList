import { ChangeEventHandler, FC, memo } from 'react'
import { HandySvg } from 'handy-svg'
import { ISubTask, ITask } from '@/types/Todo'
import { getTaskField } from '@/store/selectors/todo'
import { useTypedSelector } from '@/store/hooks'
import styles from './activeTask.module.scss'
import removeIcon from '@/assets/icons/remove.svg'
import plusIcon from '@/assets/icons/plus.svg'

interface Props {
  addNewSubTask: () => void
  editSubTask: (subTaskId: ISubTask['id'], subTask: Partial<ISubTask>) => void
  removeSubTask: (subTaskId: ISubTask['id']) => void
  taskId: ITask['id']
}

const SubTasks: FC<Props> = ({ taskId, addNewSubTask, editSubTask, removeSubTask }) => {
  const subTaskIds = useTypedSelector(getTaskField(taskId, 'subTaskIds'))

  return (
    <div className={styles.subTasks}>
      {subTaskIds.map((subTaskId) => (
        <SubTask
          key={subTaskId}
          subTaskId={subTaskId}
          removeSubTask={removeSubTask}
          editSubTask={editSubTask}
        />
      ))}
      <button
        onClick={addNewSubTask}
        className={styles.addTask}>
        <HandySvg src={plusIcon} />
        <span>task</span>
      </button>
    </div>
  )
}

interface SubTaskProps {
  removeSubTask: (subTaskId: ISubTask['id']) => void
  editSubTask: (subTaskId: ISubTask['id'], subTask: Partial<ISubTask>) => void
  subTaskId: ISubTask['id']
}

const SubTask: FC<SubTaskProps> = memo(({ removeSubTask, editSubTask, subTaskId }) => {
  const { body, isDone } = useTypedSelector((state) => state.todo.subTasks[subTaskId])

  const onChangeCheckbox: ChangeEventHandler<HTMLInputElement> = (e) => {
    editSubTask(subTaskId, { isDone: e.target.checked })
  }

  const onChangeBodyText: ChangeEventHandler<HTMLInputElement> = (e) => {
    editSubTask(subTaskId, { body: e.target.value })
  }

  const _removeSubTask = () => removeSubTask(subTaskId)

  return (
    <div className={styles.field}>
      <input
        className={styles.field__checkbox}
        type='checkbox'
        checked={isDone}
        onChange={onChangeCheckbox}
      />
      <input
        className={styles.field__input}
        onChange={onChangeBodyText}
        value={body}
        placeholder={'your text...'}
      />
      <button
        className={styles.field__remove}
        onClick={_removeSubTask}>
        <HandySvg src={removeIcon} />
      </button>
    </div>
  )
})

export default SubTasks
