const debug = require('debug')('app:module-products-controller');
const createError = require('http-errors');

const { ProductsService } = require('./service');
const { Response } = require('../common/response');


module.exports.ProductsController = {
    getProducts: async (req, res) => {
        try {
            let products = await ProductsService.getAll();
            Response.success(res, 200, "Lista de productos", products);
        }catch(error){
            debug(error);
            Response.error(res);
        }
    },
    
    
    getProduct : async (req, res) => {
        try{
            const { id } = req.params;
            const product = await ProductsService.getById(id);
            if(product){
                Response.success(res, 200, `Producto ${id}`, product);
            }else{
                Response.error(res, new createError.NotFound(`Producto ${id} no encontrado`));
            }
        }catch(error){
            debug(error);
            Response.error(res);
        }
    },
    
    
    createProduct: async (req, res) => {
        try{
            const { body } = req;
            if(!body || Object.keys(body).length === 0){
                Response.error(res, new createError.BadRequest("El producto no puede estar vacio"));
                
            } else{
                const insertedId = await ProductsService.create(body);
                Response.success(res, 201, "Producto creado", insertedId);
            }

        }catch(error){
            debug(error);
            res.status(500).json({message: "Internal Server Error"});
        }

    },
    
    
    updateProduct: async (req, res) => {
        try{
            const { id } = req.params;
            const { body } = req;
            const result = await ProductsService.update(id, body);
            if(result.matchedCount > 0){
                res.json({message: "Product updated"});
            }else{
                res.status(404).json({message: "Product not found"});
            }
        }catch(error){
            debug(error);
            res.status(500).json({message: "Internal Server Error"});
        }
    },


    
    deleteProduct: async (req, res) => {
        try{
            const { id } = req.params;
            const result = await ProductsService.remove(id);
            if(result.deletedCount > 0){
                res.json({message: "Product deleted"});
            }else{
                res.status(404).json({message: "Product not found"});
            }
        }catch(error){
            debug(error);
            res.status(500).json({message: "Internal Server Error"});
        }
    },

    generateReport: (req, res) => {
        try {
            ProductsService.generateReport('Inventario', res);
        } catch (error) {
            debug(error);
            res.status(500).json({message: "Internal Server Error"});
            
        }
    }

};