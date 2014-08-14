//// [commentsFunction.ts]

/** This comment should appear for foo*/
function foo() {
}
foo();
/** This is comment for function signature*/
function fooWithParameters(/** this is comment about a*/a: string,
    /** this is comment for b*/
    b: number) {
    var d = a;
}
fooWithParameters("a", 10);
/** fooFunc
 * comment
 */
var fooFunc = function FooFunctionValue(/** fooFunctionValue param */ b: string) {
    return b;
}

/// lamdaFoo var comment
var lambdaFoo = /** this is lambda comment*/ (/**param a*/a: number, /**param b*/b: number) => a + b;
var lambddaNoVarComment = /** this is lambda multiplication*/ (/**param a*/a: number, /**param b*/b: number) => a * b;
lambdaFoo(10, 20);
lambddaNoVarComment(10, 20);

//// [commentsFunction.js]
/** This comment should appear for foo*/
function foo() {
}
foo();
/** This is comment for function signature*/
function fooWithParameters(a, /** this is comment for b*/
    b) {
    var d = a;
}
fooWithParameters("a", 10);
/** fooFunc
 * comment
 */
var fooFunc = function FooFunctionValue(b) {
    return b;
};
/// lamdaFoo var comment
var lambdaFoo = function (a, b) { return a + b; };
var lambddaNoVarComment = function (a, b) { return a * b; };
lambdaFoo(10, 20);
lambddaNoVarComment(10, 20);


//// [commentsFunction.d.ts]
declare function foo(): void;
declare function fooWithParameters(a: string, b: number): void;
/** fooFunc
 * comment
 */
declare var fooFunc: (b: string) => string;
declare var lambdaFoo: (a: number, b: number) => number;
declare var lambddaNoVarComment: (a: number, b: number) => number;
