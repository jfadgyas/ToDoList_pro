import React, {useState} from 'react'

const NewItem = ({id, add}) => {
    const [newItem, setNewItem] = useState('')

    const handleChange = (e) => {
        if (e.type === 'click'){
            add(e, newItem)
            setNewItem('')
        }
        setNewItem(e.target.value)
    }

    return(
        <div
            id={id}
            className={id !== '' ? '__new--hidden' : '__new--visible'}>
            <input
                type='text'
                className='__newitem'
                placeholder={`Add new ${id !== '' ? 'tag' : 'item'}`}
                value={newItem}
                onChange={handleChange}/>
            <button onClick={handleChange}>Add</button>
        </div>
    )
}

export default NewItem