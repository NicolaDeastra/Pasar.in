module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ProductCategory', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      productId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Product',
          key: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
      categoryId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Category',
          key: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ProductCategory')
  },
}
