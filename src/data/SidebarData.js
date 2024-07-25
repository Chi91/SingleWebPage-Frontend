import React from "react"
import * as AiIcons from "react-icons/ai"
import * as BsIcon  from "react-icons/bs"
import * as MdIcon from "react-icons/md"

export const SidebarData = [
    {
        title: "Home",
        path: "/",
        icon: <AiIcons.AiFillHome />,
        cName: "nav-text",
        id: "OpenPrivatePageButton"
    },
    {
        title: "ForumThread-Management",
        path: "/forummanagement",
        icon: <MdIcon.MdForum/>,
        cName: "nav-text",
        id: "OpenForumThreadOverviewButton"
    },
    {
        title: "User-Management",
        path: "/usermanagement",
        icon: <BsIcon.BsTools/>,
        cName: "nav-text",
        id: "OpenUserManagementButton"
    },
   
]