import { setLogged, setCredentials } from "./authState";
import { setLoginDialog } from "./authDialogState";


//fetch creditensials, signal error
export function fetchCredentials(key, setErrors, dispatch) {
  console.log("we are fetching your data");
  fetch("https://agile.cbt.re/api/v1/users/auth/user/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${key}`,
    },
  })
    .then((res) => res.json())
    .then(
      (result) => {
        console.log(result);
        dispatch(setCredentials(result))
        dispatch(setLogged(true));
        dispatch(setLoginDialog(false))
      },
      (error) => {
        setErrors(error);
      }
    );
}
