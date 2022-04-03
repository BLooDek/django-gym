import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import DateTimePicker from "react-datetime-picker";
import { useEffect, useState } from "react";
import { fetchTrainers, } from "./calendarApi";

const schema = yup
  .object({
    start: yup.date().typeError("Invalid date").required(),
    end: yup
      .date()
      .typeError("Invalid date")
      .when("start", (start, schema) => {
        if (start) {
          const halfHourAfter = new Date(start.getTime() + 30 * 60000);
          return schema.min(halfHourAfter);
        }

        return schema;
      })
      .required(),
    title: yup.string().required(),
    max_members: yup
      .number()
      .required()
      .positive()
      .integer()
      .max(1000)
      .typeError("Must be a number"),
  })
  .required();

export default function AddEventForm({ event, handleAdd }) {
  const [trainers, setTrainers] = useState();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  useEffect(() => {
    fetchTrainers(setTrainers);
  }, []);

  const onSubmit = (data) => {
    handleAdd(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
        <label
          htmlFor="Title"
          className="block text-sm text-gray-800"
        >
          Title*
        </label>
        <input
          className="input-primary"
          defaultValue={event?.title}
          {...register("title")}
        ></input>
        {errors.title && (
          <p className="text-red-700">
            {"⚠ "}
            {errors.title.message}
          </p>
        )}
        <label
          htmlFor="StartDate"
          className="block text-sm text-gray-800"
        >
          Start date and time
        </label>
        <Controller
          control={control}
          name="start"
          defaultValue={new Date(event.start)}
          rules={{ valueAsDate: true }}
          render={({
            field: { onChange, onBlur, value, defaultValue, ref },
          }) => (
            <DateTimePicker
              className="input-primary border-0"
              onChange={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
        />
        {errors.start && (
          <p className="text-red-700">
            {"⚠ "}
            {errors.start.message}
          </p>
        )}

        <label
          htmlFor="EndDate"
          className="block text-sm text-gray-800"
        >
          End date and time
        </label>
        <Controller
          control={control}
          name="end"
          defaultValue={new Date(event.end)}
          rules={{ valueAsDate: true }}
          render={({
            field: { onChange, onBlur, value, defaultValue, ref },
          }) => (
            <DateTimePicker
              className="input-primary border-0"
              onChange={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
        />
        {errors.end && (
          <p className="text-red-700">
            {"⚠ "}
            {errors.end.message}
          </p>
        )}
        <label htmlFor="max_members" className="block text-sm text-gray-800 ">
          Class slots*
        </label>
        <input className="input-primary" {...register("max_members")}></input>
        {errors.max_members && (
          <p className="text-red-700">
            {"⚠ "}
            {errors.max_members.message}
          </p>
        )}

        <label htmlFor="max_members" className="block text-sm text-gray-800 ">
          Description
        </label>
        <textarea
          type="textarea"
          className="input-primary"
          {...register("description")}
        ></textarea>
        {errors.description && (
          <p className="text-red-700">
            {"⚠ "}
            {errors.description.message}
          </p>
        )}
        <label
          htmlFor="trainer"
          className="block text-sm text-gray-800 "
        >
          Trainer
        </label>
        <select className="input-primary" {...register("trainer")}>
          <option>{""}</option>
          {trainers?.map((e) => (
            <option>
              {e?.user.first_name} {e?.user.last_name}
            </option>
          ))}
        </select>
        <p className="text-xs text-right font-bold py-4">* required</p>
        <button disabled={!isDirty || !isValid} className="btn-primary">
          ADD
        </button>
      </form>
    </>
  );
}
