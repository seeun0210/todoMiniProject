const Todo = (Sequelize, DataTypes) => {
  const model = Sequelize.define(
    "Todo",
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
    },
    {
      tableName: "todo",
      freezeTableName: true,
      timestamps: true,
      updatedAt: false,
    }
  );

  return model;
};

module.exports = Todo;
