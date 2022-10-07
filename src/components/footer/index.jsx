import React from "react"

function Footer() {
  return (
    <footer className="info">
      <p>Remade with React by <a href="https://celebi.dev/">Emirhan</a></p>
      <p>Based on <a href="https://codepen.io/dmitrysharabin/pen/MWgQNYZ"><i>TodoMVC. No JS. At all!</i></a></p>
      <p>Part of <a href="https://todomvc.com">TodoMVC</a></p>
    </footer>
  )
}

export default React.memo(Footer)