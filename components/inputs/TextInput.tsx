import React from "react";

interface TextInput extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errorMessage?: string;
}

export default function TextInput(props: TextInput) {
  return (
    <div className="space-y-2">
      {props.label && <label className="text-label font-medium">{props.label}</label>}
      <input />
      {props.errorMessage && <p>{props.errorMessage}</p>}
    </div>
  );
}
