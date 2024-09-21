import React, {useEffect, useState} from "react";
import {fetchPolygonPrices} from "../services/fetchPolygonPrices";
import {getRandomColor, darkenColor} from '../utils/colorUtils';
import {getPolygonCenter} from "../utils/coordinateUtils";
import {PolygonPrice} from "../services/fetchPolygonPrices";

interface PolygonProps {
    map: any;
    districts: { name: string; paths: number[][] }[];
    onClick: (polygon: any) => void;
}

const Polygon: React.FC<PolygonProps> = ({map, districts, onClick}) => {
    const [polygonPrices, setPolygonPrices] = useState<{ [key: string]: number }>({});

    useEffect(() => {
        const names = districts.map(district => district.name);
        fetchPolygonPrices(names)
            .then(data => {
                const prices = data.reduce((acc: { [key: string]: number }, item: PolygonPrice) => {
                    acc[item.name] = item.pricePerSquareMeter;
                    return acc;
                }, {});
                setPolygonPrices(prices);
            })
            .catch(error => console.error('Error fetching polygon prices:', error));
    }, [districts]);

    useEffect(() => {
        const {naver} = window as any;
        if (naver && map) {
            districts.forEach(district => {
                const fillColor = getRandomColor();
                const strokeColor = darkenColor(fillColor, -30);

                const polygon = new naver.maps.Polygon({
                    map: map,
                    paths: district.paths.map(coordinates => new naver.maps.LatLng(coordinates[1], coordinates[0])),
                    fillColor: fillColor,
                    fillOpacity: 0.5,
                    strokeColor: strokeColor,
                    strokeWeight: 2,
                    clickable: true,
                });

                const overlayInfoWindow = new naver.maps.InfoWindow({
                    content: `<div style="padding:10px; border: 1px solid ${strokeColor}; background-color: ${fillColor};">${district.name}</div>`,
                });

                naver.maps.Event.addListener(polygon, 'mousemove', (e: any) => {
                    overlayInfoWindow.setPosition(e.coord);
                    overlayInfoWindow.open(map);
                });

                naver.maps.Event.addListener(polygon, 'mouseout', () => {
                    overlayInfoWindow.close();
                });

                naver.maps.Event.addListener(polygon, 'click', () => {
                    onClick(district);
                });

                // Add text label with fetched price
                const center = getPolygonCenter(district.paths);
                const price = polygonPrices[district.name] || 'N/A';
                const marker = new naver.maps.Marker({
                    position: center,
                    map: map,
                    icon: {
                        content: `<div style="color: black; background: ${fillColor}; padding: 10px; border: 1px solid ${strokeColor}; border-radius: 50%; text-align: center;">${price}</div>`,
                        anchor: new naver.maps.Point(12, 12),
                    },
                });

                naver.maps.Event.addListener(marker, 'mouseover', (e: any) => {
                    overlayInfoWindow.setPosition(e.coord);
                    overlayInfoWindow.open(map, marker);
                });

                naver.maps.Event.addListener(marker, 'mouseout', () => {
                    overlayInfoWindow.close();
                });
            });
        }
    }, [map, districts, onClick, polygonPrices]);

    return null;
};

export default Polygon;
