import React, {FC} from 'react';
import "./Popup.css"

interface PopupProps {
	// changeContainer: boolean;
}

const Popup: FC<PopupProps> = ({children}) => {
	return (
		<div className="popup">
			<div className={"popup__container" }>
				{children}
			</div>
		</div>
	);
};

export default Popup;