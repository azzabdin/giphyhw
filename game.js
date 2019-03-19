var topics = ["babies", "cats", "dogs", "kids"];


function renderButtons() {



    $("#buttons-view").empty();


    for (var i = 0; i < topics.length; i++) {

        // Then dynamicaly generating buttons for each movie in the array.

        var a = $("<button>");
        // Adding a class
        a.addClass("giphy");
        // Adding a data-attribute with a value of the movie at index i
        a.attr("data-name", topics[i]);
        // Providing the button's text with a value of the movie at index i
        a.text(topics[i]);
        // Adding the button to the HTML
        $("#buttons-view").append(a);
    }
}


$("#add-giphy").on("click", function (event) {


    event.preventDefault();


    var giphy = $("#giphy-input").val().trim();

    topics.push(giphy);


    renderButtons();
});
$(document).on("click", ".giphy", function () {
    console.log("hello")
    var search = $(this).attr("data-name")
    console.log(search)
    var giphyurl = "https://api.giphy.com/v1/gifs/search?api_key=9QJ1pFY6BccbeGSpQfnlJvDlzZl46Cei&limit=10&q=" + search;
    console.log(giphyurl)
    $.ajax({
        url: giphyurl,
        method: "GET"
    }).then(function (response) {

        var imegs = response.data
        $("#imgs").empty()
        for (var j = 0; j < imegs.length; j++) {
            var rating = imegs[j].rating;
            var still = imegs[j].images.original_still.url;
            var anim = imegs[j].images.original.url;
            console.log(rating, still, anim)
            var b = $("<img>")
            b.addClass("imgd")
            b.attr("src", still)
            b.attr("data-still", still);
            b.attr("data-animate", anim);
            b.attr("data-state", "still")
            $("#imgs").append(b)



            var rta = $("<p>").text("rating: " + rating);
            $("#imgs").append(rta)


        }
    })

})
$(document).on("click", ".imgd", function (event) {

    event.preventDefault()
    var c = $(this).attr("data-state")
    if (c === "still") {
        var animi = $(this).attr("data-animate")
        $(this).attr("src", animi);
        $(this).attr("data-state", "animate")
    } else {
        var ima = $(this).attr("data-still")
        $(this).attr("src", ima);
        $(this).attr("data-state", "still")
    }
});

renderButtons();
