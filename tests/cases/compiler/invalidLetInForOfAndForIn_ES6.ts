// @target: es6
// This should be an error
// More details: http://www.ecma-international.org/ecma-262/6.0/#sec-iteration-statements

var let = 10;
for (let of [1,2,3]) {}

for (let in [1,2,3]) {}
 

