import config from "../../config/config.json"
//Datei repräsentieren alle Aktions - Action Factory Methods()
// Fkt Aktion: Benachrichtigung an Store(Verwaltung von States), was zu ändern ist 
// Type werden als Konstanten definiert
export const SHOW_LOGIN_DIALOG = "SHOW_LOGIN_Dialog";
export const HIDE_LOGIN_DIALOG = "HIDE_LOGIN_DIALOG";
export const AUTHENICATION_PENDING = "AUTHENTICATION_PENDING";
export const AUTHENICATION_SUCCESS = "AUTHENTICATION_SUCCES";
export const AUTHENICATION_ERROR = "AUTHENTICATION_ERROR";
export const LOGOUT_USER = "LOGOUT_USER"


export function getShowLoginDialogAction(){
    return{
        type: SHOW_LOGIN_DIALOG
    }
}

export function getHideLoginDialogAction(){
    return{
        type: HIDE_LOGIN_DIALOG
    }
}

export function getAuthenticateUserPendingAction(){
    return{
        type: AUTHENICATION_PENDING
    }
}

export function getAuthenticationSuccessAction(userSession){
    return{
        type: AUTHENICATION_SUCCESS,
        accessToken: userSession.accessToken,
        admin: userSession.admin,
    }
}

export function getAuthenticationErrorAction(error){
    return{
        type: AUTHENICATION_ERROR,
        error: error
    }
}

export function logoutUser(){
    return{
        type: LOGOUT_USER,
    }
}

// Anbindung an Rest-Backend mithilfe von Redux-Thunk
// Redux-Thunk ermöglich innerhalb von Action eine Funktion auszuführen 
// Durch den Aufruf fetch() - wird ein Restcall ausgelöst
// RestCall Aufruf - asynchron Aufruf + Result asynchron
// Ergebnisse von Backend wird dann wird dispatch() der Aktion an Store weitergeleitet => Stateänderung 
export function authenticateUser(userID,password){
    return dispatch => {
        dispatch(getAuthenticateUserPendingAction());
        login(userID,password)
            .then(
                userSession => {
                    const action = getAuthenticationSuccessAction(userSession);
                    dispatch(action)
                },
                error =>{
                    dispatch(getAuthenticationErrorAction(error));
                }
            )
            .catch(error => {
                dispatch(getAuthenticationErrorAction(error))
            })
    }
}

function login(userID,password){
    //userID, password ist was vom Nutzer eingegeben wurde
    //btoa verschlüsselt userID + password 
    const base64Credentials = btoa(userID + ":" + password)
    const requestOption = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Basic " + base64Credentials
        }
    };

    //Fetch() ruft URL mit Restcall auf => liefert Promise zurück, wenn Promise resolve dann then()
    // idF Backened wird überprüft, ob eingegebene userID + password in DB enthalten wird, wenn ja wird token erstellt res.status 200
    // sonst Fehlermeldung mit res.status 401
    return fetch(config.URL+ 'authenticate', requestOption)
    
        .then(handleResponse)
        .then(userSession=>{
            return userSession;
        });
}

function handleResponse(response){
    // Holt sich Teil aus res.Header mit "Authorization"
    const authorizationHeader = response.headers.get("Authorization");

    return response.text().then(()=>{
        // Holt sich Token aus dem Header vom res.Header
        var token
        var payload
        if(authorizationHeader){
            //Nur reinen Token ohne Bearer(Fkt von Bearer: tokenbasiere Authentifizierung), holt 2tes Element
            token = authorizationHeader.split(" ")[1];
            //Hole mir den Payload aus dem Token -
            const base64Payload = token.split(".")[1]
            const encodedPayload =atob(base64Payload)
            payload = JSON.parse(encodedPayload)     
        }
        //Fehler bei der Kommunikation - Sicherheitsgründen - logout()
        if(!response.ok){
            if(response.status === 401){
                logout();
            }
            const error = response.statusText;
            return Promise.reject(error);
        }
        else{
            let userSession = {
                admin: payload.isAdministrator,
                accessToken: token
            }
            token = null
            return userSession;
        }
    });
}

function logout(){
    return dispatch =>{
        dispatch(logoutUser())
    }
}


