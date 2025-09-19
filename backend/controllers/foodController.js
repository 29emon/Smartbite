const Food = require('../models/Food');

// @route   GET /api/foods
exports.getAllFoods = async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// @route   GET /api/foods/:id
exports.getFoodById = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) return res.status(404).json({ msg: 'Food not found' });
    res.json(food);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// @route   POST /api/foods (admin only)
exports.createFood = async (req, res) => {
  try {
    const food = new Food(req.body);
    await food.save();
    res.status(201).json(food);
  } catch (err) {
    res.status(400).json({ msg: 'Invalid data' });
  }
};

// @route   PUT /api/foods/:id (admin only)
exports.updateFood = async (req, res) => {
  try {
    const food = await Food.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!food) return res.status(404).json({ msg: 'Food not found' });
    res.json(food);
  } catch (err) {
    res.status(400).json({ msg: 'Invalid update' });
  }
};

// @route   DELETE /api/foods/:id (admin only)
exports.deleteFood = async (req, res) => {
  try {
    const food = await Food.findByIdAndDelete(req.params.id);
    if (!food) return res.status(404).json({ msg: 'Food not found' });
    res.json({ msg: 'Food deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }

  // @route GET /api/foods
// @desc  Get all foods with search, filter, pagination
exports.getAllFoods = async (req, res) => {
  try {
    const { search, category, page = 1, limit = 10 } = req.query;
    const query = {};

    // 🔍 Search by name or description
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // 🧃 Filter by category
    if (category) {
      query.category = category;
    }

    const skip = (page - 1) * limit;
    const total = await Food.countDocuments(query);
    const foods = await Food.find(query).skip(skip).limit(Number(limit));

    res.json({
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      data: foods
    });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

};
