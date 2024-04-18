import { useState } from 'react'
import './App.css'
import SampleQuestion from './components/SampleQuestion'
import AutoResizeTextarea from './components/AutoResizeTextarea'

function App() {
  const [userInput, setUserInput] = useState('')
  const [assistantResponse, setAssistantResponse] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const sampleQuestions = [
    'What is this game like?',
    'How do you search a white room?',
    'What happens when you roll danger on a noise roll?',
    'How do you stop the self destruct sequence?',
  ]

  async function ask(question: string) {
    setIsLoading(true)
    console.log(import.meta.env.VITE_SERVER_URL)
    fetch(import.meta.env.VITE_SERVER_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(question),
    }).then(async (res) => {
      setIsLoading(false)
      if (res.status === 200) {
        const resJSON = await res.json()
        setAssistantResponse(resJSON)
        setError('')
      }
      if (res.status === 500) {
        const resJSON = await res.json()
        setError(resJSON.error)
      }
    })
  }

  function handleSubmit() {
    if (!userInput) return
    ask(userInput)
  }

  return (
    <div className='relative h-full'>
      <div
        className='pt-24 px-6 mx-auto max-w-2xl min-h-screen flex flex-col justify-between'
        id='main'
      >
        <div>
          <h1 className='mb-4 text-3xl font-bold tracking-tight [text-shadow:0_0_16px_#0d93cd]'>
            Nemesis AI
          </h1>

          <div className='flex items-end my-8'>
            <div className='px-4 pt-3 pb-2 flex-1 rounded-md bg-transparent border border-blue outline-none'>
              <AutoResizeTextarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                handleSubmit={handleSubmit}
                className='w-full m-0 p-0 border-0 focus:outline-0 bg-transparent resize-none'
              />
            </div>

            <button
              type='submit'
              onClick={() => ask(userInput)}
              disabled={!userInput.length}
              className='disabled:fill-gray-600 fill-blue focus:outline-none'
            ></button>
          </div>

          {error && (
            <div className={`flex items-start ${isLoading && 'opacity-30'}`}>
              <div>
                <span className='mr-2 uppercase text-red-500'>Error:</span>
                <span>{error}</span>
              </div>
            </div>
          )}

          {isLoading && (
            <div className='spinner absolute left-1/2 transform -translate-x-1/2' />
          )}

          <div
            className={`whitespace-pre-line prose prose-invert ${
              isLoading && 'opacity-30'
            }`}
          >
            {assistantResponse}
          </div>

          <div className='mt-20'>
            <h2 className='mb-4'>Sample questions:</h2>
            <div className='flex flex-wrap justify-start gap-4'>
              {sampleQuestions.map((q) => (
                <SampleQuestion
                  key={q}
                  question={q}
                  onClick={() => {
                    setUserInput(q)
                    ask(q)
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
