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
        //no idea why this throws an invalid argument error, but it works//
        client
          .query(
            q.Create(q.Class("ratings"), {
              data: title
            })
          )
          .then(ret => console.log(ret))
          .catch(err => console.log(err));
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

  const getRatings = async () => {
    debugger;
    try {
      const res = await client.query(
        q.Map(q.Paginate(q.Match(q.Ref("indexes/all_ratings"))), ref =>
          q.Get(ref)
        )
      );
      // if (exists.data.length) {
      // const res = await _client.query(
      //   q.Map(
      //     q.Paginate(
      //       q.Match(
      //         q.Ref("indexes/all_users" + id)
      //       )
      //     ),
      //     ref => q.Get(ref)
      //   )
      // );
      // return res.data
      // } else {
      //   //create//
      //   const res = await _client.query(
      //     q.Create(q.Class('users'), {
      //       data: {
      //         id: id,
      //         places: []
      //       }
      //     })
      //   )
      //   debugger
      //   return res.data
      // }
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
