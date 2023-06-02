// Key: iYmE9BRLFrzHnUsE1E9ecPTC9LsO3ulq
// Key2: LrtAsnlhQVp0M77qZ3HY6beRGyxoIGx5
// Key3: HSu9CIAHVzfYdqjf2ffsJqRXhqy8AAGi

const apiKey = "iYmE9BRLFrzHnUsE1E9ecPTC9LsO3ulq";
let trailDate;
let currentDate = new Date()

//Works, if I don't call it on useEffect (resp. it partly works)
export function getWeather2Hours(lat, lon, trail){
    console.log(trail.name)
    trailDate = new Date("" + trail.date);

    const locationUrl = `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${apiKey}&q=${lat}%2C${lon}`;

    fetch(locationUrl)
    .then(res => res.json())
    .then(data => {
        const locationKey = data.Key;
        return getWeather(locationKey);
    })
    .catch(error => console.log(error + "HAHAHAH"))
}

function getWeather(locationKey){
    var timeDiff = Math.abs(trailDate.getTime() - currentDate.getTime());
	var diffHours = Math.ceil(timeDiff / (1000 * 3600)); 
    var subractor = 0;
    var subractor2 = 0;

    let weatherUrl;

    if(diffHours >= 120){
        return "Weather not predictable"
    }else if(diffHours >= 12){
        weatherUrl = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${apiKey}`
        subractor = Math.ceil(diffHours/24) - 1
        subractor2 = subractor
        //RIESEN BAUSTELLE
    }else if(diffHours >= 0){
        weatherUrl = `http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/${locationKey}?apikey=${apiKey}`
        subractor = diffHours
        if(subractor > 9){
            subractor2 = subractor
        }else{
            subractor2 = subractor + 2
        }
    }else{
        return "Date is expired"
    }
    //`http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/${locationKey}?apikey=${apiKey}`;

    fetch(weatherUrl)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        let weatherInfos;

        if(typeof data.DailyForecasts !== "undefined"){
            weatherInfos = {
                atTime: data.DailyForecasts[subractor],
                timeLater: data.DailyForecasts[subractor2]
            };
        }else{
            weatherInfos = {
                atTime: data[subractor],
                timeLater: data[subractor2]
            };
        }


        console.log(weatherInfos)
        return weatherInfos;
    })
    .catch(error => console.log(error))
}