import { DataTypes, Model } from "sequelize";
import sequelize from "../config";

interface DeskAttributes {
  id?: number;
  name: string;
  capacity: number;
  status: string;
}

class Desk extends Model<DeskAttributes> implements DeskAttributes {
  public id!: number;
  public name!: string;
  public capacity!: number;
  public status!: string;
}

const DeskModel = Desk.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  capacity: {
    type: DataTypes.NUMBER,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "Disponivel"
  }
},
  {
    sequelize,
    modelName: "Desk",
    tableName: "Desk",
    timestamps: false
  }
);



export default DeskModel;