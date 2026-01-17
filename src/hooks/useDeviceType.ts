import { useState, useEffect } from "react";

export type DeviceType = "mobile" | "tablet" | "desktop";

export function useDeviceType(): DeviceType {
  const [deviceType, setDeviceType] = useState<DeviceType>(() => {
    // Initial check
    if (typeof window === "undefined") return "desktop";
    const width = window.innerWidth;
    if (width < 768) return "mobile";
    if (width < 1024) return "tablet";
    return "desktop";
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setDeviceType("mobile");
      } else if (width < 1024) {
        setDeviceType("tablet");
      } else {
        setDeviceType("desktop");
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return deviceType;
}

export function useIsMobile(): boolean {
  const deviceType = useDeviceType();
  return deviceType === "mobile";
}

export function useIsDesktop(): boolean {
  const deviceType = useDeviceType();
  return deviceType === "desktop";
}
