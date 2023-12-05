export const fetchWeatherData = async (latitude, longitude)=>{
    const Current_Options= ["temperature_2m","relative_humidity_2m","apparent_temperature",
        "is_day","wind_speed_10m","precipitation","weather_code","rain","snowfall"]
    // const Hourly_Options = ["temperature_2m","relative_humidity_2m","wind_speed_10m"]
    const Daily_Options = ["temperature_2m_max","temperature_2m_min","uv_index_max","wind_speed_10m_max","rain_sum"]

    const API_Current_URL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=${Current_Options.toString()}&daily=${Daily_Options.toString()}&timezone=auto`

    try {
        const Response = await fetch(API_Current_URL)
        const {current , daily} = await Response.json()
        const structuredDaily  = await daily.time.map((day, index) => ({
            day: day,
            temp_min: daily.temperature_2m_min[index],
            temp_max: daily.temperature_2m_max[index],
            UV: daily.uv_index_max[index],
            WindSpeed : daily.wind_speed_10m_max[index],
            Rain:daily.rain_sum[index]
        }));
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
        return  results.map(location => [location.formatted_address, location.geometry, location.place_id])
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}
export function LocationExists (location){
    if(localStorage.getItem("locations")?.includes(location[2])) return true
}
