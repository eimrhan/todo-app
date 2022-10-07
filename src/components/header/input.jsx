import { useState } from "react"
import { useDispatch } from "react-redux"
import { addTodo } from "@/Redux/todos/todosSlice"

function Input() {

  const dispatch = useDispatch()

  const [title, setTitle] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()

    if (title) {
      dispatch(addTodo(title))
      setTitle("")
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input className="new-todo" placeholder="What needs to be done?" autoFocus
          value={title} onChange={(e) => setTitle(e.target.value)} />
      </form>
    </>
  )
}

export default Input