import { useEffect } from "react"
import Head from "next/head"

import Button from "components/Button"
import GitHub from "components/Icons/Github"

import { colors } from "styles/theme"

import { loginWithGitHub } from "firebase/client"

import { useRouter } from "next/router"
import useUser, { USER_STATES } from "hooks/useUser"

export default function Home() {
  const user = useUser()
  const router = useRouter()

  // Para redireccionar al usuario logueado a la Home
  useEffect(() => {
    user && router.replace("/home")
  }, [user])

  const handleClick = () => {
    loginWithGitHub()
      // .then(setUser)
      .catch((err) => {
        console.log(err)
      })
  }

  // const router = useRouter()

  return (
    <>
      <Head>
        <title>blurtter 🐦</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section>
        <img src="/logoBlur.svg" alt="logo blur" />
        <h1>blurtter</h1>
        <h2>
          Talk about development <br />
          with developers 👩🏻‍💻🧑🏻‍💻
        </h2>

        <div>
          {user === USER_STATES.NOT_LOGGED && (
            <Button onClick={handleClick}>
              <GitHub fill="#fff" width={24} heigth={24} />
              Login with Github
            </Button>
          )}
          {user === USER_STATES.NOT_KNOWN && <img src="/spinner.gif" />}
        </div>
      </section>

      <style jsx>{`
        section {
          display: grid;
          height: 100%;
          place-content: center;
          place-items: center;
        }

        img {
          width: 180px;
        }

        h1 {
          color: ${colors.secondary};
          font-weight: 800;
          margin-bottom: 16px;
        }

        h2 {
          color: ${colors.primary};
          font-size: 21px;
          margin: 0;
        }

        div {
          margin-top: 16px;
        }
      `}</style>
    </>
  )
}
