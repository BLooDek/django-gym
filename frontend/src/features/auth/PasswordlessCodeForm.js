import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {getToken} from './authApi'

const schema = yup
  .object({
    token: yup
      .string()
      .matches(/^\d+$/, "Code allows only numbers")
      .length(6, "Code must be 6 characters long")
      .required(),
  })
  .required();

export default function PasswordlessCodeForm({ setError, dispatch, email }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = (e) => {
    const data = {
      email: email,
      token: e.token,
    };
    getToken(data, setError, dispatch)
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-6 ">
      <div>
        <label
          htmlFor="email"
          className="block text-sm text-gray-800 dark:text-gray-200"
        >
          Code
        </label>
        <input
          name="token"
          type="text"
          {...register("token")}
          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:bg-gray-100  focus:ring-purple-second focus:outline-none focus:ring focus:ring-opacity-40"
        />
      </div>
      {errors.token && (
        <p className="text-red-700">
          {"⚠ "}
          {errors.token.message}
        </p>
      )}

      <div className="mt-6">
        <button
          disabled={!isDirty || !isValid}
          className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-main rounded-md hover:bg-purple-second focus:bg-purple-second disabled:bg-gray-600"
        >
          Enter magic code
        </button>
      </div>
    </form>
  );
}
