// A parameter declaration may specify either an identifier or a binding pattern.
// The identifiers specified in parameter declarations and binding patterns
// in a parameter list must be unique within that parameter list.

// If the declaration includes a type annotation, the parameter is of that type
function a0([a, b, [[c]]]: [number, number, string[][]]) { }
a0([1, "string", [["world"]]);      // Error
a0([1, 2, [["world"]], "string"]);  // Error


// If the declaration includes an initializer expression (which is permitted only
// when the parameter list occurs in conjunction with a function body),
// the parameter type is the widened form (section 3.11) of the type of the initializer expression.

interface F1 {
    b0(z = 10, [[a, b], d, {u}] = [[1, 2], "string", { u: false }]);  // Error, no function body
}

function b1(z = null, o = { x: 0, y: undefined }) { }
function b2([a, z, y] = [undefined, null, undefined]) { }
function b3([[a], b, [[c, d]]] = [[undefined], undefined, [[undefined, undefined]]]) { }

b1("string", { x: "string", y: true });  // Error

// If the declaration specifies a binding pattern, the parameter type is the implied type of that binding pattern (section 5.1.3)
function c0({z: {x, y: {j}}}) { }
function c1({z} = { z: 10 }) { }
function c2({z = 10}) { }
function c3({b}: { b: number|string } = { b: "hello" }) { }
function c4([z], z: number) { }  // Error Duplicate identifier
function c5([a, b, [[c]]]) { }
function c6([a, b, [[c = 1]]]) { }

c0({ z: 1 });      // Error, implied type is { z: {x: any, y: {j: any}} }
c1({});            // Error, implied type is {z:number}?
c1({ z: true });   // Error, implied type is {z:number}?
c2({ z: false });  // Error, implied type is {z?: number}
c3({ b: true });   // Error, implied type is { b: number|string }. 
c5([1, 2, false, true]);   // Error, implied type is [any, any, [[any]]]
c6([1, 2, [["string"]]]);  // Error, implied type is [any, any, [[number]]]  // Use initializer

// A parameter can be marked optional by following its name or binding pattern with a question mark (?)
// or by including an initializer.  Initializers (including binding property or element initializers) are
// permitted only when the parameter list occurs in conjunction with a function body

function d1([a, b, c]?) { }  // Error, binding pattern can't be optional in implementation signature
function d2({x, y, z}?) { }  // Error, binding pattern can't be optional in implementation signature

interface F2 {
    d3([a, b, c]?);
    d4({x, y, z}?);
    e0([a, b, c]);
}

class C4 implements F2 {
    d3([a, b, c]?) { }  // Error, binding pattern can't be optional in implementation signature
    d4({x, y, c}) { }
    e0([a, b, q]) { }
}

// Destructuring parameter declarations do not permit type annotations on the individual binding patterns,
// as such annotations would conflict with the already established meaning of colons in object literals.
// Type annotations must instead be written on the top- level parameter declaration

function e0({x: [number, number, number]}) { }  // error, duplicate identifier;


