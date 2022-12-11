import { FC } from 'react'
import { IComment } from '@/types/Todo'
import { getComments } from '@/store/selectors/comments'
import { useTypedSelector } from '@/store/hooks'
import Comment from './Comment'
import styles from './comments.module.scss'

interface Props {
  commentIds: IComment['id'][]
  addNewReply: (commentId: IComment['id'], body: string) => void
  replyId: IComment['id'] | null
  setReplyId: (replyId: IComment['id'] | null) => void
}

const Comments: FC<Props> = ({ commentIds, addNewReply, replyId, setReplyId }) => {
  const comments = useTypedSelector(getComments)

  return (
    <ul className={styles.list}>
      {commentIds.map((commentId) => {
        const comment = comments[commentId]
        return (
          <Comment
            key={commentId}
            addNewReply={addNewReply}
            body={comment.body}
            commentId={commentId}
            createdAt={comment.createdAt}
            replyId={replyId}
            setReplyId={setReplyId}>
            {comment.replyIds.length > 0 && (
              <Comments
                replyId={replyId}
                setReplyId={setReplyId}
                addNewReply={addNewReply}
                commentIds={comment.replyIds}
              />
            )}
          </Comment>
        )
      })}
    </ul>
  )
}

export default Comments
