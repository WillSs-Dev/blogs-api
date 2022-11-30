const CategoryModel = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },{
    timestamps: false,
    tableName: 'Categorys',
  });

  Category.associate = (models) => {
    Category.belongsTo(models.PostsCategorys,
      {
        foreignKey: 'id', as: 'category_id',
      })
  }

  return Category;
};

module.exports = CategoryModel;