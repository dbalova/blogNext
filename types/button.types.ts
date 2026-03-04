export interface ButtonProps {
  children: React.ReactNode,
  type?: 'button' | 'submit' ,
  variant?: 'primary' | 'secondary' ,
  onClick?: () => void,
  isDisabled?: boolean,
  className?: string
}
