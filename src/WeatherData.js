import {da} from "date-fns/locale";


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

export const fetchWeatherData_test = async (latitude,longitude)=>{
    const Current_Options= ["temperature_2m","relative_humidity_2m","apparent_temperature",
        "is_day","wind_speed_10m","precipitation","weather_code","rain","snowfall"]
    // const Hourly_Options = ["temperature_2m","relative_humidity_2m","wind_speed_10m"]
    const Daily_Options = ["temperature_2m_max","temperature_2m_min","uv_index_max","wind_speed_10m_max"]

    const API_Current_URL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=${Current_Options.toString()}&daily=${Daily_Options.toString()}&timezone=auto`

    try {
        const Response = await fetch(API_Current_URL)
        const {current , daily} = await Response.json()
        const structuredDaily  = await daily.time.map((day, index) => ({
            day: day,
            temp_min: daily.temperature_2m_min[index],
            temp_max: daily.temperature_2m_max[index],
            UV: daily.uv_index_max[index],
            WindSpeed : daily.wind_speed_10m_max[index]
        }));
        console.log(structuredDaily)
        return {current,structuredDaily}
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}
export const Geocode = async (location = null , latitude= null , longitude= null) => {
    const URL_Reverse=`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&result_type=administrative_area_level_2&key=AIzaSyDI-xKHA0zQeocy4i3KPrefgGXxk-KRJcI`
    const URL = `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=AIzaSyDI-xKHA0zQeocy4i3KPrefgGXxk-KRJcI`
    try {
        const response = await fetch(location?  URL : URL_Reverse);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const {results} = await response.json();
        console.log(results)
        return  results.map(location => [location.formatted_address, location.geometry, location.place_id])
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}
export function LocationExists (location){
    if(localStorage.getItem("locations").includes(location[2])) return true
}
