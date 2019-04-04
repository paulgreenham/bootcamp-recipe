const render = new Renderer

const getRecipe = function (food) {
    $.get(`./recipes/${food}`, function (response) {
        render.displayRecipes(response)
    })
}

$("button").on("click", function () {
    getRecipe($("#food-search").val())
})