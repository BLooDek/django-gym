import { loginWithPassword } from "./authApi";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import YupPassword from "yup-password";
YupPassword(yup);

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required();

export default function PasswordLoginForm({ setError, dispatch }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = (data) => {
    loginWithPassword(data, setError, dispatch);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
      <div>
        <label
          htmlFor="email"
          className="block text-sm text-gray-800 dark:text-gray-200"
        >
          Email
        </label>
        <input
          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:bg-gray-100 focus:ring-purple-second focus:outline-none focus:ring focus:ring-opacity-40"
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
      <div className="mt-4">
        <div className="flex items-center justify-between">
          <label
            htmlFor="password"
            className="block text-sm text-gray-800 dark:text-gray-200"
          >
            Password
          </label>
          <a className="text-xs text-gray-600 dark:text-gray-400 hover:underline">
            Forgot Password?
          </a>
        </div>
        <input
          name="password"
          type="password"
          {...register("password")}
          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:bg-gray-100  focus:ring-purple-second focus:outline-none focus:ring focus:ring-opacity-40"
        />
      </div>
      {errors.password && (
        <p className="text-red-700">
          {"⚠ "}
          {errors.password.message}
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
