const router = require('express').Router();
const userRoutes = require('./userRoutes');
const audioRoutes = require('./audioRoutes');
const uploadRoutes = require('./uploadRoutes');

router.use('/users', userRoutes);
router.use('/audio', audioRoutes);
router.use('/upload', uploadRoutes);

module.exports = router;