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
    const city = "Uppal";
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=` + key);
    const result = response.data;
    console.log(result);
    const tempCelsius = Celsius(result.main.temp);
    const temp_Min = Celsius(result.main.temp_min);
    const temp_Max = Celsius(result.main.temp_max);
    const feel = Celsius(result.main.feels_like);
    const humidity = result.main.humidity;
    const iconcode = result.weather[0].icon;
    const sunrise = convertToIST(result.sys.sunrise);
    const sunset = convertToIST(result.sys.sunset);
    const src = `http://openweathermap.org/img/w/${iconcode}.png`;


    res.render("index.ejs",
        {
            date: date,
            location: result.name,
            temperature: tempCelsius,
            min: temp_Min,
            max: temp_Max,
            feel: feel,
            humidity: humidity,
            description: result.weather[0].main,
            iconcode: src,
            sunrise: sunrise,
            sunset:sunset
        });
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