const BlogPosts = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define(
    'BlogPost',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      content: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      user_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      published: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updated: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      timestamps: false,
      tableName: 'blog_posts',
      underscored: true,
    }
  );

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.PostsCategories, {
      foreignKey: 'id',
      as: 'post_id',
    });
    BlogPost.hasOne(models.User, {
      foreignKey: 'id',
      as: 'user_id',
    });
  };

  return BlogPost;
};

module.exports = BlogPosts;
