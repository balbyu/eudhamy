var movieDB = {
    movies: [
        {
            name: "La Strada",
            haveWatched: true,
            rating: 4.3
        },
        {
            name: "2001: A Space Odyssey",
            haveWatched: true,
            rating: 4.4
        },
        {
            name: "The Good, The Bad, The Ugly",
            haveWatched: true,
            rating: 4.0
        },
        {
            name: "Elephant Man",
            haveWatched: false,
        }
    ]
}

movieDB.movies.forEach(element => {
    console.log("You " +
        (element.haveWatched ? "have" : "haven't") +
        " watched " +
        "\"" + element.name + "\"" +
        (element.rating ? " - " + element.rating + " stars." : ""));
});
