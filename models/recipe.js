module.exports = (sequelize, DataTypes) => {
    const Recipe = sequelize.define("recipe", {
      recipeName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      source: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      yield: {
          type: DataTypes.STRING,
      },
      ingredients: {
        type: DataTypes.STRING(1000),
        allowNull: false,
      },
      directions: {
          type: DataTypes.STRING(1000),
          allowNull: false,
      },
      notes: {
          type: DataTypes.STRING(1000)
      },
      rating: {
          type: DataTypes.INTEGER
      },
      owner: {
        type: DataTypes.INTEGER,
      },
    });
    return Recipe;
  };