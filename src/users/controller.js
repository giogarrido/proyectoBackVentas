const debug = require('debug')('app:module-users-controller');
const createError = require('http-errors');

const { UsersService } = require('./service');
const { Response } = require('../common/response');


module.exports.UsersController = {
    getUsers: async (req, res) => {
        try {
            let users = await UsersService.getAll();
            Response.success(res, 200, "Lista de usuarios", users);
        }catch(error){
            debug(error);
            Response.error(res);
        }
    },
    
    
    getUser : async (req, res) => {
        try{
            const { id } = req.params;
            const user = await UsersService.getById(id);
            if(user){
                Response.success(res, 200, `Usuario ${id}`, user);
            }else{
                Response.error(res, new createError.NotFound(`Usuario ${id} no encontrado`));
            }
        }catch(error){
            debug(error);
            Response.error(res);
        }
    },
    
    
    createUser: async (req, res) => {
        try{
            const { body } = req;
            if(!body || Object.keys(body).length === 0){
                Response.error(res, new createError.BadRequest("El usuario no puede estar vacio"));
                
            } else{
                const insertedId = await UsersService.create(body);
                Response.success(res, 201, "Usuario creado", insertedId);
            }

        }catch(error){
            debug(error);
            res.status(500).json({message: "Internal Server Error"});
        }

    },
    
    
    updateUser: async (req, res) => {
        try{
            const { id } = req.params;
            const { body } = req;
            const result = await UsersService.update(id, body);
            if(result.matchedCount > 0){
                res.json({message: "User updated"});
            }else{
                res.status(404).json({message: "User not found"});
            }
        }catch(error){
            debug(error);
            res.status(500).json({message: "Internal Server Error"});
        }
    },


    
    deleteUser: async (req, res) => {
        try{
            const { id } = req.params;
            const result = await UsersService.remove(id);
            if(result.deletedCount > 0){
                res.json({message: "User deleted"});
            }else{
                res.status(404).json({message: "User not found"});
            }
        }catch(error){
            debug(error);
            res.status(500).json({message: "Internal Server Error"});
        }
    },


};