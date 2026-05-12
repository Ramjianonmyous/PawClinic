const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    patientName: { type: String, required: true },
    email: { type: String },
    phone: { type: String },
    service: { type: String }, // Added service field
    doctor: { type: String, default: 'General Practitioner' },
    date: { type: String }, // Format: YYYY-MM-DD
    time: { type: String }, // Format: HH:MM
    symptoms: { type: String },
    status: { type: String, default: 'Scheduled' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Appointment', appointmentSchema);
