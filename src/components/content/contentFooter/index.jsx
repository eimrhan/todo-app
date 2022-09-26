import { useSelector, useDispatch } from "react-redux"
import { changeFilter, selectItemsLeft } from "@/Redux/todos/todosSlice"
import ClearButton from "./clearButton";

function ContentFooter() {

    const dispatch = useDispatch();
    
    const itemsLeft = useSelector(selectItemsLeft);
    const activeFilter = useSelector(state => state.todos.activeFilter);
    const getError = useSelector(state => state.todos.getError)

    if (getError)
        return
    
    return (
        <footer className="footer">

            <span className="todo-count">
                {itemsLeft === 0 ? "it's all done!" : 
                <span>{itemsLeft} item{itemsLeft > 1 && "s"} left</span>}
            </span>

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

            <br/><br/>
            <p>🖰 Double Click to edit Todo</p>

        </footer>
    )
}

export default ContentFooter