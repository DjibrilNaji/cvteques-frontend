const routes = {
  home: "/",
  login: "/login",
  register: "/register",
  cvs: "/cvs",
  profile: "/profile",
  api: {
    auth: {
      register: "/users/register",
      login: "/users/login",
    },
    user: (email: string) => `/users/${email}`,
    upload: "/cv/upload",
    schools: "/schools",
  },
};

export default routes;
