import { Cloud, CloudRain, CloudSnow, Sun, Wind, Droplets, Search, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { Input } from "@/ui/input";
import { Button } from "@/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import styles from "./WeatherWidget.module.scss";

interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
  sys: {
    country: string;
  };
}

// API key is injected via webpack DefinePlugin
const API_KEY = process.env.VITE_WEATHER_API_KEY || "demo";
const API_URL = "https://api.openweathermap.org/data/2.5/weather";

const getWeatherIcon = (weatherMain: string) => {
  switch (weatherMain.toLowerCase()) {
    case "clear":
      return <Sun className={styles.sunIcon} />;
    case "clouds":
      return <Cloud className={styles.cloudIcon} />;
    case "rain":
    case "drizzle":
      return <CloudRain className={styles.rainIcon} />;
    case "snow":
      return <CloudSnow className={styles.snowIcon} />;
    default:
      return <Cloud className={styles.cloudIcon} />;
  }
};

export function WeatherWidget() {
  const [searchCity, setSearchCity] = useState("");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Try to get user's location on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeatherByCoords(
            position.coords.latitude,
            position.coords.longitude,
          );
        },
        () => {
          // If geolocation fails, try default city
          fetchWeather("Warsaw");
        },
      );
    } else {
      fetchWeather("Warsaw");
    }
  }, []);

  const fetchWeatherByCoords = async (lat: number, lon: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${API_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
      );
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }
      const data: WeatherData = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to fetch weather. Please check your API key.",
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchWeather = async (cityName: string) => {
    if (!cityName.trim()) {
      setError("Please enter a city name");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${API_URL}?q=${encodeURIComponent(cityName)}&appid=${API_KEY}&units=metric`,
      );
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("City not found. Please check the spelling.");
        }
        if (response.status === 401 || response.status === 403) {
          throw new Error(
            "Invalid API key. Please set VITE_WEATHER_API_KEY in your .env file. Get your free API key at openweathermap.org",
          );
        }
        throw new Error("Failed to fetch weather data");
      }
      const data: WeatherData = await response.json();
      setWeatherData(data);
      setSearchCity("");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to fetch weather. Please check your API key.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchCity.trim()) {
      fetchWeather(searchCity);
    }
  };

  return (
    <div className={styles.weatherContainer}>
      <div className={styles.header}>
        <h1>Weather</h1>
        <p>
          Search for any city to get real-time weather information
        </p>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSearch} className={styles.searchForm}>
        <div className={styles.searchContainer}>
          <div className={styles.searchInputWrapper}>
            <Search className={styles.searchIcon} />
            <Input
              type="text"
              placeholder="Enter city name (e.g., London, New York, Tokyo)"
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Loading...
              </>
            ) : (
              "Search"
            )}
          </Button>
        </div>
      </form>

      {/* Error Message */}
      {error && (
        <div className={styles.errorMessage}>
          <p>Error: {error}</p>
          {error.includes("API key") && (
            <p className="text-sm mt-2">
              Get your free API key at{" "}
              <a
                href="https://openweathermap.org/api"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.errorLink}
              >
                openweathermap.org
              </a>
              {" "}and add it to your .env file as VITE_WEATHER_API_KEY
            </p>
          )}
        </div>
      )}

      {/* Weather Display */}
      {weatherData && (
        <Card className={styles.weatherCard}>
          <CardHeader>
            <CardTitle className={styles.weatherHeader}>
              <span>
                {weatherData.name}, {weatherData.sys.country}
              </span>
              {getWeatherIcon(weatherData.weather[0].main)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={styles.weatherContent}>
              {/* Main Temperature */}
              <div className={styles.temperatureSection}>
                <div>
                  <div className={styles.temperature}>
                    {Math.round(weatherData.main.temp)}°C
                  </div>
                  <div className={styles.description}>
                    {weatherData.weather[0].description}
                  </div>
                  <div className={styles.feelsLike}>
                    Feels like {Math.round(weatherData.main.feels_like)}°C
                  </div>
                </div>
              </div>

              {/* Weather Details */}
              <div className={styles.detailsSection}>
                <div className={styles.weatherDetail}>
                  <Wind className={styles.detailIcon} />
                  <div>
                    <div className={styles.detailLabel}>Wind Speed</div>
                    <div className={styles.detailValue}>
                      {weatherData.wind.speed} m/s
                    </div>
                  </div>
                </div>

                <div className={styles.weatherDetail}>
                  <Droplets className={styles.detailIcon} />
                  <div>
                    <div className={styles.detailLabel}>Humidity</div>
                    <div className={styles.detailValue}>
                      {weatherData.main.humidity}%
                    </div>
                  </div>
                </div>

                <div className={styles.weatherDetail}>
                  <div className={styles.pressureIcon}>
                    <span>hPa</span>
                  </div>
                  <div>
                    <div className={styles.detailLabel}>Pressure</div>
                    <div className={styles.detailValue}>
                      {weatherData.main.pressure} hPa
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* No Data State */}
      {!weatherData && !loading && !error && (
        <Card className={styles.emptyState}>
          <CardContent className={styles.emptyContent}>
            <Cloud className={styles.emptyIcon} />
            <p className={styles.emptyText}>
              Enter a city name above to see the weather
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
