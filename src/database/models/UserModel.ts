import { DataTypes, Model } from "sequelize";
import sequelize from "../config";

interface UserAttributes {
  id?: number;
  name: string;
  email: string;
  password: string;
  role?: string;
}

class User extends Model<UserAttributes> implements UserAttributes {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public role!: string;
}

const UserModel = User.init({
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
  email: {
    type: DataTypes.STRING,
    unique: true,
    validate: { isEmail: true },
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "User"
  }
}, {
  sequelize,
  modelName: "User",
  tableName: "User",
  timestamps: false
});

export default UserModel;