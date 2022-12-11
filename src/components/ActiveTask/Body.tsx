import { ChangeEventHandler, forwardRef, useEffect, useRef, useImperativeHandle } from 'react'
import { ITask } from '@/types/Todo'
import { getTaskField } from '@/store/selectors/todo'
import { useTypedSelector } from '@/store/hooks'
import styles from './activeTask.module.scss'

interface Props {
  taskId: ITask['id']
  setBody: (body: string) => void
}

type BodyRef = HTMLTextAreaElement

const Body = forwardRef<BodyRef, Props>(({ taskId, setBody }, ref) => {
  const body = useTypedSelector(getTaskField(taskId, 'body'))
  const placeholder = 'You can describe your task...'

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setBody(e.target.value)
    adjustHeightOnFill()
  }

  const textareaRef = useRef<HTMLTextAreaElement>(null)

  //@ts-ignore
  useImperativeHandle(ref, () => ({
    focus: () => {
      if(!textareaRef.current) {
        return
      }      
      textareaRef.current.focus()
      const length = textareaRef.current.value.length
      textareaRef.current.setSelectionRange(length, length)
    }
  }))

  const adjustHeightOnFill = () => {
    const textareaElem = textareaRef.current
    if (!textareaElem) {
      return
    }
    textareaElem.style.height = 'auto'
    textareaElem.style.height = `${textareaElem.scrollHeight + 1}px`
  }


  useEffect(() => {
    adjustHeightOnFill()
  }, [])

  return (
    <div className={styles.body}>
      <textarea
        className={styles.textarea}
        ref={textareaRef}
        value={body}
        onChange={handleChange}
        placeholder={placeholder}
      />
    </div>
  )
})

export default Body
