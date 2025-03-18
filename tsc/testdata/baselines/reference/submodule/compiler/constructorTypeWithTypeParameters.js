//// [tests/cases/compiler/constructorTypeWithTypeParameters.ts] ////

//// [constructorTypeWithTypeParameters.ts]
declare var X: {
    new <T>(): number;
}
declare var Y: {
    new (): number;
}
var anotherVar: new <T>() => number;

//// [constructorTypeWithTypeParameters.js]
var anotherVar;
