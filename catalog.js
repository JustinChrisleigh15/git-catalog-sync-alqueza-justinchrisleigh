function isValidLoan(daysLate) {
  return daysLate >= 0;
}

function calculateLateFee(daysLate, ratePerDay) {
  const fee = Math.floor(daysLate * ratePerDay);
  return fee > 20 ? 20 : fee;
}

module.exports = { isValidLoan, calculateLateFee };
