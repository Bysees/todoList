import Timer from 'react-timestamp'
import { FC, memo, ReactNode } from 'react'
import cn from 'classnames'
import { IComment } from '@/types/Task'
import CommentForm from './CommentForm'
import styles from './comments.module.scss'

interface Props {
  commentId: IComment['id']
  body: string
  createdAt: number
  addNewReply: (commentId: IComment['id'], body: string) => void
  replyId: IComment['id'] | null
  setReplyId: (replyId: IComment['id'] | null) => void
  children: ReactNode
}

const Comment: FC<Props> = memo(({ commentId, replyId, body, createdAt, children, addNewReply, setReplyId }) => {
  const isReply = commentId === replyId

  const addReply = (bodyText: string) => {
    addNewReply(commentId, bodyText)
    setReplyId(null)
  }
  const openReplyForm = () => setReplyId(commentId)
  const closeReply = () => setReplyId(null)
  const createdAtDate = new Date(createdAt)

  return (
    <li
      className={styles.list__item}>
      <div className={cn(styles.comment, { [styles.comment_active]: isReply })}>
        <p>{body}</p>
        <div>
          <Timer
            date={createdAtDate}
            options={{ twentyFourHour: true }}
          />
          {!isReply && <button onClick={openReplyForm}>reply</button>}
        </div>
      </div>
      {children}
      {isReply && (
        <CommentForm
          autoFocus
          onSubmit={addReply}
          onHide={closeReply}
        />
      )}
    </li>
  )
})

export default Comment
