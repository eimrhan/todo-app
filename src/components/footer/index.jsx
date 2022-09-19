import React from "react"

function Footer() {
    return (
        <footer className="info">
            <p>Double Click to edit a todo</p>
            <p>Remade with React by <a href="https://celebi.dev/">Emirhan</a></p>
            <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
        </footer>
    )
}

export default React.memo(Footer)