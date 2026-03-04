export interface FieldProps {
  label: string,
  id: string,
  type?: string,
  value: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
  required?: boolean,
  isTextarea?: boolean,
  placeholder?: string
}