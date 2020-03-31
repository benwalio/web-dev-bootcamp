function printReverse(array) {
  for(let i = array.length - 1; i >= 0; i--) {
    console.log(array[i]);
  }
}

function isUniform(array) {
  for (let item of array) {
    for (let item2 of array) {
      if (item !== item2){
        return false
      }
    }
  }
  return true;
}

function sumArray(array) {
  let sum = 0;
  for (let item of array) {
    sum += item;
  }
  return sum;
}

function max(array) {
  let max = 0;
  for (let item of array) {
    if (item > max) {
      max = item;
    }
  }
  return max;
}

printReverse(["hello","henlo","bye","gbyez"]);
console.log(isUniform([1,1,1,1,1,1,1]));
console.log(isUniform([1,2,1,1,2,2,1,1,2,1]));
console.log(sumArray([1,2,3]));
console.log(max([1,2,3,6666,3,2,1]));
