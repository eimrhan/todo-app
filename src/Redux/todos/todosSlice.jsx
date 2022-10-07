import { createSlice, nanoid } from "@reduxjs/toolkit"

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
      const id = action.payload
      state.items = state.items.filter((item) => item.id !== id)
    },
    editTodo: (state, action) => {
      state.items.some(item => {
        if (item.id === action.payload.id)
          return item.title = action.payload.title
      })
    },
    toggleTodo: (state, action) => {
      state.items.some(item => {
        if (item.id === action.payload)
          return item.completed = !item.completed
      })
    },
    toggleAll: (state, action) => {
      state.toggleValue = action.payload
      state.items.map(item => item.completed = !state.toggleValue)
      state.toggleValue = !state.toggleValue
    },
    clearCompleted: state => {
      state.items = state.items.filter(item => item.completed === false)
    },
    changeFilter: (state, action) => {
      state.activeFilter = action.payload
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