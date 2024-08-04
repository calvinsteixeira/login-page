import React from 'react';
import { FaEye, FaEyeSlash } from '@/icons';

interface IPassword extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {}

function Password(props: IPassword, ref: React.Ref<HTMLInputElement>) {
  const [isPasswordVisible, setIsPasswordVisible] = React.useState<boolean>(false);

  function togglePasswordVisibility() {
    setIsPasswordVisible(!isPasswordVisible);
  }

  return (
    <div className="flex items-center relative mx-auto mt-10 w-full">
      <input
        ref={ref}
        {...props}
        type={isPasswordVisible ? 'text' : 'password'}
        className="w-full h-12 border-border focus:border-primary outline-none border-[1px] px-3"
      />
      {isPasswordVisible ? (
        <FaEye onClick={togglePasswordVisibility} className="text-xl text-primary absolute inset-y-0 right-4 my-auto" />
      ) : (
        <FaEyeSlash onClick={togglePasswordVisibility} className="text-xl text-primary absolute inset-y-0 right-4 my-auto" />
      )}
    </div>
  );
}

export default React.forwardRef<HTMLInputElement, IPassword>(Password);
