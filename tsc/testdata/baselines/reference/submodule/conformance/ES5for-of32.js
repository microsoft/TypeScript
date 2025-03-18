//// [tests/cases/conformance/statements/for-ofStatements/ES5for-of32.ts] ////

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
for (let num of array) {
    if (sum === 0) {
        array = [4, 5, 6];
    }
    sum += num;
}
