// @noImplicitAny: true
function id<T>(x: T): T { return x };
// Correct: type of fnWrapper is (y: number) => { y: number }
var fn = function(y: number) { return { y } };
var fnWrapper = id(fn);
// Incorrect: type of inlineWrapper is (z: number) => any 
var inlineWrapper = id(function(z: number) { return { z } });
let error1: number = fnWrapper(12).y.length; // should error
let error2: number = inlineWrapper(12).z.length; // should error
