import React from 'react';
import { IconType } from 'react-icons';
import { AiOutlineLoading3Quarters } from '@/icons';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'w-full h-11 rounded-sm flex justify-center items-center gap-2', // Classes base
  {
    variants: {
      mode: {
        default: 'bg-primary text-primary-foreground',
        outlined: 'bg-transparent text-primary border border-primary',
      },
      loading: {
        true: 'opacity-65 disabled',
        false: '',
      },
    },
    defaultVariants: {
      mode: 'default',
      loading: false,
    },
  }
);

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  btntext: string;
  mode?: 'default' | 'outlined';
  loading?: boolean;
  icon?: React.ReactElement;
}

export default function Button({ mode, loading, ...props }: IButton) {
  return (
    <button disabled={loading} className={buttonVariants({ mode, loading })} {...props}>
      {loading ? (
        <AiOutlineLoading3Quarters className="self-center text-primary-foreground animate-spin" />
      ) : (
        <>
          {props.icon && props.icon}
          {props.btntext}
        </>
      )}
    </button>
  );
}
