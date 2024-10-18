//// [tests/cases/compiler/abstractConstructorOverloadAssignability.ts] ////

//// [abstractConstructorOverloadAssignability.ts]
type AbstractConstructor = abstract new (arg: "abstract") => "abstract";
type ConcreteConstructor = new (arg: "concrete") => "concrete";

type MixedConstructorAbstractFirst =
    & AbstractConstructor
    & ConcreteConstructor;

type MixedConstructorAbstractLast =
    & ConcreteConstructor
    & AbstractConstructor;

declare let mixedConstructorAbstractFirst: MixedConstructorAbstractFirst;
declare let mixedConstructorAbstractLast: MixedConstructorAbstractLast;

mixedConstructorAbstractFirst = mixedConstructorAbstractLast; // should work
mixedConstructorAbstractLast = mixedConstructorAbstractFirst; // should work

interface MixedConstructorInterface1 extends AbstractConstructor { // should work
    new (arg: "concrete"): "concrete";
}

interface MixedConstructorInterface2 extends AbstractConstructor, ConcreteConstructor { // should work

}

declare let mixedConstructorInterface1: MixedConstructorInterface1;
declare let mixedConstructorInterface2: MixedConstructorInterface2;

mixedConstructorInterface2 = mixedConstructorInterface1; // should work
mixedConstructorInterface1 = mixedConstructorInterface2; // should work

mixedConstructorAbstractFirst = mixedConstructorInterface1; // should work
mixedConstructorInterface1 = mixedConstructorAbstractFirst; // should work

mixedConstructorAbstractLast = mixedConstructorInterface1; // should work
mixedConstructorInterface1 = mixedConstructorAbstractLast; // should work

mixedConstructorAbstractFirst = mixedConstructorInterface2; // should work
mixedConstructorInterface2 = mixedConstructorAbstractFirst; // should work

mixedConstructorAbstractLast = mixedConstructorInterface2; // should work
mixedConstructorInterface2 = mixedConstructorAbstractLast; // should work


//// [abstractConstructorOverloadAssignability.js]
mixedConstructorAbstractFirst = mixedConstructorAbstractLast; // should work
mixedConstructorAbstractLast = mixedConstructorAbstractFirst; // should work
mixedConstructorInterface2 = mixedConstructorInterface1; // should work
mixedConstructorInterface1 = mixedConstructorInterface2; // should work
mixedConstructorAbstractFirst = mixedConstructorInterface1; // should work
mixedConstructorInterface1 = mixedConstructorAbstractFirst; // should work
mixedConstructorAbstractLast = mixedConstructorInterface1; // should work
mixedConstructorInterface1 = mixedConstructorAbstractLast; // should work
mixedConstructorAbstractFirst = mixedConstructorInterface2; // should work
mixedConstructorInterface2 = mixedConstructorAbstractFirst; // should work
mixedConstructorAbstractLast = mixedConstructorInterface2; // should work
mixedConstructorInterface2 = mixedConstructorAbstractLast; // should work
