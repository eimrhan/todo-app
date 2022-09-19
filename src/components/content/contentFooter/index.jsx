import { useSelector, useDispatch } from "react-redux"
import { changeFilter, selectItemsLeft } from "../../../Redux/todos/todosSlice"
import ClearButton from "./clearButton";

function ContentFooter() {

    const dispatch = useDispatch();
    
    const itemsLeft = useSelector(selectItemsLeft);

    const activeFilter = useSelector(state => state.todos.activeFilter);    

    return (
        <footer className="footer">

            {/* This should be `0 items left` by default */}
            <span className="todo-count">
                {itemsLeft === 0 ? "it's all done!" : 
                <strong>{itemsLeft} item{itemsLeft > 1 && "s"} left</strong>}
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
        </footer>
    )
}

export default ContentFooter