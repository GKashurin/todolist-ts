import React, {FC} from 'react';
import "./Popup.css"

interface PopupProps {
	animation: boolean
}

const Popup: FC<PopupProps> = ({animation, children}) => {
	return (
		<div className="popup">
			<div className={!animation ? "popup__container" : "popup__container-animBack"}>
				{children}
			</div>
		</div>
	);
};

export default Popup;