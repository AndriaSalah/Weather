export const Fetch5DayData = async (latitude, longitude) => {
    const API_FiveDays_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=8f77413630a5f60477dbc3bde0290b4b&units=metric`
    try {
        const response = await fetch(API_FiveDays_URL);
        if (!response.ok) {
            console.error("Response not ok")
        }
        const {list} = await response.json();
        return  list.reduce((result, entry) => {
            // Extracting the date without the time
            const date = entry.dt_txt.split(' ')[0];
            // Check if the date already exists in the result object
            if (!result[date]) result[date] = []; // If not, create an object with a 'data' array for that index

            // Push the entry to the corresponding index's data array
            result[date].push({
                name: entry.dt_txt, // assuming dt_txt is the x-axis value
                temperature: entry.main.temp // main.temp is the y-axis value
            });
            return result;
        }, {});

    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}
export const FetchCurrentWeatherData = async (latitude, longitude)=>{
    const API_Current_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=8f77413630a5f60477dbc3bde0290b4b&units=metric`
    try {
        const Response = await fetch(API_Current_URL)
        const {main, name, weather, wind} = await Response.json()
        return {main, name, weather, wind}
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }

}
export const GeocodeLocation = async (location) => {
    const link = `https://geocode.maps.co/search?q={${location}}`
    const test = `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=AIzaSyDI-xKHA0zQeocy4i3KPrefgGXxk-KRJcI`
    try {
        const response = await fetch(test);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
       return response.json();

    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}