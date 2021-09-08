const Promise = require('bluebird');
const bcrypt = require('bcrypt');

async function hashPassword(user, options) {
    const SALT_FACTOR = 8;
    if (!user.changed('password')) {
        return;
    }
    console.log('kurcinaaaaaaaaaaa');
    return bcrypt
        .genSaltAsync(SALT_FACTOR)
        .then(salt => bcrypt.hash(user.password, salt, null))
        .then(hash => {
            user.setDataValue('password', hash)
        })
}

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
            email: {
                type: DataTypes.STRING,
                unique: true,
            },
            password: {
                type: DataTypes.STRING
            }
        },
        {
            hooks: {
                beforeCreate: hashPassword,
                beforeUpdate: hashPassword,
                beforeSave: hashPassword
            }
        }
    );

    User.prototype.comparePassword = async function (password) {
        return bcrypt.compare(password, this.password)
            .then(function (res) {
                return res;
            })
    }

    return User;
}
