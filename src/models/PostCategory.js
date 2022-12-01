const PostCategoryModel = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define(
    'PostCategory',
    {
      postId: {
        allowNull: false,
        primaryKey: true,
        foreignKey: true,
        type: DataTypes.INTEGER,
      },
      categoryId: {
        allowNull: false,
        primaryKey: true,
        foreignKey: true,
        type: DataTypes.INTEGER,
      },
    },
    {
      timestamps: false,
      underscored: true,
      tableName: 'posts_categories',
    }
  );

  PostCategory.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, { 
      foreignKey: 'categoryId', 
      as: 'BlogPost',
      through: PostCategory,
    });

    models.BlogPost.belongsToMany(models.Category, { 
      foreignKey: 'postId', 
      as: 'Category',
      through: PostCategory,
    });
  };

  return PostCategory;
};

module.exports = PostCategoryModel;
