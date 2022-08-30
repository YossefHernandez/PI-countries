const { Router } = require('express');
//const {axios} = require ('axios');
const {Country, TouristActivity} = require('../db.js');
const router = Router();

router.post('/touristActivity', async(req,res)=>{
    const {name, difficulty,duration ,season, countryId} = req.body

    if(!name||!difficulty||!duration||!season||!countryId){
        return res.status(400).send("Please fill all fields")
    }

    try {
        const newActivity = await TouristActivity.create({
            name,
            difficulty,
            duration,
            season,
            countryId
        })
        res.status(200).json(newActivity)

        const getId = await TouristActivity.findAll({
            where: {name: name}
        })

        for (let i = 0; i < countryId.length; i++) {
            const country = await Country.findByPk(countryId[i]);
            await country.addTouristActivity(getId[0].dataValues.id)
        }

    } catch (e) {
        console.log(e)
    }
})

router.get('/touristActivity', async (req,res)=>{
    const activities = await TouristActivity.findAll()
    if(activities.length){
        res.status(200).json(activities)
    }else{
        res.status(404).json('Non-existent activities')
    }
})

// router.delete('/touristActivity/:name', async (req, res)=>{
//     const {name} = req.params
    
//     try {
//         TouristActivity.destroy({
//             where: {
//                 name: name
//             }
//         })
//         res.send("Actividad borrada :D")
//     } catch (e) {
//         console.log(e)
//     }
// })
module.exports = router