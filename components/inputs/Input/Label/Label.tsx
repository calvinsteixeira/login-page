import React from 'react'

interface ILabel {
  text: string
}

export default function Label(props: ILabel) {
  return (
    <label className="text-label font-medium">{props.text}</label>
  )
}