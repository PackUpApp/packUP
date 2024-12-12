export const second = 1000,
  minute = second * 60,
  hour = minute * 60,
  day = hour * 24,
  week = day * 7,
  year = day * 365.25,
  month = year / 12;

export function formatRelativeTime(time: number | Date) {
  time = typeof time === "number" ? time : time.getTime();
  const now = Date.now(),
    difference = Math.ceil(Math.abs(now - time)),
    future = time > now;

  if (difference >= year) {
    const years = Math.floor(difference / year);
    if (years > 1) return future ? `in ${years} years` : `${years} years ago`;
    return future ? "in a year" : "a year ago";
  }
  if (difference >= month) {
    const months = Math.floor(difference / month);
    if (months > 1) return future ? `in ${months} months` : `${months} months ago`;
    return future ? "in a month" : "a month ago";
  }
  if (difference >= week) {
    const weeks = Math.floor(difference / week);
    if (weeks > 1) return future ? `in ${weeks} weeks` : `${weeks} weeks ago`;
    return future ? "in a week" : "a week ago";
  }
  if (difference >= day) {
    const days = Math.floor(difference / day);
    if (days > 1) return future ? `in ${days} days` : `${days} days ago`;
    return future ? "in a day" : "a day ago";
  }
  if (difference >= hour) {
    const hours = Math.floor(difference / hour);
    if (hours > 1) return future ? `in ${hours} hours` : `${hours} hours ago`;
    return future ? "in an hour" : "an hour ago";
  }
  if (difference >= minute) {
    const minutes = Math.floor(difference / minute);
    if (minutes > 1) return future ? `in ${minutes} minutes` : `${minutes} minutes ago`;
    return future ? "in a minute" : "a minute ago";
  }
  const seconds = Math.floor(difference / second);
  if (seconds > 1) return future ? `in ${seconds} seconds` : `${seconds} seconds ago`;
  return future ? "in a second" : "a second ago";
}
