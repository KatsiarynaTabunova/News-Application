function handleDaysOfDate(daysNumber) {
  const todayDate = new Date();
  const currentDate = new Date(todayDate);
  currentDate.setDate(currentDate.getDate() - daysNumber);
  return currentDate.toISOString().slice(0, 10);
}
function handleMonthOfDate(monthNumber) {
  const todayDate = new Date();
  const currentDate = new Date(todayDate);
  currentDate.setMonth(currentDate.getMonth() - monthNumber);
  return currentDate.toISOString().slice(0, 10);
}

export { handleDaysOfDate, handleMonthOfDate };
