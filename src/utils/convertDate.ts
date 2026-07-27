export const convertDate = (date: Date | string) => {
  const customDate = new Date(date);

  const day = customDate.getDate().toString().padStart(2, "0");
  const month = (customDate.getMonth() + 1).toString().padStart(2, "0");
  const hour = customDate.getHours().toString().padStart(2, "0");
  const min = customDate.getMinutes().toString().padStart(2, "0");

  return { day, month, min, hour };
};
