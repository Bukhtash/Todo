import React from 'react';
import axios from 'axios';

function App() {
  const handleClick = async () => {
    try {
      const res = await axios.post('http://localhost:8000/submit', {
        name: 'Mukhtar',
        message: 'Hello from React!',
      });
      console.log(res.data.name)
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return <button onClick={handleClick}>Send Data</button>;
}

export default App;
