import React from "react";

interface ITextInput extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errormessage?: string | null;
}

function TextInput(props: ITextInput, ref: React.Ref<HTMLInputElement>) {
  return (
    <div className="flex flex-col space-y-2">
      {props.label && (
        <label className="text-label font-medium">{props.label}</label>
      )}
      <div className="space-y-2">
        <input ref={ref} className="w-full h-12 border-border focus:border-primary outline-none border-[1px] px-3" {...props} />
        {props.errormessage && <p className="text-destructive">{props.errormessage}</p>}
      </div>
    </div>
  );
}

export default React.forwardRef<HTMLInputElement, ITextInput>(TextInput);