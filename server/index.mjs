// index.mjs
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';
import https from 'https'
import  fs from 'fs'
import dotenv from 'dotenv';
import timeout from 'connect-timeout';  // Requires `connect-timeout` package



dotenv.config();

const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(timeout('10s'));  // 10 seconds timeout for each request





const configuration = new Configuration({
  basePath: PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
      'PLAID-SECRET': process.env.PLAID_SECRET,
    },
  },
});

console.log("Plaid Client ID:", process.env.PLAID_CLIENT_ID);
console.log("Plaid Secret:", process.env.PLAID_SECRET);

console.log("Before plaidClient.linkTokenCreate call");
const plaidClient = new PlaidApi(configuration);
console.log("After plaidClient.linkTokenCreate call");


app.post('/link/token/create', async (req, res) => {

  try {
    const plaidRequest = {
      user: {
        client_user_id: 'user',
      },
      client_name: 'Personal Finance App',
      products: ['auth'],
      country_codes: ['US'],
      language: 'en',
      redirect_uri: 'http://localhost:5173/dashboard/',
      
    };

    const response = await plaidClient.linkTokenCreate(plaidRequest);
    const linkToken = response.data.link_token;

    res.json({ linkToken });
  } catch (error) {
    console.error('Error creating link token:', error.message);
    res.status(500).json({error: 'failed to create link token'});
  }


});


app.post('/set-auth-cookie', (req, res) => {
  const oneHour = 60 * 60 * 1000;
  const expirationDate = new Date(Date.now() + oneHour);

  res.cookie('isAuthenticated', 'true', { httpOnly: true, sameSite: 'strict', secure: true, expires: expirationDate });
  res.cookie('isPlaidAuthenticated', 'true', { httpOnly: true, sameSite: 'strict', secure: true, expires: expirationDate });
  res.cookie('authToken', 'your-token', { httpOnly: true, secure: true, sameSite: 'Lax', expires: expirationDate });
  res.end();
});

app.post('/clear-auth-cookie', (req, res) => {
  res.clearCookie('isAuthenticated');
  res.clearCookie('isPlaidAuthenticated');
  res.clearCookie('authToken');
  res.end();
});

app.get('/check-authentication', (req, res) => {
  const isAuthenticated = req.cookies.isAuthenticated === 'true';
  const isPlaidAuthenticated = req.cookies.isPlaidAuthenticated === 'true';
  res.json({ isAuthenticated, isPlaidAuthenticated });
});



const httpsOptions = {
  key: fs.readFileSync('./key.pem', 'utf8'),
  cert: fs.readFileSync('./cert.pem', 'utf8'),
  passphrase: 'barboza'
}

const httpsServer = https.createServer(httpsOptions, app)

app.listen(8000, () => {
  console.log('Listening on port 8000');
});

