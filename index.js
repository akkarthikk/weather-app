import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import moment from "moment-timezone";
import env from "dotenv";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
env.config()

const datew = new Date();
const dateString = datew.toString();
const date = dateString.substring(0, 10);
console.log(date);
const key = process.env.KEY;

app.get("/", async (req, res) => {
    
    res.render("loc.ejs");
});




app.get("/get", async (req, res) => {
    const city = req.query.city;

    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`);
        const result = response.data;

        const tempCelsius = Celsius(result.main.temp);
        const temp_Min = Celsius(result.main.temp_min);
        const temp_Max = Celsius(result.main.temp_max);
        const feel = Celsius(result.main.feels_like);
        const humidity = result.main.humidity;
        const iconcode = result.weather[0].icon;
        const sunrise = convertToIST(result.sys.sunrise);
        const sunset = convertToIST(result.sys.sunset);
        const src = `http://openweathermap.org/img/w/${iconcode}.png`;

        res.render("index.ejs", {
            date,
            location: result.name,
            temperature: tempCelsius,
            min: temp_Min,
            max: temp_Max,
            feel,
            humidity,
            description: result.weather[0].main,
            iconcode: src,
            sunrise:sunrise,
            sunset,
            errorMessage: null
        });

    } catch (error) {
        let errorMessage;

        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            errorMessage = `Error: ${error.response.data.message}`;
        } else if (error.request) {
            console.log(error.request);
            errorMessage = "Error: No response received from API";
        } else {
            console.log('Error', error.message);
            errorMessage = `Error: ${error.message}`;
        }

        res.render("index.ejs", {
            date: null,
            location: null,
            temperature: null,
            min: null,
            max: null,
            feel: null,
            humidity: null,
            description: null,
            iconcode: null,
            sunrise: null,
            sunset: null,
            errorMessage: errorMessage
        });
    }
});

const Celsius = (kelvin) => {
    return (kelvin - 273.15).toFixed(0);
};

const convertToIST = (timestamp) => {
    return moment.unix(timestamp).tz('Asia/Kolkata').format('hh:mm A');
};

app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
});