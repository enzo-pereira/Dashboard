import axios from "axios";
import React, { useState } from "react";

function Widget(props) {
  const [searchText, setSearchText] = useState();
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showGoogle, setShowGoogle] = useState(false);
  const [showWeather, setShowWeather] = useState(false);
  const [cityName, setCityName] = useState("");
  const [cityproba, setCityproba] = useState("");
  const [nbrMail, setnbrMail] = useState("");

  const handleGoogleClick = async() => {
    await getEmail();
    setShowGoogle(true);
    setShowWeather(false);
  };

  const handleWeatherClick = async () => {
    await getInfometeo();
    setShowWeather(true);
    setShowGoogle(false);
    setShowSearchBar(false);
  };

  const handleSearchBarClick = (event) => {
    setShowSearchBar(!showSearchBar);
    event.stopPropagation();
  };

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleDeleteClick = () => {
    props.onDelete();
  };

  const getInfometeo = async () => {
    const data = {
      insee: searchText,
    };
    console.log(searchText);
    const token = localStorage.getItem("token");
    const response = await axios.post(`http://localhost:8080/forecast`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log(response);
    setCityName(response.data.name);
    setCityproba(response.data.probapluie);
  };


  const getEmail = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `http://localhost:8080/api/google/gmail`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data);
    setnbrMail(response.data);
  };

  return (
    <div className="widget">
      {showSearchBar && (
        <div className="search-bar">
          <input
            type="text"
            placeholder="Numéro INSEE de votre ville"
            value={searchText}
            onChange={handleSearchTextChange}
          />
          <button type="button" onClick={handleWeatherClick}>
            Choisir
          </button>
        </div>
      )}
      <div className="widget-content">
        {showGoogle && (
          <div className="google-interface">
            {
              <h1>
                gmail Widget{" "}
                <button
                  className="widget-icon"
                  onClick={handleDeleteClick}
                ></button>
              </h1>
            }
            <br />
            <h3>Nombres de nouveaux mails : {nbrMail}</h3>
          </div>
        )}
        {showWeather && (
          <div className="weather-interface">
            {
              <h1>
                Méteo Widget{" "}
                <button
                  className="widget-icon"
                  onClick={handleDeleteClick}
                ></button>
              </h1>
            }
            <br />
            <h3>
              {cityName} : {cityproba}% de chance de pluie.
            </h3>
          </div>
        )}
      </div>
      {!showGoogle && !showWeather && (
        <div>
          <h1>
            Configurez votre widget{" "}
            <button
              className="widget-icon"
              onClick={handleDeleteClick}
            ></button>
          </h1>
          <ul className="services">
            <br />
            <button id="gmail-button" onClick={handleGoogleClick}>
              <span class="gmail-icon"></span>
              <span class="gmail-text">Voir le nombre de mail non-lus</span>
            </button>
            <br />
            <br />
            <button id="meteo-button" onClick={handleSearchBarClick}>
              <span class="meteo-icon"></span>
              <span class="gmail-text">Voir le pourcentage de chance de pluie dans une ville</span>
            </button>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Widget;
