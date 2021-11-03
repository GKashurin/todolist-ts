import React from 'react';
import {ITodo} from "../../types/types";
import {TodoItem} from "../index";
import {useHistory} from "react-router-dom"

interface TodoListProps {
	todos: ITodo[];
	isLoaded: boolean;
}

const TodoList: React.FunctionComponent<TodoListProps> = ({todos, isLoaded}) => {
const history = useHistory();
	return (
		<div className="todolist">
			{isLoaded ?
				todos.map(todo =>
					<TodoItem
						onClick={(todo) => history.push("/" + todo.id)}
						todo={todo}
						key={todo.id}
					/>

				) : "Loading..."
			}
		</div>
	);
};

export default TodoList;