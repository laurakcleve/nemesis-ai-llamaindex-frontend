import { useState } from 'react'
import './App.css'

function App() {
  const [data, setData] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function ask() {
    setLoading(true)
    setData('')
    setError('')

    fetch('http://localhost:5601/query?text=what%20is%20this%20game%20like', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        console.log(response.body)
        const resJSON = await response.json()
        console.log(resJSON)
        setData(resJSON)
        setLoading(false)
      })
      .catch((error) => {
        setError(error.message)
        setLoading(false)
      })
  }
  return (
    <>
      <button onClick={ask}>Test API</button>
      {data && <p>{data}</p>}
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
    </>
  )
}

export default App
