const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
//controller
const leavemodulectlr =require('./controllers/leavemodulectlr');
const salarycontlr =require('./controllers/salarycontlr');

dotenv.config();
const app = express();

//  Enable CORS correctly (must come before routes)
app.use(cors({
  origin: 'http://localhost:5173', // Your frontend's address
  methods: ['GET', 'POST'],
  credentials: true,
}));
//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to database
connectDB();

//leave
app.post("/api/v2/createleavetype", leavemodulectlr.createleavetype);
app.get("/api/v2/getleavetypes", leavemodulectlr.getleavetypes);
//create leave balance
app.post("/api/v2/createleavebalance", leavemodulectlr.createleavebalance);
app.get("/api/v2/getleavebalances", leavemodulectlr.getleavebalances);
// Approver
app.post("/api/v2/assignapprover", leavemodulectlr.assignapprover);
app.get("/api/v2/getapprovers", leavemodulectlr.getapprovers);
app.get("/api/v2/getallapprovers", leavemodulectlr.getallapprovers);
//leave application
app.post("/api/v2/createleave", leavemodulectlr.createleave);
app.get("/api/v2/getleaves", leavemodulectlr.getleaves);

//rejected leave application
app.post("/api/v2/approverejectleave", leavemodulectlr.approverejectleave);

//search user by email or name
app.get("/api/v2/searchuserbyemailorname", leavemodulectlr.searchuserbyemailorname);

//user register and login
app.post("/api/v2/registerj", salarycontlr.register);
app.post("/api/v2/loginj", salarycontlr.loginj);

// IP Address Management
app.post("/api/v2/addipj", salarycontlr.addipj);
app.get("/api/v2/getallipsj", salarycontlr.getallipsj);
app.get("/api/v2/getipbyemailj", salarycontlr.getipbyemailj);//*
app.post("/api/v2/updatestatusj", salarycontlr.updateipj);
app.get("/api/v2/deleteipj", salarycontlr.deleteipj);

// Check-in/Check-out(Attendance)
app.post("/api/v2/checkinj", salarycontlr.checkinj);
app.post("/api/v2/checkoutj", salarycontlr.checkoutj);
app.get("/api/v2/getallattendancesj", salarycontlr.getallattendancesj);
app.get("/api/v2/getattendancebyemailj", salarycontlr.getattendancebyemailj);
app.get("/api/v2/getattendancestatusj", salarycontlr.getattendancestatusj);

//----salary---------------------//
app.post("/api/v2/addsalaryj", salarycontlr.addsalaryj);
app.get("/api/v2/getsalariesj", salarycontlr.getsalariesj);
app.get("/api/v2/getsalarybyemailj", salarycontlr.getsalarybyemailj);
app.post("/api/v2/updatesalaryj", salarycontlr.updatesalaryj);
app.get("/api/v2/deletesalaryj", salarycontlr.deletesalaryj);
app.post("/api/v2/calculatesalaryandslipj", salarycontlr.calculatesalaryandslipj);
// -----------------deduction---------//
app.post("/api/v2/adddeductionj",salarycontlr.adddeductionj);
app.get("/api/v2/getalldeductionsj",salarycontlr.getalldeductionsj);
app.get("/api/v2/getdeductionbyemailj", salarycontlr.getdeductionbyemailj);
app.post("/api/v2/updatedeductionj",salarycontlr.updatedeductionj);
app.get("/api/v2/deletedeductionj",salarycontlr.deletedeductionj);

app.set("trust proxy", true);
app.get("/api/v2/getipj",salarycontlr.getipj);



//Start server
const PORT = process.env.PORT ;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


