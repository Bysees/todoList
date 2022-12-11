import { ChangeEventHandler, FC, FocusEventHandler, KeyboardEventHandler, useState } from 'react'
import cn from 'classnames'
import { ITask } from '@/types/Task'
import { getTaskField } from '@/store/selectors/todo'
import { useTypedSelector } from '@/store/hooks'
import styles from './activeTask.module.scss'

interface Props {
  taskId: ITask['id']
  setTitle: (title: string) => void
  setFocusOnBody: () => void
}

const Title: FC<Props> = ({ taskId, setTitle, setFocusOnBody }) => {
  const title = useTypedSelector(getTaskField(taskId, 'title'))
  const placeholder = 'Untitled'

  const [isEdit, setIsEdit] = useState<boolean>(false)
  const startEdit = () => setIsEdit(true)
  const stopEdit = () => setIsEdit(false)

  const onChangeHandler: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setTitle(e.target.value)
  }

  const setCursorOnLastLetter: FocusEventHandler<HTMLTextAreaElement> = (e) => {
    const lenght = e.target.value.length
    e.target.setSelectionRange(lenght, lenght)
  }

  const onKeyDownHandler: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      setFocusOnBody()
    }
  }

  return (
    <>
      {isEdit ? (
        <textarea
          className={styles.title + ' ' + styles.title__textarea}
          value={title}
          onChange={onChangeHandler}
          onBlur={stopEdit}
          autoFocus
          onFocus={setCursorOnLastLetter}
          maxLength={1000}
          rows={1}
          placeholder={placeholder}
          onKeyDown={onKeyDownHandler}
        />
      ) : (
        <h1
          onClick={startEdit}
          className={cn(styles.title, { [styles.title_empty]: !title })}>
          {title || placeholder}
        </h1>
      )}
    </>
  )
}

export default Title
