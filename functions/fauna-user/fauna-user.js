exports.handler = async () => {
  try {
    const faunaSecret = process.env.FAUNADB_SERVER_SECRET;
    return {
      statusCode: 200,
      body: JSON.stringify({ faunaSecret })
    };
  } catch (err) {
    return { statusCode: 500, body: err.toString() };
  }
};
