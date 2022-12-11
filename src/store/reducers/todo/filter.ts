import { ActionTypes } from '@/store';

const initialState = {
  text: ''
}

type FilterState = typeof initialState

const filter = (state = initialState, action: ActionTypes): FilterState => {
  switch(action.type) {
    case 'TODO/SET_FILTER_TEXT': {
      return {
        ...state,
        text: action.text
      } 
    }


    default: {
      return state
    }
  }
}


export default filter