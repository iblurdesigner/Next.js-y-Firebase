import Head from 'next/head'
import AppLayout from '../components/AppLayout'
// import styles from '../styles/Home.module.css'
import {colors} from '../styles/theme'
import Button from '../components/Button'
import GitHub from '../components/Icons/Github'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Devter 🐦</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppLayout>
        <section>  
          <img src="/logoBlur.svg" alt="logo Blur"/>
          <h1>blurtter</h1>
          <h2>Talk about development with developers 👩🏻‍💻🧑🏻‍💻</h2>
          <div>
            <Button>
              <GitHub fill='#fff' width={24} heigth={24} />
              Login with Github
            </Button>
          </div>
        </section>
      </AppLayout>

      <style jsx>
        {`
          div {
            margin-top: 16px;
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

          section {
            display: grid;
            height: 100%;
            place-content: center;
            place-items: center;
          }
        `}
      </style>
{/* 
      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer> */}
    </div>
  )
}
