import axios from "axios";
import React, { useState } from "react";

function Widget(props) {
  const [searchText, setSearchText] = useState();
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showSearchBar2, setShowSearchBar2] = useState(false);
  const [showGoogle, setShowGoogle] = useState(false);
  const [showWeather, setShowWeather] = useState(false);
  const [showWeather2, setShowWeather2] = useState(false);
  const [cityName, setCityName] = useState("");
  const [cityproba, setCityproba] = useState("");
  const [citytempMax, setcitytempMax] = useState("");
  const [dateMail, setdateMail] = useState("");

  const handleGoogleClick = async() => {
    await getEmail();
    setShowGoogle(true);
    setShowWeather(false);
  };

  const handleWeatherClick = async () => {
    await getInfometeo();
    setShowWeather(true);
    setShowWeather2(false);
    setShowGoogle(false);
    setShowSearchBar(false);
  };

  const handleWeatherClick2 = async () => {
    await getInfometeo();
    setShowWeather(false);
    setShowWeather2(true);
    setShowGoogle(false);
    setShowSearchBar2(false);
  };

  const handleSearchBarClick = (event) => {
    setShowSearchBar(!showSearchBar);
    event.stopPropagation();
  };

  const handleSearchBarClick2 = (event) => {
    setShowSearchBar2(!showSearchBar2);
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
    setcitytempMax(response.data.tempmax)
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
    setdateMail(response.data);
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
      {showSearchBar2 && (
        <div className="search-bar">
          <input
            type="text"
            placeholder="Numéro INSEE de votre ville"
            value={searchText}
            onChange={handleSearchTextChange}
          />
          <button type="button" onClick={handleWeatherClick2}>
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
            <h3>Heure du dernier mail reçu: {dateMail}</h3>
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
              Il y a {cityproba}% de chance de pluie à {cityName}.
            </h3>
          </div>
        )}
        {showWeather2 && (
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
              La température maximum à {cityName} sera de {citytempMax}°C.
            </h3>
          </div>
        )}
      </div>
      {!showGoogle && !showWeather && !showWeather2 &&(
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
              <span class="gmail-text">Voir l'heure du dernier mail reçu</span>
            </button>
            <br />
            <br />
            <button id="meteo-button" onClick={handleSearchBarClick}>
              <span class="meteo-icon"></span>
              <span class="gmail-text">Voir le pourcentage de chance de pluie</span>
            </button>
            <br /><br />
            <button id="meteo-button" onClick={handleSearchBarClick2}>
              <span class="meteo-icon"></span>
              <span class="gmail-text">Voir le temps maximum de la journée</span>
            </button>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Widget;
