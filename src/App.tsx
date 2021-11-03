import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Route} from "react-router-dom";
import {RootState} from "./store/reducers";
import {addTodo, fetchTodos} from "./store/actions";
import {Input, Popup, TodoItemPage, Button, TodoList } from "./components/index";
import './App.css';

const App = () => {
	const [title, setTitle] = useState<string>('');
	const [visibleAddPopup, setVisibleAddPopup] = useState<boolean>(false)
	const [animation, setAnimation] = useState<boolean>(false)
	const todos = useSelector(((state: RootState) => state.todoReducer.todos))
	const isLoaded = useSelector(((state: RootState) => state.todoReducer.loading))
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchTodos())
	}, [])

	const cancelButtonClick = (): void => {
		setAnimation(true)
		setTimeout(() => {
			setVisibleAddPopup(false)
			setAnimation(false)
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
			<h1>Сделано с любовью для ООО " ТОТ" :)</h1>
			<Route path="/" exact>
				<TodoList isLoaded={isLoaded}
						  todos={todos}
				/>
				<Button className="add" onClick={() => setVisibleAddPopup(true)}>Добавить задачу</Button>
				<Button className="back" onClick={() => dispatch(fetchTodos())}>Отменить все изменения</Button>

				{visibleAddPopup ?
					<Popup animation={animation}>
						<p className="todoitem__title">Добавить новую задачу</p>
						<Input className="add-input"
							   type="text"
							   name="title"
							   value={title}
							   onChange={(e: any) => setTitle(e.target.value)}
							   placeholder={"Новая задача"}
						/>
						<Button onClick={newTodo} className="add">Добавить задачу</Button>
						<Button className="update" onClick={cancelButtonClick}>Отменить</Button>
					</Popup>
					: null}
			</Route>
			<Route path='/:id' render={() => {
				return (<TodoItemPage
					cancelButtonClick={cancelButtonClick}
					todos={todos}
					animation={animation}
					setAnimation={setAnimation}
				/>)
			}}/>
		</div>
	);
}

export default App;
