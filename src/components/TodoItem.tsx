import React, {FC, useState} from 'react';
import {ITodo} from "../types/types";
import {useDispatch} from "react-redux";
import {deleteTodo, updateTodo} from "../store/actions";
import Button from "./Button";
import Popup from "./popup/Popup";
import Input from "./Input";

interface TodoItemProps {
	todo: ITodo;
	setVisibleDeletePopup: any;/////////;
	changeContainer: boolean;
	visibleDeletePopup: boolean;
	cancelButtonClick: any;////////
	setChangeContainer: any////////
}

const TodoItem: FC<TodoItemProps> = ({todo, cancelButtonClick, setChangeContainer, setVisibleDeletePopup, changeContainer, visibleDeletePopup}) => {
	const [title, setTitle] = useState<string>(todo.title)
	const [completed, setCompleted] = useState<boolean>(todo.completed)
	const [editable, setEditable] = useState<boolean>(false)
	const dispatch = useDispatch();

	const removeTodo = () => {
		dispatch(deleteTodo(todo))
		console.log(todo)
		setChangeContainer(true);
		setTimeout(() => {
			setVisibleDeletePopup(false)
			setChangeContainer(false);
		}, 599);
	}

	return (
		<div className={"todoitem"}>
			<div className="todoitem__col">
				<div className={!completed ? "todoitem__title" : "todoitem__title completed"}>
					{!editable ? todo.title :
						<Input className="add-input"
							   type="text"
							   name="title"
							   value={title}
							   onChange={(e:any) => setTitle(e.target.value)}
							   placeholder={"Редактирование задачи"}
						/>}
				</div>
			</div>
			<div className="todoitem__col">
				<Input type="checkbox"
					   className="tgl tgl-flip"
					   id={`${todo.id}`}
					   checked={completed}
					   onChange={() => {
						   dispatch(updateTodo({
							   ...todo, completed: true
						   }))
						   setCompleted(!completed)
					   }}
				/>
				<label className="tgl-btn" data-tg-off="Nope" data-tg-on="Yeah!" htmlFor={`${todo.id}`}/>
				<Button className="delete" onClick={() => setVisibleDeletePopup(true)}>Удалить задачу</Button>
				<Button onClick={() => {
					dispatch(updateTodo({
							...todo, title: title
						}));
					if (editable) {setTitle(todo.title)}
					setEditable(!editable)
				}}
						className="update">{!editable ? "Редактировать задачу" : "Сохранить изменения"}
				</Button>
			</div>
			{visibleDeletePopup ?
				<Popup changeContainer={changeContainer}>
					<p>Подтвердите удаление задачи</p>
					<Button className={"delete"} onClick={removeTodo}>Удалить</Button>
					<Button className={"update"} onClick={cancelButtonClick}>Отменить</Button>
				</Popup>
				: null}
		</div>
	);
};

export default TodoItem;