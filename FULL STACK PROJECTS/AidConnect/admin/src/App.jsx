import React, { useState } from "react";

function App() {
  const [state, setState] = useState('Admin');
  return (
    <>
      <form>
        <div>
          <p>
            <span>{state} </span>Login
          </p>
          <div>
            <label for="Email">Email </label>
            <input type="email" name="Email" id="Email" required />
          </div>
        </div>
      </form>
    </>
  );
}

export default App;
