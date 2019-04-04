const render = new Renderer

const getRecipe = function (food) {
    $.get(`./recipes/${food}`, function (response) {
        render.displayRecipes(response)
    })
}

$("button").on("click", function () {
    getRecipe($("#food-search").val())
})

$("#results-container").on("click", "img", function () {
    console.log($(this).closest(".recipe").find("li:first-child").text())
})