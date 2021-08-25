import AppLayout from "components/AppLayout"
import Button from "components/Button"
import useUser from "hooks/useUser"
import { useState } from "react"

import { addDevit } from "firebase/client"

export default function ComposeTweet() {
  const user = useUser()
  const [message, setMessage] = useState("")

  const handleChange = (event) => {
    const { value } = event.target
    setMessage(value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    addDevit({
      avatar: user.avatar,
      content: message,
      userId: user.uid,
      userName: user.username,
    })
  }

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
            <Button disabled={!message.length}>Devittear</Button>
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
