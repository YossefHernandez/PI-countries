const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Country', {
    id:{
      type: DataTypes.STRING(3),
      allownull: false,
      primaryKey: true
    },
    name:{
      type: DataTypes.STRING,
      allownull: false
    },
    flagimg:{
      type: DataTypes.STRING,
      unique: true,
      allownull: false
    },
    continent:{
      type: DataTypes.STRING,
      allownull:false,
    },
    capital:{
      type:DataTypes.STRING,
      allownull:false,
    },
    subregion:{
      type: DataTypes.STRING,
      allownull:false
    },
    area:{
      type:DataTypes.INTEGER,
      allownull:false,
    },
    population:{
      type: DataTypes.INTEGER,
      allownull:false
    },
    created:{
      type:DataTypes.BOOLEAN,
      defaultValue:true
    }
  },
  {timestamps:false}
  );
};
