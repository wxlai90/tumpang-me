import { useEffect, useState } from "react";
import InputText from "../../components/input-text/input-text";
import "./create.css";
import { useNavigate } from "react-router-dom";

import { addTumpang } from "../../firebase";

const Create = () => {
  const [state, setState] = useState({
    heading: "",
    timing: "",
    seats: "",
    pickup: "",
    plateNo: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const added = await addTumpang(state);
    navigate(`/chat?id=${added.id}`);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((p) => ({ ...p, [name]: value }));
  };

  const getLocation = (callback = null) => {
    navigator.geolocation.getCurrentPosition(
      (location) => {
        const userLocation = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };

        setState((prevState) => ({ ...prevState, location: userLocation }));

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
  }, []);

  return (
    <section>
      <form onSubmit={handleSubmit} className="create">
        <InputText
          label="Where are you heading"
          value={state.heading}
          onChange={handleChange}
          name="heading"
          required
        />
        <InputText
          label="At what time"
          value={state.timing}
          onChange={handleChange}
          name="timing"
          required
        />
        <InputText
          label="Number of seats free"
          value={state.seats}
          onChange={handleChange}
          name="seats"
          type="number"
          required
        />

        <InputText
          label="Pickup location description"
          value={state.pickup}
          onChange={handleChange}
          name="pickup"
          required
        />

        <InputText
          label="Grab/Gojek/Personal Car plate no?"
          value={state.plateNo}
          onChange={handleChange}
          name="plateNo"
          required
        />
        <button className="btn btn-primary">Create!</button>
      </form>
    </section>
  );
};

export default Create;
