import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import drop from './drop.png';

const ApiComponent = () => {
    const [postData, setPostData] = useState('');
    const [responseData, setResponseData] = useState(null);
    const [getResponse, setGetResponse] = useState(null);
    const [error, setError] = useState('');
    const [options] = useState(["Alphabets", "Numbers", "Highest lowercase alphabet"]);  // Removed setOptions
    const [selectedOptions, setSelectedOptions] = useState([]);

    useEffect(() => {
        document.title = "21BCE3796";
    }, []);

    const handlePostRequest = async () => {
        try {
            const parsedData = JSON.parse(postData);
            setError('');
            const response = await axios.post('http://localhost:3000/bfhl', {
                data: parsedData.data
            });
            setResponseData(response.data);
        } catch (error) {
            setError('Invalid JSON input. Please enter a valid JSON string.');
            console.error('Error making POST request:', error);
        }
    };

    const handleGetRequest = async () => {
        try {
            const response = await axios.get('http://localhost:3000/bfhl');
            setGetResponse(response.data);
        } catch (error) {
            console.error('Error making GET request:', error);
        }
    };

    const handleOptionChange = (e) => {
        const value = e.target.value;
        if (!selectedOptions.includes(value)) {
            setSelectedOptions([...selectedOptions, value]);
        }
    };

    const handleRemoveOption = (option) => {
        setSelectedOptions(selectedOptions.filter(o => o !== option));
    };
    
    const renderSelectedOptions = () => {
        return selectedOptions.map(option => (
            <span key={option} className="selected-option">
                {option}
                <button className="remove-btn" onClick={() => handleRemoveOption(option)}>x</button>
            </span>
        ));
    };

    const renderResponse = () => {
        if (!responseData) return null;

        return (
            <div className='mapResults'>
                {selectedOptions.includes('Alphabets') && (
                    <div>
                        <h3>Alphabets:</h3>
                        <p>{responseData.alphabets.join(', ')}</p>
                    </div>
                )}
                {selectedOptions.includes('Numbers') && (
                    <div>
                        <h3>Numbers:</h3>
                        <p>{responseData.numbers.join(', ')}</p>
                    </div>
                )}
                {selectedOptions.includes('Highest lowercase alphabet') && (
                    <div>
                        <h3>Highest Lowercase Alphabet:</h3>
                        <p>{responseData.highest_lowercase_alphabet.join(', ')}</p>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1 className='headingText' style={{color:'#005DAC'}}>BAJAJ FullStack App</h1>
            <textarea
                placeholder='Enter JSON data (e.g., {"data": ["A","C","z"]})'
                value={postData}
                onChange={(e) => setPostData(e.target.value)}
                rows="3"
                cols="50"
                style={{borderRadius:'10px', padding:'10px'}}
            />
            <br />
            <button className='subBtn' onClick={handlePostRequest}>Submit</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {responseData && (
                <div>
                    <h2 className='subHead'>POST Response:</h2>
                    <div className="map-filter">
                        <h3 style={{color:'#ade8f4'}}>Multi Filter:</h3>
                        <div className="selected-options">
                            {renderSelectedOptions()}
                        </div>
                        <select 
                            className="styled-select" 
                            onChange={handleOptionChange}
                        >
                            <option value="" disabled selected>Select an option</option>
                            {options.map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                        <img src={drop} alt='' style={{width:'30px', height:'30px', position:'relative', top:'10px', left:'-36px'}}></img>
                    </div>
                    {renderResponse()}
                </div>
            )}
            <br />
            <button className='getBtn' onClick={handleGetRequest}>Send GET Request</button>
            {getResponse && (
                <div>
                    <h2 className='subHead'>GET Response:</h2>
                    <pre style={{background:'#ffeedd', width:'380px', height:'50px', borderRadius:'10px', padding:'10px'}}>{JSON.stringify(getResponse, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default ApiComponent;
