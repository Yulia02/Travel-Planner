const User = require('../../models/user');
const bcrypt = require('bcrypt');

async function register(request, reply) {
    const { email, password, name } = request.body;
    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return reply.code(409).send({ message: 'Користувач з такою електронною поштою вже існує' });
        }

        const hash = await bcrypt.hash(password, 10);
        const user = new User({ email, password: hash, name });
        await user.save();

        return reply.code(200).send({ message: 'Користувач створений', user });
    } catch (error) {
        console.error('Помилка при реєстрації:', error);
        return reply.code(500).send({ message: 'Помилка сервера' });
    }
}

module.exports = register;
