import React, { useEffect, useState } from 'react';
import {Circle, DirectionsRenderer, GoogleMap, LoadScript, Marker} from '@react-google-maps/api';
import RadiusControl from "../Radius";
import TravelPlan from "../TravelPlan";
import TagSelection from "../PlaceTypeSelect";
import './MapPage.css';
import {fetchPlacesNearby, generatePlaceDirections} from "./utils";
import Header from "../Header";


const containerStyle = {
    width: '100%',
    height: '400px',
};

const MapPage = () => {
    const [map, setMap] = useState(null);
    const [points, setPoints] = useState([]);
    const [types, setTypes] = useState(null);
    const [userLocation, setUserLocation] = useState(null);
    const [directions, setDirections] = useState([]);
    const [radius, setRadius] = useState(500);
    const [foundPlaces, setFoundPlaces] = useState([]);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation({ lat: latitude, lng: longitude });
                },
                (error) => {
                    console.log('Помилка геолокації:', error);
                }
            );
        } else {
            console.log('Геолокація не підтримується браузером');
        }
    }, []);

    const handlePointClick = (event) => {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();
        setPoints([...points, { lat, lng }]);
    };

    const handleMarkerDelete = (index) => {
        const updatedPoints = [...points];
        updatedPoints.splice(index, 1);
        setPoints(updatedPoints);
    };

    const handleDeleteAllMarkers = () => {
        setPoints([]);
        setFoundPlaces([])
        setTypes(null);
        setDirections([]);
    };

    const handlePlanGeneration = () => {
        if (points.length < 2) {
            console.log('Необхідно вибрати щонайменше дві точки');
            return;
        }

        const generateRoutes = async () => {
            const generatedDirections = [];
            const places = [{geometry: {location: points[0]}, }];

             for (let i = 0; i < points.length; i++) {
                const origin = points[i];

                if (i !== 0) {
                    const response = await fetchPlacesNearby(origin, radius, types);
                    if (response) {
                        places.push(...response);
                    }
                }
            }
             const foundPlacesCoords = places.map((place) => place.geometry.location);
             setPoints([points[0]]);

            setFoundPlaces(foundPlacesCoords.flat());

            const placeDirections = await generatePlaceDirections(places);
            if (placeDirections) {
                generatedDirections.push(...placeDirections);
            }

            setDirections(generatedDirections);
        };

        generateRoutes();
    };

    const handleMapLoad = (map) => {
        setMap(map);

        if (userLocation) {
            map.setCenter(userLocation);
            map.setZoom(12);
        }
    };

    return (
        <div>
            <Header />
            <h2>Оберіть точки на карті</h2>
            <div className="settings">
                <RadiusControl radius={radius} setRadius={setRadius} />
                <TagSelection onChange={setTypes}/>
            </div>
            <LoadScript googleMapsApiKey={process.env.MAP_KEY}>
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={userLocation || { lat: 0, lng: 0 }}
                    zoom={userLocation ? 12 : 2}
                    onClick={handlePointClick}
                    onLoad={handleMapLoad}
                >
                    {points[0] && <Marker
                        position={points[0]}
                    />}
                    {points.slice(1).map(({ lat, lng }, index) => (
                        <Circle
                            key={index}
                            center={{ lat, lng }}
                            radius={Number(radius)}
                            options={{
                                strokeColor: "#FF0000",
                                strokeOpacity: 0.8,
                                strokeWeight: 2,
                                fillColor: "#FF0000",
                                fillOpacity: 0.35,
                            }}
                            onClick={() => handleMarkerDelete(index + 1)} />
                    ))}
                    {foundPlaces.map((place, index) => (
                        <Marker
                            key={index}
                            position={place}
                        />
                    ))}
                    {directions.map((direction, index) => (
                        <DirectionsRenderer
                            key={index}
                            directions={direction}
                            options={{
                                suppressMarkers: true,
                            }}
                        />
                    ))}
                </GoogleMap>
            </LoadScript>
            <div className="buttons">
                {points.length > 1 && (
                    <button className="button" onClick={handlePlanGeneration}>Згенерувати план</button>
                )}
                {points.length > 0 && (
                    <button className="button removeButton" onClick={handleDeleteAllMarkers}>Очистити</button>
                )}
            </div>
            <TravelPlan directions={directions}/>
        </div>
    );
};

export default MapPage;
