import { setLogged, setCredentials } from "./authState";
import { setLoginDialog, setRegisterDialog } from "./authDialogState";

const authUrl = "http://127.0.0.1:8000/users/dj-rest-auth/";
const url = {
  register: authUrl + "registration/",
  user: authUrl + "user/",
  signOut: authUrl + "logout/",
  login: authUrl + "login/",
  sendCode: authUrl + "email/",
  getToken: authUrl + "token/"
};

export function fetchCredentials(key, setError, dispatch) {
  fetch(url.user, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${key}`,
    },
  })
    .then((res) => res.json())
    .then(
      (result) => {
        dispatch(setCredentials(result));
        dispatch(setLogged(true));
        dispatch(setLoginDialog(false));
        dispatch(setRegisterDialog(false));
      },
      (error) => {
        setError(error);
      }
    );
}
export function registerUser(data, setError, dispatch) {
  fetch(url.register, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then(
      (data) => {
        if (data.key) {
          localStorage.setItem("token", data.key);
          setError(null);
          fetchCredentials(data.key, setError, dispatch);
        } else {
          if (data.email) {
            setError(data["email"][0]);
          }
          if (data["non_field_errors"]) {
            setError(data?.["non_field_errors"][0]);
          }
        }
      },
      (error) => {
        console.log(error);
        setError(error);
      }
    );
}

export function logoutUser(dispatch) {
  const key = localStorage.getItem("token");
  fetch(url.signOut, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${key}`,
    },
  })
    .then((res) => res.json())
    .then(() => {
      dispatch(setLogged(false));
      dispatch(setCredentials(null));
      localStorage.clear();
    });
}

export function loginWithPassword(data, setError, dispatch) {
  fetch(url.login, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then(
      (data) => {
        if (data.key) {
          localStorage.setItem("token", data.key);
          setError(null);
          fetchCredentials(data.key, setError, dispatch);
        } else {
          setError(data["non_field_errors"][0]);
        }
      },
      (error) => {
        console.log(error);
        setError(error);
      }
    );
};

export function sendEmailWithCode(data, setError, setVisible){
  fetch(url.sendCode, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then(
      (data) => {
        if (data["detail"]) {
          console.log(data["detail"] + " datadetail");
          setError(null);
          setVisible(false);
        } else {
          setError(data["non_field_errors"][0]);
        }
      },
      (error) => {
        console.log(error);
        setError(error);
      }
    );
}

export function getToken(data, setError, dispatch) {
  fetch(url.getToken, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(
        (data) => {
          if (data.token[0] !== "The token you entered isn't valid.") {
            setError(null);
            localStorage.clear();
            localStorage.setItem("token", data.token);
            fetchCredentials(data.token, setError, dispatch);
          } else {
            setError("Invalid token");
          }
        },
        (error) => {
          setError(error);
        }
      );
}
