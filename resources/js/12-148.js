function isEven(x) {
  if (x % 2 === 0) {
    return true;
  } else {
    return false;
  }
}

function factorial(x) {
  let product = 0;
  if (x > 0) {
    product = x;
    x--;
    for (let i = x - 1; i > 0; i--) {
      product = product * x;
      x--;
    }
  } else if (x < 0) {
    x *= -1;
    console.log(x);
    product = x;
    x--;
    for (let i = x - 1; i > 0; i--) {
      product = product * x;
      x--;
    }
    product *= -1
  } else {
    product = 1;
  }
  return product;
}

function kebabToSnake(variable) {
  return variable.replace(/-/g, "_");
}

console.log(isEven(50));
console.log(factorial(10));
console.log(kebabToSnake("haha-haha-haha-oh"));
