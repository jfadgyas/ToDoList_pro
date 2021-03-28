import React, {useState, useRef, useEffect} from 'react'
import './style/app.css'
import NewItem from './NewItem'
import FilterTags from './FilterTags'
import ToDos from './ToDos'

const App = () => {
const [toDos, setToDos] = useState([])
const prevToDos = useRef()

// Fake api call
useEffect(() => {
    setToDos(getData())
}, [])

const getData = () => {
    // let data
    const data = require('./data/MOCK_DATA.json')
    return data
}

//add, remove, modify items
const modifyItem = (e, newValue) => {
    const {name, value, type, checked} = e.target
    let index = e.target.parentNode.id
    let newList = [...toDos]
    //new item
    if (!index){
        const newItem = {
            id: generateID(),
            todo: newValue,
            isDone: false,
            tags: prevToDos.current ? [document.querySelector('#filter').value] : []
        }
        if (prevToDos.current) {
            prevToDos.current.push(newItem)
        }
        return setToDos(newList.concat(newItem))
    }
    //new tag
    if (index.substr(0,1) === 'i'){
        index = index.substr(1)
        newList[index] = Object.assign({}, toDos[index], {tags: toDos[index].tags.concat(newValue)})
        removeTag(index)
    }
    //modified item
    else{
        const newItem = type === 'checkbox' ? Object.assign({}, toDos[index], {[name]: checked}) : Object.assign({}, toDos[index], {[name]: value})
        newList[index] = newItem
    }
    //delete item
    if (name === 'delete'){
        newList = toDos.filter((item, pos) => pos !== +index)
        if (prevToDos.current) {
            let toDoIndex = prevToDos.current.findIndex(item => item.id === toDos[index].id)
            prevToDos.current.splice(toDoIndex, 1)
        }
    }
    setToDos(newList)
}

//generate ID for the new item
const generateID = () => {
    let id = ''
    for (let i=1; i<7; i++){
        id += String.fromCharCode(Math.floor(Math.random() * 74) + 48)
    }
    return id
}

//show, hide add tag input
const addTag = (index) => {
    const newTagField = document.querySelector(`#i${index}`)
    newTagField.classList.add('__new--visible')
    newTagField.addEventListener('transitionend',  function waitTillVisible() {
        newTagField.firstChild.focus()
        newTagField.removeEventListener('transitionend', waitTillVisible)
        newTagField.firstChild.addEventListener('focusout', function lostFocus() {
            if (!newTagField.firstChild.value){
                removeTag(index)
                newTagField.firstChild.removeEventListener('focusout', lostFocus)
            }
        })
    })
}

const removeTag = (index) => {
    document.querySelector(`#i${index}`).classList.remove('__new--visible')
}

//after filtering make sure all changes are in place
const saveChanges = () => {
    toDos.map(item => {
        let toDoIndex = prevToDos.current.findIndex(elem => elem.id === item.id)
        if (prevToDos.current[toDoIndex] !== item){
            prevToDos.current[toDoIndex] = item
        }
        return item
    })
}

//filter based on tags
const filterTags = (e) => {
    if (e.target.value){
        let filterArray
        if (!prevToDos.current){
            prevToDos.current = [...toDos]
            filterArray = [...toDos]
        }
        else{
            saveChanges()
            filterArray = prevToDos.current
        }
        let newToDos = filterArray.filter(item => item.tags.includes(e.target.value))
        setToDos(newToDos)
    }
    else{
        saveChanges()
        setToDos(prevToDos.current)
        prevToDos.current = ''
    }
}

    return (
        <div>
            <NewItem id='' add={modifyItem} />
            <FilterTags toDos={prevToDos.current ? prevToDos.current : toDos} filterTags={filterTags} />
            <ToDos toDos={toDos} modifyItem={modifyItem} addTag={addTag}/>
        </div>
    )
}

export default App