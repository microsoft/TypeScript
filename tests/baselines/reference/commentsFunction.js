//// [commentsFunction.ts]

/** This comment should appear for foo*/
function foo() {
} /* trailing comment of function */
foo();
/** This is comment for function signature*/
function fooWithParameters(/** this is comment about a*/a: string,
    /** this is comment for b*/
    b: number) {
    var d = a;
} // trailing comment of function
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

function blah(a: string /* multiline trailing comment 
multiline */) {
}

function blah2(a: string /* single line multiple trailing comments */ /* second */) {
}

function blah3(a: string // trailing commen single line
    ) {
}

lambdaFoo = (a, b) => a * b; // This is trailing comment

/*leading comment*/() => 0; // Needs to be wrapped in parens to be a valid expression (not declaration)
/*leading comment*/(() => 0); //trailing comment

//// [commentsFunction.js]
/** This comment should appear for foo*/
function foo() {
} /* trailing comment of function */
foo();
/** This is comment for function signature*/
function fooWithParameters(a, 
    /** this is comment for b*/
    b) {
    var d = a;
} // trailing comment of function
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
function blah(a /* multiline trailing comment
    multiline */) {
}
function blah2(a /* single line multiple trailing comments */ /* second */) {
}
function blah3(a // trailing commen single line
    ) {
}
lambdaFoo = function (a, b) { return a * b; }; // This is trailing comment
/*leading comment*/ (function () { return 0; }); // Needs to be wrapped in parens to be a valid expression (not declaration)
/** This comment should appear for foo*/
function foo() {
} /* trailing comment of function */
foo();
/** This is comment for function signature*/
function fooWithParameters(/** this is comment about a*/a: string,
    /** this is comment for b*/
    b: number) {
    var d = a;
} // trailing comment of function
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

function blah(a: string /* multiline trailing comment 
multiline */) {
}

function blah2(a: string /* single line multiple trailing comments */ /* second */) {
}

function blah3(a: string // trailing commen single line
    ) {
}

lambdaFoo = (a, b) => a * b; // This is trailing comment

/*leading comment*/() => 0; // Needs to be wrapped in parens to be a valid expression (not declaration)
 (function () { return 0; }); //trailing comment


//// [commentsFunction.d.ts]
/** This comment should appear for foo*/
declare function foo(): void;
/** This is comment for function signature*/
declare function fooWithParameters(/** this is comment about a*/ a: string, 
    /** this is comment for b*/
    b: number): void;
/** fooFunc
 * comment
 */
declare var fooFunc: (b: string) => string;
declare var lambdaFoo: (a: number, b: number) => number;
declare var lambddaNoVarComment: (a: number, b: number) => number;
declare function blah(a: string): void;
declare function blah2(a: string): void;
declare function blah3(a: string): void;
