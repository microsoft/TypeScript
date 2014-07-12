//// [typeArgumentsShouldDisallowNonGenericOverloads.js]
function foo(a) {
    return "hi";
}

var x = foo("hi");
var y = foo("hi");

var w = foo("hi");
var z = foo("hi"); // should error
