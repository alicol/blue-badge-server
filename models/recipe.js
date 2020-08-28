module.exports = (sequelize, DataTypes) => {
    const Recipe = sequelize.define("recipe", {
      recipeName: {
        type: DataTypes.STRING,
        
      },
      category: {
        type: DataTypes.STRING,
        
      },
      source: {
          type: DataTypes.STRING,
         
      },
      yield: {
          type: DataTypes.STRING,
      },
      ingredients: {
        type: DataTypes.STRING(8000),
        
      },
      directions: {
          type: DataTypes.STRING(8000),
          
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