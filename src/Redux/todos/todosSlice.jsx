import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axios'

const api_url = import.meta.env.VITE_APP_API_BASE_ENDPOINT + '/todos/';

export const getTodosAsync = createAsyncThunk('todos/getTodosAsync', async () => {
	return ((await axios(api_url)).data)
})

export const addTodoAsync = createAsyncThunk('todos/addTodoAsync', async (data) => {
	return ((await axios.post(api_url, data)).data)
})

export const deleteTodoAsync = createAsyncThunk('todos/deleteTodoAsync', async (id) => {
	await axios.delete(api_url + id)
	return id
})

export const clearCompletedAsync = createAsyncThunk('todos/clearCompletedAsync', async () => {
	await axios.delete(api_url)
})

export const toggleTodoAsync = createAsyncThunk('todos/toggleTodoAsync', async (data) => {
	return ((await axios.patch(api_url + data.id, data)).data)
})

export const toggleAllAsync = createAsyncThunk('todos/toggleAllAsync', async (data) => {
	return ((await axios.post((api_url + 'toggleAll'), data)).data)
})

export const editTodoAsync = createAsyncThunk('todos/editTodoAsync', async (data) => {
	return ((await axios.post(api_url + data.id, data)).data)
})

export const todosSlice = createSlice({
	name: 'todos',
	initialState: {
		items: [],
		activeFilter: localStorage.getItem('activeFilter') || "all",
		isGetLoading: false,
		getError: null,
		postError: null,
	},
	reducers: {
		changeFilter: (state, action) => {
			state.activeFilter = action.payload
		}
	},
	extraReducers: {
		[getTodosAsync.pending]: state => {
			state.isGetLoading = true
		},
		[getTodosAsync.fulfilled]: (state, action) => {
			state.items = action.payload
			state.isGetLoading = false
		},
		[getTodosAsync.rejected]: (state, action) => {
			state.getError = action.error.message
			state.isGetLoading = false
		},
		[addTodoAsync.fulfilled]: (state, action) => {
			state.items.push(action.payload)
		},
		[addTodoAsync.rejected]: (state, action) => {
			state.postError = action.error.message
		},
		[deleteTodoAsync.fulfilled]: (state, action) => {
			state.items.splice((state.items.findIndex((item) => item.id === action.payload)), 1)
		},
		[clearCompletedAsync.fulfilled]: state => {
			state.items = state.items.filter(item => item.completed === false)
		},
		[toggleTodoAsync.fulfilled]: (state, action) => {
			const index = state.items.findIndex((item) => item.id === action.payload.id)
			state.items[index].completed = action.payload.completed
		},
		[toggleAllAsync.fulfilled]: (state, action) => {
			state.items.map(item => item.completed = action.payload)
		},
		[editTodoAsync.fulfilled]: (state, action) => {
			state.items = action.payload
		}
	}
})

export default todosSlice.reducer
export const { changeFilter } = todosSlice.actions

export const selectItemsLeft = state => {
	return state.todos.items.filter(item => item.completed === false).length;
}
export const selectItemsCompleted = state => {
	return state.todos.items.filter(item => item.completed === true).length;
}