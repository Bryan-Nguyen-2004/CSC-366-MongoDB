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
mongoose.connect(uri, { useNewUrlParser: true });

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
            name: 'Jane Doe',
            email: 'jane@abc.com',
            age: 26,
            address: '123 First Dr, San Luis Obispo, CA, 92410',
            phone_number: '1234567890',
            star_balance: 2000,
            credit_cards: [
              {
                card_number: 1234567890123456,
                expiration_date: new Date(2028, 8, 30),
                security_code: 123
              },
              {
                card_number: 9876543210987654,
                expiration_date: new Date(2020, 11, 30),
                security_code: 456
              }
            ],
            messages: [
              {
                sender: '65ee8a32a133d74e834878d8',
                message: 'Hello Jane, how are you?',
                date: new Date(2024, 2, 1)
              },
              {
                sender: '65ee8a32a133d74e834878d9',
                message: "Hi Jane, I hope you're doing well!",
                date: new Date(2024, 2, 1)
              }
            ],
            preferences: {
              personalized_ads: true,
              receive_emails: true,
              track_activity: true,
              send_location: true,
              two_factor_auth: true,
              passcode_lock: true,
              face_id: true,
              inbox_messages: true,
              tipping_receipts_orders: true
            }
          },
          {
            name: 'John Smith',
            email: 'john@example.com',
            age: 35,
            address: '456 Oak St, Los Angeles, CA, 90001',
            phone_number: '9876543210',
            star_balance: 1500,
            credit_cards: [
              {
                card_number: 1111222233334444,
                expiration_date: new Date(2029, 6, 30),
                security_code: 789
              }
            ],
            messages: [
              {
                sender: '65ee8a32a133d74e834878d7',
                message: "Hey John, just checking in. How's everything?",
                date: new Date(2024, 2, 1)
              }
            ],
            preferences: {
              personalized_ads: true,
              receive_emails: true,
              track_activity: true,
              send_location: false,
              two_factor_auth: true,
              passcode_lock: false,
              face_id: false,
              inbox_messages: true,
              tipping_receipts_orders: false
            }
          },
      {
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