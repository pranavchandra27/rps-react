import { FormEvent, useState } from 'react'
import { setPlayerName } from 'actions';
import { connect } from 'react-redux';
import { setUserData } from 'actions/userActions';

const Login = ({ setPlayerName, setUserData }: any) => {
  const [value, setValue] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const username = value.trim()

    const data = {
      username
    }

    setSubmitting(true)
    try {
      const res = await fetch('http://localhost:5000/user/register', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })
      const user = await res.json()

      setUserData(user)
      setValue("")
      setSubmitting(false)
      setPlayerName(value.trim())
    } catch (error) {
      setSubmitting(false)
      console.log(error)
    }

  }

  return (
    <div className="text-center">
      <h2 className="text-gray-100 text-5xl mt-20">Ready to play</h2>
      <form onSubmit={handleSubmit} className='max-w-sm w-full mx-auto '>
        <div className="mt-20 focus-within:text-gray-600 bg-gray-200 focus-within:bg-gray-50 py-2 px-4 rounded-md shadow-lg">
          <input value={value} onChange={e => setValue(e.target.value)} placeholder="Choose a username" className="outline-none border-0 w-full bg-transparent" />
        </div>
        <button disabled={!Boolean(value) || submitting} className="flex justify-center items-center mt-8 bg-red-500 text-lg text-white font-medium py-1 w-full rounded-md outline-none border-none">
          {submitting && <div className="animate-spin h-5 w-5 mr-3 spinner" >
          </div>}
          Play
        </button>
      </form>
    </div>
  )
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    setPlayerName: (playerName: string) => dispatch(setPlayerName(playerName)),
    setUserData: (data: any) => dispatch(setUserData(data)),
  }
}

export default connect(null, mapDispatchToProps)(Login)
