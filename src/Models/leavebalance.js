const mongoose = require('mongoose');

const leaveBalanceSchema = new mongoose.Schema({
  name: {type: String},
  email: {type: String},
  year:{type: String},
  leaveType:{ type: String},
  total:    { type: Number, min: 0 },   // yearly entitlement
  used:     { type: Number, default: 0, min: 0 },
  remaining:{ type: Number, default: 0, min: 0 },
  colid: {type: Number}
}, { timestamps: true });

leaveBalanceSchema.pre('save', function(next) {
  this.remaining = this.total - this.used;
  next();
});

const LeaveBalance = mongoose.model('LeaveBalance', leaveBalanceSchema);

module.exports = LeaveBalance;