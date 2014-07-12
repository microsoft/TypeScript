// @noimplicitany: true
// these should be errors
function foo(x) { };
function bar(x: number, y) { };  // error at "y"; no error at "x"
function func2(a, b, c) { };     // error at "a,b,c"
function func3(...args) { };     // error at "args" 
function func4(z= null, w= undefined) { };  // error at "z,w"

// these shouldn't be errors
function noError1(x= 3, y= 2) { };
function noError2(x: number, y: string) { };
