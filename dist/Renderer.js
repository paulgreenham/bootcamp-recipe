class Renderer {
    displayRecipes(data) {
        $("#results-container").empty()
        const source = $("#recipe-template").html()
        const template = Handlebars.compile(source)
        const hbText = template({data})
        $("#results-container").append(hbText)
    }
}