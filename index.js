import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const datew = new Date();
const dateString = datew.toString();
const date = dateString.substring(0, 10);
console.log(date);
const url = "https://api.openweathermap.org/data/2.5/weather?q=delhi&appid=";
const key = "67baa2a7c1b6bff9cf8911d9ac60abd4";



app.get("/", async (req, res) => {
    const response = await axios.get(url + key);
    const result = response.data;
    console.log(result);
    const tempCelsius = Celsius(result.main.temp);
    const temp_Min = Celsius(result.main.temp_min);
    const temp_Max = Celsius(result.main.temp_max);
    const feel = Celsius(result.main.feels_like);
    const humidity = result.main.humidity;
    res.render("index.ejs",
        { date: date, location: result.name, temperature: tempCelsius, min: temp_Min, max: temp_Max, feel: feel, humidity: humidity });
});

const Celsius = (kelvin) => {
    return (kelvin - 273.15).toFixed(0);
};


app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
});