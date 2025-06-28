import { useState, useEffect } from 'react';

export function useTimeBasedExpression() {
  const [isSleepingTime, setIsSleepingTime] = useState(false);

  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      const istTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
      const hours = istTime.getHours();
      const minutes = istTime.getMinutes();
      
      // Sleep between 9:30 PM (21:30) and 6:00 AM (06:00) IST
      const isNightTime = hours >= 21 && minutes >= 30;
      const isEarlyMorning = hours < 6;
      
      setIsSleepingTime(isNightTime || isEarlyMorning);
    };

    checkTime();
    const interval = setInterval(checkTime, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  return isSleepingTime;
}