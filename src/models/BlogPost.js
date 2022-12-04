const BlogPostModel = (sequelize, DataTypes) => {
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
      userId: {
        foreignKey: true,
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

  BlogPost.associate = ({ User }) => {
    BlogPost.belongsToMany(User, {
      foreignKey: 'userId',
      as: 'user',
      through: BlogPost,
    });
  };

  return BlogPost;
};

module.exports = BlogPostModel;
