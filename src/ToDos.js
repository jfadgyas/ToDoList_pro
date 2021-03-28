import React from 'react'
import NewItem from './NewItem'

//create list
const toDoList = ({toDos, modifyItem, addTag}) => {
    console.log(toDos)

    const toDoList = toDos.map((item, index) =>
        <li
            key={index}
            id={index}
            name={item.id}>
            <input
                // id={item.id}
                type='checkbox'
                name='isDone'
                checked={item.isDone && true}
                onChange={modifyItem} />
            <input
                // id={item.id} //no unoque ID?
                type='text'
                name='todo'
                className={item.isDone ? 'list-item disabled' : 'list-item enabled'}
                disabled={item.isDone && true}
                value={item.todo}
                onChange={modifyItem} />
            <button
                name='delete'
                value = {item.id}
                onClick={modifyItem}>X</button>
            <button
                disabled={item.isDone ? true : false}
                onClick={() => addTag(index)}>+</button>
            <div className='__container'>
                {item.tags.map((tag, key) => <span key={key} className='tags'>{tag}</span>)}
            </div>
            <NewItem id={`i${index}`} add={modifyItem}/>
        </li>)

    return (
        <ul>
            {toDoList}
        </ul>
    )
}

export default toDoList