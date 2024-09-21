import React, { useEffect, useState } from 'react';
import { fetchPolygonInfo } from '../services/fetchPolygonInfo';

interface Polygon {
    name: string;
    paths: number[][];
}

interface PolygonInfo {
    name: string;
    pricePerSquareMeter: string;
}

interface InfoComponentProps {
    selectedPolygon: Polygon | null;
}

const InfoComponent: React.FC<InfoComponentProps> = ({ selectedPolygon }) => {
    const [polygonInfo, setPolygonInfo] = useState<PolygonInfo | null>(null);

    useEffect(() => {
        if (selectedPolygon) {
            fetchPolygonInfo(selectedPolygon.name)
                .then(data => setPolygonInfo(data))
                .catch(error => console.error('Error fetching polygon info:', error));
        } else {
            setPolygonInfo(null);
        }
    }, [selectedPolygon]);

    return (
        <div style={{ width: '30vw', minHeight: '80vh', padding: '10px', boxSizing: 'border-box' }}>
            {selectedPolygon ? (
                <>
                    <h2>{selectedPolygon.name}</h2>
                    <div>
                        {/*<p>Polygon Name: {selectedPolygon.name}</p>*/}
                        {polygonInfo && (
                            <>
                                <p>평단가: {polygonInfo.pricePerSquareMeter}</p>
                            </>
                        )}
                    </div>
                </>
            ) : (
                <h2>보고 싶은 지역을 선택해주세요</h2>
            )}
        </div>
    );
};

export default InfoComponent;
