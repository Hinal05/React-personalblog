// import { navigate } from 'gatsby';

const token_url = `https://decouple-drupal.ddev.site/oauth/token`;
const loginUrl = `https://decouple-drupal.ddev.site/user/login?_format=json`;

/* This check is to ensure that this code gets executed in browser because
* If we run this code without this check your gatsby develop will fail as it won't be able
* to access localStorage on build time
*/
export const isBrowser = typeof window !== 'undefined';

// Helper function to get the current status of the user
export const isLoggedIn = async () => {

  // Check if code is executing in browser or not
  if (typeof window === 'undefined') {
    return Promise.resolve(false);
  }

  // Check if we already have access token in localStorage
  const token = localStorage.getItem('access-token') !== null ? JSON.parse(localStorage.getItem('access-token')) : null;

  // If not, return false as the user is not loggedIn.
  if (token === null) {
    return Promise.resolve(false);
  }

  // Check if access token is still valid
  if (token !== null && token.expirationDate > Math.floor(Date.now() / 1000)) {
    return Promise.resolve(token);
  }
  // If not, use refresh token and generate new token
  if (token !== null) {
    const formData = new FormData();
    formData.append('client_id', '862b0871-a115-4c2b-afa4-d412a4acf6af');
    formData.append('client_secret', 'secretkey');
    formData.append('grant_type', 'password');
    formData.append('scope', 'content_editor');
    formData.append('refresh_token', token.refresh_token);

    const response = await fetch(token_url, {
      method: 'post',
      headers: new Headers({
        Accept: 'application/json',
      }),
      body: formData,
    });

    if (response.ok) {
      const result = await response.json();
      const token = await saveToken(result);
      return Promise.resolve(token)
    }

    // If refresh token is also expired
    // return navigate('/user/login', { state: { message: "your session has been timed out, please login" } });

  }
};

/**
*  Login the user.
*
*  Save the token in local storage.
*/
export const handleLogin = async (username, password) => {
  const drupallogIn = await drupalLogIn(username, password);
  if (drupallogIn !== undefined && drupallogIn) {
    return fetchSaveOauthToken(username, password);
  }
  return false;
};

/**
  * Log the current user out.
  *
  * Deletes the token from local storage.
  */
export const handleLogout = async () => {
  const drupallogout = await drupalLogout();
  console.log(drupallogout);
  localStorage.removeItem('access-token');
  // navigate('/user/login');
};

/**
  * Get an OAuth token from Drupal.
  *
  * Exchange a username and password for an OAuth token.
  * @param username
  * @param password
  * @returns {Promise<void>}
  *   Returns a promise that resolves with the new token returned from Drupal.
  */
export const fetchOauthToken = async (username, password) => {
  const formData = new FormData();
  formData.append('client_id', '862b0871-a115-4c2b-afa4-d412a4acf6af');
  formData.append('client_secret', 'secretkey');
  formData.append('grant_type', 'password');
  formData.append('scope', 'content_editor');
  formData.append('username', username);
  formData.append('password', password);

  const response = await fetch(token_url, {
    method: 'post',
    headers: new Headers({
      Accept: 'application/json',
    }),
    body: formData,
  });

  if (response.ok) {
    const json = await response.json();
    if (json.error) {
      throw new Error(json.error.message);
    }
    return json;
  }
};

/**
* Helper function to fetch and store tokens in local storage.
**/
const fetchSaveOauthToken = async (username, password) => {
  const response = await fetchOauthToken(username, password);
  if (response) {
    return saveToken(response);
  }
};

/**
* Helper function to store token into local storage
**/
const saveToken = (json) => {
  const token = { ...json };
  token.date = Math.floor(Date.now() / 1000);
  token.expirationDate = token.date + token.expires_in;
  localStorage.setItem('access-token', JSON.stringify(token));
  return token;
};

/**
  * Login request to Drupal.
  *
  * Exchange username and password.
  * @param username
  * @param password
  * @returns {Promise<void>}
  *   Returns a promise that resolves to JSON response from Drupal.
  */
const drupalLogIn = async (username, password) => {
  const response = await fetch(loginUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: username,
      pass: password,
    }),
  });
  if (response.ok) {
    const json = await response.json();
    if (json.error) {
      throw new Error(json.error.message);
    }
    return json;
  }
};

/**
  * Logout request to Drupal.
  *
  * Logs the user out on Drupal end.
  */
const drupalLogout = async () => {
  const oauthToken = await isLoggedIn();
  const logoutoken = oauthToken.access_token;
  debugger;
  if (logoutoken) {
    const res = await fetch(`https://decouple-drupal.ddev.site/user/logout?_format=json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${logoutoken}`,
      },
    });
    if (res.ok) {
      return true;
    }
  }
};
