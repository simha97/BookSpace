require('dotenv').config();
const express = require('express');
const cors = require('cors');

const roomsRoutes = require('./routes/rooms');
const bookingsRoutes = require('./routes/bookings');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.use('/rooms', roomsRoutes);
app.use('/bookings', bookingsRoutes);


app.get('/', (req, res) => {
    res.send('🚀 Backend is running!');
});

// Start Server
app.listen(port, () => console.log(`🚀 Server running on port ${port}`));