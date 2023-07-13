//// [tests/cases/compiler/contextualSignatureInstatiationCovariance.ts] ////

//// [contextualSignatureInstatiationCovariance.ts]
interface Animal { x }
interface TallThing { x2 }
interface Giraffe extends Animal, TallThing { y }

var f2: <T extends Giraffe>(x: T, y: T) => void;

var g2: (a: Animal, t: TallThing) => void;
g2 = f2; // While neither Animal nor TallThing satisfy the constraint, T is at worst a Giraffe and compatible with both via covariance.

var h2: (a1: Animal, a2: Animal) => void;
h2 = f2; // Animal does not satisfy the constraint, but T is at worst a Giraffe and compatible with Animal via covariance.

//// [contextualSignatureInstatiationCovariance.js]
var f2;
var g2;
g2 = f2; // While neither Animal nor TallThing satisfy the constraint, T is at worst a Giraffe and compatible with both via covariance.
var h2;
h2 = f2; // Animal does not satisfy the constraint, but T is at worst a Giraffe and compatible with Animal via covariance.
