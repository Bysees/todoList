import { FC, useState } from 'react'
import { IComment } from '@/types/Todo'
import { getTaskField } from '@/store/selectors/todo'
import { useTypedSelector } from '@/store/hooks'
import Comments from './Comments'
import CommentForm from './CommentForm'
import styles from './comments.module.scss'

interface Props {
  taskId: string
  addNewComment: (body: string) => void
  addNewReply: (commentId: IComment['id'], body: string) => void
}

const CommentsSection: FC<Props> = ({ taskId, addNewComment, addNewReply }) => {
  const commentIds = useTypedSelector(getTaskField(taskId, 'commentIds'))
  const [openReplyId, setOpenReplyId] = useState<IComment['id'] | null>(null)

  return (
    <section className={styles.comments}>
      <h2>Comments</h2>
      <Comments
        addNewReply={addNewReply}
        commentIds={commentIds}
        setReplyId={setOpenReplyId}
        replyId={openReplyId}
      />

      {!openReplyId && <CommentForm onSubmit={addNewComment} />}
    </section>
  )
}

export default CommentsSection
