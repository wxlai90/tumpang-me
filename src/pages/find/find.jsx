import { useState, useEffect } from "react";
import { getAllTumpangs } from "../../firebase";
import { Link } from "react-router-dom";
import moment from "moment";
import { distanceBetween2Locations } from "../../utils";
import "./find.css";

const Find = () => {
  const [currentLocation, setCurrentLocation] = useState();
  const [tumpangs, setTumpangs] = useState([]);

  const getLocation = (callback = null) => {
    navigator.geolocation.getCurrentPosition(
      (location) => {
        const userLocation = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };

        setCurrentLocation({ ...userLocation });

        if (callback) callback(userLocation);
      },
      (error) => {
        if (error) {
          console.log("error getting location", error);
        }
      },
      {
        maximumAge: 10000,
        timeout: 30000,
        enableHighAccuracy: true,
      }
    );
  };

  useEffect(() => {
    getLocation();
    getAllTumpangs().then((results) => {
      const withTime = results.map((result) => ({
        ...result,
        ago: result.createdAt.seconds,
      }));

      const sortedByCreation = withTime.sort(
        (a, b) => b.createdAt.seconds - a.createdAt.seconds
      );

      setTumpangs(sortedByCreation);
    });
  }, []);

  const formatTime = (timestamp) => {
    timestamp = timestamp * 1000;

    return moment(timestamp).fromNow();
  };

  const formatDistance = (tumpang) => {
    if (!currentLocation) return "Distance Away Unavailable";

    const km = distanceBetween2Locations(
      tumpang.location.latitude,
      tumpang.location.longitude,
      currentLocation.latitude,
      currentLocation.longitude
    );

    const metres = km * 1000;

    const str = Math.floor(metres);

    return `${str} ${str > 1 ? "metres" : "metre"} away`;
  };

  return (
    <section>
      <div className="tumpangs-list">
        {tumpangs.map((tumpang) => (
          <div className="tumpang-card" key={tumpang.id}>
            <div className="heading">
              <p className="heading-title">Going</p>
              <h1 className="heading-location">{tumpang.heading}</h1>
            </div>
            <div>
              <h3 className="pickup">Pickup at: {tumpang.pickup}</h3>
            </div>

            <div>
              <p>Plate no: {tumpang.plateNo}</p>
            </div>

            <div>
              <h3 className="timing">{tumpang.timing}</h3>
            </div>
            <div className="seats">
              <span className="material-icons-outlined">chair</span>{" "}
              <p>{tumpang.seats}</p>
            </div>

            <div className="distance-away">
              <p>{formatDistance(tumpang)}</p>
            </div>

            <Link className="chat-link" to={`/chat?id=${tumpang.id}`}>
              Chat
            </Link>

            <div className="moments-ago">
              <p>Listed: {formatTime(tumpang.ago)}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Find;
