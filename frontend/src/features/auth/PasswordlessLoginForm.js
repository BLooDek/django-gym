import { useState } from "react";
import PasswordlessEmailForm from "./PasswordlessEmailForm";
import PasswordlessCodeForm from "./PasswordlessCodeForm";

//TODO: autusbmit when code is valid

export default function PasswordlessLoginForm({ setError, dispatch }) {
  const [visible, setVisible] = useState(true);
  const [emailState, setEmailState] = useState("");
  return (
    <>
      {visible && (
        <PasswordlessEmailForm
          setEmailState={setEmailState}
          setError={setError}
          setVisible={setVisible}
        />
      )}
      {!visible && (
        <PasswordlessCodeForm
          email={emailState}
          setError={setError}
          dispatch={dispatch}
        />
      )}
    </>
  );
}
