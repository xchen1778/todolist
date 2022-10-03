import { useState } from "react";

function DateTime() {
  const [date, setDate] = useState(new Date());

  function numberToDay(num) {
    const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    return days[num];
  }

  function numberToMonth(num) {
    const months = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];
    return months[num];
  }

  return (
    <div className="date">
      {`${numberToDay(date.getDay())} · ${numberToMonth(
        date.getMonth()
      )} ${date.getDate()}`}
    </div>
  );
}

export default DateTime;
