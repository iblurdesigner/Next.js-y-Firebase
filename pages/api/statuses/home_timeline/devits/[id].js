import { firestore } from "firebase/admin"

export default (request, response) => {
  const { query } = request
  const { id } = query

  firestore
    .collection("devits")
    .doc(id)
    .get()
    .then((doc) => {
      const data = doc.data()
      const id = doc.id
      const { createAt } = data

      response.json({
        ...data,
        id,
        createAt: +createAt.toDate(),
      })
    })
    .catch(() => {
      response.status(404).end()
    })
}
