import { useState} from 'react'
import styles from './Filter.module.css'

const Filter = () => {
  const [filtersArray, setFiltersArray] = useState([])
  const [search, setSearch] = useState('')

  const handleSubmit = e => {
    e.preventDefault()

    if(search !== ''){
      setFiltersArray([...filtersArray, search])
    }

    // filter through the current selection
    
    // clear search box
    setSearch('')
  }

  const clearDIV = () => {
    setFiltersArray([])
  }

  const clearSELECT = (e) =>{
    const id = e.target.parentElement.children[0].innerText
    setFiltersArray(filtersArray.filter(each=>{
      return each!==id
    }))
  }

  return (
    <div className={styles.Filter}>
      <div className={styles.filtersArray}>
        {filtersArray.map((word, index)=>(
          <div key={index} className={styles.filtDiv}>
            <button>{word}</button>
            <img src="./images/icon-remove.svg" alt="X logo" onClick={clearSELECT}/>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder='search category' 
          onChange={(e)=>setSearch(e.target.value.toLowerCase().trim())}
          value={search}
        />
      </form>
      <button onClick={clearDIV}>Clear</button>
    </div>
  )
}

export default Filter