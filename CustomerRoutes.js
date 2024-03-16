import express from 'express';
import Customer from './models/Customer.js';

const router = express.Router();

// As a Starbucks Customer, I want to be able to look at all my past orders and be able to sort and filter them.
router.get('/customerOrders/:customerId', async (req, res) => {
  const { customerId } = req.params;
  const { name, description } = req.query;

  try {
    const match = {};
    if (name) {
      console.log(name);
      match.name = { $regex: name, $options: 'i' };
    }
    if (description) {
      console.log(description);
      match.description = { $regex: description, $options: 'i' };
    }

    const customer = await Customer.findById(customerId).populate({
      path: 'order_history',
      match: Object.keys(match).length ? { $or: [match] } : {}
    });

    console.log(customer.order_history);

    // Filter out null values (orders that didn't match the filter)
    const orders = customer.order_history.filter(order => order !== null);

    res.json(orders);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

// As a Starbucks Customer, I want to be able to look and edit all my account preferences.
router.get('/getPreferences/:customerId', async (req, res) => {
  const { customerId } = req.params;

  try {
    const customer = await Customer.findById(customerId);
    res.json(customer.preferences);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

router.put('/updatePreferences/:customerId', async (req, res) => {
  const { customerId } = req.params;
  const preferences = req.body;

  console.log(preferences);

  try {
    const customer = await Customer.findByIdAndUpdate(customerId, {
      $set: { preferences: preferences }
    }, { new: true }); // { new: true } option returns the updated document

    res.json(customer);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

// As a Starbucks Customer, I want to be able to track my favorite products and be able to easily order them.
router.get('/getFavorites/:customerId', async (req, res) => {
  const { customerId } = req.params;

  try {
    const customer = await Customer.findById(customerId).populate('favorite_products');
    res.json(customer.favorite_products);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

router.post('/addFavorite/:customerId/:productId', async (req, res) => {
  const { customerId, productId } = req.params;

  try {
    const customer = await Customer.findByIdAndUpdate(customerId, {
      $push: { favorite_products: productId }
    }, { new: true });

    res.json(customer);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

router.post('/removeFavorite/:customerId/:productId', async (req, res) => {
  const { customerId, productId } = req.params;

  try {
    const customer = await Customer.findByIdAndUpdate(customerId, {
      $pull: { favorite_products: productId }
    }, { new: true });

    res.json(customer);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

// As a Starbucks Customer, I want to be able to track my credit cards and be able to add or remove them easily.
router.get('/getCards/:customerId', async (req, res) => {
  const { customerId } = req.params;

  try {
    const customer = await Customer.findById(customerId);
    res.json(customer.credit_cards);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

router.post('/addCard/:customerId', async (req, res) => {
  const { customerId } = req.params;
  const card = req.body;

  try {
    const customer = await Customer.findByIdAndUpdate(customerId, {
      $push: { credit_cards: card }
    }, { new: true });

    res.json(customer);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

router.post('/removeCard/:customerId', async (req, res) => {
  const { customerId } = req.params;
  const card = req.body;

  try {
    const customer = await Customer.findByIdAndUpdate(customerId, {
      $pull: { credit_cards: card }
    }, { new: true });

    res.json(customer);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

// Populates the Customer collection with sample data
router.post('/populateCustomers', async (req, res) => {
  const customers = [
    {
      name: 'Jane Doe',
      email: 'jane@abc.com',
      age: 26,
      address: '123 First Dr, San Luis Obispo, CA, 92410',
      phone_number: '1234567890',
      star_balance: 2000,
      order_history: ['65efba3410f94679c83cc4b3', '65efba3410f94679c83cc4b4'],
      favorite_products: ['65efba3410f94679c83cc4b3', '65efba3410f94679c83cc4b4'],
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
      order_history: ['65efba3410f94679c83cc4b3', '65efba3410f94679c83cc4b4'],
      favorite_products: ['65efba3410f94679c83cc4b3', '65efba3410f94679c83cc4b4'],
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
      order_history: ['65efba3410f94679c83cc4b3', '65efba3410f94679c83cc4b4'],
      favorite_products: ['65efba3410f94679c83cc4b3', '65efba3410f94679c83cc4b4'],
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
      order_history: [],
      favorite_products: [],
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

export default router;