import './styles/global.css';

import { Habit } from "./components/Habit"

function App() {
  return (
    <div>
      <Habit completed={3} />
      <Habit completed={10} />
      <Habit completed={5} />
      <Habit completed={8} />
      <Habit completed={7} />
      <Habit completed={1} />
      <Habit completed={9} />
    </div>
  )
}

export default App
