//// [for-of58.ts]

var array = [1,2,3];
var sum = 0;

for (let num of array) {
    if (sum === 0) {
        array = [4,5,6]
    }
    
    sum += num;
}

//// [for-of58.js]
var array = [1, 2, 3];
var sum = 0;
for (var _i = 0; _i < array.length; _i++) {
    var num = array[_i];
    if (sum === 0) {
        array = [4, 5, 6];
    }
    sum += num;
}
