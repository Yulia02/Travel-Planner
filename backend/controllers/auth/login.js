const User = require('../../models/user');
const bcrypt = require('bcrypt');

async function login(request, reply) {
    const { email, password } = request.body;

    try {
        const user = await User.findOne({ email });

        if (user) {
            const isVerified = await bcrypt.compare(password, user.password);
            if (isVerified) {
                return reply.code(200).send({ message: 'Успішний вхід', user });
            } else {
                return reply.code(401).send({ message: 'Неправильний пароль' });
            }
        } else {
            return reply.code(401).send({ message: 'Користувача не знайдено' });
        }
    } catch (error) {
        console.error('Помилка при вході:', error);
        return reply.code(500).send({ message: 'Помилка сервера' });
    }
}

module.exports = login;
