import React from 'react'

interface IPassword extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {}

function Password(props: IPassword, ref: React.Ref<HTMLInputElement>) {
  return (
    <input ref={ref} {...props} type="password" className="w-full h-12 border-border focus:border-primary outline-none border-[1px] px-3"/>
  )
}

export default React.forwardRef<HTMLInputElement, IPassword>(Password);