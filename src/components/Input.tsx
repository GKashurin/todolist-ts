import React from "react";

interface InputProps {
	className: string;
	type: string;
	name?: string;
	value?: string;
	onChange: any;//////////
	placeholder?: string;
	id?: string;
	checked?: boolean
}

const Input: React.FC<InputProps> = ({className, value, onChange, name, type, placeholder, checked, id}) => {
	return (
		<input className={`input ${className}`}
			   value={value}
			   onChange={onChange}
			   name={name}
			   type={type}
			   placeholder={placeholder}
			   checked={checked}
			   id={id}
		/>
	);
}

export default Input;
