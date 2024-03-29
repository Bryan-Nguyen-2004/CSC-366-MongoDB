import mongoose from 'mongoose';
import { SuppliedProduct } from './Supplier.js';

const CreditCardSchema = new mongoose.Schema({
  card_number: Number,
  expiration_date: Date,
  security_code: Number
});

const MessageSchema = new mongoose.Schema({
  sender: mongoose.Schema.Types.ObjectId,
  message: String,
  date: Date
});

const PreferencesSchema = new mongoose.Schema({
  personalized_ads: Boolean,
  receive_emails: Boolean,
  track_activity: Boolean,
  send_location: Boolean,
  two_factor_auth: Boolean,
  passcode_lock: Boolean,
  face_id: Boolean,
  inbox_messages: Boolean,
  tipping_receipts_orders: Boolean
});

const CustomerSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  age: Number,
  address: String,
  phone_number: String,
  star_balance: Number,
  order_history: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SuppliedProduct' }],
  favorite_products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SuppliedProduct' }],
  credit_cards: [CreditCardSchema],
  messages: [MessageSchema],
  preferences: PreferencesSchema
});

export default mongoose.model('Customer', CustomerSchema);