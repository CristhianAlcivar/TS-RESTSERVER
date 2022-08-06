import { Sequelize } from "sequelize";

const db = new Sequelize('node','root','Root1234',{
    host: '127.0.0.1',
    dialect: 'mysql',
    port: 3307,
    // logging: false
});

export default db;