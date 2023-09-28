const{ObjectId} =require('mongodb');

const { Database }= require('../database/index.js');


const COLLECTION = "users";

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

const create = async(user) => {
    const collection = await Database(COLLECTION);
    let result = await collection.insertOne(user);
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



module.exports.UsersService = {
    getAll,
    getById,
    create,
    update,
    remove,
    
};
