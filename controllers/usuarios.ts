import { Request, Response} from 'express';
import User from '../models/user';

export const getUsers = async(req:Request, res:Response)=>{

    const users = await User.findAll();

    res.json({users});
}

export const getUser = async(req:Request, res:Response)=>{
    const {id} = req.params;

    const user = await User.findByPk(id);
    if(!user){
        res.json( user );
    }else{
        res.status(404).json({
            msg: `the id does not exist ${id}`
        });
    }
}

export const postUser = async(req:Request, res:Response)=>{
    const {body} = req;
    try {
        const existEmail = await User.findOne({
            where: {
                email: body.email
            }
        });
        if(existEmail){
            return res.status(400).json({
                msg: `The email ${body.email} already exists `
            });
        }
        const user = await User.create(body);
        res.json(user);
    } catch (error) {
        res.json({
            msg: 'talk to the administrator'
        })
    }
}

export const putUser = async(req:Request, res:Response)=>{
    const {id} = req.params;
    const {body} = req;
    try {
        const user = await User.findByPk(id);
        if(!user){
            return res.status(404).json({
                msg: "the user does not exists"
            });
        }
        await user.update(body);
        res.json(user);
    } catch (error) {
        res.json({
            msg: 'talk to the administrator'
        })
    }
}

export const deleteUser = async(req:Request, res:Response)=>{
    const {id} = req.params;
    const user = await User.findByPk(id);
    if(!user){
        return res.status(404).json({
            msg: "the user does not exists"
        });
    }
    await user.update({status:false});
    res.json({
        msg: 'Deleted user'
    })
}