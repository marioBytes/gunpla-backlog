interface InputProps {
  type?: string;
  value: string;
  placeholder: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = (props: InputProps) => {
  return <input {...props} />;
};

export default Input;
