import { createSlice, nanoid } from "@reduxjs/toolkit";

export const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        items: [
            {
                id: nanoid(),
                title: "Learn React",
                completed: true
            },
            {
                id: nanoid(),
                title: "Have a Job!",
                completed: false
            }
        ],
        activeFilter: "all",
        toggleValue: false
    },
    reducers: {
        addTodo: {
            reducer: (state, action) => {
                state.items.push(action.payload)
            },
            prepare: (title) => {
                return {
                    payload: {
                        id: nanoid(),
                        completed: false,
                        title
                    }
                }
            }
        },
        deleteTodo: (state, action) => {
            const id = action.payload;
            const filtered = state.items.filter((item) => item.id !== id)
            state.items = filtered
        },
        editTodo: (state, action) => {
            state.items = state.items.map(item => {
                if (item.id === action.payload.id) {
                    item.title = action.payload.title
                }
                return item;
            })
        },
        toggleTodo: (state, action) => {
            const id = action.payload;
            const item = state.items.find((item) => item.id === id)
            item.completed = !item.completed
        },
        toggleAll: (state) => {
            state.items.map(item => item.completed = !state.toggleValue),
                state.toggleValue = !state.toggleValue
        },
        clearCompleted: state => {
            const filtered = state.items.filter(item => item.completed === false)
            state.items = filtered;
        },
        changeFilter: (state, action) => {
            state.activeFilter = action.payload;
        },
    }
})

export default todosSlice.reducer;
export const { addTodo, deleteTodo, editTodo, toggleTodo, toggleAll, clearCompleted, changeFilter } = todosSlice.actions;

export const selectItemsLeft = state => {
    return state.todos.items.filter(item => item.completed === false).length;
};

export const selectItemsCompleted = state => {
    return state.todos.items.filter(item => item.completed === true).length;
}