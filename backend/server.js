const mongoose = require('mongoose');
const fastify = require('fastify');
const cors = require('@fastify/cors');
require('dotenv').config();

const app = fastify();


mongoose.connect(process.env.MONGO_CONNECT_LINK, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.register(cors);
app.register(require('../backend/routes/auth'));
app.register(require('../backend/routes/googleMaps'));

app.listen({port: 8000}, (err) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log('Сервер запущено на порту 8000');
});
