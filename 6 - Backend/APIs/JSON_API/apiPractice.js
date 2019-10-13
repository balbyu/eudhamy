const request = require("request-promise");

// ES 5 <
// request('https://jsonplaceholder.typicode.com/users', function(error, response, body){
//     if(!error && response.statusCode == 200 ){
//         var parsed = JSON.parse(body);
//         parsed.forEach(element => {
//             console.log(element["name"]);
//         });
//     }
// })

request('https://jsonplaceholder.typicode.com/users')
    .then(body => {
        const parsedData = JSON.parse(body)
        parsedData.forEach(element => {
            console.log(element["name"]);
        });
    })
    .catch(err => {
        console.log("There was an error! " + err);
    })