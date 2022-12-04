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

  PostCategory.associate = ({ Category, BlogPost }) => {
    Category.belongsToMany(BlogPost, { 
      foreignKey: 'categoryId', 
      as: 'blogposts',
      through: PostCategory,
      otherKey: 'postId'
    });

    BlogPost.belongsToMany(Category, { 
      foreignKey: 'postId', 
      as: 'categories',
      through: PostCategory,
      otherKey: 'categoryId'
    });
  };

  return PostCategory;
};

module.exports = PostCategoryModel;
