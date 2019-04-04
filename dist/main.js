

const getRecipe = function (food) {
    $.get(`./recipes/${food}`, function (response) {
        console.log(response)
    })
}

$("button").on("click", function () {
    getRecipe($("#food-search").val())
})