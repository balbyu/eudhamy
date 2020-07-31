var todos = [];

window.setTimeout(function() {
    while (input !== "quit") {
        var input = prompt("Enter command.");
        if (input === "list") {
            prettyPrint(todos);
        }
    
        if (input === "new") {
            todos.push(prompt("What is your new Todo?"));
            console.log(todos[todos.length - 1] + " added to the list.");
        }
    
        if (input === "quit") {
            console.log("Thanks for your interaction with me today.")
        }
    
        if (input === "delete") {
            var deletedIndex = prompt("Which item would you like to delete?" + "\n" + "\n" + getTodoListString(todos));
            console.log("Deleting \"" + todos[deletedIndex] + "\"");
            todos.splice(deletedIndex, 1);
        }
    }

    function prettyPrint(todoList) {
        console.log("*******");
        todoList.forEach(function (element) {
            console.log(element);
        })
        console.log("*******");
    }
    
    function getTodoListString(todoList) {
        var str = "";
        for (let index = 0; index < todoList.length; index++) {
            const element = todoList[index];
            str = str + " " + "[" + index + "]" + " " + element + "\n";
        }
        return str;
    }

  }, 500);



