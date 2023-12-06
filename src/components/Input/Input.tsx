import { InputHTMLAttributes } from 'react'

type InputComponent = InputHTMLAttributes<HTMLInputElement>

// eslint-disable-next-line react/jsx-props-no-spreading
const Input = (props: InputComponent) => <input type="text" {...props} />
export default Input
