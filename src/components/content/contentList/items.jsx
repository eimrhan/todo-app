import { toggleTodoAsync, editTodoAsync, deleteTodoAsync } from '@/Redux/todos/todosSlice'
import { useDispatch } from 'react-redux'
import { useState } from "react"

function Items({ item }) {

  const dispatch = useDispatch();

  const [isEditMode, setIsEditMode] = useState(false)
  const [editedText, setEditedText] = useState(item.title)

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editedText) {
      await dispatch(editTodoAsync({ id: item.id, title: editedText }))
      setIsEditMode(false)
    }
  }

  return (
    <div className="view">
      <input className="toggle" type="checkbox" checked={item.completed}
        onChange={() => dispatch(toggleTodoAsync({id: item.id, completed: !item.completed}))} />

      {
        (() => {
          if (!isEditMode)
            return <label onDoubleClick={() => setIsEditMode(true)}>{item.title}</label>
          else {
            return (
              <form onSubmit={handleSubmit}>
                <input className="edit-todo" value={editedText} onChange={(e) => { setEditedText(e.target.value) }} autoFocus />
              </form>
            )
          }
        })()  // Immediately invoked function expressions (IIFEs)
      }

      <button className="destroy" onClick={() => dispatch(deleteTodoAsync(item.id))} />
    </div>
  )
}

export default Items