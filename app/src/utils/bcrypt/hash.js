const bcrypt = require('bcrypt');

const hash = async (value) => {
    const hashed = await bcrypt.hash(value, 10);
    return hashed;
};

module.exports = hash;