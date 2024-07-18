'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ILoginForm } from '@/types/forms';
import { Input, Button } from '@/components';
import Image from 'next/image';

const loginSchema = yup
  .object({
    username: yup.string().required('campo obrigatório!'),
    password: yup.string().required('campo obrigatório!'),
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
  const submitLogin = (data: ILoginForm) => console.log(data);

  return (
    <form className="space-y-10" onSubmit={handleSubmit(submitLogin)}>
      <div className="space-y-2">
        <Input.Root>
          <Input.Label text="usuário:" />
          <Input.Generic {...register('username')} />
          <Input.ErrorMessage text={errors.username?.message} />
        </Input.Root>

        <Input.Root>
          <Input.Label text="senha:" />
          <Input.Password {...register('password')} />
          <Input.ErrorMessage text={errors.password?.message} />
        </Input.Root>
      </div>
      <Button type="submit" btntext="Entrar" />
    </form>
  );
};

export default function Home() {
  return (
    <main className="flex w-full min-h-screen flex-col items-center py-12 overflow-hidden fixed">
      <div className="w-full">
        <Image className="opacity-10" src={'/right-side-image.png'} alt="imagem" fill objectFit="cover" />
      </div>
      <div className="relative w-full space-y-10">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-left text-primary">Seja bem vindo!</h1>
          <p className="text-muted text-sm">
            Por favor, insira seus dados para <span className="font-bold">logar</span>
          </p>
        </div>
        <div className='space-y-4'>
          <LoginForm />
          <Button mode="outlined" btntext="Entrar com o Google" />
        </div>
        <p className="text-sm text-center mt-10">
          Não possui uma conta? <span className="text-primary font-semibold">Registre-se</span>
        </p>
      </div>
    </main>
  );
}
