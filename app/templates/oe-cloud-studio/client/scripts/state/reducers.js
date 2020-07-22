import * as Actions from './actions.js';

const initialState = {
  currentPath: "/"
}

function ftApp(state = initialState, action) {
  switch (action.type) {
      case Actions.NAVIGATE: 
          return Object.assign({}, state, {
            currentPath: action.link
          });            
      default:
          return state;
  }
  return state;
}

export default ftApp;
