import Card from "./components/Card";
import TodayDisplay from "./components/TodayDisplay";
import UnitContainer from "./components/UnitContainer";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [unit, setUnit] = useState("celcius");
  const getLocation = () => {
    if (!navigator.geolocation) {
      setError("Location API is not supported by your browser");
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(position.coords);
        },
        () => {
          setError("Sorry, we cannot find you location");
        }
      );
    }
  };
  const fetchData = () => {
    const longitude = location?.longitude;
    const latitude = location?.latitude;
    fetch(
      `http://www.7timer.info/bin/api.pl?lon=${longitude}&lat=${latitude}&product=civillight&output=json`
    )
      .then((Response) => Response.json())
      .then((json) => setData(json))
      .catch((err) => console.error(err));
  };
  console.log(data);
  const handleClick = (e) => setUnit(e.target.id);
  useEffect(() => {
    getLocation();
    fetchData();
  }, []);
  return (
    <div className="weather-app">
      <TodayDisplay today={data?.dataseries[0]} location={location} />
      <div className="cards-container">
        {data?.dataseries.map((day, index) => (
          <Card key={index} day={day} index={index} unit={unit} />
        ))}
      </div>
      <UnitContainer handleClick={handleClick} unit={unit} />
    </div>
  );
}

export default App;
