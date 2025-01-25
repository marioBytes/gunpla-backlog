import React from 'react';

interface SelectProps {
  options: OptionProps[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
}

interface OptionProps {
  label: string;
  value: string;
}

export const Option = (props: OptionProps) => {
  return (
    <option key={props.value} value={props.value} className="text-black">
      {props.label}
    </option>
  );
};

const Select = (props: SelectProps) => {
  return (
    <select {...props}>
      {props.options.map((option) => (
        <Option key={option.value} value={option.value} label={option.label} />
      ))}
    </select>
  );
};

export default Select;
