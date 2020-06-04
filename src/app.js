const path = require("path")
const express = require("express")
const hbs = require('hbs')
const geocoding = require("./utils/geocode.js")
const forecast = require("./utils/forecast.js")

const app = express()

//Define paths for Express config
const publicdir = path.join(__dirname,"../public")
const viewpath = path.join(__dirname, '../templates/views')
const partialpath = path.join(__dirname, '../templates/partials')

//Setup handlers for engine and views location
app.set('view engine', 'hbs')
app.set('views', viewpath)
hbs.registerPartials(partialpath)

//Setup static directory to serve
app.use(express.static(publicdir))

app.get('', (req,res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Sai Kiran Dhulipalla'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About',
        name: 'Sai Kiran Dhulipalla'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help',
        name: "Sai Kiran Dhulipalla"
    })
})

app.get('/weather', (req,res) => {
    if (!req.query.address){
        return res.send({
            error: "You need to provide location address"
        })
    }
    
    const address = req.query.address

    geocoding(address, (error, {latitude,longitude,location}={}) => {
        if (error) {
            return res.send({error})
        } 
    
        forecast(latitude,longitude,(error,{temperature, humidity, summary}={}) =>{
            if (error) {
                return res.send({error})
            }
            res.send({
                temperature,
                humidity,
                summary,
                location,
                address
            }) 
        })
    })
})

app.get('/products', (req,res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) => {
    res.send("Help article not found")
})

app.get('*', (req,res)=>{
    res.send("We haven't found the page you have requested")
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})