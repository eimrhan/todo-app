import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

export const getTodosAsync = createAsyncThunk('todos/getTodosAsync', async () => {
    return ((await axios('http://localhost:7000/todos')).data);
})

export const addTodoAsync = createAsyncThunk('todos/addTodoAsync', async (data) => {
    return ((await axios.post('http://localhost:7000/todos', data)).data)
})

export const deleteTodoAsync = createAsyncThunk('todos/deleteTodoAsync', async (id) => {
    await axios.delete(`http://localhost:7000/todos/${id}`)
    return id
})

export const toggleTodoAsync = createAsyncThunk('todos/toggleTodoAsync', async ({id, data}) => {
    return ((await axios.patch(`http://localhost:7000/todos/${id}`, data)).data)
})

export const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        items: [],
        activeFilter: "all",
        toggleValue: false,
        isGetLoading: false,
        getError: null,
        postError: null,
    },
    reducers: {
        editTodo: (state, action) => {
            state.items = state.items.map(item => {
                if (item.id === action.payload.id)
                    item.title = action.payload.title
                return item;
            })
        },
        toggleTodo: (state, action) => {
            state.items = state.items.map(item => {
                if (item.id === action.payload)
                    item.completed = !item.completed
                return item;
            })
        },
        toggleAll: (state, action) => {
            state.toggleValue = action.payload;
            state.items.map(item => item.completed = !state.toggleValue)
            state.toggleValue = !state.toggleValue
        },
        clearCompleted: state => {
            const filtered = state.items.filter(item => item.completed === false)
            state.items = filtered;
        },
        changeFilter: (state, action) => {
            state.activeFilter = action.payload;
        },
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
        [toggleTodoAsync.fulfilled]: (state, action) => {

        }
    }
})

export default todosSlice.reducer;
export const { editTodo, toggleTodo, toggleAll, clearCompleted, changeFilter } = todosSlice.actions;

export const selectItemsLeft = state => {
    return state.todos.items.filter(item => item.completed === false).length;
};
export const selectItemsCompleted = state => {
    return state.todos.items.filter(item => item.completed === true).length;
}