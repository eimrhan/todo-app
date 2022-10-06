import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { addTodoAsync } from "@/Redux/todos/todosSlice";

function Input() {

  const dispatch = useDispatch();

  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title) {
      await dispatch(addTodoAsync({ title }))
      setTitle("")
    }
  }

  const getError = useSelector(state => state.todos.getError)
  const postError = useSelector(state => state.todos.postError)

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input className={postError ? "postError" : "new-todo"} placeholder="What needs to be done?" autoFocus
          value={postError || title} disabled={postError || getError} onChange={(e) => setTitle(e.target.value)} />
      </form>
    </>
  )
}

export default Input