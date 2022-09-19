import { useSelector } from 'react-redux';
import Items from './items';
import ToggleAllButton from './toggleAllButton';

function List() {

  let items = useSelector(state => state.todos.items)
  const itemsCount = items.length;

  const activeFilter = useSelector(state => state.todos.activeFilter)

  if (activeFilter !== "all") {
    items = items.filter(item => activeFilter === "active"
      ? item.completed === false
      : item.completed === true
    );
  }

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