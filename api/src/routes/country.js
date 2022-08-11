const { Router } = require('express');
const axios = require('axios');
const {Country, TouristActivity, Op} = require ('../db.js');

const router = Router();

//Get Data
const getCountries = async ()=>{
    const results = await axios.get('https://restcountries.com/v3/all')
    const orderResults = await results.data.map(coun => {
        const country = {
            id: coun.cca3,
            name: coun.name.official,
            flagimg: coun.flags[0],
            continent: coun.region,
            capital:  coun.capital != null ? coun.capital[0] : "No data",
            subregion:coun.subregion,
            area: coun.area,
            population: coun.population
        }
        return country
    })
    return orderResults 
}
//send data to db

const countryDb = async ()=>{
    try {
        const verifyDb = await Country.findAll()
        if (verifyDb.length == 0){
            const getData = await getCountries()
            await Country.bulkCreate(getData)
        }
    } catch (e) {
        console.log(e)
    }
}

const loadCoun = async () => {await countryDb()}

//load db
loadCoun()

router.get('/countries', async (req,res) =>{
    const {name} = req.query
    try {
        if(!name){
            const countries = await Country.findAll({
                include: [{
                    model: TouristActivity,
                    attributes: ['name', 'difficulty', 'duration', 'season'],
                    through: {attributes:[]}
                }]
            })
            if(countries.length){
                return res.status(200).json(countries)
            }else{
                return res.status(404).send('Countries not Found :c')
            }
        }else{
            const country = await Country.findAll({
                where: {
                    name: {[Op.substring]: name}
                },
                include : [{
                    model: TouristActivity,
                    attributes:  ['name', 'difficulty', 'duration', 'season'],
                    through: {attributes:[]}
                }]
            })
            console.log(country)
            if (country.length){
                return res.status(200).json(country)
            }else{
                return res.status(404).send('Country not Found :c')
            }
        }
    } catch (e) {
        console.log(e)
    }
})
//get by id

router.get('/countries/:idPais', async (req,res)=>{
    const {idPais} = req.params

    try {
        const country = await Country.findAll({
            where: {
                id: idPais.toUpperCase()
            },
            include:[{
                model: TouristActivity,
                attributes: ['name', 'difficulty', 'duration', 'season'],
                through: {attributes:[]}
            }]
        })
        if(country){
            return res.status(200).json(country)
        }else{
            return res.status(404).send('Country not Found :c')
        }

    } catch (e) {
        console.log(e)
    }
})


module.exports = router