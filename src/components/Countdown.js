import React, { useEffect, useState } from "react";
import styled from 'styled-components'

const Timer = styled.div`
    color: black;
    font-size: 2rem;
`;

const Countdown = () => {
  const calculateTimeLeft = () => {
    const differenceNoon = +new Date("Jan 01, 2025 23:00:00") - +new Date();
    const differenceMidnight = +new Date("Jan 01, 2025 11:00:00") - +new Date();
    const difference = Math.min(differenceMidnight, differenceNoon);
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  });

  const timerComponents = [];

  if (timeLeft["hours"]) {
    timerComponents.push(
        <span>
            {(timeLeft["hours"].toString().length === 1) ? "0" + timeLeft["hours"].toString() : timeLeft["hours"]}{":"}
        </span>
      );
  } else {
    timerComponents.push(
        <span>{"00"}</span>
    );
  }

  if (timeLeft["minutes"]) {
    timerComponents.push(
        <span>
            {(timeLeft["minutes"].toString().length === 1) ? "0" + timeLeft["minutes"].toString() : timeLeft["minutes"]}{":"}
        </span>
      );
  } else {
    timerComponents.push(
        <span>{"00"}</span>
    );
  }

  if (timeLeft["seconds"]) {
    timerComponents.push(
        <span>
            {(timeLeft["seconds"].toString().length === 1) ? "0" + timeLeft["seconds"].toString() : timeLeft["seconds"]}
        </span>
      );
  } else {
    timerComponents.push(
        <span>{"00"}</span>
    );
  }

  return (
    <Timer>
      {timerComponents}
    </Timer>
  );
}

export default Countdown;