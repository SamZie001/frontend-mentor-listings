import styles from './Listings.module.css'
import Filter from './Filter'
import { useState } from 'react'

function Listings({data}) {
    const [searchWord, setSearchWord] = useState(null)
    const retrieveWord = (word) => {
        setSearchWord(word)
    }
    console.log('sw:', searchWord)
    
return (
    <div className={styles.Listings}>
        <Filter retrieve={retrieveWord}/>
        {data && data.map(list=>(
            <div key={list.id} className={styles.container}>
                <img src={list.logo} alt="Profile Pic" className={list.new ? styles.rotating : styles.nothing}/>

                {/* details */}
                <div className={styles.details}>
                    <div className={styles.company}>
                        <div className={styles.compDets}>
                            {list.company} &nbsp;&nbsp;
                            {list.new && <p className={styles.new}>NEW!</p>} &nbsp;
                            {list.featured && <p className={styles.featured}>FEATURED</p>}
                        </div>
                    </div>

                    <h3 className={styles.position}>{list.position}</h3>

                    <div className={styles.status}>
                        <p>{list.postedAt}</p>
                        <p>.</p>
                        <p>{list.contract}</p>
                        <p>.</p>
                        <p>{list.location}</p>
                    </div>
                </div>

                {/* filters/categories */}
                <div className={styles.category}>
                    <button>{list.role}</button>
                    <button>{list.level}</button>
                    <div>{list.tools.map((each, index)=>(
                        <button key={index}>{each}</button>
                    ))}</div>
                    <div>{list.languages.map((each, index)=>(
                        <button key={index}>{each}</button>
                    ))}</div>
                </div>
            </div>
        ))}
    </div>
  )
}

export default Listings