//Entregable 3 Express BackEnd Coder

//Importo la clase productManager

const productManager = require('./ProductManager')
// const products = require('./data.json')
let productos;

const testingJSON = async () => {
    try {
        const testingProducts = new productManager("./data.json");
        const products = await testingProducts.getProducts();
        console.log("getProducts", 'The products are: ', products);
        productos = products;
    } catch (error) {
        console.error(' Error: ', error.message);
    }
    
};

testingJSON()


//Server Express

const express = require('express');
const app = express();

app.use(express.urlencoded({ extended:true }));

//EndPoints

app.get('/', (req, res) => {
    const htmlText = '<h1 style="color:blue">Entrega 3 servidor express</h1>'
    res.send(htmlText)
});


app.get('/products/:pid', async (req, res) => {
    try {
        const {pid} = req.params
        prodFind = productos.find(p => p.id === parseInt(pid))
        if (!prodFind){
            res.json({
                error: 'Product Not Found',
                message: `The product id ${pid} not found`
            })
        }else{
            await res.send(prodFind);
        }
    }catch(error) {
        res.status(400).json({
            status: 'error',
            message: error.message,
        })
    }   
});

app.get('/products', async (req, res) => {
    try {
        const {limit} = req.query;
        if (limit <= 10) {
            prodFind = productos.filter(p => p.id <= limit)
            res.send(prodFind)
        }else{
            res.send(productos)
        }        
    }catch(error) {
        res.status(400).json({
            status: 'error',
            message: error.message,
        })
    }   
});

app.listen(8080, () => {
    console.log('Server listening at port 8080')
});


