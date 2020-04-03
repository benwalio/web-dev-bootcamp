function average(nums) {
    let sum = 0;
    for (let i = 0; i < nums.length; i++) {
        sum = sum + nums[i];
    }
    let average = sum / nums.length;
    console.log(average);
}

var scores = [90, 95, 98, 99, 99, 100, 1];
average(scores);