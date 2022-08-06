import express, {Application} from 'express';
import userRoutes from '../routes/user';
import cors from 'cors';
import db from '../db/connection';

class Server {

    private app: Application ;
    private port: string;
    private apiPaths ={
        users: '/api/users'
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '6000';

        this.dbConnection();
        this.middlewares();
        this.routes();
    }

    async dbConnection(){
        try {
            await db.authenticate();
            console.log('database online');
        } catch (err) {
            throw new Error('Error: '+ err);
        }
    }
    middlewares(){
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }
    routes(){
        this.app.use(this.apiPaths.users, userRoutes);
    }
    listen() {
        this.app.listen(this.port, ()=>{
            console.log('Server running on port '+this.port);
        });
    }
}

export default Server;