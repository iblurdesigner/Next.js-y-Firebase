import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import AppLayout from "../components/AppLayout";
import { colors } from "../styles/theme";
import Button from "../components/Button";
import GitHub from "../components/Icons/Github";

import { loginWithGitHub, onAuthStateChanged } from "../firebase/client";

export default function Home() {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    onAuthStateChanged(setUser);
  }, []);

  const handleClick = () => {
    loginWithGitHub()
      .then(setUser)
      .catch((err) => {
        console.log(err);
      });
  };

  const router = useRouter();

  return (
    <>
      <Head>
        <title>blurtter 🐦</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppLayout>
        <section>
          <img src="/logoBlur.svg" alt="logo blur" />
          <h1>blurtter</h1>
          <h2>Talk about development with developers 👩🏻‍💻🧑🏻‍💻</h2>

          <div>
            {user === null && (
              <Button onClick={handleClick}>
                <GitHub fill="#fff" width={24} heigth={24} />
                Login with Github
              </Button>
            )}
            {user && user.avatar && (
              <div>
                <img src={user.avatar} />
                <strong>{user.username}</strong>
              </div>
            )}
          </div>
        </section>
      </AppLayout>

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
  );
}
