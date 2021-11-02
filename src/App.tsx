import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import TodoList from "./components/TodoList";
import Button from "./components/Button";
import {RootState} from "./store/reducers";
import './App.css';
import {addTodo} from "./store/actions";
import Input from "./components/Input";
import Popup from "./components/popup/Popup";

const App = () => {
	const [title, setTitle] = useState<string>('');
	const [visibleAddPopup, setVisibleAddPopup] = useState<boolean>(false)
	const [changeContainer, setChangeContainer] = useState<boolean>(false); //меняет класс у popup__container. Отвечает за анимацию закрытия
	const todos = useSelector(((state: RootState) => state.todoReducer.todos))
	// const removedTodos = useSelector(((state: RootState) => state.todoReducer.removedTodos))
	const dispatch = useDispatch();


	const cancelButtonClick = (): void => {
		setChangeContainer(true);
		setTimeout(() => {
			setVisibleAddPopup(false)
			setChangeContainer(false);
		}, 599);
	};

	const newTodo = (e: React.MouseEvent<HTMLButtonElement>): void => {
		e.preventDefault();
		dispatch(addTodo({
			id: Date.now(),
			title: title,
			completed: false
		}));
		setTitle('')
		cancelButtonClick()
	}
	return (
		<div className="App">
			<TodoList
				setChangeContainer={setChangeContainer}
				todos={todos}
				changeContainer={changeContainer}
			/>
			<Button className="add" onClick={() => setVisibleAddPopup(true)}>Добавить задачу</Button>
			{visibleAddPopup ?
				<Popup changeContainer={changeContainer}>
					<p>Добавить новую задачу</p>
					<Input className="add-input"
						   type="text"
						   name="title"
						   value={title}
						   onChange={(e: any) => setTitle(e.target.value)}
						   placeholder={"Новая задача"}
					/>
					<Button onClick={newTodo} className="add">Добавить задачу</Button>
					<Button className={"update"} onClick={cancelButtonClick}>Отменить</Button>
				</Popup>
				: null}
			{/*{removedTodos.map(todo => <TodoItem todo={todo}/> )}*/}
		</div>
	);
}

export default App;
