const PostCategoryModel = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define(
    'PostCategory',
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
      tableName: 'Categorys',
    }
  );

  PostCategory.associate = (models) => {
    PostCategory.hasOne(models.Category, {
      foreignKey: 'id',
      as: 'category_id',
    });
    PostCategory.hasOne(models.BlogPost, {
      foreignKey: 'id',
      as: 'post_id',
    });
  };

  return PostCategory;
};

module.exports = PostCategoryModel;
