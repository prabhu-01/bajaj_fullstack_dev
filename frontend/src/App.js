import React, { useState, useEffect } from 'react';
import ApiComponent from './ApiComponent';

function App() {
    useEffect(() => {
        document.title = "21BCE3796";
    }, []);

    return (
        <div className="App">
            <ApiComponent />
        </div>
    );
}

export default App;
