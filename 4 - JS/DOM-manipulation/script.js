var button = document.querySelector("button");

// Conditional Method
// var clicked = true;

// button.addEventListener("click", function(){
//     if(clicked){
//         document.body.style.background = "purple"; clicked = false;
//     }
//     else if(!clicked){
//         document.body.style.background = "white"; clicked = true;
//     } 
    
// })


//Shortcut toggle method
button.addEventListener("click", function(){
    document.body.classList.toggle("purple");
})
