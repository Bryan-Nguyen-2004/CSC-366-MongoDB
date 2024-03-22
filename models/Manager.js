import mongoose from 'mongoose';

const SalesSchema = new mongoose.Schema({
  quantity_sold: Number,
  sales_date: Date,
  total_sale_amount: Number
});

const RentSchema = new mongoose.Schema({
  expense_type: String,
  description: String,
  amount: Number,
  due_date: Date,
  payment_date: Date,
  note: String
});

const StoreSchema = new mongoose.Schema({
  address: String,
  open_date: Date,
  size: Number,
  sales_target: Number,
  region: String,
  sales: [SalesSchema],
  rent: [RentSchema]
});

const ManagerSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: {type: String, required: true, unique: true},
  phone_number: String,
  address: String,
  store: [StoreSchema]
});

export default mongoose.model('Manager', ManagerSchema);

const Store = mongoose.model('Store', StoreSchema);
export { Store }