function getDateFromString(timeString) {
  const options = {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  };

  const today = new Date();

  const shortDateString = today.toLocaleDateString('en-US', options);

  const [hour, minute, ampm] = timeString.split('_');
  const combinedDate = new Date(
    `${shortDateString} ${hour}:${minute}:00 ${ampm}`
  );
  return combinedDate;
}

function isOpenNow(attr) {
  try {
    const d = new Date();
    const dayIndex = d.getDay();

    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];

    const day = days[dayIndex];

    const startDateObj = new Date(attr.Start_Date);
    startDateObj.setHours(startDateObj.getHours() + 7);

    const endDateObj = new Date(attr.End_Date);
    endDateObj.setHours(endDateObj.getHours() + 7);

    const today = new Date();

    if (today > startDateObj && today < endDateObj) {
      const rawOpen = attr[`${day}Open`];
      const rawClose = attr[`${day}Close`];

      if (!rawOpen || !rawClose) {
        return true;
      }
      const open = getDateFromString(rawOpen);
      const close = getDateFromString(rawClose);

      if (open && close) {
        const isOpen = d > open && d < close;
        return isOpen;
      }
    }
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export default isOpenNow;
