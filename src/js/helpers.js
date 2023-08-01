////////////////////////////
// Timing function
export const formatDate = function (inputDate) {
  const relativeTimeRegex = /^\d+\s+\w+\s+ago$/i;
  if (relativeTimeRegex.test(inputDate)) return inputDate;

  const currentDate = new Date();
  const timestamp = new Date(inputDate).getTime();
  const currentTimestamp = currentDate.getTime();
  const timeDifference = currentTimestamp - timestamp;

  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;
  const month = 30 * day;
  const year = 365 * day;

  if (timeDifference < minute) {
    return "Just now";
  }

  if (timeDifference < hour) {
    const minutesAgo = Math.floor(timeDifference / minute);
    return `${minutesAgo} minute${minutesAgo === 1 ? "" : "s"} ago`;
  }

  if (timeDifference < day) {
    const hoursAgo = Math.floor(timeDifference / hour);
    return `${hoursAgo} hour${hoursAgo === 1 ? "" : "s"} ago`;
  }

  if (timeDifference < week) {
    const daysAgo = Math.floor(timeDifference / day);
    return `${daysAgo} day${daysAgo === 1 ? "" : "s"} ago`;
  }

  if (timeDifference < month) {
    const weeksAgo = Math.floor(timeDifference / week);
    return `${weeksAgo} week${weeksAgo === 1 ? "" : "s"} ago`;
  }

  if (timeDifference < year) {
    const monthsAgo = Math.floor(timeDifference / month);
    return `${monthsAgo} month${monthsAgo === 1 ? "" : "s"} ago`;
  }

  const yearsAgo = Math.floor(timeDifference / year);
  return `${yearsAgo} year${yearsAgo === 1 ? "" : "s"} ago`;
};

///////////////////
export const getUniqueId = function () {
  const timestamp = new Date().getTime();
  return +timestamp.toString();
};
