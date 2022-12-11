import { RootState } from '@/store';
const STORE = 'store'

export class Storage {
  static setState(state: RootState) {
    localStorage.setItem(STORE, JSON.stringify(state))
  }

  static getState() {
    const state = localStorage.getItem(STORE)
    return state ? JSON.parse(state) as RootState : {}
  }

  static clearState() {
    localStorage.setItem(STORE, '')
  }
}