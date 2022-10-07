import { useSelector, useDispatch } from "react-redux"
import { changeFilter, selectItemsLeft } from "@/Redux/todos/todosSlice"
import ClearButton from "./clearButton"

function ContentFooter() {

  const dispatch = useDispatch()

  const itemsLeft = useSelector(selectItemsLeft)
	const todoCount = () => {
		if (itemsLeft === 0)
			return "it's all done!"
		else
			return <span>{itemsLeft} item{itemsLeft > 1 && "s"} left</span>
	}

  const activeFilter = useSelector(state => state.todos.activeFilter)

  return (
    <footer className="footer">

      <span className="todo-count">{todoCount()}</span>

      <ul className="filters">
        <li>
          <a className={activeFilter == "all" ? "selected" : ""}
            onClick={() => dispatch(changeFilter("all"))}>All</a>
        </li>
        <li>
          <a className={activeFilter == "active" ? "selected" : ""}
            onClick={() => dispatch(changeFilter("active"))}>Active</a>
        </li>
        <li>
          <a className={activeFilter == "completed" ? "selected" : ""}
            onClick={() => dispatch(changeFilter("completed"))}>Completed</a>
        </li>
      </ul>

      <ClearButton />

      <br /><br />
      <p>🖰 Double Click to edit Todo</p>

    </footer>
  )
}

export default ContentFooter