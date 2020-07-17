export function handleSubmit (event) {
    event.preventDefault()
    let tripSection = document.querySelector('#trip-section');
    let newTrip = document.createElement('div');
        newTrip.setAttribute('class', 'trip-div');
        newTrip.setAttribute('id', `trip-div-${tripID}`)
        tripSection.appendChild(newTrip);
    
    let newTripSlide = document.createElement('div');
        newTripSlide.setAttribute('class', 'slide-show');
        newTrip.appendChild(newTripSlide);

    const cityName = document.querySelector('#cityName').value;
    const leaveDay = document.querySelector('#leaveDay').value;
    const returnDay = document.querySelector('#returnDay').value;
    let leaveParts = leaveDay.split('-');
    let returnParts = returnDay.split('-');
    let todayDate = new Date()
    let leaveDate = new Date(leaveParts[0], leaveParts[1] - 1, leaveParts[2]);
    let returnDate = new Date(returnParts[0], returnParts[1] - 1, returnParts[2]);
    let tripLength = (returnDate - leaveDate) / (1000 * 3600 * 24);
    let countdown = (leaveDate - todayDate) / (1000 * 3600 * 24);    
    let tripInfo = document.createElement('div');
        tripInfo.setAttribute('class', 'trip-info');
        newTrip.appendChild(tripInfo);

    getAPI(`http://api.geonames.org/searchJSON?q=${cityName}&maxRows=10&username=${apiList[1]}`).then((geoData) => {
        let latInfo = geoData.geonames[0].lat;
        let longInfo = geoData.geonames[0].lng;
        let countryInfo = geoData.geonames[0].countryName;
        let cityTitle = document.createElement('div');
            cityTitle.setAttribute('class', 'city-title');
            cityTitle.innerHTML = `My trip to: ${cityName}, ${countryInfo}`;
            tripInfo.appendChild(cityTitle);
        let tripDates = document.createElement('div');
            tripDates.setAttribute('class', 'trip-dates');
            tripDates.innerHTML = `Departing in: ${Math.round(countdown)} day(s) on ${leaveDay}`;
            tripInfo.appendChild(tripDates);

        
        getAPI (`https://api.weatherbit.io/v2.0/forecast/daily?lat=${latInfo}&lon=${longInfo}&units=i&key=${apiList[0]}`).then((weatherData) => {
            let forecastDesc = weatherData.data[0].weather.description;
            let forecastHigh = weatherData.data[0].high_temp;
            let forecastLow = weatherData.data[0].low_temp;
            let forecastDescM = weatherData.data[Math.round(countdown)].weather.description;
            let forecastHighM = weatherData.data[Math.round(countdown)].high_temp;
            let forecastLowM = weatherData.data[Math.round(countdown)].low_temp;
            let forecastDescL = weatherData.data[15].weather.description;
            let forecastHighL = weatherData.data[15].high_temp;
            let forecastLowL = weatherData.data[15].low_temp;
            let weatherInfo = document.createElement('div');
                weatherInfo.setAttribute('class', 'trip-weather');
                weatherInfo.innerHTML = ('Typical weather for then is:')
                tripInfo.appendChild(weatherInfo);
            let weatherInfo2 = document.createElement('div');
            let weatherInfo3 = document.createElement('div');
                weatherInfo2.setAttribute('class', 'trip-weather-2'); 
                weatherInfo3.setAttribute('class', 'trip-weather-2');
                if (countdown <= 7) {
                    weatherInfo2.innerHTML = (`High: ${forecastHigh} Low: ${forecastLow}`);
                    weatherInfo3.innerHTML = (forecastDesc);
                } else if (countdown <= 16) {
                    weatherInfo2.innerHTML = (`High: ${forecastHighM} Low: ${forecastLowM}`);
                    weatherInfo3.innerHTML = (forecastDescM);
                } else {
                    weatherInfo2.innerHTML = (`High: ${forecastHighL} Low: ${forecastLowL}`);
                    weatherInfo3.innerHTML = (forecastDescL);
                }
                tripInfo.appendChild(weatherInfo2);
                tripInfo.appendChild(weatherInfo3);
        })
        getAPI(`https://pixabay.com/api/?key=${apiList[2]}&q=${cityName}&image_type=photo`).then((pictureData) => {
            let slideNumber = pictureData.hits.length;
            if (slideNumber < 1) {
                getAPI(`https://pixabay.com/api/?key=${apiList[2]}&q=${countryInfo}&image_type=photo`).then((pictureData) => {
                    img.style.display = "block";
                    img.src = pictureData.hits[0].largeImageURL;
                });
            } else {
                for (let i = 0; i < slideNumber; i++) {
                    let imgNode = document.createElement('img');
                    imgNode.setAttribute('class', 'slide-pic');
                    imgNode.src = pictureData.hits[i].largeImageURL;
                    newTripSlide.appendChild(imgNode);
                    if (i == 0) {
                        imgNode.style.display = 'block';
                    }
                    picPositionArray[tripID-1] = 0;
                }
            }
        });
    });
    let tripSlideLeft = document.createElement('button');
        tripSlideLeft.setAttribute('class', 'slide-button slide-left');
        tripSlideLeft.innerHTML = '&#10094;';
        tripSlideLeft.onclick = function() {
            Client.picSlide(this, -1)
        };
        newTripSlide.appendChild(tripSlideLeft);
    
    let tripSlideRight = document.createElement('button');
        tripSlideRight.setAttribute('class', 'slide-button slide-right');
        tripSlideRight.innerHTML = '&#10095;';
        tripSlideRight.onclick = function() {
            Client.picSlide(this, 1)
        };
        newTripSlide.appendChild(tripSlideRight);
    tripID++;
    document.querySelector('.new-trip-form').style.display = 'none';
    document.querySelector('.new-trip-form').reset();
};

