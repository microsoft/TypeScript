// @target: es5,es2015
// @module: es2015
// @sourcemap: true

// Example from https://mathiasbynens.be/notes/javascript-identifiers-es6
// Astral characters should be accepted in ES2015

// @filename: extendedEscapesForAstralsInVarsAndClasses.ts
// U+102A7 CARIAN LETTER A2
var 𐊧: string;
var \u{102A7}: string;

if (Math.random()) {
    𐊧 = "hello";
}
else {
    \u{102A7} = "hallo";
}

class Foo {
    \u{102A7}: string;
    constructor() {
        this.\u{102A7} = " world";
    }
    methodA() {
        return this.𐊧;
    }
}

export var _𐊧 = new Foo().\u{102A7} + new Foo().methodA();

_\u{102A7} += "!";

// @filename: astralAsSurrogatePair.ts
import { _𐊧 as \uD800\uDEA7 } from "./extendedEscapesForAstralsInVarsAndClasses.js";
