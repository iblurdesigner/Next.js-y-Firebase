import Avatar from "components/Avatar"

export default function Devit({ avatar, createAt, userName, content, id }) {
  return (
    <>
      <article>
        <div>
          <Avatar alt={userName} src={avatar} />
        </div>
        <section>
          <header>
            <strong>{userName}</strong>
            <small> • {createAt}</small>
          </header>
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
          small {
            color: #555;
            font-size: 12px;
          }
        `}
      </style>
    </>
  )
}
