import axios from 'axios';
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react';

function GetTokenFromCookie() {
    const [token, setToken] = useState(null);
    useEffect(() => {
        const token = Cookies.get('token');
        console.log(token);
        setToken(token);
    });
}

export default GetTokenFromCookie;