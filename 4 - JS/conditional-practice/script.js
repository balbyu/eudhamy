var age = prompt("What is your age?");

// Check for negative age
if(age < 0) console.log("ERROR. You are not even alive");

//Drinking age
if(age == 21) console.log("Come on in partner, first round on me.");

//Odd Age
if((age % 1) == 0){
    console.log("Your age is odd!")
}else{
    console.log("Your age is Even!");
}

//Perfect Square
if((Math.sqrt(age) % 1) != 0 ){
    console.log("You have a perfect square age!");
}