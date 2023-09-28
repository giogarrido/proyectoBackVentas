const{ObjectId} =require('mongodb');

const { Database }= require('../database/index.js');
const {productsUtils} = require('./utils.js');

const COLLECTION = "products";

const getAll = async() => {
    const collection = await Database(COLLECTION);
    return await collection.find({}).toArray();
}

/*
*metodo para obtener un producto por id
*@param {string} id
*@returns {Object|null}
*/

const getById = async (id) => {
    const collection = await Database(COLLECTION)
    const objectId = new ObjectId(id)
    return await collection.findOne({ _id: objectId })
}

const create = async(product) => {
    const collection = await Database(COLLECTION);
    let result = await collection.insertOne(product);
    return result.insertedId;

}


const update = async(id, data) => {
    const collection = await Database(COLLECTION);
    const objectId = new ObjectId(id)
    return await collection.updateOne({ _id: objectId }, { $set: data });
}

const remove = async(id) => {
    const collection = await Database(COLLECTION);
    const objectId = new ObjectId(id)
    return await collection.deleteOne({ _id: objectId });
}

const generateReport = async (name,res) => {
    let products = await getAll();
    productsUtils.excelGenerator(products, name,res);

}



module.exports.ProductsService = {
    getAll,
    getById,
    create,
    update,
    remove,
    generateReport,
    
};



