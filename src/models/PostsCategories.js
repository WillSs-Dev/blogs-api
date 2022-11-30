const PostCategorieModel = (sequelize, DataTypes) => {
  const PostCategorie = sequelize.define(
    'PostCategorie',
    {
      post_id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      category_id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    },
    {
      timestamps: false,
      tableName: 'categories',
    }
  );

  PostCategorie.associate = (models) => {
    PostCategorie.hasOne(models.Categories, {
      foreignKey: 'id',
      as: 'category_id',
    });
    PostCategorie.hasOne(models.BlogPosts, {
      foreignKey: 'id',
      as: 'post_id',
    });
  };

  return PostCategorie;
};

module.exports = PostCategorieModel;
