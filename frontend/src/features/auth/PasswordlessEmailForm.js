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
          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:bg-gray-100  focus:ring-purple-second focus:outline-none focus:ring focus:ring-opacity-40"
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
          className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-main rounded-md hover:bg-purple-second focus:bg-purple-second disabled:bg-gray-600"
        >
          Login
        </button>
      </div>
    </form>
  );
}
