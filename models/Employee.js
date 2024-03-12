import mongoose from 'mongoose';

const RoleSchema = new mongoose.Schema({
  roleName: {
    type: String,
    enum: ['barista', 'cashier', 'store manager', 'board member', 'janitor', 'regional manager', 'executive'],
    default: 'barista'
  }
});

const ScheduleSchema = new mongoose.Schema({
  start_time: Date,
  end_time: Date,
  current: Boolean
});

const PayrollSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['part', 'full'],
    default: 'part'
  },
  unit_pay: Number,
  effective_date: Date,
  current: Boolean
});

const PayBonusSchema = new mongoose.Schema({
  amount: Number,
  date_effective: Date
});

const TaxInfoSchema = new mongoose.Schema({
  ssn: String,
  deductions: Number
});

const Employee = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  birthday: String,
  role: RoleSchema,
  tax_info: TaxInfoSchema,
  schedules: [ScheduleSchema],
  payrolls: [PayrollSchema],
  pay_bonuses: [PayBonusSchema]
});

export default mongoose.model('Employee', Employee);