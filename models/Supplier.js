import mongoose from 'mongoose';

const supplied_product = new mongoose.Schema({
    id: String,
    name: String,
    description: String
});

const ordered_product = new mongoose.Schema({
    product: supplied_product,
    quantity: Number,
    cost_per: Number
});

const supplier = new mongoose.Schema({
    id: String,
    address: String,
    email: String,
    name: String,
    phone_number: String
});

const shipment = new mongoose.Schema({
    order_number: String,
    shipment_date: Date,
    expected_delivery_date: Date,
    actual_delivery_date: Date,
    delivery_company: String,
    tracking_number: String,
    order_cost: Number,
    shipment_cost: Number,
    weight: Number,
    supplier: supplier,
    store_destination_id: String,
    ordered_product: [ordered_product]
});

const SuppliedProduct = mongoose.model('suppliedProduct', supplied_product);

export default mongoose.model('Shipment', shipment);
export { SuppliedProduct };