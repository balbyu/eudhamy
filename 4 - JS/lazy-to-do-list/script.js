var todos = [];

while (input !== "quit") {
    var input = prompt("Enter command.");
    if (input === "list") {
        printList();
    }

    function printList() {
        prettyPrint(todos);
    }

    if (input === "new") {
        todos.push(prompt("What is your new Todo?"));
        console.log(todos.indexOf(todos.length) + " added to the list.")
    }

    if (input === "quit") {
        console.log("Thanks for your interaction with me today. I will now display your list and then error out.")
        printList()
    }


}

function prettyPrint(todoList) {
    console.log("*******");
    todoList.forEach(function (element) {
        console.log(element);
    })
    console.log("*******");
}