import axios from 'axios';

export const ADD_TODO = "ADD_TODO";
export const DELETE_TODO = "DELETE_TODO";
export const UPDATE_TODO = "UPDATE_TODO";
export const SET_TODOS = "SET_TODOS";
export const SET_LOADED = "SET_LOADED";

export const addTodo = (todo: {id: number; title: string; completed: boolean}) => ({type: ADD_TODO, payload: todo})
export const deleteTodo = (todo: {id: number; title: string; completed: boolean}) => ({type: DELETE_TODO, payload: todo})
export const updateTodo = (todo: {id: number; title: string; completed: boolean}) => ({type: UPDATE_TODO, payload: todo})

export const setLoaded = (payload: boolean) => ({type: SET_LOADED, payload});

export const fetchTodos = () => (dispatch: any) => {dispatch({type: SET_LOADED, payload: false});

	axios
		.get(`https://todolist-ts-hqwo6fwce-gkashurin.vercel.app/todos.json`)
		.then((response: any) => dispatch(setTodos(response.data)))

};
export const setTodos = (todos: any[]) => ({type: SET_TODOS, payload: todos})