import * as authenticationActions from "./AuthenticationActions"
const initialState = {
    user: null,
    loginPending : false,
    showLoginDialog: false,
    showAddUserDialog: false,
    showEditUserDialog: false,
    error: null,
    users:null
}
function authenticationReducer(state = initialState,action){

switch(action.type)
    {
        case authenticationActions.SHOW_LOGIN_DIALOG:
            return{
                // aktuellen State kopieren und  werte editieren über ...state
                ...state,
                showLoginDialog: true,
                error: null
            }
        case authenticationActions.HIDE_LOGIN_DIALOG:
            return{
                ...state,
                showLoginDialog: false,
                error: null
            }
        case authenticationActions.AUTHENICATION_SUCCESS:
            return{
                ...state,
                showLoginDialog: false,
                pending: false,
                accessToken: action.accessToken,
                admin : action.admin
            }    
        case authenticationActions.AUTHENICATION_ERROR:
            return {
                ...state,
                pending: false,
                error: "Authentication failed"
            }
        case authenticationActions.AUTHENICATION_PENDING:
            return {
                ...state,
                pending: true,
                error: null
            }  
        case authenticationActions.LOGOUT_USER:
            return {
                ...state,
                accessToken: null,
            }
            default: 
            return state;
        }
    }

export default authenticationReducer