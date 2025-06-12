//// [tests/cases/compiler/propertyAccessOnObjectLiteral.ts] ////

//// [propertyAccessOnObjectLiteral.ts]
class A { }

(<A>{}).toString();

(() => {
    (<A>{}).toString();
})();


//// [propertyAccessOnObjectLiteral.js]
class A {
}
({}.toString());
(() => {
    ({}.toString());
})();
