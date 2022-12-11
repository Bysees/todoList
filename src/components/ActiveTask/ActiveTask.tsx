import { FC, useEffect, useRef } from 'react'
import { IComment, TPrioty, TStatusIds, ISubTask } from '@/types/Task'
import { useTypedDispatch, useTypedSelector } from '@/store/hooks'
import { addSubTask, editSubTask, editTask, editTaskPosition, removeActiveTaskId, removeSubTask } from '@/store/actions'
import { addComment, addReply } from '@/store/actions'
import { Title, Body, CommentsSection, Dates, Files, State, SubTasks } from './'
import styles from './activeTask.module.scss'

const ActiveTask: FC = () => {
  const dispatch = useTypedDispatch()
  const taskId = useTypedSelector((state) => state.todo.tasks.activeTaskId)
  const bodyRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        hideTask()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  })

  if (!taskId) {
    return null
  }

  const setStatus = (prevStatusColumnId: TStatusIds, nextStatusColumnId: TStatusIds) => {
    dispatch(
      editTaskPosition({
        taskId,
        startColumnId: prevStatusColumnId,
        endColumnId: nextStatusColumnId
      })
    )
  }

  const setPriory = (priory: TPrioty) => {
    dispatch(editTask(taskId, { priory }))
  }

  const setTitle = (title: string) => {
    dispatch(editTask(taskId, { title }))
  }

  const setBody = (body: string) => {
    dispatch(editTask(taskId, { body }))
  }

  const setFiles = (file: string) => {
    dispatch(editTask(taskId, { files: [file] }))
  }

  const addNewSubTask = () => {
    const subTaskId = Date.now().toString()
    dispatch(addSubTask(taskId, subTaskId))
  }

  const _editSubTask = (subTaskId: ISubTask['id'], subTask: Partial<ISubTask>) => {
    dispatch(editSubTask(subTaskId, taskId, subTask))
  }

  const _removeSubTask = (subTaskId: ISubTask['id']) => {
    dispatch(removeSubTask(subTaskId, taskId))
  }

  const addNewComment = (body: string) => {
    const commentId = Date.now().toString()
    const createdAt = Date.now()
    dispatch(addComment({ commentId, taskId, body, createdAt }))
  }

  const addNewReply = (commentId: IComment['id'], body: string) => {
    const replyId = Date.now().toString()
    const createdAt = Date.now()
    dispatch(addReply({ replyId, commentId, taskId, createdAt, body }))
  }

  function hideTask() {
    dispatch(removeActiveTaskId())
  }

  const setFocusOnBody = () => {
    if (bodyRef.current) {
      bodyRef.current.focus()
    }
  }

  return (
    <div className={styles.modal}>
      <section
        className={styles.wrapper}
        key={taskId}>
        <button
          className={styles.hideButton}
          onClick={hideTask}>
          Esc
        </button>
        <Title
          taskId={taskId}
          setTitle={setTitle}
          setFocusOnBody={setFocusOnBody}
        />
        <Dates taskId={taskId} />
        <State
          taskId={taskId}
          setStatus={setStatus}
          setPriory={setPriory}
        />
        <Body
          ref={bodyRef}
          taskId={taskId}
          setBody={setBody}
        />
        <SubTasks
          addNewSubTask={addNewSubTask}
          editSubTask={_editSubTask}
          removeSubTask={_removeSubTask}
          taskId={taskId}
        />
        <CommentsSection
          addNewReply={addNewReply}
          addNewComment={addNewComment}
          taskId={taskId}
        />

        {/* // TODO: Сделать files */}
        <Files
          taskId={taskId}
          setFiles={setFiles}
        />
      </section>
    </div>
  )
}

export default ActiveTask
