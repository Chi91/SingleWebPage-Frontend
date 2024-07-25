export const SHOW_ADD_USER_DIALOG = "SHOW_ADD_USER_Dialog";
export const SHOW_EDIT_USER_DIALOG = "SHOW_EDIT_USER_DIALOG";
export const HIDE_ADD_DIALOG = "HIDE_ADD_DIALOG";
export const HIDE_EDIT_DIALOG = "HIDE_EDIT_DIALOG";

export const HIDE_USER_ADD_WIDGET_DIALOG = "HIDE_USER_ADD_WIDGET_DIALOG";
export const ADD_USER_ADD_WIDGET_DIALOG = "ADD_USER_ADD_WIDGET_DIALOG";
export const HIDE_USER_EDIT_WIDGET_DIALOG = "HIDE_USER_EDIT_WIDGET_DIALOG";
export const ADD_USER_EDIT_WIDGET_DIALOG = "ADD_USER_EDIT_WIDGET_DIALOG";

export const HIDE_FORUMTHREAD_ADD_WIDGET_DIALOG = "HIDE_FORUMTHREAD_ADD_WIDGET_DIALOG"
export const SHOW_FORUMTHREAD_ADD_WIDGET_DIALOG = "SHOW_FORUMTHREAD_ADD_WIDGET_DIALOG"
export const HIDE_FORUMTHREAD_EDIT_WIDGET_DIALOG = "HIDE_FORUMTHREAD_EDIT_WIDGET_DIALOG"
export const SHOW_FORUMTHREAD_EDIT_WIDGET_DIALOG = "SHOW_FORUMTHREAD_EDIT_WIDGET_DIALOG"

export const RETURN_FORUMTHREADS = "RETURN_FORUMTHREADS"


export function getShowAddUserDialogAction(){
    return {
        type: SHOW_ADD_USER_DIALOG
    }
}
export function getShowEditUserDialogAction(){
    return{
        type: SHOW_EDIT_USER_DIALOG
    }
}
export function getHideAddDialog(){
    return{
        type: HIDE_ADD_DIALOG
    }
}
export function getHideEditDialog(){
    return{
        type: HIDE_EDIT_DIALOG
    }
}

export function getHideUserAddWidgetDialog(){
    return{
        type: HIDE_USER_ADD_WIDGET_DIALOG
    }
}
export function getAddUserAddWidgetDialog(){
    return{
        type: ADD_USER_ADD_WIDGET_DIALOG
    }
}
export function getHideUserEditWidgetDialog(){
    return{
        type: HIDE_USER_EDIT_WIDGET_DIALOG
    }
}
export function getAddUserEditWidgetDialog(){
    return{
        type: ADD_USER_EDIT_WIDGET_DIALOG
    }
}
export function getHideForumThreadAddWidgetDialog(){
    return{
        type: HIDE_FORUMTHREAD_ADD_WIDGET_DIALOG
    }
}
export function getShowForumThreadAddWidgetDialog(){
    return{
        type: SHOW_FORUMTHREAD_ADD_WIDGET_DIALOG
    }
}
export function getHideForumThreadEditWidgetDialog(){
    return{
        type: HIDE_FORUMTHREAD_EDIT_WIDGET_DIALOG
    }
}
export function getShowForumThreadEditWidgetDialog(){
    return{
        type: SHOW_FORUMTHREAD_EDIT_WIDGET_DIALOG
    }
}

export function getReturnForumThreadsAction(){
    return{
        type: RETURN_FORUMTHREADS
    }
}