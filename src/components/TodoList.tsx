import React, {useState} from 'react';
import {ITodo} from "../types/types";
import TodoItem from "./TodoItem";

interface TodoListProps {
	todos: ITodo[];
	changeContainer: boolean;
	setChangeContainer: any;////////
}

const TodoList: React.FunctionComponent<TodoListProps> = ({todos, changeContainer, setChangeContainer}) => {
	const [visibleDeletePopup, setVisibleDeletePopup] = useState<boolean>(false)
	const cancelButtonClick = ():void => {
		setChangeContainer(true);
		setTimeout(() => {
			setVisibleDeletePopup(false)
			setChangeContainer(false);
		}, 599);
	};
	return (
		<div className="todolist">
			{todos.map(todo =>
				<TodoItem
					todo={todo}
					key={todo.id}
					cancelButtonClick={cancelButtonClick}
					changeContainer={changeContainer}
					visibleDeletePopup={visibleDeletePopup}
					setVisibleDeletePopup={setVisibleDeletePopup}
					setChangeContainer={setChangeContainer}
				/>
			)}
		</div>
	);
};

export default TodoList;