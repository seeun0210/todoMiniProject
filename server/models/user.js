const User = (Sequelize, DataTypes) => {
  const model = Sequelize.define(
    "todoUser",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_name: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      user_pw: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      user_email: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      user_id: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
    },
    {
      tableName: "todoUser",
      freezeTableName: true,
      timestamps: false,
      updatedAt: false,
      createAt: true,
    }
  );

  return model;
};
module.exports = User;
