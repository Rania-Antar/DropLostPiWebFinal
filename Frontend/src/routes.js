/*!

=========================================================
* Material Dashboard React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import TableList from "views/TableList/TableList.js";
import Typography from "views/Typography/Typography.js";
import Icons from "views/Icons/Icons.js";
import Maps from "views/Maps/Maps.js";
import NotificationsPage from "views/Notifications/Notifications.js";
import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.js";
// core components/views for RTL layout
import RTLPage from "views/RTLPage/RTLPage.js";

import FbPosts from "views/Api/index";
import Catgories from "views/Api/categories";
import Cat from "views/Api/category";
import Lists from "views/Api/listes";
import List from "views/Api/lists";
import Post from "views/Api/post";
import Posts from "views/Api/posts";
import ApiAdmin from "views/Api/Admin/Admin";
import UserList from "views/Api/Admin/UserList";
import EditUser from "views/Api/Admin/EditUser";
import ShowRoles from "views/Api/Role/showRoles";
import CreateRole from "views/Api/Role/createRole";
import EditRole from "views/Api/Role/editRole";
import tab from "views/Api/New/tab";
import Personstab from "views/Api/New/personsList";
import Objectstab from "views/Api/New/objectsList";
import Logout from "views/Api/logout";
import Profile from "views/Api/profile";

const dashboardRoutes = [
  {
    path: "/persons",
    name: "persons",
    icon: Dashboard,
    component: Personstab,
    layout: "/admin",
  },
  {
    path: "/objects",
    name: "objects",
    icon: Dashboard,
    component: Objectstab,
    layout: "/admin",
  },
  {
    path: "/tab",
    name: "tab",
    icon: Dashboard,
    component: tab,
    layout: "/admin",
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin",
  },
  {
    path: "/admin/UserList",
    name: "Users List",
    icon: Dashboard,
    component: UserList,
    layout: "/admin",
  },
  {
    path: "/admin/edit/:id",
    name: "Edit User",
    icon: Dashboard,
    component: EditUser,
    layout: "/admin",
  },
  {
    path: "/showRoles",
    name: "Roles List",
    icon: Dashboard,
    component: ShowRoles,
    layout: "/admin",
  },
  {
    path: "/showRoles/edit/:id",
    name: "Edit Role",
    icon: Dashboard,
    component: EditRole,
    layout: "/admin",
  },
  {
    path: "/createRole",
    name: "Create Role",
    icon: Dashboard,
    component: CreateRole,
    layout: "/admin",
  },
  {
    path: "/posts",
    name: "Create Post",
    icon: Dashboard,
    component: Post,
    layout: "/admin",
  },
  {
    path: "/posts/post",
    name: "Saved Posts",
    icon: Dashboard,
    component: Posts,
    layout: "/admin",
  },
  {
    path: "/lists",
    name: "create list",
    icon: Dashboard,
    component: Lists,
    layout: "/admin",
  },
  {
    path: "/lists/list",
    name: "Word List",
    icon: Dashboard,
    component: List,
    layout: "/admin",
  },
  {
    path: "/categories",
    name: "Categories",
    icon: Dashboard,
    component: Catgories,
    layout: "/admin",
  },
  {
    path: "/categories/cat",
    name: "Create Category",
    icon: Dashboard,
    component: Cat,
    layout: "/admin",
  },
  {
    path: "/api/fbposts",
    name: "Facebook Posts",
    icon: Dashboard,
    component: FbPosts,
    layout: "/admin",
  },
  {
    path: "/user",
    name: "User Profile",
    icon: Person,
    component: Profile,
    layout: "/admin",
  },
  {
    path: "/logout",
    name: "Logout",
    icon: Dashboard,
    component: Logout,
    layout: "/admin",
  },
  {
    path: "/table",
    name: "Table List",
    icon: "content_paste",
    component: TableList,
    layout: "/admin",
  },
];

export default dashboardRoutes;
