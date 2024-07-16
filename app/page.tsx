"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ILoginForm } from "@/types/forms";
import { TextInput } from "@/components";

const loginSchema = yup
  .object({
    username: yup.string().required(),
    password: yup.string().required(),
  })
  .required();

const LoginForm = (): React.ReactNode => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const onSubmit = (data: ILoginForm) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4">
        <TextInput
          label="usuário:"
          errorMessage={errors.username?.message}
          {...register("username")}
        />
        <TextInput
          label="senha:"
          errorMessage={errors.password?.message}
          {...register("password")}
        />
      </div>
      {/* <input type="submit" /> */}
    </form>
  );
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-16">
      <div className="w-full space-y-10">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-left text-primary">
            Seja bem vindo!
          </h1>
          <p className="text-muted text-sm">
            Por favor, insira seus dados para{" "}
            <span className="font-bold">logar</span>
          </p>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
