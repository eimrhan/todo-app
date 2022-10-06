import { useSelector, useDispatch } from "react-redux"
import { clearCompletedAsync, selectItemsCompleted, getTodosAsync } from "@/Redux/todos/todosSlice"

function ClearButton() {

    const dispatch = useDispatch();

    const handleClear = async () => {
        if (window.confirm("Are you sure to delete all completed tasks?"))
            await dispatch(clearCompletedAsync())
    }

    const itemsCompleted = useSelector(selectItemsCompleted);

    return <button className="clear-completed" onClick={() => handleClear()} hidden={!itemsCompleted}>Clear Completed</button>
}

export default ClearButton