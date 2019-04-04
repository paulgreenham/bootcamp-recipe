const express = require('express')
const request = require('request')
const router = express.Router()


router.get("/sanity", function (req, res) {
    res.send("OK")
})

router.get("/recipes/:food", function (req, res) {
    let ingredientsQuery = ""
    if(req.query.ingredientList) {ingredientsQuery += `i=${req.query.ingredientList}&`
    }
    request(`http://www.recipepuppy.com/api/?${ingredientsQuery}q=${req.params.food}`, function (error, data, body) {
        let recipes = JSON.parse(data.body).results
        let toClient = recipes.map(r => { return {
            title: r.title,
            link: r.href,
            thumbnail: r.thumbnail,
            ingredients: r.ingredients.split(", ")
        }})
        console.log(toClient)
        res.send(toClient)
    })
})

module.exports = router