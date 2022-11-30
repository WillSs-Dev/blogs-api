const CategorieModel = (sequelize, DataTypes) => {
  const Categorie = sequelize.define('Categorie', {
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
    tableName: 'categories',
  });

  Categorie.associate = (models) => {
    Categorie.belongsTo(models.PostsCategories,
      {
        foreignKey: 'id', as: 'category_id',
      })
  }

  return Categorie;
};

module.exports = CategorieModel;