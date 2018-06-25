let topics = [
    "The Office",
    "Parks And Rec",
    "Futurama",
    "The Simpsons",
    "Arrested Development",
    "It's Always Sunny In Philadelphia",
    "South Park",
];

let favorites = [];
let favGifs = [];


$(document).ready(function () {
    createButton();
    $(document).on("click", ".show-button", function () {
        $("#clearFavs").hide();
        var searchURL = "https://api.giphy.com/v1/gifs/search?api_key=rp7qhT7CkMUd9kywGAOxdwbvDyXqOsKb";
        var searchTerm = $(this).attr("data-show");
        console.log(searchTerm);
        favGifs = [];
        $.ajax({
            url: searchURL,
            method: "GET",
            data: {
                "limit": 10,
                "q": searchTerm,
            }
        }).then(function (response) {
            console.log(response);
            let results = response.data;
            $("#gifs").empty();
            for (var i = 0; i < results.length; i++) {
                let newDiv = $("<div>");
                newDiv.addClass("newGif");
                let original = results[i].images.original.url
                let still = results[i].images.fixed_height_still.url;
                let animate = results[i].images.fixed_height.url;
                let rating = results[i].rating;
                let newGif = $("<img>");
                favGifs.push({ still, animate, original, rating });
                newGif.attr("src", still);
                newGif.attr("class", "gif");
                newGif.attr("data-state", "still");
                newGif.attr("data-animate", animate);
                newGif.attr("data-still", still);
                newDiv.append(newGif);
                let p = $("<p>").text("Rating: " + rating);
                let p2 = $("<button>").text("Save As Favorite");
                let br = $("<br>");
                p2.addClass("btn btn-dark");
                p2.addClass("favButton");
                p2.attr("id", i);
                let download = $("<a>");
                download.attr("href", original);
                download.text("Original GIF");
                download.attr("target", "_blank")
                newDiv.append(p);
                newDiv.append(p2);
                newDiv.append(br);
                newDiv.append(download);
                $("#gifs").append(newDiv);
                console.log(favGifs);
            };
        })

    })
    $(document).on("click", "#find-show", function (event) {
        $("#clearFavs").hide();
        event.preventDefault();
        $("#buttons").empty();
        var searchTerm = $("#search").val();
        topics.push(searchTerm);
        createButton();
        $("#search").val("");
    });

    $(document).on("click", ".gif", function () {
        console.log("You clicked me!")
        var state = $(this).attr("data-state")
        let clickedGif = $(this);
        let animate = $(this).attr("data-animate");
        let still = $(this).attr("data-still")


        if (state == "still") {
            clickedGif.attr("src", animate);
            clickedGif.attr("data-state", "animate");
        }

        else if (state == "animate") {
            clickedGif.attr("src", still);
            clickedGif.attr("data-state", "still");
        }
    })

    $(document).on("click", "#favorites", function () {
        getFav();
        $("#gifs").empty();
        let clear = $("<button>");
        clear.addClass("btn btn-primary");
        clear.attr("id", "clearFavs");
        clear.text("Clear Favorites");
        $("#instructions").append(clear);
        for (var i = 0; i < favorites.length; i++) {
            let newDiv = $("<div>");
            newDiv.addClass("newGif");
            let still = favorites[i].still;
            let animate = favorites[i].animate;
            let original = favorites[i].original;
            let newGif = $("<img>");
            newGif.attr("src", still);
            newGif.attr("class", "gif");
            newGif.attr("data-state", "still");
            newGif.attr("data-animate", animate);
            newGif.attr("data-still", still);
            newDiv.append(newGif);
            let p = $("<p>").text("Rating: " + favorites[i].rating);
            let br = $("<br>");
            let download = $("<a>");
            download.attr("href", original);
            download.text("Original GIF");
            download.attr("target", "_blank")
            newDiv.append(p);
            newDiv.append(br);
            newDiv.append(download);
            $("#gifs").append(newDiv);
            console.log(favGifs);

        };

    })

    $(document).on("click", ".favButton", function () {
        alert("Favorite Saved");
        let arrayNum = $(this).attr("id");
        let addFav = favGifs[arrayNum];
        console.log(addFav);
        favorites.push(addFav);
        favStorage = JSON.stringify(favorites);
        localStorage.setItem("Favorites", favStorage);
    })

    $(document).on("click", "#clearFavs", function () {
        localStorage.clear();
        $("#gifs").empty();
    })


})



function createButton() {
    $("#clearFavs").hide();
    var favButton = $("<button>");
    favButton.text("Favorites");
    favButton.attr("id", "favorites");
    favButton.addClass("btn btn-dark");
    $("#buttons").append(favButton);
    for (i = 0; i < topics.length; i++) {
        var buttonDisplay = topics[i];
        var newButton = $("<button>")
        newButton.text(buttonDisplay);
        newButton.attr("data-show", topics[i]);
        newButton.addClass("show-button");
        newButton.addClass("btn btn-dark");
        $("#buttons").append(newButton);
    }


};

function getFav() {
    getFavs = localStorage.getItem("Favorites");
    favorites = JSON.parse(getFavs);
};

