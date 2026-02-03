//// [tests/cases/compiler/genericChainedCalls.ts] ////

//// [genericChainedCalls.ts]
interface I1<T> {
    func<U>(callback: (value: T) => U): I1<T>;
}
 
declare var v1: I1<number>;
 
var r1 = v1.func(num => num.toString()) 
           .func(str => str.length) // error, number doesn't have a length
           .func(num => num.toString())
 
var s1 = v1.func(num => num.toString()) 
var s2 = s1.func(str => str.length) // should also error
var s3 = s2.func(num => num.toString())


//// [genericChainedCalls.js]
var r1 = v1.func(function (num) { return num.toString(); })
    .func(function (str) { return str.length; }) // error, number doesn't have a length
    .func(function (num) { return num.toString(); });
var s1 = v1.func(function (num) { return num.toString(); });
var s2 = s1.func(function (str) { return str.length; }); // should also error
var s3 = s2.func(function (num) { return num.toString(); });
