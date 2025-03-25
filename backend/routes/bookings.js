const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');

router.get('/', async (req, res) => {
    const { data, error } = await supabase.from('bookings').select('*');
    if (error) {
        return res.status(400).json({ error: error.message });
        
    }
    res.json(data);
})

router.post('/', async (req, res) => {
    const { room_id, date, slot, booked_by } = req.body;

    if (!room_id || !date || !slot || !booked_by) {
        return res.status(400).json({ error: "All fields are required" });
    }

    if (typeof room_id !== "number" || typeof booked_by !== "string") {
        return res.status(400).json({ error: "Invalid data type for room_id or booked_by" });
    }

    const slotRegex = /^\d{2}:\d{2}-\d{2}:\d{2}$/;
    if (!slotRegex.test(slot)) {
        return res.status(400).json({ error: "Invalid slot format (expected HH:MM-HH:MM)" });
    }

    // ✅ Prevent duplicate bookings
    const { data: existingBooking } = await supabase
        .from('bookings')
        .select('*')
        .eq('room_id', room_id)
        .eq('date', date)
        .eq('slot', slot)
        .single();

    if (existingBooking) {
        return res.status(400).json({ error: "Slot already booked!" });
    }

    // ✅ Attempt to insert booking
    const { data, error } = await supabase
        .from('bookings')
        .insert([{ room_id, date, slot, booked_by }]);

    if (error) return res.status(400).json({ error: error.message });

    res.status(201).json({ message: "Booking successful!", data });
});

module.exports = router;