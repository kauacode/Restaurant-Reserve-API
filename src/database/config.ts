import { Sequelize } from "sequelize"
import dotenv from "dotenv"

dotenv.config();

const sequelize = new Sequelize({
  dialect: "mysql",
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  logging: false,
  define: {
    timestamps: false,
    freezeTableName: true
  }
});

async function validaConexao() {
  try {
    await sequelize.authenticate();
    console.log("Conexão bem sucedida!");
  }
  catch (error) {
    console.log("Falha na conexão!");
    console.log(error);
  }
}

validaConexao();

export default sequelize;