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
    upload: (intervenantId: number) => `/cv/upload/${intervenantId}`,
    delete: (intervenantId: number) => `/cv/${intervenantId}`,
    schools: "/schools",
  },
};

export default routes;
