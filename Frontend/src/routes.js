import React from "react";
import $ from "jquery";

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const DashboardDefault = React.lazy(() => import("./Demo/Dashboard/Default"));
const FbPosts = React.lazy(() => import("./Demo/Api/index"));
const Catgories = React.lazy(() => import("./Demo/Api/categories"));
const Cat = React.lazy(() => import("./Demo/Api/category"));
const Lists = React.lazy(() => import("./Demo/Api/listes"));
const List = React.lazy(() => import("./Demo/Api/lists"));
const Post = React.lazy(() => import("./Demo/Api/post"));
const Posts = React.lazy(() => import("./Demo/Api/posts"));

const Admin = React.lazy(() => import("./Demo/Admin/Admin"));
const UserList = React.lazy(() => import("./Demo/Admin/UserList"));
const UserTable = React.lazy(() => import("./Demo/Admin/UserTable"));
const EditUser = React.lazy(() => import("./Demo/Admin/EditUser"));

const ShowRoles = React.lazy(() => import("./Demo/Role/showRoles"));
const CreateRole = React.lazy(() => import("./Demo/Role/createRole"));
const EditRole = React.lazy(() => import("./Demo/Role/editRole"));

const routes = [
  {
    path: "/dashboard/default",
    exact: true,
    name: "Default",
    component: DashboardDefault,
  },
  { path: "/admin/users", exact: true, name: "Default", component: UserTable },
  { path: "/admin", exact: true, name: "Default", component: UserList },
  {
    path: "/admin/edit/:id",
    exact: true,
    name: "Default",
    component: EditUser,
  },
  { path: "/admin/test", exact: true, name: "Default", component: Admin },
  { path: "/showRoles", exact: true, name: "Default", component: ShowRoles },
  {
    path: "/showRoles/edit/:id",
    exact: true,
    name: "Default",
    component: EditRole,
  },
  { path: "/createRole", exact: true, name: "Default", component: CreateRole },
  {
    path: "/posts",
    exact: true,
    name: "Default",
    component: Post,
  },
  {
    path: "/posts/post",
    exact: true,
    name: "Default",
    component: Posts,
  },
  {
    path: "/lists",
    exact: true,
    name: "Default",
    component: Lists,
  },
  {
    path: "/lists/list",
    exact: true,
    name: "Default",
    component: List,
  },
  {
    path: "/categories/cat",
    exact: true,
    name: "Default",
    component: Cat,
  },
  {
    path: "/categories",
    exact: true,
    name: "Default",
    component: Catgories,
  },
  {
    path: "/api/fbposts",
    exact: true,
    name: "Default",
    component: FbPosts,
  },
];

export default routes;
