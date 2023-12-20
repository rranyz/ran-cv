/* eslint-disable react/jsx-props-no-spreading */
import React, { ButtonHTMLAttributes } from 'react'
import style from './Button.module.css'

interface BtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: React.ReactNode
  size?: string
  color?: string
}

const Button = ({
  label = 'Click me',
  size = '',
  color = '',
  ...props
}: BtnProps) => (
  <button type="button" className={[style.btn, size, color].join()} {...props}>
    {label}
  </button>
)

export default Button
