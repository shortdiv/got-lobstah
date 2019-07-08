import axios from "axios";

const faunadb = require("faunadb");
const q = faunadb.query;

export default async function useFauna() {
  const createClient = async () => {
    const secret = await axios.get("/.netlify/functions/fauna-user");
    const { faunaSecret } = secret.data;
    const client = new faunadb.Client({ secret: faunaSecret });
    return client;
  };

  const client = await createClient();

  const setRating = ref => async title => {
    try {
      if (ref === null) {
        return;
      }
      // const list = await client.query(q.Get(q.Ref("classes/ratings/" + re)));
      const listicle = await client
        .query(
          q.Update(q.Ref(q.Class("ratings"), ref), {
            data: title
          })
        )
        .then(ret => console.log(ret));

      return listicle;
    } catch (err) {
      console.log(err);
    }
  };

  // return client
  //     .query(
  //       q.Create(q.Ref('classes/todos'), {
  //         data: newToDo
  //         // permissions: {
  //         //   read: me,
  //         //   write: me
  //         // }
  //       })
  //     )
  //     .then(() => {
  //       debugger
  //       getLists()
  //     });
  const getRatings = async (_client = client) => {
    try {
      const res = await _client.query(
        q.Map(
          q.Paginate(
            q.Match(
              // todo use lists_by_owner
              // class list; returns all items in a class
              q.Ref("indexes/all_ratings")
            )
          ),
          ref => q.Get(ref)
        )
      );
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  return {
    client,
    getRatings,
    setRating
  };
}
