import React, {FC} from 'react';
import "./Popup.css"

interface PopupProps {
	changeContainer: boolean;
}

const Popup: FC<PopupProps> = ({changeContainer, children}) => {
	return (
		<div className="popup">
			<div className={!changeContainer ? "popup__container" : "popup__container-animBack"}>
				{children}
			</div>
		</div>
	);
};

export default Popup;