import { useForm, Controller } from "react-hook-form";
import { blogFetcher } from "./blogApi";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useEffect, useState } from "react";

const schema = yup
  .object({
    title: yup.string().min(5).required(),
    headline: yup.string().required(),
  })
  .required();

export default function EditBlogPostForm({ handleEdit, postId }) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState(null);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const url = `http://127.0.0.1:8000/blog/details/${postId}/`;
  useEffect(() => {
    blogFetcher(url, "GET", setItems, setIsLoaded, setError, null);
  }, [url]);

  const onSubmit = (data) => {
    data.id = postId;
    handleEdit(data);
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        {items?.title && (
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
            <label htmlFor="Title" className="block text-sm text-gray-800">
              Title*
            </label>
            <input
              defaultValue={items?.title}
              className="input-primary"
              {...register("title")}
            ></input>
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
              defaultValue={items?.headline}
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
              defaultValue={items?.body || ""}
              name="body"
              render={({ field: { onChange, value } }) => (
                <ReactQuill
                  type="textarea"
                  theme="snow"
                  placeholder="enter some text..."
                  className="inpt-primary border-0 my-3 rounded-md"
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
            <button disabled={!isValid} className="btn-primary">
              Edit
            </button>
          </form>
        )}
      </>
    );
  }
}
