const Todo = (Sequelize, DataTypes) => {
  const model = Sequelize.define(
    "todo",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      done: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "todo",
      freezeTableName: true,
      timestamps: false,
      updatedAt: true,
    }
  );

  return model;
};

module.exports = Todo;
