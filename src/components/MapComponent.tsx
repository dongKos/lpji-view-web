import React, { useEffect, useState, useCallback } from 'react';
import Polygon from './Polygon';
import { districts } from '../constants/seoulDistrict';

interface MapComponentProps {
    onPolygonClick: (polygon: any) => void;
}

const MapComponent: React.FC<MapComponentProps> = ({ onPolygonClick }) => {
    const [map, setMap] = useState<any>(null);

    useEffect(() => {
        const { naver } = window as any;
        if (naver) {
            const mapOptions = {
                zoom: 12,
            };
            const mapInstance = new naver.maps.Map('map', mapOptions);
            setMap(mapInstance);

            // Add zoom_changed event listener
            naver.maps.Event.addListener(mapInstance, 'zoom_changed', () => {
                const zoomLevel = mapInstance.getZoom();
                console.log('Zoom level changed to:', zoomLevel);
                // Handle zoom in/out event here
            });
        }
    }, []);

    const handlePolygonClick = useCallback((polygon: any) => {
        onPolygonClick(polygon);
    }, [onPolygonClick]);

    return (
        <div id="map" style={{ width: '70vw', minHeight: '80vh' }}>
            {map && (
                <>
                    <Polygon map={map} districts={districts} onClick={handlePolygonClick} />
                </>
            )}
        </div>
    );
};

export default MapComponent;
