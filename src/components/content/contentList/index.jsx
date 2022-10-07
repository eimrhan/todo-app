import { useSelector } from 'react-redux'
import Items from './items'
import ToggleAllButton from './toggleAllButton'

function List() {

  let items = useSelector(state => state.todos.items)

  const itemsCount = items.length

  const activeFilter = useSelector(state => state.todos.activeFilter)

  if (activeFilter !== "all")
    items = items.filter(item => item.completed === (activeFilter === "completed"))
//  items = items.filter(item => activeFilter === "completed" ? item.completed : !item.completed)

  return (
    <section className="main">
      {itemsCount ? <ToggleAllButton /> : ""}
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