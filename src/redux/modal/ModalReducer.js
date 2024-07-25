import * as modalActions from "./ModalActions"

const initialState = {
    user: null,
    loginPending: false,
    showLoginDialog: false,
    showAddUserDialog: false,
    showEditUserDialog: false,
    error: null,
    users: null
}
function modalReducer(state = initialState, action) {
    switch (action.type) {
        case modalActions.SHOW_ADD_USER_DIALOG:
            return {
                ...state,
                showAddUserDialog: true,
            }
        case modalActions.SHOW_EDIT_USER_DIALOG:
            return {
                ...state,
                showEditUserDialog: true,
            }
        case modalActions.HIDE_ADD_DIALOG:
            return {
                ...state,
                showAddUserDialog: false,
            }
        case modalActions.HIDE_EDIT_DIALOG:
            return {
                ...state,
                showEditUserDialog: false,
            }
        case modalActions.HIDE_USER_ADD_WIDGET_DIALOG:
            return {
                ...state,
                showDialog: false,
            }
        case modalActions.ADD_USER_ADD_WIDGET_DIALOG:
            return {
                ...state,
                showDialog: true,
            }

        case modalActions.HIDE_USER_EDIT_WIDGET_DIALOG:
            return {
                ...state,
                showEditDialog: false,
            }
        case modalActions.ADD_USER_EDIT_WIDGET_DIALOG:
            return {
                ...state,
                showEditDialog: true,
            }
        case modalActions.SHOW_FORUMTHREAD_ADD_WIDGET_DIALOG:
            return {
                ...state,
                showAddForumThreadDialog: true

            }
        case modalActions.HIDE_FORUMTHREAD_ADD_WIDGET_DIALOG:
            return {
                ...state,
                showAddForumThreadDialog: false

            }
        case modalActions.SHOW_FORUMTHREAD_EDIT_WIDGET_DIALOG:
            return {
                ...state,
                showEditForumThreadDialog: true

            }
        case modalActions.HIDE_FORUMTHREAD_EDIT_WIDGET_DIALOG:
            return {
                ...state,
                showEditForumThreadDialog: false

            }
        default:
            return state;
    }
}

export default modalReducer