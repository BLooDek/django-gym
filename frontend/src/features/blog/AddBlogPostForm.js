import { useForm, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const schema = yup
  .object({
    title: yup.string().min(10).required(),
    headline: yup.string().required(),
  })
  .required();

export default function AddBlogPostForm({ handleAdd }) {
  const userId = useSelector((state) => state.isLogged.credentials?.["id"]);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = (data) => {
    data.author = userId;
    data.published_at = new Date();
    data.is_published = true;
    handleAdd(data);
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
        <label htmlFor="Title" className="block text-sm text-gray-800">
          Title*
        </label>
        <input className="input-primary" {...register("title")}></input>
        {errors.title && (
          <p className="text-red-700">
            {"⚠ "}
            {errors.title.message}
          </p>
        )}
        <label htmlFor="Headline" className="block text-sm text-gray-800 ">
          Headline*
        </label>

        <textarea
          type="textarea"
          className="input-primary"
          {...register("headline")}
        ></textarea>
        {errors.headline && (
          <p className="text-red-700">
            {"⚠ "}
            {errors.headline.message}
          </p>
        )}

        <label htmlFor="Body" className="block text-sm text-gray-800 ">
          Body
        </label>
        <Controller
          control={control}
          name="body"
          render={({ field: { onChange, value } }) => (
            <ReactQuill
              type="textarea"
              theme="snow"
              placeholder="enter some text..."
              className="border-0 my-3 rounded-md"
              onChange={onChange}
              value={value}
            />
          )}
        />

        {errors.body && (
          <p className="text-red-700">
            {"⚠ "}
            {errors.body.message}
          </p>
        )}

        <p className="text-xs text-right font-bold py-4">* required</p>
        <button disabled={!isDirty || !isValid} className="btn-primary">
          ADD
        </button>
      </form>
    </>
  );
}
