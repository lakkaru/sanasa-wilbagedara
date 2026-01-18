const express = require('express');
const router = express.Router();

/**
 * Loan Application Routes - Sanasa Bank Wilbagedara
 * Routes for loan applications and inquiries
 */

// POST /api/loans/apply
router.post('/apply', async (req, res) => {
  try {
    const {
      applicant,
      contact,
      loan,
      membership,
      collateral,
    } = req.body;

    // Validation
    if (!applicant?.fullName || !contact?.phone || !loan?.product || !loan?.amountRequested) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
      });
    }

    // TODO: Save loan application to MongoDB
    // TODO: Send confirmation email

    res.status(201).json({
      success: true,
      message: 'Loan application submitted successfully',
      applicationNumber: null,
      nextSteps: [
        'Check your email for application confirmation',
        'We will contact you within 24 hours',
        'Prepare required documents for verification',
      ],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// GET /api/loans/applications (Admin only)
router.get('/applications', async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;

    // TODO: Verify admin token
    // TODO: Get loan applications with pagination

    res.status(200).json({
      success: true,
      applications: [],
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

// GET /api/loans/applications/:id (Admin only)
router.get('/applications/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // TODO: Get loan application details

    res.status(200).json({
      success: true,
      application: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// PATCH /api/loans/applications/:id (Admin only)
router.patch('/applications/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, approvedAmount, interestRate } = req.body;

    // TODO: Update application status and details

    res.status(200).json({
      success: true,
      message: 'Application updated successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// POST /api/loans/calculate-emi
router.post('/calculate-emi', (req, res) => {
  try {
    const { principal, rate, tenure } = req.body;

    if (!principal || !rate || !tenure) {
      return res.status(400).json({
        success: false,
        message: 'Principal, rate, and tenure are required',
      });
    }

    // Reducing Balance EMI Calculation
    // EMI = P * r * (1+r)^n / ((1+r)^n - 1)
    const monthlyRate = rate / 100 / 12;
    const months = parseInt(tenure);
    
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
                (Math.pow(1 + monthlyRate, months) - 1);

    // Generate complete amortization schedule
    let balance = principal;
    let totalInterest = 0;
    const schedule = [];

    for (let month = 1; month <= months; month++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = emi - interestPayment;
      balance -= principalPayment;

      totalInterest += interestPayment;

      schedule.push({
        month,
        emi: Math.round(emi),
        principal: Math.round(principalPayment),
        interest: Math.round(interestPayment),
        balance: Math.max(0, Math.round(balance)),
      });
    }

    const totalPayable = principal + totalInterest;

    res.status(200).json({
      success: true,
      method: 'Reducing Balance',
      emi: Math.round(emi),
      totalPayable: Math.round(totalPayable),
      totalInterest: Math.round(totalInterest),
      amortizationSchedule: schedule,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
