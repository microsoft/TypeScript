// @target: es5

async function foo() { return 42; } // ERROR: Async functions are only available in ES6+
let bar = async function () { return 42; } // OK, but should be an error
let baz = async () => 42; // OK, but should be an error