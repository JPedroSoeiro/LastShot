import React from "react";
import "../utils/Crud.css";

interface CustomInputProps {
  type: string;
  name: string;
  placeholder?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomEdit: React.FC<CustomInputProps> = ({
  type,
  name,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <div className="custom-input-container">
      <input
        className="custom-input-field"
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default CustomEdit;
