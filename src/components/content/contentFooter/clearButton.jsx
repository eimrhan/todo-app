import { useSelector, useDispatch } from "react-redux"
import { clearCompleted, selectItemsCompleted } from "../../../Redux/todos/todosSlice"

function ClearButton() {

    const dispatch = useDispatch();

    const handleClear = () => {
        if (window.confirm("Are you sure to delete all completed tasks?")) {
            dispatch(clearCompleted())
        }
    }

    const itemsCompleted = useSelector(selectItemsCompleted);

    return <button className="clear-completed" onClick={() => handleClear()} hidden={!itemsCompleted}>Clear completed</button>
}

export default ClearButton