export default {
  items: [
    {
      id: "navigation",
      title: "Management",
      type: "group",
      icon: "icon-navigation",
      children: [
        {
          id: "dashboard",
          title: "Scraped items",
          type: "item",
          url: "/api/fbposts",
          icon: "feather icon-home",
        },
        {
          id: "posts",
          title: "Saved posts",
          type: "item",
          url: "/posts",
          icon: "feather icon-home",
        },
        {
          id: "users",
          title: "Users",
          type: "item",
          url: "/admin",
          icon: "feather icon-home",
        },
      ],
    },

    {
      id: "ui-forms",
      title: "Settings",
      type: "group",
      icon: "icon-group",
      children: [
        {
          id: "word",
          title: "Word list",
          type: "item",
          url: "/lists",
          icon: "feather icon-file-text",
        },
        {
          id: "form-basic",
          title: "Users roles",
          type: "item",
          url: "/showRoles",
          icon: "feather icon-file-text",
        },
        {
          id: "bootstrap",
          title: "Categories",
          type: "item",
          icon: "feather icon-server",
          url: "/categories",
        },
      ],
    },
  ],
};
