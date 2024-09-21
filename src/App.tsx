import React, { useState } from 'react';
import './App.css';
import MapComponent from './components/MapComponent';
import InfoComponent from './components/InfoComponent';

function App() {
    const [selectedPolygon, setSelectedPolygon] = useState(null);

    return (
            <div className="App">
                <header className="App-header">
                    <h1>입지뷰</h1>
                </header>
                <div style={{display: 'flex', width: '100vw', minHeight: '80vh'}}>
                    <MapComponent onPolygonClick={setSelectedPolygon}/>
                    <InfoComponent selectedPolygon={selectedPolygon}/>
                </div>
                <div>
                    <p>Powered By Dongko</p>
                </div>
            </div>
    );
}

export default App;
