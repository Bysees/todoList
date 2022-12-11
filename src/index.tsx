import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client'
import App from '@/components/App'
import { store } from './store'
import '@/assets/styles/normalize.scss'

const container = document.querySelector('#root') as HTMLDivElement
const root = createRoot(container)

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)
