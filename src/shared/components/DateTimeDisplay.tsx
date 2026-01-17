import { Clock } from "lucide-react";
import { useState, useEffect } from "react";

import { cn } from "@/shared/utils/cn";

type DateTimeData = {
  datetime: string;
  timezone: string;
};

export function DateTimeDisplay() {
  // eslint-disable-next-line unused-imports/no-unused-vars
  const [_dateTime, setDateTime] = useState<DateTimeData | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeOffset, setTimeOffset] = useState<number>(0);

  // Fetch initial time from API to get accurate timezone
  useEffect(() => {
    const fetchDateTime = async () => {
      try {
        // Using WorldTimeAPI (free, no API key needed)
        const response = await fetch(
          "https://worldtimeapi.org/api/timezone/Europe/Warsaw",
        );
        if (!response.ok) throw new Error("Failed to fetch time");
        const data: DateTimeData = await response.json();
        setDateTime(data);

        // Calculate offset between API time and local time
        const apiTime = new Date(data.datetime).getTime();
        const localTime = Date.now();
        setTimeOffset(apiTime - localTime);
        setError(null);
      } catch (err) {
        console.error("Error fetching time:", err);
        setError("Unable to fetch time");
        setTimeOffset(0); // Use local time
      } finally {
        setIsLoading(false);
      }
    };

    fetchDateTime();

    // Update time every second for real-time display
    const interval = setInterval(() => {
      setCurrentTime(new Date(Date.now() + timeOffset));
    }, 1000);

    return () => clearInterval(interval);
  }, [timeOffset]);

  // Format time without seconds (HH:MM)
  const formatTime = () => {
    return currentTime.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const timeString = formatTime();

  return (
    <div
      className={cn(
        "flex items-center gap-1.5 md:gap-2 px-2 md:px-2.5 py-1 md:py-1.5 rounded-lg border transition-all",
        "bg-hover border-border",
      )}
    >
      {/* Clock Icon */}
      <Clock
        className="w-3.5 h-3.5 md:w-4 md:h-4 shrink-0"
        style={{ color: "var(--primary)" }}
      />

      {/* Time only */}
      <span
        className="text-xs md:text-sm font-mono font-semibold whitespace-nowrap"
        style={{ color: "var(--text-primary)" }}
      >
        {isLoading ? "--:--" : timeString}
      </span>

      {error && (
        <span
          className="text-[10px] text-red-400 hidden md:inline"
          title={error}
        >
          ⚠
        </span>
      )}
    </div>
  );
}
