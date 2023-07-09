////////////////////////////
// Timing function
export const formatDate = function (date) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs((date1 - date2) / (1000 * 60 * 60 * 24)));

  const daysPassed = calcDaysPassed(new Date(), date);
  if (daysPassed === 0) return "Today";
  if (daysPassed === 1) return "Yesterday";
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  else {
    return new Intl.DateTimeFormat("Us").format(date);
  }
};

///////////////////
export const getUniqueId = function () {
  const timestamp = new Date().getTime();
  return +timestamp.toString();
};
