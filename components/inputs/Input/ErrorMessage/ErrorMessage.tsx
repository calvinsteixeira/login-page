import React from "react";

interface IErrorMessage {
  text: string | undefined;
}

export default function ErrorMessage(props: IErrorMessage) {
  return <p className="text-destructive">{props.text}</p>;
}
