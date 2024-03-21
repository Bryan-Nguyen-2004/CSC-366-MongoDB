import mongoose from 'mongoose';

const CompanyPerformanceSchema = new mongoose.Schema({
  performanceDate: Date,
  revenue: Number,
  profitMargin: Number,
  growthRate: Number
});

const FinancialStatementsSchema = new mongoose.Schema({
  type: String,
  date: Date,
  totalAssets: Number,
  totalLiabilities: Number,
  netIncome: Number
});

const ShareholderEngagementSchema = new mongoose.Schema({
  date: Date,
  feedback: String,
  communication: String
});

const StrategicInitiativesSchema = new mongoose.Schema({
  title: String,
  description: String,
  startDate: Date,
  endDate: Date,
  status: String
});

const BoardMeetingsSchema = new mongoose.Schema({
  meetingDate: Date,
  agenda: String,
  decisions: String,
  actionItems: String
});

const ownerSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  tenureStart: Date,
  tenureEnd: Date,
  phone: String,
  companyPerformances: [CompanyPerformanceSchema],
  financialStatements: [FinancialStatementsSchema],
  shareholderEngagements: [ShareholderEngagementSchema],
  strategicInitiatives: [StrategicInitiativesSchema],
  boardMeetings: [BoardMeetingsSchema]
});

const Owner = mongoose.model('Owner', ownerSchema);
export default Owner;
