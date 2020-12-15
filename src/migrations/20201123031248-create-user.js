module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('User', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tokens: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('User')
  },
}
