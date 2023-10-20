import { randomUUID } from 'crypto';
import express, { request } from 'express';
import { customeraccount,product, registerdeposits } from './assets/classes';
import { products } from './assets/catalogue/products';
// import bodyParser from 'body-parser';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

app.get('/', (req, res) => {
  res.send({ message: 'Hello API' });
});

// GET Method to get all the customers account details
app.get('/accounts', (req,res) => {
  res.status(201).send(accounts);
});

// GET Method to get the specific customer account details based on path parameter accountId
app.get('/accounts/:accountId', (req, res) => {
  const accountid = req.params.accountId;
  const customerdetails = accounts.filter((accountofcustomer) =>  { return accountofcustomer.id === accountid})
  if (customerdetails[0]) {
    res.status(200).send(customerdetails[0]);
    }
  res.status(404).send()
})

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});

// using middleware to parsing json payload
app.use('/accounts', express.json())

// POST method to add a new customer account
const accounts: customeraccount[] = [];
app.post('/accounts', (req,res) => {
  if (req.body.name) {     
    const idvalue = randomUUID()
    const namevalue = req.body.name
    const balancevalue = 0
    const addedaccount: customeraccount = new customeraccount(idvalue,namevalue,balancevalue);
    accounts.push(addedaccount);
    res.send({
        id: idvalue,
        name: namevalue,
        balance: balancevalue,
      });
    }
    res.status(400).send();
});

// PART B: Purchasing Products

const deposits: registerdeposits[] = [];
app.use('/accounts/:accountId/deposits', express.json());
app.use('/accounts/:accountId/deposits', (req,res,next) => {
  if(req.body.amount){
    next();
  }
  res.status(400).send();
})

// APi to register deposit 
app.post('/accounts/:accountId/deposits', (req,res) => {
  const simulatedday = Number(req.headers['Simulated-Day']);
  const depositoraccountid = req.params.accountId;
  const depositamount = req.body.amount;
  const depositId = randomUUID();
  const depositdate = new Date();
  const registerdeposit = new registerdeposits(depositamount,depositdate,depositoraccountid,depositId,simulatedday);
  deposits.push(registerdeposit);
  const accountwithdeposit = accounts.filter((account) => {
    return req.params.accountId === account.id
  })
  res.status(201).send({
    id: depositId,
    name: accountwithdeposit[0].name,
    balance: accountwithdeposit[0].balance
  })
    
    res.status(400).send();
    
  });
app.use('/accounts/:accountId/purchases', express.json());
app.post('/accounts/:accountId/purchases', (req, res) => {
  accounts.forEach((account) => {
    if(req.params.accountId === account.id) {
      products.forEach((product) => {
        if (product['id'] === req.body.productId && product['stock'] > 0 && product['price'] <= account.balance) {
          res.status(201).send();
        }
        else if (product['stock'] <= 0){
          res.status(409).send();
        }
        else if (product['price'] > account.balance) {
          res.status(409).send();
        }
        else{
          res.status(400).send();
        }
      })

    }
  })
});

// API to add a product 
let productlist: product[] = products;
app.use('/products',express.json());
app.use('/products', (req, res, next) => {
  if(req.method === 'POST' && req.baseUrl === '/accounts') {
    if(req.body.title) {
      next();
    }
    res.status(400).send();
    }
  next();
})
app.post('/products', (req, res) => {
  const producttitle = req.body.title;
  const productdescription = req.body.description;
  const productprice = req.body.price;
  const productstock = req.body.stock;
  const productid = randomUUID();
  const addedproduct = new product(productid,producttitle,productdescription,productstock,productprice);
  products.push(addedproduct);
  productlist = products;
  res.status(201).send({
    id: productid,
    title: producttitle,
    description: productdescription,
    price: productprice,
    stock: productstock
  })
})

// API to get the list of products

app.get('/products',(req, res, next) => {
  const simulatedday = req.headers['Simulated-Day'];
  res.status(200).send(productlist);

})

// API to get the specific product

app.get('/products/:productId', (req, res, next) => {
  const id = req.params.productId;
  const filteredproduct = productlist.filter((theproduct) => {
      return theproduct.id === id
  });
  if (filteredproduct[0]){
    res.status(200).send(filteredproduct[0]);
  }
  res.status(404).send();
})









