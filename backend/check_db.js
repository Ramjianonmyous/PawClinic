require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Appointment = require('./models/Appointment');

async function run() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const users = await User.find().sort({ createdAt: -1 }).limit(5);
        const appointments = await Appointment.find().sort({ createdAt: -1 }).limit(5);
        
        console.log("=== Recent Users ===");
        console.log(JSON.stringify(users, null, 2));
        
        console.log("\n=== Recent Appointments ===");
        console.log(JSON.stringify(appointments, null, 2));
        
    } catch (e) {
        console.error(e);
    } finally {
        mongoose.disconnect();
    }
}
run();
