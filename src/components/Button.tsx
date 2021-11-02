import React from "react";

interface ButtonProps {
	children: string;
	onClick: React.MouseEventHandler<HTMLButtonElement>;
	className: string;
}

const Button: React.FC<ButtonProps> = ({children,onClick, className}) => {
	return (
		<button className={`btn ${className}`} onClick={onClick}>
			{children}
		</button>
	);
}

export default Button;