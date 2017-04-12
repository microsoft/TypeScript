//// [ES5for-of32.ts]
var array = [1,2,3];
var sum = 0;

for (let num of array) {
    if (sum === 0) {
        array = [4,5,6]
    }
    
    sum += num;
}

//// [ES5for-of32.js]
var array = [1, 2, 3];
var sum = 0;
for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
    var num = array_1[_i];
    if (sum === 0) {
        array = [4, 5, 6];
    }
    sum += num;
}
