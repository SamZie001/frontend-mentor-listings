import styles from './Listings.module.css'
import { useState, useEffect } from 'react'
import axios from 'axios'

function Listings() {
    const [url, setUrl] = useState('http://localhost:3000/listings')
    const [filtersArray, setFiltersArray] = useState([])
    const [search, setSearch] = useState('')
    // let {data} = useFetch(url)
    const [data, setData] = useState([]);
    const [items, setItems] = useState(data || []); // EMPTY

    // LOCAL FETCH DATA FUNCTION TO GET DATA FROM JSON
    const fetchData = async (url) => {
        const response = await axios.get(url)
        setData(response.data)
    }

    // ENSURES THAT IT ISNT CALLED MULTIPLE TIMES
    // FETCH JUST ONCE
    useEffect(()=> { 
        fetchData(url);
    }, [url])

    // RE-RENDERED ITEMS ON DATA BEING SET
    useEffect(()=> {
        setItems(data)
    }, [data])

    // FILTER THROUGH DATA
    const searchThroughData = (data, searchItems) => {
        let newArr = []; // NEW ARRAY

        if (data) {
            newArr = data.filter(el => {
                // RETURN THE ELEMENT IF IT CONTAINS ANYTHING IN THE SEARCH ITEM
                let foundMatch = false;

                // SEARCH THROUGH LANGUAGES AND CHECK IF IT CONTAINS THE SEARCH STRING(S)
                el.languages.map(e => {
                    if (searchItems.includes(e.toLowerCase())) {
                        foundMatch = true;
                        return true; // TO BREAK OUT OF LOOP AFTER FINDING A SINGLE MATCH
                    }
                });
                
                // IF SEARCH-ITEM(S) NOT FOUND IN LANGUAGES SEARCH TOOLS
                if (!foundMatch) {
                    // SEARCH THROUGH TOOLS AND CHECK IF IT CONTAINS THE SEARCH STRING(S)
                el.tools.map(e => {
                    if (searchItems.includes(e.toLowerCase())) {
                        foundMatch = true;
                        return true; // TO BREAK OUT OF LOOP AFTER FINDING A SINGLE MATCH
                    }
                });
                }
                
                // IF A MATCH WAS FOUND RETURN THE STRUCTURE ELSE DO NOTHING
                if (foundMatch) {
                    return el;
                } 
            });
        } 
        
        // WHEN SEACRH ARRAY IS EMPTY SHOW ENTIRE DATA STRUCTURE
        if (searchItems.length == 0) { // IF EMPTY ARRAY SHOW ENTIRE STUFF
            newArr = data;
        }

        return newArr;
    };

    const handleSubmit = e => {
        e.preventDefault()

        if(search !== ''){
        // setFiltersArray([...filtersArray, search])
        setFiltersArray([...filtersArray, search]);
        }

        // clear search box
        setSearch('')
    }

    // WHEN A SEARCH IN THE ARRAY ONLY THEN RE-RENDER DOM
    useEffect(() => {
        // ON FILTERED DATA
        setItems(searchThroughData(data, filtersArray));
    }, [filtersArray]);

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
    <div className={styles.Listings}>
    
    {/* form to filter */}
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

    {/* map through fetched data and render in the UI */}
        {items && items.map(list=>(
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