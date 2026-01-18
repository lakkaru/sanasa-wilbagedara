const express = require('express');
const router = express.Router();

/**
 * Activity Routes - Sanasa Bank Wilbagedara
 * Routes for community activities, events, and blog posts
 */

// GET /api/activities
router.get('/', async (req, res) => {
  try {
    const { category, page = 1, limit = 10 } = req.query;

    // TODO: Get published activities with pagination
    // Optional filter by category

    res.status(200).json({
      success: true,
      activities: [],
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: 0,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// GET /api/activities/latest
router.get('/latest', async (req, res) => {
  try {
    const { limit = 5 } = req.query;

    // TODO: Get latest news/activities

    res.status(200).json({
      success: true,
      activities: [],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// GET /api/activities/:slug
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;

    // TODO: Get activity by slug

    res.status(200).json({
      success: true,
      activity: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// POST /api/activities (Admin only)
router.post('/', async (req, res) => {
  try {
    const { title, description, category, images } = req.body;

    // TODO: Verify admin token
    // TODO: Create new activity

    res.status(201).json({
      success: true,
      message: 'Activity created successfully',
      activity: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// PATCH /api/activities/:id (Admin only)
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // TODO: Update activity

    res.status(200).json({
      success: true,
      message: 'Activity updated successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
