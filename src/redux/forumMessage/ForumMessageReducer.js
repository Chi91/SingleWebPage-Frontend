import * as forumMessagesAction from "./ForumMessagesAction"

const initialState = {
    user: null,
    loginPending: false,
    showLoginDialog: false,
    showAddUserDialog: false,
    showEditUserDialog: false,
    error: null,
    users: null
}
function forumMessageReducer(state = initialState, action) {
    switch (action.type) {
        case forumMessagesAction.GET_FORUMMESSAGES_PENDING:
            return {
                ...state,
                pending: true,
                showMessages: false
            }
        case forumMessagesAction.GET_FORUMMESSAGES_SUCCESS:
            return {
                ...state,
                pending: false,
                forumMessages: action.forumMessages,
                forumThreadID: action.forumThreadID,
                showMessages: true
            }
        case forumMessagesAction.GET_FORUMMESSAGES_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error,
                showMessages: false
            }
        case forumMessagesAction.CREATE_FORUMMESSAGE_PENDING:
            return {
                ...state,
                pending: true,
            }
        case forumMessagesAction.CREATE_FORUMMESSAGE_ERROR:
            return {
                ...state,
                error: action.error,
                pending: false
            }
        case forumMessagesAction.CREATE_FORUMMESSAGE_SUCCESS:
            return {
                ...state,
                pending: false,
            }
        case forumMessagesAction.UPDATE_FORUMMESSAGE_PENDING:
            return {
                ...state,
                pending: true,
            }
        case forumMessagesAction.UPDATE_FORUMMESSAGE_SUCCESS:
            return {
                ...state,
                pending: false,
            }
        case forumMessagesAction.UPDATE_FORUMMESSAGE_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            }
        case forumMessagesAction.DELETE_FORUMMESSAGE_PENDING:
            return {
                ...state,
                pending: true,
            }
        case forumMessagesAction.DELETE_FORUMMESSAGE_SUCCESS:
            return {
                ...state,
                pending: false,
                forumMessages: state.forumMessages.filter(item =>
                    item._id !== action.forumMessageID
                )
            }
        case forumMessagesAction.DELETE_FORUMMESSAGE_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            }
        default:
            return state;
    }
}

export default forumMessageReducer