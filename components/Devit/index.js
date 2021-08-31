import Avatar from "components/Avatar"
import useTimeAgo from "hooks/useTimeAgo"

export default function Devit({
  avatar,
  createAt,
  img,
  userName,
  content,
  id,
}) {
  const timeago = useTimeAgo(createAt)

  return (
    <>
      <article>
        <div>
          <Avatar alt={userName} src={avatar} />
        </div>
        <section>
          <header>
            <strong>{userName}</strong>
            <time> • {timeago}</time>
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

          div {
            padding-right: 10px;
          }

          p {
            line-height: 1.3125;
            margin: 0;
          }
          time {
            color: #555;
            font-size: 12px;
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
