import "../css/TimeBetweenNotifications.css";
import { useState, useEffect } from "react";

function TimeBetweenNotifications() {
  const [min, setMin] = useState(30);

  useEffect(() => {
    // Load stored min value on mount
    chrome.storage.local.get("min", (result) => {
      if (typeof result.min === "number") {
        setMin(result.min);
      }
    });

    const handleStorageChange = (
      changes: { [key: string]: chrome.storage.StorageChange },
      areaName: string
    ) => {
      if (areaName === "local" && changes.updatedAt) {
        chrome.storage.local.get(["symbol", "min"], (result) => {
          const currentMin = result.min ?? 30;
          let newMin = currentMin;

          if (result.symbol === "+") {
            newMin = currentMin + 5;
          } else if (result.symbol === "-") {
            newMin = currentMin - 5;
          }

          // Clamp the value between 5 and 180
          newMin = Math.max(5, Math.min(newMin, 180));

          chrome.storage.local.set({ min: newMin });
          setMin(newMin);
          chrome.storage.local.set({totalNumberOfMinutes: newMin})
        });
      }
    };

    chrome.storage.onChanged.addListener(handleStorageChange);

    return () => {
      chrome.storage.onChanged.removeListener(handleStorageChange);
    };
  }, []);

  return (
    <p
      className="time-between-notifications"
      title="Time Between Notifications"
      aria-label="Time Between notifications"
    >
      {min}
    </p>
  );
}

export default TimeBetweenNotifications;
