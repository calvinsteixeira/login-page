"use client";

import React from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/utils/firebase";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ILoginForm, IRegisterForm } from "@/types/forms";
import { Input, Button } from "@/components";
import { FaGoogle, MdOutlineKeyboardArrowRight } from "@/icons";

type FormModeType = "login" | "register";

const LoginForm = (): React.ReactNode => {
  const loginSchema = yup
    .object({
      email: yup
        .string()
        .email("digite um email válido")
        .required("campo obrigatório!"),
      password: yup.string().required("campo obrigatório!"),
    })
    .required();

  const {
    register,
    handleSubmit,
    reset: resetLoginForm,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "calvingsx@gmail.com",
      password: "@Calvintex7",
    },
  });

  const submitLogin = async (data: ILoginForm) => {
    try {
      const result = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      if(result.user.refreshToken) {
        // redirect user
      } else {
        throw new Error
      }
    } catch (error: any) {
      if (error) {
        toast.error("E-mail ou senha incorretos", {
          toastId: "customId",
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce        
        });
      }
    }
  };

  return (
    <>
      <form className="space-y-10" onSubmit={handleSubmit(submitLogin)}>
        <div className="space-y-2">
          <Input.Root>
            <Input.Label text="usuário:" />
            <Input.Generic {...register("email")} />
            <Input.ErrorMessage text={errors.email?.message} />
          </Input.Root>

          <Input.Root>
            <Input.Label text="senha:" />
            <Input.Password {...register("password")} />
            <Input.ErrorMessage text={errors.password?.message} />
          </Input.Root>
        </div>
        <Button type="submit" btntext="Entrar" />
      </form>
      <Button
        icon={<FaGoogle className="text-primary" />}
        mode="outlined"
        btntext="Entrar com o Google"
      />
    </>
  );
};

const RegisterForm = (): React.ReactNode => {
  const registerSchema = yup
    .object({
      email: yup.string().required("campo obrigatório!"),
      name: yup.string().required("campo obrigatório!"),
      username: yup.string().required("campo obrigatório!"),
      password: yup.string().required("campo obrigatório!"),
    })
    .required();

  const {
    register,
    handleSubmit,
    reset: resetRegisterForm,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });
  const submitRegister = (data: IRegisterForm) => console.log(data);

  return (
    <form className="space-y-10" onSubmit={handleSubmit(submitRegister)}>
      <div className="space-y-2">
        <Input.Root>
          <Input.Label text="email:" />
          <Input.Generic {...register("email")} />
          <Input.ErrorMessage text={errors.username?.message} />
        </Input.Root>

        <Input.Root>
          <Input.Label text="nome:" />
          <Input.Generic {...register("name")} />
          <Input.ErrorMessage text={errors.username?.message} />
        </Input.Root>

        <Input.Root>
          <Input.Label text="username:" />
          <Input.Generic {...register("username")} />
          <Input.ErrorMessage text={errors.username?.message} />
        </Input.Root>

        <Input.Root>
          <Input.Label text="senha:" />
          <Input.Password {...register("password")} />
          <Input.ErrorMessage text={errors.password?.message} />
        </Input.Root>
      </div>
      <Button type="submit" btntext="Cadastrar" />
    </form>
  );
};

export default function Home() {
  const [formMode, setFormMode] = React.useState<FormModeType>("login");

  function handleFormMode(mode: FormModeType) {
    setFormMode(mode);
  }

  return (
    <main className="flex w-full min-h-screen flex-col items-center py-12">
      <ToastContainer />
      {/* <div className="hidden w-full h-20 bg-primary">
        <Image className="opacity-10" src={'/right-side-image.png'} alt="imagem" width={200} height={200} />
      </div> */}
      <div className="w-full space-y-10">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-left text-primary">
            Seja bem vindo!
          </h1>
          <p className="text-muted text-sm">Insira seus dados para continuar</p>
        </div>
        <div className="w-full flex mb-12 flex-row justify-around gap-2">
          <span
            onClick={() => handleFormMode("login")}
            className={`relative flex-1 flex justify-center items-center font-semibold px-4 py-3 text-primary gap-4`}
          >
            {formMode === "login" && (
              <MdOutlineKeyboardArrowRight
                size={22}
                className="animate-bounce absolute left-[10%] text-md"
              />
            )}
            Entrar
          </span>
          <span
            onClick={() => handleFormMode("register")}
            className={`relative flex-1 flex justify-center items-center font-semibold px-4 py-3 text-primary gap-4`}
          >
            {formMode === "register" && (
              <MdOutlineKeyboardArrowRight
                size={22}
                className="animate-bounce absolute left-[1%] text-md"
              />
            )}
            Cadastrar
          </span>
        </div>
        <div className="space-y-4">
          {formMode == "login" ? <LoginForm /> : <RegisterForm />}
        </div>
      </div>
    </main>
  );
}
