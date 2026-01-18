import React, { useState, useMemo } from 'react';

/**
 * Loan Calculator Component
 * Interactive EMI calculator for Sanasa Wilbagedara
 */
const LoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState(100000);
  const [interestRate, setInterestRate] = useState(14);
  const [tenure, setTenure] = useState(24);

  // Calculate EMI using Reducing Balance method
  const calculations = useMemo(() => {
    const principal = parseFloat(loanAmount);
    const annualRate = parseFloat(interestRate) / 100;
    const months = parseInt(tenure);

    if (principal <= 0 || annualRate <= 0 || months <= 0) {
      return { 
        emi: 0, 
        totalPayable: 0, 
        totalInterest: 0,
        schedule: [],
        debtToIncomeRatio: 0 
      };
    }

    // Reducing Balance Method: Interest calculated on remaining balance
    // Using standard reducing balance EMI formula
    const monthlyRate = annualRate / 12;
    
    // Calculate EMI using reducing balance formula
    // EMI = P * r * (1+r)^n / ((1+r)^n - 1)
    const emi = principal * monthlyRate * Math.pow(1 + monthlyRate, months) / 
                (Math.pow(1 + monthlyRate, months) - 1);

    // Generate amortization schedule
    let balance = principal;
    let totalInterest = 0;
    const schedule = [];

    for (let month = 1; month <= months; month++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = emi - interestPayment;
      balance -= principalPayment;

      totalInterest += interestPayment;

      // Store every 3rd month for schedule display
      if (month % 3 === 0 || month === months) {
        schedule.push({
          month,
          emi: Math.round(emi),
          principal: Math.round(principalPayment),
          interest: Math.round(interestPayment),
          balance: Math.max(0, Math.round(balance)),
        });
      }
    }

    const totalPayable = principal + totalInterest;

    return {
      emi: Math.round(emi),
      totalPayable: Math.round(totalPayable),
      totalInterest: Math.round(totalInterest),
      schedule,
      methodName: 'Reducing Balance',
    };
  }, [loanAmount, interestRate, tenure]);

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8" id="calculator">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Loan EMI Calculator</h3>
        <p className="text-gray-600">Calculate your monthly installment</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          {/* Loan Amount */}
          <div>
            <label className="form-label flex justify-between">
              <span>Loan Amount</span>
              <span className="text-green-700 font-semibold">
                {formatCurrency(loanAmount)}
              </span>
            </label>
            <input
              type="range"
              min="10000"
              max="2000000"
              step="10000"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Rs. 10,000</span>
              <span>Rs. 20,00,000</span>
            </div>
          </div>

          {/* Interest Rate */}
          <div>
            <label className="form-label flex justify-between">
              <span>Interest Rate (per annum)</span>
              <span className="text-green-700 font-semibold">{interestRate}%</span>
            </label>
            <input
              type="range"
              min="5"
              max="24"
              step="0.5"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>5%</span>
              <span>24%</span>
            </div>
          </div>

          {/* Loan Tenure */}
          <div>
            <label className="form-label flex justify-between">
              <span>Loan Tenure</span>
              <span className="text-green-700 font-semibold">{tenure} months</span>
            </label>
            <input
              type="range"
              min="6"
              max="60"
              step="6"
              value={tenure}
              onChange={(e) => setTenure(e.target.value)}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>6 months</span>
              <span>60 months</span>
            </div>
          </div>

          {/* Quick Presets */}
          <div>
            <label className="form-label">Quick Amount Selection</label>
            <div className="flex flex-wrap gap-2">
              {[50000, 100000, 250000, 500000, 1000000].map((amount) => (
                <button
                  key={amount}
                  onClick={() => setLoanAmount(amount)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    loanAmount === amount
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {amount >= 1000000 
                    ? `${amount / 1000000}M` 
                    : `${amount / 1000}K`}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Result Section */}
        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-6 text-white">
          <div className="text-center mb-6">
            <p className="text-green-200 text-sm uppercase tracking-wide">Monthly EMI</p>
            <p className="text-4xl md:text-5xl font-bold mt-2">
              {formatCurrency(calculations.emi)}
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-t border-green-500/30">
              <span className="text-green-200">Principal Amount</span>
              <span className="font-semibold">{formatCurrency(loanAmount)}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-t border-green-500/30">
              <span className="text-green-200">Total Interest</span>
              <span className="font-semibold">{formatCurrency(calculations.totalInterest)}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-t border-green-500/30">
              <span className="text-green-200">Total Amount Payable</span>
              <span className="font-semibold text-lg">{formatCurrency(calculations.totalPayable)}</span>
            </div>
          </div>

          {/* Visual Breakdown */}
          <div className="mt-6">
            <div className="h-4 bg-green-800 rounded-full overflow-hidden flex">
              <div 
                className="bg-white h-full transition-all duration-300"
                style={{ 
                  width: `${(loanAmount / calculations.totalPayable) * 100}%` 
                }}
              />
              <div 
                className="bg-green-300 h-full transition-all duration-300"
                style={{ 
                  width: `${(calculations.totalInterest / calculations.totalPayable) * 100}%` 
                }}
              />
            </div>
            <div className="flex justify-between text-xs mt-2">
              <span className="flex items-center">
                <span className="w-3 h-3 bg-white rounded-full mr-1"></span>
                Principal
              </span>
              <span className="flex items-center">
                <span className="w-3 h-3 bg-green-300 rounded-full mr-1"></span>
                Interest
              </span>
            </div>
          </div>

          {/* CTA */}
          <button className="w-full mt-6 bg-white text-green-700 font-semibold py-3 rounded-lg hover:bg-green-50 transition-colors">
            Apply for This Loan
          </button>
        </div>

        {/* Payment Schedule Table */}
        {calculations.schedule && calculations.schedule.length > 0 && (
          <div className="mt-8 bg-gray-50 rounded-xl overflow-hidden">
            <div className="bg-sanasa-green-700 text-white px-6 py-4">
              <h4 className="text-lg font-bold">Amortization Schedule (Reducing Balance)</h4>
              <p className="text-sm text-green-200 mt-1">Interest calculated on remaining balance</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Month</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">EMI</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Principal</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Interest</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {calculations.schedule.map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 text-sm text-gray-700">{row.month}</td>
                      <td className="px-4 py-3 text-sm text-right text-gray-700 font-semibold">
                        {formatCurrency(row.emi)}
                      </td>
                      <td className="px-4 py-3 text-sm text-right text-green-600 font-semibold">
                        {formatCurrency(row.principal)}
                      </td>
                      <td className="px-4 py-3 text-sm text-right text-orange-600 font-semibold">
                        {formatCurrency(row.interest)}
                      </td>
                      <td className="px-4 py-3 text-sm text-right text-gray-700 font-semibold">
                        {formatCurrency(row.balance)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-gray-100 px-6 py-4 text-xs text-gray-600">
              <p>💡 Tip: In reducing balance method, the interest portion decreases each month as the principal balance reduces.</p>
            </div>
          </div>
        )}
      </div>

      {/* Disclaimer */}
      <p className="text-xs text-gray-500 mt-6 text-center">
        * This calculator provides an estimate only. Actual EMI may vary based on 
        processing fees and other charges. Contact our branch for exact figures.
      </p>
    </div>
  );
};

export default LoanCalculator;
