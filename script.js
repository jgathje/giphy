let topics = [
    "The Office",
    "Parks And Rec",
    "Futurama",
    "The Simpsons",
    "Arrested Development",
    "It's Always Sunny In Philadelphia",
    "South Park",
]

$(document).ready(function () {
    createButton();
    $(document).on("click", ".show-button", function () {
        var searchURL = "https://api.giphy.com/v1/gifs/search?api_key=rp7qhT7CkMUd9kywGAOxdwbvDyXqOsKb";
        var searchTerm = $(this).attr("data-show");
        console.log(searchTerm);

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
                let still = results[i].images.fixed_height_still.url;
                let animate = results[i].images.fixed_height.url;
                let newGif = $("<img>");
                newGif.attr("src", still);
                newGif.attr("class", "gif");
                newGif.attr("data-state", "still");
                newGif.attr("data-animate", animate);
                newGif.attr("data-still", still);
                newDiv.append(newGif);
                let p = $("<p>").text("Rating: " + results[i].rating);
                let p2 = $("<p>").text("Title: " + results[i].title);
                let download = $("<a>");
                download.attr("href", results[i].images.original.url);
                download.text("Original GIF");
                download.attr("target", "_blank")
                newDiv.append(p);
                newDiv.append(p2);
                newDiv.append(download);
                $("#gifs").append(newDiv);

            };
        })

    })
    $(document).on("click", "#find-show", function (event) {
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

})


function createButton() {
    for (i = 0; i < topics.length; i++) {
        var buttonDisplay = topics[i];
        var newButton = $("<button>")
        newButton.text(buttonDisplay);
        newButton.attr("data-show", topics[i]);
        newButton.addClass("show-button");
        newButton.addClass("btn btn-dark");
        $("#buttons").append(newButton);
    }


}