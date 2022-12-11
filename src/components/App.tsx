import { Routes, Route, Link } from 'react-router-dom'
import { TodoPage } from '@/pages/TodoPage'
import styles from './app.module.scss'

const App = () => {
  return (
    <div className={styles.wrapper}>
      <header>
        <Link to={'/'}>Main</Link>
        <Link to={'/todo'}>Todo List</Link>
      </header>
      <Routes>
        <Route
          path='/'
          element={<TodoPage />}
        />
      </Routes>
    </div>
  )
}

export default App
