const login = require('../controllers/auth/login');
const register = require('../controllers/auth/register');

function routes(fastify, options, done) {
    fastify.post('/register', register);

    fastify.post('/login', login);

    done();
}

module.exports = routes;