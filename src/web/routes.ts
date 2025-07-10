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
    cvs: {
      upload: (intervenantId: number) => `/cv/upload/${intervenantId}`,
      delete: (intervenantId: number) => `/cv/${intervenantId}`,
      get: `/cv`,
    },
    user: (email: string) => `/users/${email}`,

    schools: "/schools",
  },
};

export default routes;
