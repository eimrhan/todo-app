import { useSelector, useDispatch } from 'react-redux';
import { toggleAll, selectItemsLeft } from '../../Redux/todos/todosSlice';


function ToggleAllButton() {

    const dispatch = useDispatch();

    const itemsLeft = useSelector(selectItemsLeft);

    return (
        <>
            <input className="toggle-all" type="checkbox" checked={itemsLeft === 0} readOnly/>
            <label htmlFor="toggle-all" onClick={() => dispatch(toggleAll())}>
                Mark all as complete
            </label>
        </>
    )
}

export default ToggleAllButton