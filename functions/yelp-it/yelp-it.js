const yelp = require("yelp-fusion");

exports.handler = async event => {
  const client = yelp.client(process.env.YELP_API_KEY);
  const { term, location } = event.queryStringParameters;
  const searchRequest = {
    term: term,
    location: location
  };
  var geojsonify = async res => {
    console.log(res);
    let features = [];
    res.map(item => {
      features.push({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [item.coordinates.longitude, item.coordinates.latitude]
        },
        properties: {
          ...item
        }
      });
    });
    return {
      type: "FeatureCollection",
      features
    };
  };
  try {
    let res = await client.search(searchRequest);
    console.log(res);
    let geojsonified = await geojsonify(res.jsonBody.businesses);
    return {
      statusCode: 200,
      body: JSON.stringify({
        results: geojsonified
      })
    };
  } catch (err) {
    return { statusCode: 500, body: err.toString() };
  }
};
