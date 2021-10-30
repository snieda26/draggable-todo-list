import './App.css';
import React, { useEffect, useState } from 'react'
import { randomColor } from 'randomcolor'
import { v4 } from 'uuid'
import Draggable from 'react-draggable';


function App() {

  const [item, setItem] = useState('')
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem('items')) || []
  )

  const newItem = () => {
    if (item.trim() !== '') {
      const newItem = {
        id: v4(),
        item: item,
        color: randomColor({
          luminostify: 'light'
        }),
        defaultPos: {
          x: '35vw',
          y: '65vh'
        }
      }

      setItems(items => [...items, newItem])
      setItem('')
    } else {
      alert('enter something, pls')
      setItem('')
    }
  }

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items))
  }, [items])

  return (
    <div className="App">
      <div className="wrapper">
        <input type="text" placeholder="Type something" value={item || ""} onKeyPress={(e) => e.key === 'Enter' ? newItem(e) : ''}
          onChange={(e) => setItem(e.target.value)} />
        <button className="add" onClick={newItem}>Add</button>
        {
          items.map((obj, index) => {
            return (
              <Draggable
                key={index + obj.item}>
                <div className="todo__item" style={{ backgroundColor: obj.color, bottom: obj.defaultPos.y, left: obj.defaultPos.x }}>
                  {`${obj.item}`}
                  <button className="delete" onClick={() => setItems(items => items.filter((item) => item.id !== obj.id))}>x</button>
                </div>

              </Draggable>
            )
          })
        }
      </div>

    </div>
  );
}

export default App;
