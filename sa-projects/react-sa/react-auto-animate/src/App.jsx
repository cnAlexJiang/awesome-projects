import { useState } from 'react'


import Demo1 from './components/demo1'
import Demo2 from './components/demo2'
import Demo3 from './components/demo3'
import Demo4 from './components/demo4'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <Demo1 /> */}
      {/* <Demo2 /> */}
      {/* <Demo3 /> */}
      <Demo4 />
    </>
  )
}

export default App
