import React from 'react'

interface IGeneric extends React.InputHTMLAttributes<HTMLInputElement> {}

function Generic(props: IGeneric, ref: React.Ref<HTMLInputElement>) {
  return (
    <input ref={ref} {...props} className="w-full h-12 border-border focus:border-primary outline-none border-[1px] px-3"/>
  )
}

export default React.forwardRef<HTMLInputElement, IGeneric>(Generic);