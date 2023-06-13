//// [tests/cases/compiler/elaboratedErrorsOnNullableTargets01.ts] ////

//// [elaboratedErrorsOnNullableTargets01.ts]
export declare let x: null | { foo: { bar: string | null } | undefined } | undefined;
export declare let y: { foo: { bar: number | undefined } };

x = y;

y = x;


//// [elaboratedErrorsOnNullableTargets01.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = exports.y;
exports.y = exports.x;
