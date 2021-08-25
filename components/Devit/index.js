import Avatar from "components/Avatar"

export default function Devit({ avatar, createdAt, userName, content, id }) {
  console.log(createdAt)
  return (
    <>
      <article>
        <div>
          <Avatar alt={userName} src={avatar} />
        </div>
        <section>
          <strong>{userName}</strong>
          <date>{createdAt}</date>
          <p>{content}</p>
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
        `}
      </style>
    </>
  )
}
