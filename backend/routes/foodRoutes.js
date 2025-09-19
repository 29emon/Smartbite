const express = require('express');


// @route POST /api/foods/upload-image
const upload = require('../middleware/upload');
router.post('/upload-image', auth, upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ msg: 'No file uploaded' });
  res.status(200).json({ imageUrl: `/uploads/${req.file.filename}` });
});

const router = express.Router();
const {
  getAllFoods,
  getFoodById,
  createFood,
  updateFood,
  deleteFood
} = require('../controllers/foodController');

const auth = require('../middleware/authMiddleware');

// Public routes
router.get('/', getAllFoods);
router.get('/:id', getFoodById);

// Admin-only routes
router.post('/', auth, createFood);
router.put('/:id', auth, updateFood);
router.delete('/:id', auth, deleteFood);


router.get('/categories/all', async (req, res) => {
  try {
    const categories = await Food.distinct('category');
    res.json(categories);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to fetch categories' });
  }
});


module.exports = router;
