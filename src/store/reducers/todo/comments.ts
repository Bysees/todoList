import { IComment } from '@/types/Task'
import { ActionTypes } from '@/store'

type CommentsState = {
  [commentId: IComment['id']]: IComment
}

const comments = (state = {} as CommentsState, action: ActionTypes): CommentsState => {
  switch (action.type) {
    case 'TODO/ADD_COMMENT': {
      const newComment: IComment = {
        id: action.commentId,
        body: action.body,
        createdAt: action.createdAt,
        replyIds: []
      }

      return {
        ...state,
        [action.commentId]: newComment
      }
    }

    case 'TODO/ADD_REPLY': {
      const comment = state[action.commentId]

      const newReply: IComment = {
        id: action.replyId,
        body: action.body,
        createdAt: action.createdAt,
        replyIds: []
      }

      return {
        ...state,
        [action.replyId]: newReply,
        [action.commentId]: {
          ...comment,
          replyIds: [...comment.replyIds, action.replyId]
        }
      }
    }

    // TODO Добавить delete comment | Добавить поле status: 'deleted' | 'view'.

    default: {
      return state
    }
  }
}

export default comments
