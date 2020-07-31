var faker = require('faker');

for(i = 0; i <= 10; i++){
    console.log("Product Name: " + faker.commerce.productName());
    console.log("Product Price: $" + faker.commerce.price()) + '\n' + '\n';
}