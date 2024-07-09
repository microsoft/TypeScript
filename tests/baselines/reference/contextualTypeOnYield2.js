//// [tests/cases/compiler/contextualTypeOnYield2.ts] ////

//// [contextualTypeOnYield2.ts]
type OrGen = () => (number | Generator<string, (arg: number) => void, undefined>);
const g: OrGen = function* () {
    return (num) => console.log(num);
}

//// [contextualTypeOnYield2.js]
"use strict";
const g = function* () {
    return (num) => console.log(num);
};
