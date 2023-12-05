//// [tests/cases/compiler/abstractClassUnionInstantiation.ts] ////

//// [abstractClassUnionInstantiation.ts]
class ConcreteA {}
class ConcreteB {}
abstract class AbstractA { a: string; }
abstract class AbstractB { b: string; }

type Abstracts = typeof AbstractA | typeof AbstractB;
type Concretes = typeof ConcreteA | typeof ConcreteB;
type ConcretesOrAbstracts = Concretes | Abstracts;

declare const cls1: ConcretesOrAbstracts;
declare const cls2: Abstracts;
declare const cls3: Concretes;

new cls1(); // should error
new cls2(); // should error
new cls3(); // should work

[ConcreteA, AbstractA, AbstractB].map(cls => new cls()); // should error
[AbstractA, AbstractB, ConcreteA].map(cls => new cls()); // should error
[ConcreteA, ConcreteB].map(cls => new cls()); // should work
[AbstractA, AbstractB].map(cls => new cls()); // should error

//// [abstractClassUnionInstantiation.js]
var ConcreteA = /** @class */ (function () {
    function ConcreteA() {
    }
    return ConcreteA;
}());
var ConcreteB = /** @class */ (function () {
    function ConcreteB() {
    }
    return ConcreteB;
}());
var AbstractA = /** @class */ (function () {
    function AbstractA() {
    }
    return AbstractA;
}());
var AbstractB = /** @class */ (function () {
    function AbstractB() {
    }
    return AbstractB;
}());
new cls1(); // should error
new cls2(); // should error
new cls3(); // should work
[ConcreteA, AbstractA, AbstractB].map(function (cls) { return new cls(); }); // should error
[AbstractA, AbstractB, ConcreteA].map(function (cls) { return new cls(); }); // should error
[ConcreteA, ConcreteB].map(function (cls) { return new cls(); }); // should work
[AbstractA, AbstractB].map(function (cls) { return new cls(); }); // should error
