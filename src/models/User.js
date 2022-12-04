const UserModel = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    displayName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    email: DataTypes.STRING,
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    image: DataTypes.STRING,
  },{
    timestamps: false,
    tableName: 'users',
    underscored: true,
  });

  User.associate = (models) => {
    User.hasMany(models.BlogPost,
      {
        foreignKey: 'userId',
        as: 'blogposts',
      })
  }

  return User;
};

module.exports = UserModel;