const {MongoClient} = require('mongodb');
const MONGODB_URI = 'mongodb+srv://tsolus:Benjie06@clear-fashion.sorfh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const MONGODB_DB_NAME = 'clearfashion';

let client = null;
var adresseP = require('C:/Users/trist/OneDrive/Desktop/WebApp/Workshop1/clear-fashion/server/sites/adresseParis.json');
var dedicated = require('C:/Users/trist/OneDrive/Desktop/WebApp/Workshop1/clear-fashion/server/sites/dedicated.json');
var montlimart = require('C:/Users/trist/OneDrive/Desktop/WebApp/Workshop1/clear-fashion/server/sites/montlimart.json');
var products = adresseP.concat(dedicated, montlimart);
let db;  

async function Connect(){
    client = await MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true});
    console.log("Connection Successful");
    db =  await client.db(MONGODB_DB_NAME);
}

async function Close(){
    await client.close();
    console.log("Connection Closed");
}

async function InsertProduct(){ 
    await db.createCollection("products");
    const collection = await db.collection('products');
    //console.log(typeof(products));
    const result = await collection.insertMany(products);
    //console.log(result);
}
async function main(){
    await Connect();
    await InsertProduct();
    await Close();
}

main()
