//// [tests/cases/compiler/contextualSignatureInstatiationContravariance.ts] ////

//// [contextualSignatureInstatiationContravariance.ts]
interface Animal { x }
interface Giraffe extends Animal { y }
interface Elephant extends Animal { y2 }

var f2: <T extends Animal>(x: T, y: T) => void;

var g2: (g: Giraffe, e: Elephant) => void;
g2 = f2; // error because Giraffe and Elephant are disjoint types

var h2: (g1: Giraffe, g2: Giraffe) => void;
h2 = f2; // valid because Giraffe satisfies the constraint. It is safe in the traditional contravariant fashion.

//// [contextualSignatureInstatiationContravariance.js]
var f2;
var g2;
g2 = f2; // error because Giraffe and Elephant are disjoint types
var h2;
h2 = f2; // valid because Giraffe satisfies the constraint. It is safe in the traditional contravariant fashion.
