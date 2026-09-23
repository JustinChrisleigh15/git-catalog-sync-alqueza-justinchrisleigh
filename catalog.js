function isValidLoan(daysLate) {
  return daysLate >= 0;
}

function calculateLateFee(daysLate, ratePerDay) {
  if (daysLate <= 1) {
    return 0;
  }
  const fee = Math.round(daysLate * ratePerDay);
  if (fee > 20) {
    return 20;
  }
  return fee < 1 ? 1 : fee;
}
module.exports = { isValidLoan, calculateLateFee };
