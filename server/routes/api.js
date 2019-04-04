const express = require('express')
const request = require('request')
const router = express.Router()

const checkIngredients = function (inputArray, expected) {
    for(let item of expected)
        if(!inputArray.includes(item)) {
            return false
        }
    return true
}

const filterByIngredients = function (recipes, ingredients) {
    let iList = ingredients.split(",")
    return recipes.filter(r => checkIngredients(r.ingredients, iList))
}

router.get("/sanity", function (req, res) {
    res.send("OK")
})

router.get("/recipes/:food", function (req, res) {
    let ingredientsQuery = ""
    if(req.query.ingredientList) {ingredientsQuery += `i=${req.query.ingredientList}&`
    }
    request(`http://www.recipepuppy.com/api/?${ingredientsQuery}q=${req.params.food}`, function (error, data, body) {
        let recipes = JSON.parse(data.body).results
        let recipeList = recipes.map(r => { return {
            title: r.title,
            link: r.href,
            thumbnail: r.thumbnail,
            ingredients: r.ingredients.split(", ")
        }})
        let toClient
        if(req.query.ingredientList) {
            toClient = filterByIngredients(recipeList, req.query.ingredientList)
        }
        else {
            toClient = recipeList
        }
        console.log(toClient)
        res.send(toClient)
    })
})

module.exports = router