import { DataTypes, Model } from "sequelize";
import sequelize from "../config";

interface ReserveAttributes {
  id?: number;
  userId?: number;
  deskId: number;
  reservationDate: Date;
  status?: string;
}

class Reserve extends Model<ReserveAttributes> implements ReserveAttributes {
  public id!: number;
  public userId!: number;
  public deskId!: number;
  public reservationDate!: Date;
  public status!: string;
}

const ReserveModel = Reserve.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  deskId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  reservationDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "Ativo"
  }
}, {
  sequelize,
  modelName: "Reserve",
  tableName: "Reserve",
  timestamps: false
}
);

export default ReserveModel;