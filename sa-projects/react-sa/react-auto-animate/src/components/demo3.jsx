// Alert message using AutoAnimate


import React, { useState, useRef } from 'react';
import { Button, Alert } from 'react-bootstrap';
import { useAutoAnimate } from '@formkit/auto-animate/react';

import 'bootstrap/dist/css/bootstrap.min.css';

export default function () {
  const [items, setItems] = useState([0, 1, 2])
  const [parent] = useAutoAnimate()
  const add = () => setItems([...items, items.length])
  return(
    <>
    <ul ref={parent}>
      {items.map(
        item => <li key={item}>{item}</li>
      )}
    </ul>
    <button onClick={add}>Add number</button>
  </>
  )
}