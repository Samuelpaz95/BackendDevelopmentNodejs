const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Model { };
    User.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fullname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        passwrd: {
            type: DataTypes.STRING,
        },
    }, {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        createdAt: false,
        updatedAt: false
    });
    return User
}
