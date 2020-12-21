const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class ProductCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      const { Product, Category } = models

      ProductCategory.belongsTo(Product, {
        foreignKey: 'productId',
        targetKey: 'id',
        as: 'Product',
      })

      ProductCategory.belongsTo(Category, {
        foreignKey: 'categoryId',
        targetKey: 'id',
        as: 'Category',
      })
    }
  }
  ProductCategory.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      productId: {
        type: DataTypes.UUID,
        references: {
          model: 'Product',
          key: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
      categoryId: {
        type: DataTypes.UUID,
        references: {
          model: 'Category',
          key: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
    },
    {
      sequelize,
      timestamps: false,
      modelName: 'ProductCategory',
      tableName: 'ProductCategory',
    }
  )

  return ProductCategory
}
