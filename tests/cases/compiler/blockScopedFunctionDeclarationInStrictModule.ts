// @target: esnext
// @module: commonjs
if (true) {
    function foo() { }
    foo(); // ok
}

export = foo; // not ok