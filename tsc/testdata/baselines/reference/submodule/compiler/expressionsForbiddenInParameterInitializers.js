//// [tests/cases/compiler/expressionsForbiddenInParameterInitializers.ts] ////

//// [bar.ts]
export async function foo({ foo = await import("./bar") }) {
}

export function* foo2({ foo = yield "a" }) {
}


//// [bar.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foo = foo;
exports.foo2 = foo2;
async function foo({ foo = await Promise.resolve().then(() => require("./bar")) }) {
}
function* foo2({ foo = yield "a" }) {
}
