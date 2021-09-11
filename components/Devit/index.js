import Avatar from "components/Avatar"
import useTimeAgo from "hooks/useTimeAgo"
import useDateTimeFormat from "hooks/useDateTimeFormat"
import Link from "next/link"
import { useRouter } from "next/router"

export default function Devit({
  avatar,
  createAt,
  img,
  userName,
  content,
  id,
}) {
  const timeago = useTimeAgo(createAt)
  const createAtFormated = useDateTimeFormat(createAt)
  const router = useRouter()

  const handleArticleClick = (e) => {
    e.preventDefault()
    router.push(`/status/${id}`)
  }

  return (
    <>
      <article onClick={handleArticleClick}>
        <div>
          <Avatar alt={userName} src={avatar} />
        </div>
        <section>
          <header>
            <strong>{userName}</strong>
            <span> • </span>
            <Link href={`/status/${encodeURIComponent(id)}`}>
              <a>
                <time title={createAtFormated}>{timeago}</time>
              </a>
            </Link>
          </header>
          <p>{content}</p>
          {img && <img src={img} />}
        </section>
      </article>

      <style jsx>
        {`
          article {
            border-bottom: 1px solid #eee;
            display: flex;
            padding: 10px 15px;
          }

          article:hover {
            background: #f5f8fa;
            cursor: pointer;
          }

          div {
            padding-right: 10px;
          }

          p {
            line-height: 1.3125;
            margin: 0;
          }
          span,
          a {
            color: #555;
            font-size: 12px;
            text-decoration: none;
          }

          a:hover {
            text-decoration: underline;
          }
          img {
            border-radius: 10px;
            height: auto;
            margin-top: 10px;
            width: 100%;
          }
        `}
      </style>
    </>
  )
}
