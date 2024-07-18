const dateResult = (weekNumber) =>{
  const [year, week] = weekNumber.split('-W');
  const startOfWeek = new Date(`${year}-01-01`);
  startOfWeek.setDate(1 + (7 - startOfWeek.getDay() + 1) % 7);
  startOfWeek.setDate(startOfWeek.getDate() + (week - 1) * 7);
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 7);
  const formattedStartDate = startOfWeek.toLocaleDateString('ru-RU');
  const formattedEndDate = endOfWeek.toLocaleDateString('ru-RU');
  return {
    formattedStartDate,
    formattedEndDate
  }
}
module.exports = dateResult