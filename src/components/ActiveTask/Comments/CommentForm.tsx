import { ChangeEventHandler, FC, FormEventHandler, useState } from 'react'
import styles from './comments.module.scss'

interface Props {
  autoFocus?: boolean
  onSubmit: (text: string) => void
  onHide?: () => void
}

const CommentForm: FC<Props> = ({ autoFocus = false, onSubmit, onHide }) => {
  const [text, setText] = useState<string>('')

  const onChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    setText(e.target.value)
  }

  const onSubmitHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    if(!text) {
      return
    }
    onSubmit(text)
    setText('')
  }

  return (
    <form
      onSubmit={onSubmitHandler}
      className={styles.commentForm}>
      <input
        className={styles.input}
        autoFocus={autoFocus}
        onChange={onChangeHandler}
        value={text}
        placeholder={'Type your comment here...'}
      />
      <div className={styles.buttons}>
        {onHide && (
          <button
            className={styles.buttons__cancel}
            type='button'
            onClick={onHide}
            >
            cancel
          </button>
        )}
        <button className={styles.buttons__send}>send</button>
      </div>
    </form>
  )
}

export default CommentForm
