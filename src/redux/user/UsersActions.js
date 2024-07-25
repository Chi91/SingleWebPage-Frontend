import config from "../../config/config.json"
export const FETCH_USERS_PENDING = 'FETCH_USERS_PENDING';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_ERROR = 'FETCH_USERS_ERROR';

export const CREATE_USER_PENDING = "CREATE_USER_PENDING";
export const CREATE_USER_SUCCESS = "CREATE_USER_sUCCESS";
export const CREATE_USER_ERROR = "CREATE_USER_ERROR";

export const EDIT_USER_PENDING = "EDIT_USER_PENDING";
export const EDIT_USER_SUCCESS = "EDIT_USER_SUCCES";
export const EDIT_USER_ERROR = "EDIT_USER_ERROR";

export const DELETE_USER_PENDING = "DELETE_USER_PENDING";
export const DELETE_USER_ERROR = "DELETE_USER_ERROR";
export const DELETE_USER_SUCCESS = "DELETE_USER_ERROR";


function getfetchUsersPending() {
    return {
        type: FETCH_USERS_PENDING
    }
}
function getfetchUsersSuccess(users) {
    return {
        type: FETCH_USERS_SUCCESS,
        users: users
    }
}
function getfetchUsersError(error) {
    return {
        type: FETCH_USERS_ERROR,
        error: error
    }
}

function getCreateUserPending() {
    return {
        type: CREATE_USER_PENDING
    }
}
function getCreateUserSuccess(user) {
    return {
        type: CREATE_USER_SUCCESS,
        user: user
    }

}
function getCreateUserError(error) {
    return {
        type: CREATE_USER_ERROR,
        error
    }

}

function getEditUserPending() {
    return {
        type: EDIT_USER_PENDING
    }

}
function getEditUserSuccess(user) {
    return {
        type: EDIT_USER_SUCCESS,
        user: user
    }

}

function getEditUserError(error) {
    return {
        type: EDIT_USER_ERROR,
        error: error
    }

}

function getDeleteUserPending() {
    return {
        type: DELETE_USER_PENDING
    }

}
function getDeleteUserSuccess(user) {
    return {
        type: DELETE_USER_SUCCESS,
        user: user
    }

}
function getDeleteUserError(error) {
    return {
        type: DELETE_USER_ERROR,
        error: error
    }

}

export function getUsersAction(token) {
    return dispatch => {
        if (token) {
            dispatch(getfetchUsersPending());
            const requestOption = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Basic " + token
                }
            };
            fetch(config.URL + 'users', requestOption)
                .then(handleResponse)
                .then(res => res.json())
                .then(res => {
                    let users = res
                    dispatch(getfetchUsersSuccess(users));
                },
                    error => {
                        dispatch(getfetchUsersError(error));
                    })
                .catch(error => { dispatch(getfetchUsersError(error)); })
        }
        else {
            return dispatch(getfetchUsersError("Token is missing"))
        }

    }
}

function handleResponse(response) {
    if (!response.ok) {
        const error = response.statusText;
        return Promise.reject(error);
    }
    else {
        return response
    }
}

export function createUserAction(token, user) {
    return dispatch => {
        const requestOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(user)
        }
        dispatch(getCreateUserPending());
        fetch(config.URL + "users", requestOption)
            .then(handleResponse)
            .then(res => {
                dispatch(getCreateUserSuccess(user))
                dispatch(getUsersAction(token))
            },
                error => {
                    dispatch(getCreateUserError(error));
                }
            )
            .catch(error => { dispatch(getCreateUserError(error)) })
    }
}

export function updateUserAction(token, user) {
    return dispatch => {
        const requestOption = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify(user)
        }
        dispatch(getEditUserPending())
        fetch(config.URL + "users/" + user.userID, requestOption)
            .then(res => {
                dispatch(getEditUserSuccess(res));
                dispatch(getUsersAction(token))
            },
                error => {
                    dispatch(getEditUserError(error));
                }
            )
            .catch(error => {
                dispatch(getEditUserError(error))
            })
    }
}

export function deleteUserAction(token, useUserID) {
    return dispatch => {
        const requestOption = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify({ userID: useUserID })
        }

        dispatch(getDeleteUserPending())
        fetch(config.URL + "users/" + useUserID, requestOption)
            .then(res => {
                dispatch(getDeleteUserSuccess(res))
                dispatch(getUsersAction(token))
            },
                error => {
                    dispatch(getDeleteUserError(error));
                }
            )
            .catch(error => {
                dispatch(getDeleteUserError(error))
            })
    }
}
