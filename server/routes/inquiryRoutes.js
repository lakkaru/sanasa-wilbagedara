const express = require('express');
const router = express.Router();

/**
 * Inquiry Routes - Sanasa Bank Wilbagedara
 * Routes for handling member inquiries and contact form submissions
 */

// POST /api/inquiries
router.post('/', async (req, res) => {
  try {
    const { type, fullName, email, phone, subject, message } = req.body;

    console.log('Received inquiry POST:', req.body);

    // Validation
    if (!fullName || !phone || !subject || !message) {
      console.warn('Validation failed:', { fullName, phone, subject, message });
      return res.status(400).json({
        success: false,
        message: 'All required fields must be filled',
      });
    }

    // Save inquiry to MongoDB
    const Inquiry = require('../models/Inquiry');
    const inquiry = new Inquiry({
      type: type || 'general',
      fullName,
      email,
      phone,
      subject,
      message,
    });
    const saved = await inquiry.save();
    console.log('Inquiry saved:', saved);

    res.status(201).json({
      success: true,
      message: 'Inquiry submitted successfully. We will contact you soon.',
      inquiryId: inquiry._id,
    });
  } catch (error) {
    console.error('Error saving inquiry:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// GET /api/inquiries (Admin only)
router.get('/', async (req, res) => {
  try {
    // TODO: Verify admin token
    // TODO: Get all inquiries with pagination

    res.status(200).json({
      success: true,
      inquiries: [],
      total: 0,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// GET /api/inquiries/:id (Admin only)
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // TODO: Get inquiry details

    res.status(200).json({
      success: true,
      inquiry: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// PATCH /api/inquiries/:id (Admin only)
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, assignedTo } = req.body;

    // TODO: Update inquiry status

    res.status(200).json({
      success: true,
      message: 'Inquiry updated successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
