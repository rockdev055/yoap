export const hostname = (() => {
  if (typeof window !== 'object') {
    return 'localhost'
  }

  return window.location.hostname;
})();

export const apiOrigin = `http://${hostname}:5000`;
export const imageHostname = (() => {
  if (hostname.indexOf('yoap') !== -1) {
    return '';
  }

  return apiOrigin;
})();

export const api = '/api';
export const JSONHeaders = {
  headers: {
    "Content-type": 'application/json',
  }
};
export const authHeader = 'X-AUTH';

// user api
export const checkPassword = `/password`;
export const checkPasswordApi = apiOrigin + api + checkPassword;
// sign up
export const signup = `/signup`;
export const signupApi = apiOrigin + api + signup;
// login
export const login = `/login`;
export const loginApi = apiOrigin + api + login;
// logout
export const logout = `/logout`;
export const logoutApi = apiOrigin + api + logout;
// check user
export const checkUser = `/check`;
export const checkUserApi = apiOrigin + api + checkUser;
// update user data
export const updateUserData = `/update-user`;
export const updateUserDataApi = apiOrigin + api + updateUserData;
// update password
export const updatePassword = '/update-password';
export const updatePasswordApi = apiOrigin + api + updatePassword;
//
export const restorePassword = '/restore-password';
export const restorePasswordApi = apiOrigin + api + restorePassword;
// create dummy user
export const createDummyUser = `/create-dummy-user`;
export const createDummyUserApi = apiOrigin + api + createDummyUser;
// update dummy user
export const updateDummyUser = `/update-dummy-user`;
export const updateDummyUserApi = apiOrigin + api + updateDummyUser;
// get users
export const users = '/users';
export const getUsers = apiOrigin + api + users;
// delete user
// export const users = '/users';
// export const getUsers = apiOrigin + api + users;

// items api
export const items = '/items';
export const itemsApi = apiOrigin + api + items;
// filtered items api
export const filterItems = '/items-filtered'
export const filterItemsApi = apiOrigin + api + filterItems;

// item api
export const item = '/item';
export const itemApi = apiOrigin + api + item;

// item find api
export const itemFind = '/item/find';
export const itemFindApi = apiOrigin + api + itemFind;

// item update api
export const itemUpdate = '/item/update';
export const itemUpdateApi = apiOrigin + api + itemUpdate;

// item get phone number api
export const itemPhone = '/item/phone';
export const itemPhoneApi = apiOrigin + api + itemPhone;

// item views api
export const itemView = '/item/view';
export const itemViewApi = apiOrigin + api + itemView;

// item featured api
export const itemToggleFeatured = '/item/featured';
export const itemToggleFeaturedApi = apiOrigin + api + itemToggleFeatured;

// images api
export const image = '/images';
export const imageApi = apiOrigin + api + image;


