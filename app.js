import express from 'express';
import mongoose from 'mongoose';
import Customer from './models/Customer.js';
import Manager from './models/Manager.js';
import Employee from './models/Employee.js';
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

app.post('/populateEmployee', async (req, res) => {
  const employees = [
    {
      name: "Mark Lawrence",
      phone: "5558393894",
      email: "mark.lawrence@example.org",
      birthday: "05291999",
      role: {
        roleName: 'barista'
      },
      tax_info: {
        ssn: "394-29-3293",
        deductions: 0
      },
      schedules: [
        {
          start_time: new Date("2024-03-10T00:00:00.000Z"),
          end_time: null,
          current: true
        },
        {
          start_time: new Date("2024-01-01T00:00:00.000Z"),
          end_time: new Date("2024-03-10T23:59:59.000Z"),
          current: false
        }
      ],
      payrolls: [
        {
          type: 'part',
          unit_pay: 12,
          effective_date: new Date("2024-01-01T00:00:00.000Z"),
          current: true
        }
      ],
      pay_bonuses: [
        {
          amount: 500.00,
          date_effective: new Date("2024-02-23T00:00:00.000Z")
        }
      ]
    },
    {
      name: "Alice Wonderland",
      phone: "5551234567",
      email: "alice.wonderland@example.com",
      birthday: "07121990",
      role: {
        roleName: 'executive'
      },
      tax_info: {
        ssn: "123-45-6789",
        deductions: 3
      },
      schedules: [
        {
          start_time: new Date("2024-03-01T08:00:00.000Z"),
          end_time: new Date("2024-03-01T17:00:00.000Z"),
          current: false
        },
        {
          start_time: new Date("2024-03-02T08:30:00.000Z"),
          end_time: null,
          current: true
        }
      ],
      payrolls: [
        {
          type: 'full',
          unit_pay: 60000,
          effective_date: new Date("2024-01-01T00:00:00.000Z"),
          current: true
        }
      ],
      pay_bonuses: [
        {
          amount: 1000.00,
          date_effective: new Date("2024-02-14T00:00:00.000Z")
        }
      ]
    },
    {
      name: "Bob Smith",
      phone: "5559876543",
      email: "bob.smith@example.net",
      birthday: "11051985",
      role: {
        roleName: 'cashier'
      },
      tax_info: {
        ssn: "987-65-4321",
        deductions: 2
      },
      schedules: [
        {
          start_time: new Date("2024-03-01T09:00:00.000Z"),
          end_time: new Date("2024-03-01T18:00:00.000Z"),
          current: false
        },
        {
          start_time: new Date("2024-03-02T09:30:00.000Z"),
          end_time: null,
          current: true
        }
      ],
      payrolls: [
        {
          type: 'part',
          unit_pay: 15,
          effective_date: new Date("2024-02-01T00:00:00.000Z"),
          current: true
        }
      ],
      pay_bonuses: [
        {
          amount: 250.00,
          date_effective: new Date("2024-03-01T00:00:00.000Z")
        }
      ]
    },
    {
      name: "Eva Johnson",
      phone: "5552468135",
      email: "eva.johnson@example.org",
      birthday: "03031980",
      role: {
        roleName: 'store manager'
      },
      tax_info: {
        ssn: "246-81-3579",
        deductions: 4
      },
      schedules: [
        {
          start_time: new Date("2024-03-01T07:30:00.000Z"),
          end_time: new Date("2024-03-01T16:30:00.000Z"),
          current: false
        },
        {
          start_time: new Date("2024-03-02T08:00:00.000Z"),
          end_time: null,
          current: true
        }
      ],
      payrolls: [
        {
          type: 'full',
          unit_pay: 55000,
          effective_date: new Date("2024-01-01T00:00:00.000Z"),
          current: true
        }
      ],
      pay_bonuses: [
        {
          amount: 750.00,
          date_effective: new Date("2024-02-29T00:00:00.000Z")
        }
      ]
    }
  ];

  try {
    await Employee.insertMany(employees);
    res.json('Employees added!');
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});