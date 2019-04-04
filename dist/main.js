const render = new Renderer

const removeSpaces = function (str) {
    let words = str.split(" ")
    let newStr = ""
    for(let word of words) {
        newStr += word
    }
    return newStr
}

const getRecipe = function (food, ingredients) {
    $.get(`./recipes/${food}?ingredientList=${removeSpaces(ingredients)}`, function (response) {
        render.displayRecipes(response)
    })
}

$("button").on("click", function () {
    getRecipe($("#food-search").val(), $("#ingredient-search").val())
})

$("#results-container").on("click", "img", function () {
    console.log($(this).closest(".recipe").find("li:first-child").text())
})