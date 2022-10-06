import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getTodosAsync } from '@/Redux/todos/todosSlice'
import Items from './items'
import ToggleAllButton from './toggleAllButton'

function List() {

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getTodosAsync())
	}, [])

	const isLoading = useSelector(state => state.todos.isGetLoading)
	const getError = useSelector(state => state.todos.getError)
	const postError = useSelector(state => state.todos.postError)

	let items = useSelector(state => state.todos.items)

	const itemsCount = items.length

	const activeFilter = useSelector(state => state.todos.activeFilter)

	if (activeFilter !== "all")
		items = items.filter(item => item.completed === (activeFilter === "completed"))
//  items = items.filter(item => activeFilter === "completed" ? item.completed : !item.completed)

	if (isLoading)
		return <div className='loading'>Loading...</div>

	if (getError)
		return <div className='error'>Error: {getError}</div>

	return (
		<section className="main">
			{itemsCount && !postError && <ToggleAllButton /> || ""}
			<ul className="todo-list">
				{items.map((item) => (
					<li key={item.id} className={item.completed ? "completed" : ""}>
						<Items item={item} />
					</li>
				))}
			</ul>
		</section>
	)
}

export default List