import React from "react";

interface ITextInput extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errorMessage?: string;
}

export default function TextInput(props: ITextInput) {
  return (
    <div className="flex flex-col space-y-2">
      {props.label && (
        <label className="text-label font-medium">{props.label}</label>
      )}
      <div className="space-y-2">
        <input className="w-full h-12 border-border focus:border-primary outline-none border-[1px] px-3" {...props} />
        {props.errorMessage && <p>{props.errorMessage}</p>}
      </div>
    </div>
  );
}
