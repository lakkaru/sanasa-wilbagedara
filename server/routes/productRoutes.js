const express = require('express');
const router = express.Router();

/**
 * Product Routes - Sanasa Bank Wilbagedara
 * Routes for getting savings and loan product information
 */

// GET /api/products
router.get('/', async (req, res) => {
  try {
    const { type, category } = req.query;

    // TODO: Implement product fetching from MongoDB
    // GET all products with optional filtering by type (savings/loan) and category

    res.status(200).json({
      success: true,
      message: 'Products endpoint',
      products: [],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// GET /api/products/:slug
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;

    // TODO: Get product by slug from MongoDB

    res.status(200).json({
      success: true,
      message: 'Product details',
      product: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// GET /api/products/featured/list
router.get('/featured/list', async (req, res) => {
  try {
    // TODO: Get featured products (isFeatured = true)

    res.status(200).json({
      success: true,
      products: [],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
