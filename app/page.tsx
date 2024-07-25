"use client";

import React from "react";
import {ToastContainer, toast, Bounce} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword
} from "firebase/auth";
import {auth, firestore, doc, setDoc, getDoc, firebaseErrors, googleProvider, signInWithPopup} from "@/utils/firebase";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {ILoginForm, IRegisterForm} from "@/types/forms";
import {Input, Button} from "@/components";
import {FcGoogle, MdOutlineKeyboardArrowRight} from "@/icons";
// import { registerWithEmailAndPassword } from "@/app/api/auth/route";

type FormModeType = "login" | "register";

const LoginForm = (): React.ReactNode => {
    const [loading, setLoading] = React.useState<boolean>(false);

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
        formState: {errors},
    } = useForm({
        resolver: yupResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const submitLogin = async (data: ILoginForm) => {
        setLoading(true)
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
            setLoading(false)

            if (error) {
                console.log('Login error: ', error.message);
                let errorMessage = firebaseErrors[`${error.code}`] || "Falha na autenticação"

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
    const submitLoginWithGoogle = async () => {
        setLoading(true)

        try {
            const result = await signInWithPopup(auth, googleProvider)
            const user = result.user;
            const docRef = doc(firestore, 'users', user.uid)
            const docSnap = await getDoc(docRef)

            if (!docSnap.exists()) {
                await setDoc(docRef, {
                    name: user.displayName,
                    createdAt: new Date()
                });

                // redirect user

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

    }

    return (
        <>
            <form className="space-y-10" onSubmit={handleSubmit(submitLogin)}>
                <div className="space-y-2">
                    <Input.Root>
                        <Input.Label text="usuário:"/>
                        <Input.Generic {...register("email")} />
                        <Input.ErrorMessage text={errors.email?.message}/>
                    </Input.Root>

                    <Input.Root>
                        <Input.Label text="senha:"/>
                        <Input.Password {...register("password")} />
                        <Input.ErrorMessage text={errors.password?.message}/>
                    </Input.Root>
                </div>
                <Button loading={loading} type="submit" btntext="Entrar"/>
            </form>
            <Button
                onClick={() => submitLoginWithGoogle()}
                loading={loading}
                icon={<FcGoogle className="text-xl"/>}
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
            email: yup.string().email('Digite um email válido').required("campo obrigatório"),
            name: yup.string().required("campo obrigatório"),
            password: yup.string().min(6, 'A senha deve ter pelo menos 6 digitos').required("campo obrigatório"),
            confirmPassword: yup.string()
                .oneOf([yup.ref('password')], 'As senhas devem coincidir.')
                .required('campo obrigatório')
        })
        .required();

    const {
        register,
        handleSubmit,
        reset: resetRegisterForm,
        formState: {errors},
    } = useForm({
        resolver: yupResolver(registerSchema),
        defaultValues: {
            email: "calvingsx@gmail.com",
            name: "calvin",
            password: "teste123",
            confirmPassword: "teste123"
        }
    });
    const submitRegister = async (data: IRegisterForm) => {
        setLoading(true)

        try {
            const result = await fetch('/api/auth', {
                method: 'POST',
                body: JSON.stringify(data)
            })

            console.log(result)
        } catch(error: any) {
            console.log('Client error: ', error)
        }
        // try {
        //     const userCredential = await createUserWithEmailAndPassword(
        //         auth,
        //         data.email,
        //         data.password
        //     );
        //
        //     if (userCredential.user) {
        //         const user = userCredential.user;
        //
        //         await setDoc(doc(firestore, "users", user.uid), {
        //             name: data.name,
        //             createdAt: new Date(),
        //         });
        //
        //         toast.success("Cadastro realizado com sucesso", {
        //             toastId: "customId",
        //             position: "top-right",
        //             autoClose: 4000,
        //             hideProgressBar: false,
        //             closeOnClick: true,
        //             pauseOnHover: true,
        //             draggable: true,
        //             progress: undefined,
        //             theme: "colored",
        //             transition: Bounce,
        //         });
        //
        //         resetRegisterForm({
        //             email: "",
        //             password: "",
        //             name: "",
        //             confirmPassword: ""
        //         })
        //         setLoading(false)
        //     }
        // } catch (error: any) {
        //     setLoading(false)
        //
        //     if (error) {
        //         console.log('Register error: ', error.message);
        //         let errorMessage = firebaseErrors[`${error.code}`] || "Falha no cadastro"
        //
        //         toast.error(errorMessage, {
        //             toastId: "customId",
        //             position: "top-right",
        //             autoClose: 4000,
        //             hideProgressBar: false,
        //             closeOnClick: true,
        //             pauseOnHover: true,
        //             draggable: true,
        //             progress: undefined,
        //             theme: "colored",
        //             transition: Bounce,
        //         });
        //     } else {
        //         toast.error("Falha no servidor", {
        //             toastId: "customId",
        //             position: "top-right",
        //             autoClose: 4000,
        //             hideProgressBar: false,
        //             closeOnClick: true,
        //             pauseOnHover: true,
        //             draggable: true,
        //             progress: undefined,
        //             theme: "colored",
        //             transition: Bounce,
        //         });
        //     }
        // }
    };

    return (
        <form className="space-y-10" onSubmit={handleSubmit(submitRegister)}>
            <div className="space-y-2">
                <Input.Root>
                    <Input.Label text="name:"/>
                    <Input.Generic {...register("name")} />
                    <Input.ErrorMessage text={errors.name?.message}/>
                </Input.Root>

                <Input.Root>
                    <Input.Label text="email:"/>
                    <Input.Generic {...register("email")} />
                    <Input.ErrorMessage text={errors.email?.message}/>
                </Input.Root>

                <Input.Root>
                    <Input.Label text="senha:"/>
                    <Input.Password {...register("password")} />
                    <Input.ErrorMessage text={errors.password?.message}/>
                </Input.Root>

                <Input.Root>
                    <Input.Label text="Confirmação da senha:"/>
                    <Input.Password {...register("confirmPassword")} />
                    <Input.ErrorMessage text={errors.confirmPassword?.message}/>
                </Input.Root>
            </div>
            <Button loading={loading} type="submit" btntext="Cadastrar"/>
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
            <ToastContainer/>
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
                    {formMode == "login" ? <LoginForm/> : <RegisterForm/>}
                </div>
            </div>
        </main>
    );
}
