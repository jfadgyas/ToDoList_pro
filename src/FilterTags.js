import React from 'react'

const FilterTags = ({toDos, filterTags}) => {    
    let tags = new Set()
    toDos.map(item => item.tags.map(elem => tags.add(elem)))
    tags = Array.from(tags)
    const tagList = tags.map((item, index) => <option key={index} value={item}>{item}</option>)

    return (
        <div className='tagfilter__container'>
            <p className='tagfilter__label'>Filter Tags </p>
            <select
                id='filter'
                className='tagfilter__filter'
                onChange={filterTags}>
                <option value=''>All tags</option>
                {tagList}
            </select>
        </div>
    )
}

export default FilterTags