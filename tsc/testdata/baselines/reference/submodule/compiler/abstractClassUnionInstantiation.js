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
class ConcreteA {
}
class ConcreteB {
}
class AbstractA {
    a;
}
class AbstractB {
    b;
}
new cls1();
new cls2();
new cls3();
[ConcreteA, AbstractA, AbstractB].map(cls => new cls());
[AbstractA, AbstractB, ConcreteA].map(cls => new cls());
[ConcreteA, ConcreteB].map(cls => new cls());
[AbstractA, AbstractB].map(cls => new cls());
