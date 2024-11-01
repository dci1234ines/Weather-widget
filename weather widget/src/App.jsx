
function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY; 

  const fetchWeather = async () => {
    if (city.trim() === "") {
      setError("Gib bitte eine Stadt ein");
      return;
    }

    setError(""); 
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      if (!response.ok) {
        throw new Error("Stadt nicht gefunden");
      }
      const data = await response.json();
      setWeather({
        temperature: data.main.temp,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
      });
      setCity(""); 
    } catch (err) {
      setError(err.message);
      setWeather(null);
    }
  };

  return (
    <div className="container">
      <h1>Wetter Widget</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Stadt eingeben"
      />
      <button onClick={fetchWeather}>Wetter info</button>
      {error && <p className="error-message">{error}</p>}
      {weather && (
        <div className="weather-info">
          <h2>{city}</h2>
          <p>{weather.temperature}°C</p>
          <p>{weather.description}</p>
          <img
            src={`http://openweathermap.org/img/wn/${weather.icon}.png`}
            alt={weather.description}
          />
        </div>
      )}
    </div>
  );
}

export default App;