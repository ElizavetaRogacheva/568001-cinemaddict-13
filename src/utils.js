import dayjs from "dayjs";

export const formatDate = (param, date) => {
  return dayjs(date).format(param);
};
