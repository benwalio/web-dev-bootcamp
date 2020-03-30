var age = 9;

if (age === 21) {
  console.log("happy 21st bday!!");
} else if (age < 0) {
  console.log("error neg");
}

if (age % 2 !== 0) {
  console.log("your age is odd");
}

if (!((Math.sqrt(age) % 1) !== 0)) {
  console.log('perfect sq');
}
