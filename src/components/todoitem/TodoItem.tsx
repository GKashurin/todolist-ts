import React, {FC} from 'react';
import {ITodo} from "../../types/types";
import "./Todoitem.css"

interface TodoItemProps {
	todo: ITodo;
	onClick: (todo: ITodo) => void;
}

const TodoItem: FC<TodoItemProps> = ({todo, onClick}) => {
	return (
		<div onClick={() => onClick(todo)} className={!todo.completed ? "todoitem__title" : "todoitem__title completed"}>
			{todo.title}
		</div>
	);
};

export default TodoItem;