import Button from "components/Button"
import useUser from "hooks/useUser"
import { useEffect, useState } from "react"
import Head from "next/head"

import { addDevit, uploadImage } from "firebase/client"
import { useRouter } from "next/router"
import Avatar from "components/Avatar"

const COMPOSE_STATES = {
  USER_NOT_KNOWN: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1,
}

const DRAG_IMAGE_STATES = {
  ERROR: -1,
  NONE: 0,
  DRAG_OVER: 1,
  UPLOADING: 2,
  COMPLETE: 3,
}

export default function ComposeTweet() {
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN)
  const [drag, setDrag] = useState(DRAG_IMAGE_STATES.NONE)
  const [task, setTask] = useState(null)
  const [imgURL, setImageURL] = useState(null)

  const user = useUser()
  const router = useRouter()

  useEffect(() => {
    if (task) {
      const onProgress = () => {}
      const onError = () => {}
      const onComplete = () => {
        console.log("onComplete")
        task.snapshot.ref.getDownloadURL().then(setImageURL)
      }

      task.on("state_changed", onProgress, onError, onComplete)
    }
  }, [task])

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
      img: imgURL,
    })
      .then(() => {
        router.push("/home")
      })
      .catch((err) => {
        console.error(err)
        setStatus(COMPOSE_STATES.ERROR)
      })
  }

  const handleDragEnter = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATES.DRAG_OVER)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATES.NONE)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATES.NONE)
    const file = e.dataTransfer.files[0]

    const task = uploadImage(file)
    setTask(task)
  }

  const isButtonDisabled = !message.length || status === COMPOSE_STATES.LOADING

  return (
    <>
      <Head>
        <title>Crear un Devit / Devter</title>
      </Head>
      <section className="form-container">
        {/* Hay que evaluar primero que haya un usuario para pedir su avatar */}
        {user && (
          <section className="avatar-container">
            <Avatar src={user.avatar} />
            {console.log(<Avatar />)}
          </section>
        )}
        <form onSubmit={handleSubmit}>
          <textarea
            onChange={handleChange}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            placeholder="Qué está pasando?"
            value={message}
          ></textarea>
          {imgURL && (
            <section className="remove-img">
              <button onClick={() => setImageURL(null)}>X</button>
              <img src={imgURL} />
            </section>
          )}
          <div>
            <Button disabled={isButtonDisabled}>Devittear</Button>
          </div>
        </form>
      </section>

      <style jsx>
        {`
          form {
            padding: 10px;
          }
          textarea {
            border: ${drag === DRAG_IMAGE_STATES.DRAG_OVER
              ? "3px dashed #09f"
              : "3px solid transparent"};
            border-radius: 10px;
            padding: 15px;
            resize: none;
            font-size: 21px;
            min-height: 200px;
            outline: 0;
            width: 100%;
          }

          .form-container {
            align-items: flex-start;
            display: flex;
          }

          .remove-img {
            position: relative;
          }

          .avatar-container {
            padding-top: 20px;
            padding-left: 10px;
          }

          button {
            background: rgba(0, 0, 0, 0.9);
            border: 0;
            color: #fff;
            border-radius: 999px;
            width: 32px;
            height: 32px;
            font-size: 18px;
            top: 15px;
            position: absolute;
            right: 15px;
          }

          img {
            border-radius: 10px;
            height: auto;
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
