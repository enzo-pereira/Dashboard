import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import logoepitech from "./assets/epitechlogo.webp";
import profilepic from "./assets/profilepic.png";
import Widget from "./Pages/Widget";

function Dashboard() {
  const [widgets, setWidgets] = useState([]);

  const addWidget = () => {
    const newWidgets = [...widgets];
    newWidgets.push(<Widget key={newWidgets.length} title={`Widget ${newWidgets.length + 1}`} />);
    setWidgets(newWidgets);
  };

  const removeWidget = () => {
    const newWidgets = [...widgets];
    newWidgets.pop();
    setWidgets(newWidgets);
  };

  const handleDeleteWidget = (widgetKey) => {
    setWidgets(widgets.filter((widget) => widget.key !== widgetKey));
  };

  return (
    <div>
      <div className="sidebar">
        <div className="sidebar-header">
          <img src={logoepitech} alt="Logo" className="sidebar-logo" />
        </div>
        <ul className="sidebar-list">
          <br />
          <br />
          <button className="sidebar-list-item">Dashboard</button>
          <br />
          <hr />
          <br />
          <button className="sidebar-list-item" onClick={addWidget}>
            Ajouter un widget
          </button>
          <button className="sidebar-list-item" onClick={removeWidget}>
            Supprimer un widget
          </button>
        </ul>
      </div>
      <div className="topbar">
        <img src={profilepic} alt="Logo" className="topbar-logo" />
        <ul className="topbar-menu">
          <li className="topbar-menu-item">
            <Link to="/">Log out</Link>
          </li>
        </ul>
      </div>
      <div className="container">
        {widgets.map((widget) => (
          <Widget
            key={widget.key}
            title={widget.props.title}
            content={widget.props.content}
            onDelete={() => handleDeleteWidget(widget.key)}
          />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
