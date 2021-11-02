import {ADD_TODO, DELETE_TODO, UPDATE_TODO} from "../actions";

interface TodoState {
	todos: any[];
	loading: boolean;
	// removedTodos: any[];
}

interface TodoAction {
	type: string;
	payload?: any//////////
}

const initialState: TodoState = {
	todos: [
		{
			id: 1,
			title: "Выучить реакт",
			completed: true
		},
		{
			id: 2,
			title: "Выучить тайпскрипт",
			completed: false
		},
		{
			id: 3,
			title: "Выучить метод строки parseInt",
			completed: true
		},
		{
			id: 4,
			title: "Научиться решать числа Фибоначчи",
			completed: false
		},
	],
	// removedTodos: [],
	loading: false
}


export const todoReducer = (state = initialState, action: TodoAction): TodoState => {
	switch (action.type) {
		case ADD_TODO:
			return {
				...state,
				todos: [...state.todos, action.payload]
			}
		case DELETE_TODO:
			return {
				...state,
				todos: [...state.todos.filter(todo => {
					return todo.id !== action.payload.id
				})]
				// removedTodos: [...state.removedTodos, ...state.todos.filter(todo => {
				// 	return todo.id === action.payload
				// })]
			}
		case UPDATE_TODO:
			state.todos.map(todo => {
				if (todo.id === action.payload.id) {
					todo.title = action.payload.title
					todo.completed = action.payload.completed
				}
				return todo
			})
			return state
		default: return state
	}
}