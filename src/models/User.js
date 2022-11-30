const UserModel = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    display_name: {
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
    underscored: true,
  });

  return User;
};

module.exports = UserModel;