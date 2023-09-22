import { randomUUID } from 'crypto';
import express from 'express';
import { customeraccount } from './assets/classes';

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

// GET Method to get the specific customer account details based on path parameter accountid
app.get('/accounts/:accountid', (req, res) => {
  const accountid = req.params.accountid;
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

// using middleware function to check the payload exists in the request or not
app.use('/accounts', (req, res, next) => {
  if (req.method === 'POST'){
    if (req.body.name) {
        next();
    }
    else {
      res.status(400).send();
    }
}
});

// POST method to add a new customer account
const accounts: customeraccount[] = [];
app.post('/accounts', (req,res) => {
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
});










