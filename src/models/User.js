const { Model } = require('sequelize')
const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    static #encrypt = (password) => bcrypt.hashSync(password, 8)

    static register = ({ username, email, password }) => {
      const encryptedPassword = this.#encrypt(password)

      return this.create({ username, email, password: encryptedPassword })
    }
  }
  User.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        min: 6,
        max: 25,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        isEmail: true,
        min: 6,
        max: 25,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        min: 6,
        max: 25,
      },
    },
    {
      timestamps: false,
      sequelize,
      modelName: 'User',
      tableName: 'User',
    }
  )

  return User
}
