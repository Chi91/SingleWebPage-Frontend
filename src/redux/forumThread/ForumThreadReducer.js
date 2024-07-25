import * as forumThreadsActions from "./ForumThreadsAction"

const initialState = {
    user: null,
    loginPending: false,
    showLoginDialog: false,
    showAddUserDialog: false,
    showEditUserDialog: false,
    error: null,
    users: null
}
function forumThreadReducer(state = initialState, action) {

    switch (action.type) {
        case forumThreadsActions.GET_FORUMTHREADS_SUCCESS:
            return {
                ...state,
                pending: false,
                forumThreads: action.forumThreads

            }
        case forumThreadsActions.GET_FORUMTHREADS_PENDING:
            return {
                ...state,
                pending: true,
                error: false,
                showMessages: false

            }
        case forumThreadsActions.GET_FORUMTHREADS_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error,
                showMessages: false

            }
        case forumThreadsActions.EDIT_FORUMTHREAD_SUCCESS:
            return {
                ...state,
                pending: false,
                // forumThread: action.forumThread
                showMessages: false

            }
        case forumThreadsActions.EDIT_FORUMTHREAD_PENDING:
            return {
                ...state,
                pending: true,
                error: false

            }
        case forumThreadsActions.EDIT_FORUMTHREAD_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error

            }
        case forumThreadsActions.CREATE_FORUMTHREAD_SUCCESS:
            return {
                ...state,
                pending: false,

            }
        case forumThreadsActions.CREATE_FORUMTHREAD_PENDING:
            return {
                ...state,
                pending: true,
                error: false
            }
        case forumThreadsActions.CREATE_FORUMTHREAD_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error

            }
        case forumThreadsActions.DELETE_FORUMTHREAD_SUCCESS:
            return {
                ...state,
                pending: false,
                forumThreads: state.forumThreads.concat(action.forumThread)

            }
        case forumThreadsActions.DELETE_FORUMTHREAD_PENDING:
            return {
                ...state,
                pending: true,
                error: false
            }
        case forumThreadsActions.DELETE_FORUMTHREAD_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            }
        default:
            return state;
    }

}

export default forumThreadReducer