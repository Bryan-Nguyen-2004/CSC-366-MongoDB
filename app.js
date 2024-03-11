import express from 'express';
import mongoose from 'mongoose';
import Customer from './models/Customer.js';
import Manager from './models/Manager.js';
import dotenv from 'dotenv';

const app = express();
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

dotenv.config();

const uri = process.env.ATLAS_URI;
mongoose.connect(uri);
console.log(uri);

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

  app.post('/populateManager', async (req, res) => {
    const managers = [
      {
        first_name: "Emily",
        last_name: "Clark",
        email: "emily.clark@example.com",
        phone_number: "555-123-4567",
        address: "123 Main Street, Townsville, TS 12345",
        store: [
          {
            address: "456 Market Street, Townsville, TS 12345",
            open_date: new Date("2023-04-01T00:00:00.000Z"),
            size: 2000,
            sales_target: 60000,
            region: "East",
            sales: [
              {
                quantity_sold: 150,
                sales_date: new Date("2024-03-10T00:00:00.000Z"),
                total_sale_amount: 3000
              },
              {
                quantity_sold: 200,
                sales_date: new Date("2024-03-11T00:00:00.000Z"),
                total_sale_amount: 4000
              }
            ],
            rent: [
              {
                expense_type: "Lease",
                description: "Monthly lease",
                amount: 2500,
                due_date: new Date("2024-03-05T00:00:00.000Z"),
                payment_date: new Date("2024-03-04T00:00:00.000Z"),
                note: "Lease for April"
              },
              {
                expense_type: "Utilities",
                description: "Electricity and water bill for March",
                amount: 500,
                due_date: new Date("2024-03-10T00:00:00.000Z"),
                payment_date: new Date("2024-03-09T00:00:00.000Z"),
                note: ""
              }
            ]
          }
        ]
      },
      {
        first_name: "Alex",
        last_name: "Johnson",
        email: "alex.johnson@example.com",
        phone_number: "555-234-5678",
        address: "789 West Street, New City, NC 67890",
        store: [
          {
            address: "1012 South Street, New City, NC 67890",
            open_date: new Date("2022-07-15T00:00:00.000Z"),
            size: 2500,
            sales_target: 70000,
            region: "West",
            sales: [
              {
                quantity_sold: 175,
                sales_date: new Date("2024-03-15T00:00:00.000Z"),
                total_sale_amount: 3500
              }
            ],
            rent: [
              {
                expense_type: "Utilities",
                description: "Monthly utilities",
                amount: 600,
                due_date: new Date("2024-03-20T00:00:00.000Z"),
                payment_date: new Date("2024-03-18T00:00:00.000Z"),
                note: "Utilities for April"
              }
            ]
          }
        ]
      },
      {
        first_name: "Danielle",
        last_name: "Green",
        email: "danielle.green@example.com",
        phone_number: "555-456-7890",
        address: "321 Cedar Street, Lakeside, LS 67890",
        store: [
          {
            address: "654 Oak Street, Lakeside, LS 67890",
            open_date: new Date("2024-01-20T00:00:00.000Z"),
            size: 1800,
            sales_target: 50000,
            region: "Central",
            sales: [
              {
                quantity_sold: 130,
                sales_date: new Date("2024-03-20T00:00:00.000Z"),
                total_sale_amount: 2600
              }
            ],
            rent: [
              {
                expense_type: "Lease",
                description: "Monthly store lease",
                amount: 2200,
                due_date: new Date("2024-03-25T00:00:00.000Z"),
                payment_date: new Date("2024-03-24T00:00:00.000Z"),
                note: "Lease payment for April"
              },
              {
                expense_type: "Utilities",
                description: "Monthly electricity bill",
                amount: 400,
                due_date: new Date("2024-03-15T00:00:00.000Z"),
                payment_date: new Date("2024-03-14T00:00:00.000Z"),
                note: "Paid under the budget"
              }
            ]
          }
        ]
      },
      {
        first_name: "Fiona",
        last_name: "Harper",
        email: "fiona.harper@example.com",
        phone_number: "555-567-8901",
        address: "987 Willow Street, Rivertown, RT 89012",
        store: [
          {
            address: "1234 River Street, Rivertown, RT 89012",
            open_date: new Date("2022-06-01T00:00:00.000Z"),
            size: 2100,
            sales_target: 55000,
            region: "Northwest",
            sales: [
              {
                quantity_sold: 160,
                sales_date: new Date("2024-03-21T00:00:00.000Z"),
                total_sale_amount: 3200
              },
              {
                quantity_sold: 190,
                sales_date: new Date("2024-03-22T00:00:00.000Z"),
                total_sale_amount: 3800
              }
            ],
            rent: [
              {
                expense_type: "Lease",
                description: "Annual store lease agreement",
                amount: 2400,
                due_date: new Date("2024-04-01T00:00:00.000Z"),
                payment_date: new Date("2024-03-31T00:00:00.000Z"),
                note: "Prepared for next fiscal year lease renewal"
              },
              {
                expense_type: "Utilities",
                description: "Gas bill",
                amount: 300,
                due_date: new Date("2024-03-20T00:00:00.000Z"),
                payment_date: new Date("2024-03-19T00:00:00.000Z"),
                note: "Gas bill for March"
              }
            ]
          }
        ]
      }
    ];
  
    try {
      await Manager.insertMany(managers);
      res.json('Managers added!');
    } catch (err) {
      res.status(400).json('Error: ' + err);
    }
  }); 