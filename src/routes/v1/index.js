const express = require('express');

const {BookingController} = require('../../controllers/index');
const router = express();

router.post('/bookings',BookingController.create);
router.patch('/bookings/:id',BookingController.cancel);

module.exports = router;