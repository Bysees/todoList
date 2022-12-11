import { FC, ChangeEventHandler, useState } from 'react'
import { HandySvg } from 'handy-svg'
import cn from 'classnames'
import { useTypedDispatch, useTypedSelector } from '@/store/hooks'
import { setFilterText } from '@/store/actions'
import styles from './filter.module.scss'
import loupe from '@/assets/icons/loupe.svg'

const FilterSection: FC = () => {
  const dispatch = useTypedDispatch()
  const filterText = useTypedSelector((state) => state.todo.filter.text)
  const [isInputFocused, setInputFocus] = useState(false)

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    dispatch(setFilterText(e.target.value))
  }

  return (
    <div className={cn(styles.filter, { [styles.filter_focus]: isInputFocused })}>
      <input
        type='text'
        value={filterText}
        onChange={handleChange}
        onFocus={() => setInputFocus(true)}
        onBlur={() => setInputFocus(false)}
        placeholder={'Search...'}
      />
      <HandySvg src={loupe} />
    </div>
  )
}

export default FilterSection
