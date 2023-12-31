import {fetchWeatherData, Geocode, LocationExists} from "./WeatherData.js";

const useWeatherGeolocation = (setLocationIndex, setDialogText, setSavedLocations) => {


    return () => {
        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const latitude = position.coords.latitude;
                        const longitude = position.coords.longitude;

                        Geocode(null, latitude, longitude)
                            .then(([result]) => {
                                if (!LocationExists(result)) {
                                    setSavedLocations(prev => [result,...prev])
                                    fetchWeatherData(latitude, longitude)
                                        .then(({current, structuredDaily}) => {
                                            setLocationIndex(0);
                                            resolve({current, structuredDaily});
                                        });
                                } else {
                                    setDialogText("Location already exists");
                                    reject(new Error("Location already exists"));
                                }
                            })
                            .catch((error) => {
                                setDialogText("Error fetching weather data");
                                reject(error);
                            });
                    },
                    (error) => {
                        setDialogText("Error getting geolocation");
                        reject(error);
                    }
                );
            } else {
                setDialogText("Geolocation not supported");
                reject(new Error("Geolocation not supported"));
            }
        });
    };
};

export default useWeatherGeolocation;
