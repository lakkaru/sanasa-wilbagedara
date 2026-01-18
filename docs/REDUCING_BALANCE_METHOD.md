# Reducing Balance Loan Payment Method - Implementation Guide

## Overview

Updated the Sanasa Bank Wilbagedara loan calculator to use the **Reducing Balance Payment Method**, which is the industry standard for loan calculations. This method calculates interest on the remaining principal balance each month.

## What Changed

### 1. Frontend - React Components

#### LoanCalculator.jsx
- **Updated calculation logic** to use reducing balance formula
- **Added amortization schedule** showing month-by-month breakdown
- **New features**:
  - Displays schedule table with columns: Month, EMI, Principal, Interest, Balance
  - Shows how interest decreases and principal increases each month
  - Generates schedule for all 60 months (displays every 3rd month + final month)
  - Color-coded breakdown: Green for principal, Orange for interest

#### LoansPage.jsx
- **Added payment method explanation section** before calculator
- **Includes**:
  - How reducing balance method works
  - Example calculation (Rs. 100,000 @ 14% for 24 months)
  - Benefits of the method
  - Visual comparison

### 2. Backend - Express Routes

#### loanRoutes.js - `/api/loans/calculate-emi`
- **Updated response** to include full amortization schedule
- **Returns**:
  ```json
  {
    "success": true,
    "method": "Reducing Balance",
    "emi": 4900,
    "totalPayable": 117600,
    "totalInterest": 17600,
    "amortizationSchedule": [
      {
        "month": 1,
        "emi": 4900,
        "principal": 3933,
        "interest": 967,
        "balance": 96067
      },
      ...
    ]
  }
  ```

## How Reducing Balance Works

### Month-by-Month Calculation

For a Rs. 100,000 loan at 14% per annum for 24 months:

1. **Monthly Interest Rate** = 14% ÷ 12 = 1.167%
2. **Fixed EMI** = P × r × (1+r)^n / ((1+r)^n - 1) = Rs. 4,900

3. **Each Month**:
   - Interest Payment = Remaining Balance × Monthly Rate
   - Principal Payment = EMI - Interest Payment
   - New Balance = Previous Balance - Principal Payment

### Example Amortization Schedule

| Month | EMI | Principal | Interest | Balance |
|-------|-----|-----------|----------|---------|
| 1 | 4,900 | 3,933 | 967 | 96,067 |
| 2 | 4,900 | 3,972 | 928 | 92,095 |
| 3 | 4,900 | 4,011 | 889 | 88,084 |
| ... | ... | ... | ... | ... |
| 24 | 4,900 | 4,880 | 20 | 0 |

**Key observations**:
- EMI remains constant at Rs. 4,900
- Interest portion decreases from Rs. 967 to Rs. 20
- Principal portion increases from Rs. 3,933 to Rs. 4,880
- Total Interest Paid = Rs. 17,600
- Total Amount Payable = Rs. 117,600

## Formula

```
EMI = P × r × (1+r)^n / ((1+r)^n - 1)

Where:
P = Principal amount
r = Monthly interest rate (Annual rate / 12 / 100)
n = Number of months

Monthly Interest = Remaining Balance × r
Monthly Principal = EMI - Monthly Interest
New Balance = Previous Balance - Monthly Principal
```

## Advantages

✅ **Transparent** - Interest calculation is clear and fair
✅ **Standard** - Used by banks and financial institutions worldwide
✅ **Beneficial** - Early repayment saves interest
✅ **Predictable** - Fixed EMI throughout the loan term
✅ **Fair** - Interest only on outstanding balance

## Files Modified

1. **Frontend**:
   - `client/src/components/products/LoanCalculator.jsx` - Calculator logic and UI
   - `client/src/pages/LoansPage.jsx` - Payment method explanation

2. **Backend**:
   - `server/routes/loanRoutes.js` - `/calculate-emi` endpoint

## Testing

### Frontend Test
1. Open http://localhost:3000/loans
2. Go to "Calculate Your EMI" section
3. Adjust sliders and see:
   - EMI amount update
   - Interest vs Principal breakdown
   - Amortization schedule table
   - How interest decreases month-by-month

### Backend Test
```bash
curl -X POST http://localhost:5000/api/loans/calculate-emi \
  -H "Content-Type: application/json" \
  -d '{
    "principal": 100000,
    "rate": 14,
    "tenure": 24
  }'
```

Expected response includes full amortization schedule with 24 entries.

## Database Integration

When implementing LoanApplication model, the reducing balance method should:
1. Store the calculated EMI as a constant value
2. Generate amortization schedule on approval
3. Track actual payments against the schedule
4. Calculate remaining balance based on received payments

## Future Enhancements

1. **Payment Schedule Download** - PDF generation of amortization schedule
2. **Early Prepayment Calculator** - Show savings from early repayment
3. **Multiple EMI Options** - Allow borrower to choose between reducing and fixed principal methods
4. **SMS Notifications** - Monthly EMI reminder with payment breakdown
5. **Loan Management Portal** - Track payments, remaining balance, next due date

## References

- **Standard Formula**: Reducing Balance EMI = P × r × (1+r)^n / ((1+r)^n - 1)
- **Applications**: Personal Loans, Home Loans, Vehicle Loans, Business Loans
- **Industry Standard**: Used by Central Bank of Sri Lanka regulated institutions
