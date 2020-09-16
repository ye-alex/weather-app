import React, { useState } from 'react';
import Login from '../Login/Login';
import Weather from '../Weather/Weather';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return isLoggedIn ? <Weather /> : <Login setIsLoggedIn={setIsLoggedIn} />;
};

export default App;
