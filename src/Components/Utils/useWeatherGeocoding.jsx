
import {fetchWeatherData, LocationExists} from "./WeatherData.js";

export const UseWeatherGeocoding = (setIsDay, setLocationIndex, setDialogText, setSavedLocations , LocationSelectionDialog,updates) => {
    return (location,newFetch= true) => {
        return new Promise((resolve, reject) => {
            if (newFetch) {
                if (!LocationExists(location)) {
                    setSavedLocations(prev => [location,...prev])
                    setLocationIndex(0)
                    setDialogText("please wait while we're fetching the data ")
                } else {
                    setDialogText("location exists")
                    LocationSelectionDialog.current.closeDialog()
                    updates.current.openDialog()
                    setTimeout(() => updates.current.closeDialog(), 2000)
                    reject(new Error("Location already exists"));
                }
            }
            const latitude = location[1].location.lat
            const longitude = location[1].location.lng
            LocationSelectionDialog.current.closeDialog()
            updates.current.openDialog()
            fetchWeatherData(latitude, longitude)
                .then(({current, structuredDaily}) => {
                    setIsDay(current.is_day === 1)
                    resolve({current, structuredDaily});
                    updates.current.closeDialog()
                })
                .catch((error) => {
                    setDialogText("Error fetching weather data");
                    reject(new Error(error));
                });
        })

    }

};

export default UseWeatherGeocoding;