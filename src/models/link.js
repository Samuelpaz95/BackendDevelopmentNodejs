const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
    class Link extends Model {
        static associate(models) {
            Link.belongsTo(models.User, {
                foreignKey: {
                    name: 'user_id',
                    type: DataTypes.INTEGER,
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            });
        }
    };

    Link.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lurl: {
            type: DataTypes.STRING,
            allowNull: false
        },
        descrip: {
            type: DataTypes.STRING
        },
        user_id: {
            type: DataTypes.INTEGER
        },
        create_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    }, {
        sequelize,
        modelName: 'Link',
        tableName: 'links',
        createdAt: false,
        updatedAt: false
    });
    return Link
};