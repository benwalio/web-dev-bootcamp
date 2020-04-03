var faker = require("faker");

console.log("header");

for (let i = 0; i <= 10; i++) {
    console.log( faker.fake( "{{commerce.color}} {{commerce.productAdjective}} {{commerce.productName}} - ${{commerce.price}}" ));
}