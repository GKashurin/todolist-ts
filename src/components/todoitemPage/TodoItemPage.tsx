import React, {FC, useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {useHistory} from 'react-router-dom'
import {ITodo} from "../../types/types";
import {Input, Button, Popup} from "../index"
import {deleteTodo, updateTodo} from "../../store/actions";
import "./TodoitemPage.css"

interface TodoItemPageProps {
	todos: ITodo[];
	setAnimation: React.Dispatch<React.SetStateAction<boolean>>;
	animation: boolean;
	cancelButtonClick: any
}

const TodoItemPage: FC<TodoItemPageProps> = ({cancelButtonClick, todos,animation, setAnimation}) => {
	const [pathname, setPathname] = useState<string>("")
	const [visibleDeletePopup, setVisibleDeletePopup] = useState<boolean>(false)
	const [title, setTitle] = useState<string>("")
	const [completed, setCompleted] = useState<boolean>(todos[0].completed)
	const [editable, setEditable] = useState<boolean>(false)
	const todo = todos.filter(todo => {
		return todo.id === parseInt(pathname)
	})

	const history: any = useHistory()

	useEffect(() => {
		setPathname(history.location.pathname.slice(1))
		if (todo.length > 0) {
			setCompleted(todo[0].completed)
		}
		if (todo.length > 0) {
			setTitle(todo[0].title)
		}
	}, [])
	const dispatch = useDispatch();
	const removeTodo = () => {
		setAnimation(true)

		setTimeout(() => {
			dispatch(deleteTodo(todo[0]))
			setAnimation(false)
			setVisibleDeletePopup(false)
			history.push("/")
		}, 599);
	}

	return (
		<div className="todoitemPage">
			{
				todos.map((todo) => parseInt(pathname) === todo.id ?
					<div className="todoitem" key={todo.id}>
						<div className={!completed ? "todoitem__title" : "todoitem__title completed"}>
							{!editable ? todo.title :
								<Input className="add-input"
									   type="text"
									   name="title"
									   value={title}
									   onChange={(e: any) => setTitle(e.target.value)}
									   placeholder={"Редактирование задачи"}
								/>}
						</div>
						<div className="todoitem__col">
							<Input type="checkbox"
								   className="tgl tgl-flip"
								   id={`${todo.id}`}
								   checked={completed}
								   onChange={() => {
									   dispatch(updateTodo({
										   ...todo, completed: !completed
									   }))
									   setCompleted(!completed)
								   }}
							/>
							<label className="tgl-btn" data-tg-off="Нет" data-tg-on="Да" htmlFor={`${todo.id}`}/>
							<Button className="delete" onClick={() => setVisibleDeletePopup(true)}>Удалить
								задачу</Button>
							<Button onClick={() => {
								dispatch(updateTodo({
									...todo, title: title
								}));
								if (editable) {
									setTitle(title)
								}
								setEditable(!editable)
							}}
									className="update">{!editable ? "Редактировать задачу" : "Сохранить изменения"}
							</Button>
							{visibleDeletePopup ?
								<Popup animation={animation}>
									<p className="todoitem__title">Подтвердите удаление задачи</p>
									<Button className="delete" onClick={removeTodo}>Удалить</Button>
									<Button className="update"
											onClick={() => {
												cancelButtonClick()
												setTimeout(() => setVisibleDeletePopup(false),599)
											}
											}>Отменить</Button>
								</Popup>
								: null}
						</div>
					</div>
					: null)
			}
			<Button className="back" onClick={() => history.push("/")}>Назад</Button>
		</div>
	);
};

export default TodoItemPage;

