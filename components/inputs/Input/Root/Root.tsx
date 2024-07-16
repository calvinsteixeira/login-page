import React from "react";

interface IRoot {
  children: React.ReactNode;
}

export default function Root(props: IRoot) {
  return <div className="flex flex-col space-y-2">{props.children}</div>;
}
