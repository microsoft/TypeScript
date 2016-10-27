//// [es6modulekindWithES5Target12.ts]

export class C {
}

export namespace C {
    export const x = 1;
}

export enum E {
    w = 1
}

export enum E {
    x = 2
}

export namespace E {
    export const y = 1;
}

export namespace E {
    export const z = 1;
}

export namespace N {
}

export namespace N {
    export const x = 1;
}

export function F() {
}

export namespace F {
    export const x = 1;
}

//// [es6modulekindWithES5Target12.js]
var C = (function () {
    function C() {
    }
    return C;
}());
export { C };
(function (C) {
    C.x = 1;
})(C || (C = {}));
export var E;
(function (E) {
    E[E["w"] = 1] = "w";
})(E || (E = {}));
(function (E) {
    E[E["x"] = 2] = "x";
})(E || (E = {}));
(function (E) {
    E.y = 1;
})(E || (E = {}));
(function (E) {
    E.z = 1;
})(E || (E = {}));
export var N;
(function (N) {
    N.x = 1;
})(N || (N = {}));
export function F() {
}
(function (F) {
    F.x = 1;
})(F || (F = {}));
