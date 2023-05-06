import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

function UserRegistrationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    axios
      .post("http://localhost:4000/api/users", data)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="name">Name:</label>
      <input {...register("name", { required: true })} />
      {errors.name && <span>This field is required</span>}

      <label htmlFor="age">Age:</label>
      <input type="number" {...register("age", { required: true })} />
      {errors.age && <span>This field is required</span>}

      <label htmlFor="sex">Sex:</label>
      <select {...register("sex", { required: true })}>
        <option value="">Select...</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
      {errors.sex && <span>This field is required</span>}

      <button type="submit">Submit</button>
    </form>
  );
}

export default UserRegistrationForm;
