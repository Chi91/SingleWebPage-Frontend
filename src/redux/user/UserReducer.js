import * as usersActions from "./UsersActions"
const initialState = {
    user: null,
    loginPending: false,
    showLoginDialog: false,
    showAddUserDialog: false,
    showEditUserDialog: false,
    error: null,
    users: null
}
function userReducer(state = initialState, action) {
    switch (action.type) {
        case usersActions.FETCH_USERS_PENDING:
            return {
                ...state,
                pending: true,
                error: false,
            }
        case usersActions.FETCH_USERS_ERROR:
            return {
                ...state,
                fetchUsersPending: false,
                error: action.error
            }
        case usersActions.FETCH_USERS_SUCCESS:
            return {
                ...state,
                pending: false,
                users: action.users
            }
        case usersActions.CREATE_USER_SUCCESS:
            return {
                ...state,
                pending: false,
                users: state.users.concat(action.user),
                showDialog: false
            }
        case usersActions.CREATE_USER_PENDING:
            return {
                ...state,
                pending: true,
            }

        case usersActions.CREATE_USER_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error,

            }
        case usersActions.EDIT_USER_SUCCESS:
            return {
                ...state,
                pending: false
            }
        case usersActions.EDIT_USER_PENDING:
            return {
                ...state,
                pending: true

            }
        case usersActions.EDIT_USER_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error

            }
        case usersActions.DELETE_USER_SUCCESS:
            return {
                ...state,
                pending: false,
                userID: action.userID

            }
        case usersActions.DELETE_USER_PENDING:
            return {
                ...state,
                pending: true,

            }
        case usersActions.DELETE_USER_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            }
        default:
            return state;
    }
}

export default userReducer