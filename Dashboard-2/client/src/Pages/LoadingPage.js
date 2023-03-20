import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoadingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const navigateToDashboard = () => navigate("/dashboard");
    const fetchToken = async () => {
      try {
        const queryString = window.location.search;
        const params = new URLSearchParams(queryString);
        const code = params.get("code");

        if (!code) return;

        const response = await axios.get(`http://localhost:8080/auth/google/callback?code=${code}`);
        localStorage.setItem('token', response.data);
        navigateToDashboard();
      } catch (error) {
        console.log(error);
      }
    };
    fetchToken();
  }, [navigate]);

  return ;
}