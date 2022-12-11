import { useDropzone } from 'react-dropzone'
import { FC, useCallback, useRef } from 'react'
import { HandySvg } from 'handy-svg'
import cn from 'classnames'
import { ITask } from '@/types/Task'
import { getTaskField } from '@/store/selectors/todo'
import { useTypedSelector } from '@/store/hooks'
import styles from './activeTask.module.scss'
import plus from '@/assets/icons/plus.svg'

interface Props {
  taskId: ITask['id']
  setFiles: (files: string) => void
}

const Files: FC<Props> = ({ taskId, setFiles }) => {
  const files = useTypedSelector(getTaskField(taskId, 'files'))

  //? FIXME Не знаю, как правильно всё сделать, куда сохранять файлы? Какой максимальный размер? Какие файлы? Нужно ли поднимать сервер? Нужно ли хранить файлы в каком нибудь 'облачном хранилище'?...
  // В общем пока откладываю.
  
  const inputRef = useRef<HTMLInputElement>(null)


  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      acceptedFiles.forEach((file) => {

        console.log(file)
        
        const reader = new FileReader()
        reader.onload = () => {
          const original = new Image()
          original.src = reader.result as string

          const resultUrl = compressImage(original.src)
        }

        reader.onerror = () => {
          console.log('ERROR')
        }
        reader.readAsDataURL(file)
      })
    },
    [setFiles]
  )



  const { getRootProps, getInputProps, isDragActive, } = useDropzone({ onDrop })

  const download = () => {
    if (inputRef.current && inputRef.current.files) {
      const file = inputRef.current.files[0]
      const a = document.createElement('a')
      const fileBlobb = new Blob([file], { type: file.type })
      a.href = URL.createObjectURL(fileBlobb)
      a.download = file.name
      a.target = '_blank'
      a.click()
      URL.revokeObjectURL(a.href)
    }
  }

  // const onChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
  //   const files = e.target.files
  //   if (files) {
  //     const file = files[0]

  //     const reader = new FileReader()
  //     reader.onload = (event) => {
  //       //? Тут наверно можно картинки файлов выводить...
  //       setFiles(event.target?.result)
  //     }

  //     reader.readAsDataURL(file)
  //   }
  // }

  //@ts-ignore
  window.inputRef = inputRef

  return (
    <div className={styles.filesWrapper}>
      <div
        className={cn(styles.files, {[styles.files_dragActive]: isDragActive})}
        {...getRootProps()}>
        <input  {...getInputProps()} />
        <HandySvg src={plus}  />
      </div>


      <div className={styles.files__block}>
        {files?.map((file) => {
          return (
            <img
              key={file}
              src={file}
              alt='file'
            />
          )
        })}
      </div>
    </div>
  )
}

export default Files

function compressImage(base64: string) {
  const canvas = document.createElement('canvas')
  const img = document.createElement('img')
  img.src = base64
  img.onload = () => {
    let width = img.width
    let height = img.height
    const maxHeight = 900
    const maxWidth = 1200
    if(width > height) {
      if(width > maxHeight) {
        height = Math.round(height *= maxHeight / width)
        width = maxWidth
      }
    } else {
      if(height > maxHeight) {
        width = Math.round(width *= maxHeight / height)
        height = maxHeight
      }
    }

    canvas.width = width
    canvas.height = height

    const ctx = canvas.getContext('2d')  as CanvasRenderingContext2D
    ctx.drawImage(img, 0, 0,width,height)

   return canvas.toDataURL('image/jpeg', 0.7)
  }
}

