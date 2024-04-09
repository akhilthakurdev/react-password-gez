import './App.css';
import React, { useState } from 'react';

function App() {
  const [checkboxes, setCheckboxes] = useState({
    uppercase: false,
    lowercase: false,
    numbers: false,
    symbols: false
  });
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [passwordLength, setPasswordLength] = useState(12); // Default password length
  const [errorMessage, setErrorMessage] = useState('');
  const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()-_=+';

  const generatePassword = () => {
    if (!checkboxes.uppercase && !checkboxes.lowercase && !checkboxes.numbers && !checkboxes.symbols) {
      setErrorMessage('Please select at least one option.');
      return;
    }
    let password = '';
    

    while (password.length < passwordLength) {
    
      if (checkboxes.uppercase && password.length < passwordLength) {
        password += uppercaseLetters.charAt(Math.floor(Math.random() * uppercaseLetters.length)); // Add a random uppercase letter
      }
      if (checkboxes.lowercase && password.length < passwordLength) {
        password += lowercaseLetters.charAt(Math.floor(Math.random() * lowercaseLetters.length)); // Add a random lowercase letter
      }
      if (checkboxes.numbers && password.length < passwordLength) {
        password += numbers.charAt(Math.floor(Math.random() * numbers.length)); // Add a random number
      }
      if (checkboxes.symbols && password.length < passwordLength) {
        password += symbols.charAt(Math.floor(Math.random() * symbols.length)); // Add a random symbol
      }
    }

    // Trim password if it exceeds the maximum length
    password = password.slice(0, passwordLength);

    setGeneratedPassword(password);
  };

  // Function to handle checkbox state changes
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckboxes({ ...checkboxes, [name]: checked });
  };

  // Function to handle password length dropdown change
  const handlePasswordLengthChange = (event) => {
    const length = parseInt(event.target.value, 10);
    setPasswordLength(length);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black text-white">
      <div className="bg-slate-400 text-white p-4 rounded-md shadow-md">
        <div className="text-lg font-bold mb-2">Password Generator</div>
        <div className="text-sm mb-4">
          <input 
            type="text" 
            className="bg-gray-200 px-3 py-2 rounded-md w-full text-black" 
            placeholder="Generated Password" 
            value={generatedPassword} 
            readOnly
          />
        </div>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            name="uppercase"
            checked={checkboxes.uppercase}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          <label htmlFor="uppercase">Uppercase Letters</label>
        </div>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            name="lowercase"
            checked={checkboxes.lowercase}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          <label htmlFor="lowercase">Lowercase Letters</label>
        </div>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            name="numbers"
            checked={checkboxes.numbers}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          <label htmlFor="numbers">Numbers</label>
        </div>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            name="symbols"
            checked={checkboxes.symbols}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          <label htmlFor="symbols">Symbols</label>
        </div>
        <div className="flex items-center mb-4">
          <label htmlFor="passwordLength" className="mr-2 text-white">Password Length:</label>
          <select id="passwordLength" value={passwordLength} className="text-black" onChange={handlePasswordLengthChange}>
            {[...Array(13).keys()].map(length => (
              <option key={length + 8} value={length + 8}>{length + 8}</option>
            ))}
          </select>
        </div>
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        <div className="mt-4 flex justify-center">
          <button onClick={generatePassword} className="bg-blue-500 text-white px-4 py-2 rounded-md">Generate Password</button>
        </div>
      </div>
    </div>
  );
}

export default App;
