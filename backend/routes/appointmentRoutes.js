const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const auth = require('../middleware/auth');

// @route   POST api/appointments
// @desc    Directly book an appointment (Protected)
router.post('/', auth, async (req, res) => {
    const { patientName, email, phone, service, date } = req.body;

    if (!patientName) {
        return res.status(400).json({ msg: "Patient name is required" });
    }

    try {
        const newAppointment = new Appointment({
            userId: req.user.id,
            patientName,
            email,
            phone,
            service, // Map 'service' from frontend to 'doctor' or 'service' field in schema
            date,
            // You can add defaults or other fields here
            doctor: 'General Practitioner',
            status: 'Scheduled'
        });

        await newAppointment.save();

        res.status(201).json({ 
            msg: "Appointment booked successfully", 
            data: newAppointment 
        });

    } catch (error) {
        console.error("Booking Error:", error);
        res.status(500).json({ msg: "Failed to book appointment", error: error.message });
    }
});

// @route   GET api/appointments
// @desc    Get all appointments for logged in user (Protected)
router.get('/', auth, async (req, res) => {
    try {
        const appointments = await Appointment.find({}).sort({ createdAt: -1 });
        res.json(appointments);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/appointments/:id
// @desc    Delete an appointment (Protected)
router.delete('/:id', auth, async (req, res) => {
    try {
        const appointment = await Appointment.findOneAndDelete({ _id: req.params.id });
        if (!appointment) return res.status(404).json({ msg: "Appointment not found or unauthorized" });
        res.json({ msg: "Appointment deleted successfully" });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
