import {ADD_TODO, DELETE_TODO, SET_LOADED, SET_TODOS, UPDATE_TODO} from "../actions";

interface TodoState {
	todos: any[];
	loading: boolean;
}

interface TodoAction {
	type: string;
	payload?: any
}

const initialState: TodoState = {
	todos: [],
	loading: false
}


export const todoReducer = (state = initialState, action: TodoAction): TodoState => {
	switch (action.type) {
		case SET_TODOS:
			return {
				...state,
				todos: action.payload,
				loading: true,
			};

		case SET_LOADED:
			return {
				...state,
				loading: action.payload,
			};
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