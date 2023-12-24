export const fetchPlacesNearby = async (location, radius, placeType) => {
    const params = {
        location: [location.lat, location.lng],
        radius,
        query: placeType
    }
    const query = JSON.stringify(params);
    const response = await fetch(`${process.env.SERVER_URL}/nearbySearch?data=${query}`, {
        mode: 'cors',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    if (response.ok) {
        return response.json();
    } else {
        console.log('Помилка отримання списку місць:', response.status);
        return null;
    }
};

export const calculateRoute = async (origin, destination) => {
    const directionsService = new window.google.maps.DirectionsService();

    return new Promise((resolve) => {
        directionsService.route(
            {
                origin,
                destination,
                travelMode: window.google.maps.TravelMode.TRANSIT,
                transitOptions: {
                    modes: [
                        window.google.maps.TransitMode.SUBWAY,
                        window.google.maps.TransitMode.BUS,
                    ],
                },
            },
            (result, status) => {
                if (status === window.google.maps.DirectionsStatus.OK) {
                    resolve(result);
                } else {
                    console.log('Помилка генерації маршруту:', status);
                    resolve(null);
                }
            }
        );
    });
};

export const generatePlaceDirections = async (places) => {
    const generatedDirections = [];

    for (let i = 0; i < places.length - 1; i++) {
        const origin = places[i].geometry.location;
        const destination = places[i + 1].geometry.location;

        const direction = await calculateRoute(origin, destination);
        if (direction) {
            direction.placeName = places[i + 1].name;
            generatedDirections.push(direction);
        }
    }

    return generatedDirections;
};