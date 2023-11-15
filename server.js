let express = require('express');
let app = express();
let bodyParser = require('body-parser');

let products = [
{
    id: 1,
    name: 'laptop',
    quantity: 15
},
{
    id: 2,
    name: 'microwave',
    quantity: 7
},
{
    id: 3,
    name: 'mouse',
    quantity: 20
}
];

let currentId = 3;


let PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.use(bodyParser.json());

app.get('/products', function(req, res) {
    res.send({ products: products });
});

app.post('/products', function(req, res) {
    let productName = req.body.name;
    let productQuantity = req.body.quantity;
    let productVal = parseInt(productQuantity, 10);
    currentId++;
    //console.log("q: " + productQuantity);
    products.push({
        id: currentId,
        name: productName,
        quantity: productVal
    });
    console.log(products);
    res.send('Successfully created product!');
});



app.put('/products/:id', function(req, res) {
    let id = req.params.id;
    let newName = req.body.newName;

    let found = false;

    products.forEach(function(product, index) {
        if (!found && product.id === Number(id)) {
            product.name = newName;
        }
    });
    ////console.log("PUT");
    res.send('Succesfully updated product!');
});

app.post('/products/quantity/:id', function(req, res) {
    
    let id = req.params.id;
    let found = false;
    
    
    products.forEach(function(product, index) {
        
        //console.log("ID " + product.id);
        //console.log("NUM " + Number(id));
        if (!found && product.id === Number(id)) {
            
            let quantity = product.quantity;
            quantity++;
            product.quantity = quantity;
            
        }
    });
    //console.log(products);
    res.send(products);
});

app.post('/products/down/:id', function(req, res) {
    
    let id = req.params.id;
    let found = false;
    
    
    products.forEach(function(product, index) {
        
        if (!found && product.id === Number(id)) {
            
            let quantity = product.quantity;
            quantity--;
            product.quantity = quantity;
            
        }
        if (product.quantity < 0) product.quantity = 0; 
    });
    
    res.send(products);
});

app.delete('/products/:id', function(req, res) {
    let id = req.params.id;

    let found = false;

    products.forEach(function(product, index) {
        if (!found && product.id === Number(id)) {
            products.splice(index, 1);
        }
    });

    res.send('Successfully deleted product!');
});

app.listen(PORT, function() {
    //console.log('Server listening on ' + PORT);
});
