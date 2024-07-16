import React from "react";
import { AiOutlineLoading3Quarters } from "@/icons";

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  btnText: string;
  loading?: boolean;
}

export default function Button(props: IButton) {
  return (
    <button
      disabled={props.loading}
      className={`w-full ${props.loading ? 'opacity-65' : ''} bg-primary text-primary-foreground h-11 rounded-sm flex justify-center items-center`}
      {...props}
    >
      {props.loading ? (
        <AiOutlineLoading3Quarters className="self-center text-primary-foreground animate-spin" />
      ) : (
        props.btnText
      )}
    </button>
  );
}

// ${props.loading ? 'animate-spin' : ''}
