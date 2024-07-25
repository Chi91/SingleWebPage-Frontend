import config from "../../config/config.json"

export const GET_FORUMMESSAGES_PENDING = "GET_FORUMMESSAGES_PENDING"
export const GET_FORUMMESSAGES_ERROR = "GET_FORUMMESSAGES_ERROR"
export const GET_FORUMMESSAGES_SUCCESS = "GET_FORUMMESSAGES_SUCCESS"

export const CREATE_FORUMMESSAGE_ERROR ="CREATE_FORUMMESSAGE_ERROR"
export const CREATE_FORUMMESSAGE_PENDING ="CREATE_FORUMMESSAGE_PENDING"
export const CREATE_FORUMMESSAGE_SUCCESS = "CREATE_FORUMMESSAGE_SUCCESS"

export const UPDATE_FORUMMESSAGE_ERROR ="UPDATE_FORUMMESSAGE_ERROR"
export const UPDATE_FORUMMESSAGE_PENDING = "UPDATE_FORUMMESSAGE_PENDING"
export const UPDATE_FORUMMESSAGE_SUCCESS = "UPDATE_FORUMMESSAGE_SUCCESS"

export const DELETE_FORUMMESSAGE_ERROR = "DELETE_FORUMMESSAGE_ERROR"
export const DELETE_FORUMMESSAGE_PENDING = "DELETE_FORUMMESSAGE_PENDING"
export const DELETE_FORUMMESSAGE_SUCCESS = "DELETE_FORUMMESSAGE_SUCCESS"


function getForumMessagePending(){
    return{
        type: GET_FORUMMESSAGES_PENDING
    }
}

function getForumMessageSuccess(forumMessages,forumThreadID){
    return{
        type: GET_FORUMMESSAGES_SUCCESS,
        forumMessages: forumMessages,
        forumThreadID: forumThreadID
    }
}

function getForumMessageError(){
    return{
        type: GET_FORUMMESSAGES_ERROR
    }
}

function getCreateForumMessagePending(){
   return {
    type: CREATE_FORUMMESSAGE_PENDING
   } 
}

function getCreateForumMessageSuccess(){
    return{
        type: CREATE_FORUMMESSAGE_SUCCESS
    }
}

function getCreateForumMessageError(){
    return{
        type: CREATE_FORUMMESSAGE_ERROR
    }
}

function getDeleteForumMessagePending(){
    return{
        type: DELETE_FORUMMESSAGE_PENDING

    }
}
function getDeleteForumMessageError(){
    return{
        type: DELETE_FORUMMESSAGE_ERROR
    }
}
function getDeleteForumMessageSuccess(forumMessageID){
    return{
        type: DELETE_FORUMMESSAGE_SUCCESS,
        forumMessageID: forumMessageID
    }
}
function getEditForumMessagePending(){
    return{
        type: UPDATE_FORUMMESSAGE_PENDING
    }
}
function getEditForumMessageError(){
    return{
        type: UPDATE_FORUMMESSAGE_ERROR
    }
}
function getEditForumMessageSuccess(){
    return{
        type: UPDATE_FORUMMESSAGE_SUCCESS
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

export function getForumMessageAction(token, forumThreadID){
    return dispatch => {
        if(token){
            dispatch(getForumMessagePending())
            const requestOption= {
                method: "GET",
                headers:{
                    "Content-Type": "application/json",
                    "Authorization": "Basic " + token
                } 
            }
            fetch(config.URL +"forumMessages?forumThreadID="+ forumThreadID, requestOption)
            
            .then(handleResponse)
            .then(res => res.json())
            .then(res =>{
                dispatch(getForumMessageSuccess(res, forumThreadID))
            },
            error =>{
                dispatch(getForumMessageError(error))
            })
            .catch(error => {
                dispatch(getForumMessageError(error))
            })
        }
    }
}

export function getCreateForumMessageAction(token,forumMessage){
    return dispatch=>{
        dispatch(getCreateForumMessagePending())
        const requestOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer "+ token
            },
            body: JSON.stringify(forumMessage)
        }
        fetch(config.URL+ "forumMessages", requestOption)
        .then(handleResponse)
        .then(res => res.json())
        .then(res =>{
            dispatch(getCreateForumMessageSuccess())
            dispatch(getForumMessageAction(token, forumMessage.forumThreadID))

        })
        .catch(error =>{
            dispatch(getCreateForumMessageError(error))
        })
    }
}

export function getDeleteForumMessageAction(token, forumMessageID, forumThreadID){
    return dispatch=>{
        if(token){
            dispatch(getDeleteForumMessagePending())
            const requestOption ={
                method: "DELETE",
                headers: {
                    "Authorization": "Bearer " + token
                }   
            }
            fetch(config.URL +"forumMessages/" + forumMessageID, requestOption)
            .then(handleResponse)
            .then(()=>{
                dispatch(getDeleteForumMessageSuccess(forumMessageID))
                dispatch(getForumMessageAction(token,forumThreadID))
            })
            .catch(error => {
                dispatch(getDeleteForumMessageError(error))
            })
        }
        else{
            return dispatch(getDeleteForumMessageError("Token is missing"))
        }    
    }
}

export function getEditForumMessageAction(token,forumMessage,forumMessageID, forumThreadID){
    return dispatch =>{
        if(token){
            dispatch(getEditForumMessagePending())
            const requestOption={
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
                body: JSON.stringify(forumMessage)
            }
            fetch(config.URL+ "forumMessages/" + forumMessageID,requestOption )
            .then(handleResponse)
            .then(res => res.json())
            .then(res => {
                dispatch(getEditForumMessageSuccess())
                dispatch(getForumMessageAction(token, forumThreadID))
            })
            .catch(error => {
                dispatch(getEditForumMessageError(error))
            })
        }
        else{
            return dispatch(getEditForumMessageError("Token is missing"))
        }
    }
}


