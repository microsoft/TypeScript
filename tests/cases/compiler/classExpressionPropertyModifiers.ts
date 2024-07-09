// @noEmit: true
// @noTypesAndSymbols: true
// @lib: es6

const a = class Cat {
    declare [Symbol.toStringTag] = "uh";
    export foo = 1;
}
