import { combineReducers } from 'redux';


import authenticationReducer from './authentication/AuthenticationReducer';
import forumThreadReducer from './forumThread/ForumThreadReducer';
import forumMessageReducer from './forumMessage/ForumMessageReducer';
import modalReducer from './modal/ModalReducer';
import userReducer from './user/UserReducer';

const rootReducer = combineReducers({
    authenticationReducer,
    forumThreadReducer,
    forumMessageReducer,
    modalReducer,
    userReducer
})

export default rootReducer