import React from "react"
import "./App.sass"
import "normalize.css"
import Hello from "./components/Hello"

const App = () => (
  <div id="hello-container">
    <h1 className="hello">Hello from React</h1>
    <Hello />
  </div>
)

export default App
