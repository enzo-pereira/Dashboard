import axios from "axios";
import React, { useEffect, useState } from "react";

function Widget(props) {
  const [searchText, setSearchText] = useState();
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showSearchBar2, setShowSearchBar2] = useState(false);
  const [showSearchBar3, setShowSearchBar3] = useState(false);
  const [showSearchBar4, setShowSearchBar4] = useState(false);
  const [showGoogle, setShowGoogle] = useState(false);
  const [showGoogle2, setShowGoogle2] = useState(false);
  const [showWeather, setShowWeather] = useState(false);
  const [showWeather2, setShowWeather2] = useState(false);
  const [showReddit, setShowReddit] = useState(false);
  const [cityName, setCityName] = useState("");
  const [cityproba, setCityproba] = useState("");
  const [citytempMax, setcitytempMax] = useState("");
  const [dateMail, setdateMail] = useState("");
  const [Usermail, setUserMail] = useState("");
  const [nbrCommreddit, setnbrCommreddit] = useState("");

  const handleGoogleClick = async() => {
    await getEmail();
    setShowGoogle(true);
    setShowReddit(false);
    setShowGoogle2(false);
    setShowWeather2(false);
    setShowWeather(false);
  };

  const handleGoogleClick2 = async() => {
    await getUserEmail();
    setShowGoogle2(true);
    setShowGoogle(false);
    setShowReddit(false);
    setShowWeather2(false);
    setShowWeather(false);
    setShowSearchBar4(false);

  };

  const handleRedditClick = async() => {
    await getReddit();
    setShowReddit(true);
    setShowGoogle2(false);
    setShowWeather(false);
    setShowWeather2(false);
    setShowGoogle(false);
    setShowSearchBar3(false);
  }

  const handleWeatherClick = async () => {
    await getInfometeo();
    setShowWeather(true);
    setShowReddit(false);
    setShowGoogle2(false);
    setShowWeather2(false);
    setShowGoogle(false);
    setShowSearchBar(false);
  };

  const handleWeatherClick2 = async () => {
    await getInfometeo();
    setShowWeather(false);
    setShowReddit(false);
    setShowGoogle2(false);
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

  const handleSearchBarClick3 = (event) => {
    setShowSearchBar3(!showSearchBar3);
    event.stopPropagation();
  };

  const handleSearchBarClick4 = (event) => {
    setShowSearchBar4(!showSearchBar4);
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
    setcitytempMax(response.data.tempmax);
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

  const getUserEmail = async () => {
    const data = {
      "num": searchText,
    }
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `http://localhost:8080/api/google/usergmail`, data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data);
    setUserMail(response.data);
  };

  useEffect(()=>{
    const interval = setInterval(()=>{
        getEmail();
        getUserEmail();
        //getReddit();
        //getInfometeo();
    }, 30000)
    return (() => {
      clearInterval(interval);
    })
  })  

  const getReddit = async () => {
    const data = {
      "url": searchText,
    }
    const response = await axios.post(
      `http://localhost:8080/api/reddit`, data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data);
    setnbrCommreddit(response.data);
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
      {showSearchBar3 && (
        <div className="search-bar">
          <input
            type="text"
            placeholder="Url du subreddit en question"
            value={searchText}
            onChange={handleSearchTextChange}
          />
          <button type="button" onClick={handleRedditClick}>
            Choisir
          </button>
        </div>
      )}
      {showSearchBar4 && (
        <div className="search-bar">
          <input
            type="text"
            placeholder="Entrez le numero de mail"
            value={searchText}
            onChange={handleSearchTextChange}
          />
          <button type="button" onClick={handleGoogleClick2}>
            Choisir
          </button>
        </div>
      )}
      <div className="widget-content">
        {showGoogle && (
          <div className="google-interface">
            {
              <h1>
                Gmail Widget{" "}
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
        {showReddit && (
          <div className="reddit-interface">
            {
              <h1>
                Reddit Widget{" "}
                <button
                  className="widget-icon"
                  onClick={handleDeleteClick}
                ></button>
              </h1>
            }
            <br />
            <h3>
              Il y a {nbrCommreddit} commentaires sur ce subreddit.
            </h3>
          </div>
        )}
        {showGoogle2 && (
          <div className="google-interface">
            {
              <h1>
                Gmail Widget{" "}
                <button
                  className="widget-icon"
                  onClick={handleDeleteClick}
                ></button>
              </h1>
            }
            <br />
            <h3>C'est {Usermail} qui vous a envoyer un mail à ce numéro. </h3>
          </div>
        )}
      </div>
      {!showGoogle && !showWeather && !showWeather2 && !showReddit && !showGoogle2 &&(
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
            
            <button id="meteo-button" onClick={handleSearchBarClick}>
              <span class="meteo-icon"></span>
              <span class="gmail-text">Voir le pourcentage de chance de pluie</span>
            </button>
            <br />
            <button id="meteo-button" onClick={handleSearchBarClick2}>
              <span class="meteo-icon"></span>
              <span class="gmail-text">Voir le temps maximum de la journée</span>
            </button>
            <br />
            <button id="reddit-button" onClick={handleSearchBarClick3}>
              <span class="reddit-icon"></span>
              <span class="gmail-text">Voir le nombre de commentaire d'un subreddit</span>
            </button>
            <br />
            <button id="gmail-button" onClick={handleSearchBarClick4}>
              <span class="gmail-icon"></span>
              <span class="gmail-text">Voir l'expediteur d'un mail choisit (1,2..)</span>
            </button>
            <br />
          </ul>
        </div>
      )}
    </div>
  );
}

export default Widget;
