import React, { useEffect, useState } from 'react';

const CountdownTimer = ({ closingTime }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(closingTime));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(closingTime));
    }, 1000);

    return () => clearInterval(timer);
  }, [closingTime]);

  function calculateTimeLeft(closingTime) {
    const now = new Date();
    const closingDate = new Date(now.toDateString() + ' ' + closingTime);
    if (now > closingDate) {
      closingDate.setDate(closingDate.getDate() + 1);
    }
    const difference = closingDate - now;
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }

  return (
    <div className="countdown-timer">
      {timeLeft.hours !== undefined ? (
        <div>
          <span>{timeLeft.hours}h </span>
          <span>{timeLeft.minutes}m </span>
          <span>{timeLeft.seconds}s </span>
        </div>
      ) : (
        <div>Closed</div>
      )}
    </div>
  );
};

export default CountdownTimer;
