import { setLogged, setCredentials } from "./loginSlice";
import { switchState } from "./loginForm";


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
        dispatch(switchState())
      },
      (error) => {
        setErrors(error);
      }
    );
}
