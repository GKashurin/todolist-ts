import React from 'react';
import {ITodo} from "../types/types";
import TodoItem from "./TodoItem";

interface TodoListProps {
	todos: ITodo[];
	isLoaded: boolean;
}

const TodoList: React.FunctionComponent<TodoListProps> = ({todos, isLoaded}) => {

	return (
		<div className="todolist">
			{isLoaded ?
				todos.map(todo =>
					<TodoItem
						todo={todo}
						key={todo.id}
					/>
				) : "Loading..."
			}
		</div>
	);
};

export default TodoList;