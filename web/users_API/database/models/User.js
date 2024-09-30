module.exports = (sequelize, DataTypes) => {

  
  let alias = "user";
  let cols = {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    isActivated: {
      type: DataTypes.BOOLEAN,
    },
    activateToken:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    refreshToken: {
      type: DataTypes.STRING,
    }
  }

  let config = {
      timestamps: false,
      deletedAt: false,
      createdAt: false,
      updatedAt: false
  };

  const user = sequelize.define(alias, cols, config);


  return user
}
