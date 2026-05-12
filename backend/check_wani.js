const mongoose = require('mongoose');
require('dotenv').config();
const Appointment = require('./models/Appointment');

async function run() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
    const appointments = await Appointment.find({ patientName: /wani/i });
    console.log(`Found ${appointments.length} appointments for 'wani':`);
    console.log(JSON.stringify(appointments, null, 2));
  } catch (e) {
    console.error(e);
  } finally {
    mongoose.disconnect();
  }
}
run();
