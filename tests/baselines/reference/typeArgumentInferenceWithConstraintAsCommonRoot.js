//// [typeArgumentInferenceWithConstraintAsCommonRoot.ts]
interface Animal { x }
interface Giraffe extends Animal { y }
interface Elephant extends Animal { z }
function f<T extends Animal>(x: T, y: T): T { return undefined; }
var g: Giraffe;
var e: Elephant;
f(g, e); // valid because both Giraffe and Elephant satisfy the constraint. T is Animal

//// [typeArgumentInferenceWithConstraintAsCommonRoot.js]
function f(x, y) { return undefined; }
var g;
var e;
f(g, e); // valid because both Giraffe and Elephant satisfy the constraint. T is Animal
