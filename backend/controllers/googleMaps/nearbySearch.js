const { createClient } = require('@google/maps');

const client = createClient({
    key: process.env.MAP_API_KEY,
    Promise: Promise
});

async function nearbySearch(request, reply) {
    const { query, language, location, radius } = JSON.parse(request.query.data);
    const response = await client.placesNearby({
        keyword: query,
        location,
        language,
        radius: radius || 1000
    }).asPromise();
    reply.code(200).send(response.json.results);
}

module.exports = nearbySearch;