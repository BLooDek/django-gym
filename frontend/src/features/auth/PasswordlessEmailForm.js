import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { sendEmailWithCode } from "./authApi";

const schema = yup
  .object({
    email: yup.string().email().required(),
  })
  .required();

export default function PasswordlessEmailForm({
  setVisible,
  setError,
  setEmailState,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = (data) => {
    setEmailState(data.email);
    sendEmailWithCode(data, setError, setVisible);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-6 ">
      <div>
        <label htmlFor="email" className="block text-sm text-gray-800 ">
          Email
        </label>
        <input
          className="input-primary"
          placeholder="email@address.com"
          type="text"
          {...register("email")}
        />
      </div>
      {errors.email && (
        <p className="text-red-700">
          {"⚠ "}
          {errors.email.message}
        </p>
      )}

      <div className="mt-6">
        <button
          disabled={!isDirty || !isValid}
          className="btn-primary"
        >
          Login
        </button>
      </div>
    </form>
  );
}
