import { combineReducers } from 'redux';
import fileReducer from './file';

const rootReducer = combineReducers({
    files: fileReducer
});

export default rootReducer;