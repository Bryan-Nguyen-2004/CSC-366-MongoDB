import mongoose from 'mongoose';
import { Store } from './Manager.js';
import { Decimal128 } from 'mongodb';

const healthInspection = new mongoose.Schema({
  grade : String,
  date : Date,
  store : {type : mongoose.Schema.Types.ObjectId, ref : 'Store'}
});

const permit = new mongoose.Schema({
  issueDate : Date,
  renewalDate : Date,
  type : String,
  store : {type : mongoose.Schema.Types.ObjectId, ref : 'Store'}
});

const taxReturn = new mongoose.Schema({
  filing_date : Date,
  country : String,
  region : String,
  city : String,
  type :  String,
  amount_paid : Decimal128,
  currency_code : String
});

const HealthInspection = mongoose.model('healthInspection', healthInspection);
const Permit = mongoose.model('Permit', permit);
const TaxReturn = mongoose.model('TaxReturn', taxReturn);

export {
  HealthInspection,
  Permit,
  TaxReturn
}
