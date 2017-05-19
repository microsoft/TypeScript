// @target: ES5
// @declaration: true
// @removeComments: false

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

function blah4(/*1*/a: string/*2*/,/*3*/b: string/*4*/) {
}

function foo1() {

    // should emit this
}

function foo2() {
    /// This is some detached comment

    // should emit this leading comment of } too
}
