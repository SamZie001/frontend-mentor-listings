import './App.css';
import Listings from './components/Listings';
import Header from './components/Header';
import axios from 'axios'
import { useEffect, useState } from 'react';

function App() { 
  const [listings, setListings] = useState(null)
  const url = 'http://localhost:3000/listings'
  
  async function fetchData(){
      const resGet = await axios.get(url)
      const resData = await resGet.data
      setListings(resData)
  }

  useEffect(()=>{

    fetchData()

  }, [url])

  return (
    <div className="App">
      <Header />
      <Listings data={listings}/>
    </div>
  );
}

export default App;
