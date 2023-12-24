const nearbySearch = require('../controllers/googleMaps/nearbySearch');

function routes(fastify, options, done) {
    fastify.get('/nearbySearch', nearbySearch);

    done();
}

module.exports = routes;