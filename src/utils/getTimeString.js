const pad = number => (number < 10 ? `0${number}` : number);

export const getTimeString = () => {
  const event = new Date();
  return `${event.getFullYear()}-${pad(event.getMonth() + 1)}-${pad(
    event.getDate(),
  )} ${pad(event.getHours())}:${pad(event.getMinutes())}:${pad(
    event.getSeconds(),
  )}`;
};

export const dateToString = date => {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate(),
  )}`;
};

export const getDateString = () => {
  const event = new Date();
  return dateToString(event);
};

export const getDateFromString = s => {
  const bits = s.split("-").map(d => parseInt(d, 10));
  return new Date(bits[0], bits[1] - 1, bits[2]);
};

export const getYesterday = date => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1);
};

export const getYesterdayStringFromString = ss => {
  return dateToString(getYesterday(getDateFromString(ss)));
};
