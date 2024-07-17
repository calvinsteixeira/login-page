import React from 'react';
import { FaEye, FaEyeSlash } from '@/icons';

interface IPassword extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {}

function Password(props: IPassword, ref: React.Ref<HTMLInputElement>) {
  const [isPasswordVisible, setIsPasswordVisible] = React.useState<boolean>(false);

  function togglePasswordVisibility() {
    setIsPasswordVisible(!isPasswordVisible);
  }

  return (
    <div className="flex items-center relative w-full max-w-xs mx-auto mt-10">
      <input
        ref={ref}
        {...props}
        type={isPasswordVisible ? 'text' : 'password'}
        className="w-full h-12 border-border focus:border-primary outline-none border-[1px] px-3"
      />
      {isPasswordVisible ? (
        <FaEye onClick={togglePasswordVisibility} className="text-2xl self-center text-primary absolute inset-y-0 right-4 top-3 items-center" />
      ) : (
        <FaEyeSlash onClick={togglePasswordVisibility} className="text-2xl self-center text-primary absolute inset-y-0 right-4 top-3 items-center" />
      )}
    </div>
  );
}

export default React.forwardRef<HTMLInputElement, IPassword>(Password);
