import express from 'express';
import mongoose from 'mongoose';
import Customer from './models/Customer.js';
import dotenv from 'dotenv';

const app = express();
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

dotenv.config();

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/populateCustomers', async (req, res) => {
    const customers = [
      {
        name: 'John Doe',
        email: 'john@example.com',
        // Add the rest of John Doe's properties here
      },
      {
        _id: '65ee8a32a133d74e834878d0',
        name: 'Michael Brown',
        email: 'michael@example.com',
        age: 40,
        address: '101 Main St, New York, NY, 10001',
        phone_number: '1231231234',
        star_balance: 500,
        credit_cards: [
          {
            card_number: 9999888877776666,
            expiration_date: new Date(2027, 9, 30),
            security_code: 135
          },
          {
            card_number: 4444333322221111,
            expiration_date: new Date(2022, 2, 1),
            security_code: 789
          }
        ],
        messages: [
          {
            sender: '65ee8a32a133d74e834878d9',
            message: 'Hi Michael, wanted to remind you about our meeting tomorrow.',
            date: new Date(2024, 2, 1)
          }
        ],
        preferences: {
          personalized_ads: true,
          receive_emails: false,
          track_activity: true,
          send_location: true,
          two_factor_auth: true,
          passcode_lock: true,
          face_id: false,
          inbox_messages: true,
          tipping_receipts_orders: false
        }
      },
      {
        _id: '65ee8a32a133d74e834878d9',
        name: 'Alice Johnson',
        email: 'alice@example.com',
        age: 28,
        address: '789 Elm St, Chicago, IL, 60601',
        phone_number: '5556667777',
        star_balance: 3000,
        credit_cards: [
          {
            card_number: 5555666677778888,
            expiration_date: new Date(2021, 8, 30),
            security_code: 246
          }
        ],
        messages: [],
        preferences: {
          personalized_ads: true,
          receive_emails: true,
          track_activity: true,
          send_location: true,
          two_factor_auth: false,
          passcode_lock: false,
          face_id: false,
          inbox_messages: true,
          tipping_receipts_orders: true
        }
      }
    ];
  
    try {
      await Customer.insertMany(customers);
      res.json('Customers added!');
    } catch (err) {
      res.status(400).json('Error: ' + err);
    }
  });