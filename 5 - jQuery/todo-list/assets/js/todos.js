

var items = ["Round round get around",
 "I get around, yeah",
"Fom town to town",
"I'm a real cool head",
"I'm makin' real good bread",
"I'm gettin' bugged driving",
"up and down the same old strip"];



promptTodos = new Array();
items.forEach(element => {
    promptTodos.push("<li><span><i class='far fa-trash-alt'></i></span>" + element + "</li>");
});

$("<ul/>", {
    "class": "my-new-list",
    html: promptTodos.join("")
}).appendTo(".container");

$('button').on("click", function(){
    $(this).toggleClass('active');
  });

// Check todos when clicked. Must add listener to the parent ul because at time of page creation, not all lis exist
$("ul").on("click", "li", function () {
    $(this).toggleClass("task-completed");
})

//Delete todos when trashcan clicked. Note that we had to get the parent (li) and fade it out. Also note that we are stopping propagation on the event so that it ONLY calls the listener for this element and not all of the other elements.
$("ul").on("click", "span", function (e) {
    $(this).parent().fadeOut(300, function () {
        $(this).remove();
    });
    e.stopPropagation();
})

// When user enters new todo, take text and append to list. This takes a string of HTML and appends it to whatever we want. This is also listening for an enter event, which is 13
$("#todo-input").keypress(function (e) {
    if (e.which === 13) {
        var todoText = $(this).val();
        $(this).val("");
        $("ul").append("<li><span><i class='far fa-trash-alt'></i></span>" + todoText + "</li>");
    }
})

//Fade the form whenever user clicks edit button
var hidden = false;
$(".fa-plus-square").click(function () {
    if (hidden) {
        $(".inputArea").slideDown();
        hidden = false;
    } else {
        $(".inputArea").slideUp();
        hidden = true;
    }
})