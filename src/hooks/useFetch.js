import axios from 'axios'
import { useState, useEffect } from 'react'

export const useFetch = (url) => {
    const [data, setData] = useState(null)

    useEffect(()=> {
        const fetchData = async () => {
            const response = await axios.get(url)
            setData(response.data)
        }

        fetchData()
    }, [url])
    
    return data
}