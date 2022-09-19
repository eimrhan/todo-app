import { toggleTodo, editTodo, deleteTodo } from '../../Redux/todos/todosSlice'
import { useDispatch } from 'react-redux'
import { useState } from "react"


function Items({ item }) {

  const dispatch = useDispatch();

  const [isEditMode, setIsEditMode] = useState(false)
  const [editedText, setEditedText] = useState(item.title)

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editedText) {
      dispatch(editTodo({id: item.id, title:editedText}))
      setIsEditMode(false)
    }
  }

  return (
    <div className="view">
      <input className="toggle" type="checkbox" checked={item.completed}
        onChange={() => dispatch(toggleTodo(item.id))} />

      {!isEditMode
        ? 
          <label onDoubleClick={() => setIsEditMode(true)}>{item.title}</label>
        :
          <form onSubmit={handleSubmit}>
            <input className="edit-todo" value={editedText} onChange={(e) => { setEditedText(e.target.value) }} autoFocus/>
          </form>
      }
      <button className="destroy" onClick={() => dispatch(deleteTodo(item.id))} />
    </div>
  )
}

export default Items