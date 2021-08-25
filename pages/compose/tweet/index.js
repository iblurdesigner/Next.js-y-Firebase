import AppLayout from "components/AppLayout"
import Button from "components/Button"
import useUser from "hooks/useUser"
import { useState } from "react"

import { addDevit } from "firebase/client"
import { useRouter } from "next/router"

const COMPOSE_STATES = {
  USER_NOT_KNOWN: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1,
}

export default function ComposeTweet() {
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN)
  const user = useUser()
  const router = useRouter()

  const handleChange = (event) => {
    const { value } = event.target
    setMessage(value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    setStatus(COMPOSE_STATES.LOADING)

    addDevit({
      avatar: user.avatar,
      content: message,
      userId: user.uid,
      userName: user.username,
    })
      .then(() => {
        router.push("/home")
      })
      .catch((err) => {
        console.error(err)
        setStatus(COMPOSE_STATES.ERROR)
      })
  }

  const isButtonDisabled = !message.length || status === COMPOSE_STATES.LOADING

  return (
    <>
      <AppLayout>
        <form onSubmit={handleSubmit}>
          <textarea
            onChange={handleChange}
            placeholder="Qué está pasando?"
            value={message}
          ></textarea>
          <div>
            <Button disabled={isButtonDisabled}>Devittear</Button>
          </div>
        </form>
      </AppLayout>
      <style jsx>
        {`
          textarea {
            border: 0;
            padding: 15px;
            resize: none;
            font-size: 21px;
            min-height: 200px;
            outline: 0;
            width: 100%;
          }

          div {
            padding: 15px;
          }
        `}
      </style>
    </>
  )
}
