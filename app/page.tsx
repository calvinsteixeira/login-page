"use client";

import React from "react";
import { FirebaseError } from "@firebase/util";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth, firestore, doc, setDoc, firebaseErrors } from "@/utils/firebase";
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
      email: "",
      password: "",
    },
  });

  const submitLogin = async (data: ILoginForm) => {
    try {
      const result = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      if (result.user.refreshToken) {
        // redirect user
        resetLoginForm({
          email: "",
          password: ""
        })
      } 
    } catch (error: any) {
      resetLoginForm({
        email: "",
        password: ""
      })
      if (error) {
        console.log('Login error: ', error.message);
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
          transition: Bounce,
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
  const [loading, setLoading] = React.useState<boolean>(false);
  const registerSchema = yup
    .object({
      email: yup.string().required("campo obrigatório!"),
      name: yup.string().required("campo obrigatório!"),
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
    defaultValues: {
      email: "calvinteixeira@hotmail.com",
      name: "calvin",
      password: "calvinst"
    }
  });
  const submitRegister = async (data: IRegisterForm) => {
    setLoading(true)
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      if (userCredential.user) {
        const user = userCredential.user;

        await setDoc(doc(firestore, "users", user.uid), {
          name: data.name,
          createdAt: new Date(),
        });

        toast.success("Usuário cadastrado com sucesso", {
          toastId: "customId",
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });

        resetRegisterForm({
          email: "",
          password: "",
          name: ""
        })
        setLoading(false)
      }
    } catch (error: any) {
      setLoading(false)

      if (error) {
        console.log('Register error: ', error.message);
        let errorMessage = firebaseErrors[`${error.code}`] || "Falha no cadastro"

        toast.error(errorMessage, {
          toastId: "customId",
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      } else {
        toast.error("Falha no servidor", {
          toastId: "customId",
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      }
    }
  };

  return (
    <form className="space-y-10" onSubmit={handleSubmit(submitRegister)}>
      <div className="space-y-2">
        <Input.Root>
          <Input.Label text="name:" />
          <Input.Generic {...register("name")} />
          <Input.ErrorMessage text={errors.name?.message} />
        </Input.Root>

        <Input.Root>
          <Input.Label text="email:" />
          <Input.Generic {...register("email")} />
          <Input.ErrorMessage text={errors.name?.message} />
        </Input.Root>

        <Input.Root>
          <Input.Label text="senha:" />
          <Input.Password {...register("password")} />
          <Input.ErrorMessage text={errors.password?.message} />
        </Input.Root>
      </div>
      <Button loading={loading} type="submit" btntext="Cadastrar" />
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
