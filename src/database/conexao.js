import { Sequelize } from 'sequelize';

const sequelize = new Sequelize("projeto_integrador", "root", "", { host: '34.95.213.167', dialect: 'mysql'});

export default sequelize;

global.sequelize = sequelize;

// $host="34.95.213.167";
// $port=3306;
// $socket="";
// $user="root";
// $password="";
// $dbname="projeto_integrador";

//jdbc:mysql://34.95.213.167:3306/?user=root