import { Sequelize } from 'sequelize';
import fs from 'fs';
import path from 'path';

let database = null;

const databaseSchema = process.env.DATABASESCHEMA || 'projeto_integrador';
const hostname = process.env.HOSTNAME || 'localhost';
const user = process.env.USER || 'root';
const password = process.env.PASSWORD || '';
const portDB = process.env.PORTDB || 3306;

// Busca todos os modelos e coloca na variavel models
const loadModels = (sequelize) => {
    const dir = path.join(__dirname, '../../models');
    const models = [];
    fs.readdirSync(dir).forEach(file => {
      const modelDir = path.join(dir, file);
      const model = sequelize.import(modelDir);
      models[model.name] = model;
    });
    return models;
  };

/**
 * Cria a conexão com o banco de dados.
 * @returns {{Sequelize, sequelize, models}}Um objeto que contem a conexão "sequelize", a classe "Sequelize", e os modelos "models"
 */
const conexao = () =>{
    if (!database) {
      //Banco Geral
    //   const sequelize = new Sequelize(
    //   "projeto_integrador",
    //   "root",
    //   "",
    //   {
    //      host: '34.95.213.167',
    //      dialect: 'mysql',
    //      define: {
        //    timestamps: false,
        //    raw: true
        // }
    //  });
    const sequelize = new Sequelize(
      databaseSchema,
      user,
      password,
      {
         host: hostname,
         port: portDB,
         dialect: 'mysql',
         define: {
           timestamps: false,
           raw: true
        }
     });  

      database = {
        sequelize,
        Sequelize,
        models: {},
      };
  
      database.models = loadModels(sequelize);
  
      sequelize.sync().done(() => database);
    }

    return database;
  }
  export default conexao;

// $host="34.95.213.167";
// $port=3306;
// $socket="";
// $user="root";
// $password="";
// $dbname="projeto_integrador";

//jdbc:mysql://34.95.213.167:3306/?user=root

// sequelize-auto -h <host> -d <database> -u <user> -x [password] -p [port]  --dialect [dialect] -c [/path/to/config] -o [/path/to/models] -t [tableName] -C
// sequelize-auto -h "34.95.213.167" -d "projeto_integrador" -u "root" -x "password" -p "3306"  --dialect "mysql" -o "./models" -c "./config/config"