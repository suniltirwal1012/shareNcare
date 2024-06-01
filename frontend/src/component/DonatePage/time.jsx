// TimeInput.js
import React, { useState } from 'react';

function TimeInput() {
  const [time, setTime] = useState('');

  const handleChange = (event) => {
    setTime(event.target.value);
  };

  return (
    <div>
      <label htmlFor="timeInput">Select a time:</label>
      <input
        type="time"
        id="timeInput"
        name="timeInput"
        value={time}
        onChange={handleChange}
      />
    </div>
  );
}

export default TimeInput;
