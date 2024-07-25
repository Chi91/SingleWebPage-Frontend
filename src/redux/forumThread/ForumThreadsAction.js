import config from "../../config/config.json"

export const GET_FORUMTHREADS_PENDING = "GET_FORUMTHREADS_PENDING"
export const GET_FORUMTHREADS_ERROR = "GET_FORUMTHREADS_ERROR"
export const GET_FORUMTHREADS_SUCCESS = "GET_FORUMTHREADS_SUCCESS"

export const CREATE_FORUMTHREAD_ERROR ="CREATE_FORUMTHREAD_ERROR"
export const CREATE_FORUMTHREAD_PENDING ="CREATE_FORUMTHREAD_PENDING"
export const CREATE_FORUMTHREAD_SUCCESS = "CREATE_FORUMTHREAD_SUCCESS"

export const EDIT_FORUMTHREAD_ERROR = "EDIT_FORUMTHREAD_ERROR"
export const EDIT_FORUMTHREAD_PENDING = "EDIT_FORUMTHREAD_PENDING"
export const EDIT_FORUMTHREAD_SUCCESS = "EDIT_FORUMTHREAD_SUCCESS"

export const DELETE_FORUMTHREAD_ERROR = "DELETE_FORUMTHREAD_ERROR"
export const DELETE_FORUMTHREAD_PENDING = "DELETE_FORUMTHREAD_PENDING"
export const DELETE_FORUMTHREAD_SUCCESS = "DELETE_FORUMTHREAD_SUCCESS"

function getForumThreadsPending() {
    return {
        type: GET_FORUMTHREADS_PENDING
    }
}
function getForumThreadsSuccess(forumThreads) {
    return {
        type: GET_FORUMTHREADS_SUCCESS,
        forumThreads: forumThreads
    }
}
function getForumThreadsError(error) {
    return {
        type: GET_FORUMTHREADS_ERROR,
        error: error
    }
}

function getCreateForumThreadPending() {
    return {
        type: CREATE_FORUMTHREAD_PENDING
    }
}
function getCreateForumThreadSuccess(forumThread) {
    return {
        type: CREATE_FORUMTHREAD_SUCCESS,
        forumThread: forumThread
    }

}
function getCreateForumThreadError(error) {
    return {
        type: CREATE_FORUMTHREAD_ERROR,
        error
    }

}

function getEditForumThreadPending() {
    return {
        type: EDIT_FORUMTHREAD_PENDING
    }

}
function getEditForumThreadSuccess() {
    return {
        type: EDIT_FORUMTHREAD_SUCCESS,
      
    }

}

function getEditForumThreadError(error) {
    return {
        type: EDIT_FORUMTHREAD_ERROR,
        error: error
    }

}

function getDeleteForumThreadPending() {
    return {
        type: DELETE_FORUMTHREAD_PENDING
    }

}
function getDeleteForumThreadSuccess(forumThread) {
    return {
        type: DELETE_FORUMTHREAD_SUCCESS,
        forumThread: forumThread
    }

}
function getDeleteForumThreadError(error) {
    return {
        type: DELETE_FORUMTHREAD_ERROR,
        error: error
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

export function getForumThreadsAction(token){
    return dispatch =>{
        if(token){
            dispatch(getForumThreadsPending())
            const requestOption = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Basic " + token
                }
            }
      
            fetch(config.URL + "forumThreads", requestOption)
                .then(handleResponse)
                .then(res => res.json())
                .then(res =>{
                        dispatch(getForumThreadsSuccess(res))
                    },
                    error => {
                        dispatch(getForumThreadsError(error))
                    }                    
                )
                
                .catch(error=> {
                    dispatch(getForumThreadsError(error))
                })
        }
        else{
            return dispatch(getForumThreadsError("Token is missing"))
        }
    }
}

export function createForumThreadAction(token,forumThread){
    return dispatch => {
             if (token) {
            dispatch(getCreateForumThreadPending())
            const requestOption = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(forumThread)
            }
            fetch( config.URL+ "forumThreads", requestOption)
                .then(handleResponse)
                .then(res => {
                    dispatch(getCreateForumThreadSuccess(forumThread))
                    dispatch(getForumThreadsAction(token))
                },
                error => {
                    dispatch(getCreateForumThreadError(error))
                })
                .catch(error => {
                    getCreateForumThreadError(error)
                })
        }
        else{
            return dispatch(getCreateForumThreadError("Token is missing"))
        }
    }
}

export function deleteForumThreadAction(token,forumThreadID){
    return dispatch =>{
        if(token){
            const requestOption={
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization" : "Bearer " + token
                }
            }
            dispatch(getDeleteForumThreadPending())
            fetch(config.URL+"forumThreads/" + forumThreadID, requestOption)
            .then(handleResponse)
            .then(res =>{
                dispatch(getDeleteForumThreadSuccess(res))
                dispatch(getForumThreadsAction(token))
            },
                error=>{
                    dispatch(getDeleteForumThreadError(error))
                }
            )
            .catch(error=>{getDeleteForumThreadError(error)})

        }
        else{
            return dispatch(getDeleteForumThreadError("Token is missing"))
        }
    }
}

export function updateForumThreadAction(token, forumThread, forumThreadID){
    return dispatch=>{
        if(token){
            const requestOption={
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
                body: JSON.stringify(forumThread)
            }
            dispatch(getEditForumThreadPending)
            fetch(config.URL+ "forumThreads/" + forumThreadID, requestOption)
            .then(handleResponse)
            .then(res => {
                dispatch(getEditForumThreadSuccess())
                dispatch(getForumThreadsAction(token))
            },
            error =>{
                dispatch(getEditForumThreadError(error))
            }
            )
            .catch(error=>{
                dispatch(getEditForumThreadError(error))
            })

        }
        else{
            return dispatch(getEditForumThreadError("Token is missing"))
        }
    }
}