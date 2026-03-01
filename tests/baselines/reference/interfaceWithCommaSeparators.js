//// [tests/cases/compiler/interfaceWithCommaSeparators.ts] ////

//// [interfaceWithCommaSeparators.ts]
var v: { bar(): void, baz }
interface Foo { bar(): void, baz }

//// [interfaceWithCommaSeparators.js]
"use strict";
var v;
