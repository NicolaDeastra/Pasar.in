require('dotenv').config()
const { Model } = require('sequelize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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

    static encrypt = (password) => bcrypt.hashSync(password, 8)

    static register = ({ username, password, confirmPassword, email }) => {
      if (password !== confirmPassword) {
        throw new Error('password must same ')
      }

      const encryptedPassword = this.encrypt(password)

      return this.create({ username, email, password: encryptedPassword })
    }

    checkPassword = (password) => bcrypt.compareSync(password, this.password)

    generateToken = async () => {
      const user = this

      const payload = {
        id: user.id,
        username: user.username,
      }

      const secret = process.env.SECRET

      const token = jwt.sign(payload, secret)

      try {
        await user.update(
          {
            tokens: sequelize.fn(
              'array_append',
              sequelize.col('tokens'),
              token
            ),
          },
          { where: { id: user.id } }
        )

        return token
      } catch (err) {
        return err
      }

      return token
    }

    static authenticate = async ({ email, password }) => {
      try {
        const user = await this.findOne({ where: { email } })

        if (!user) {
          throw new Error('Unable to login')
        }

        const isPasswordValid = user.checkPassword(password)

        if (!isPasswordValid) {
          throw new Error('Unable to login')
        }

        return user
      } catch (error) {
        throw new Error(error)
      }
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
        unique: true,
        isEmail: true,
        allowNull: false,
        min: 6,
        max: 25,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        min: 6,
        max: 25,
      },
      tokens: {
        type: DataTypes.ARRAY(DataTypes.STRING),
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
