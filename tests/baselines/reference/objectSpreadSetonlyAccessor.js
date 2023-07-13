//// [tests/cases/conformance/types/spread/objectSpreadSetonlyAccessor.ts] ////

//// [objectSpreadSetonlyAccessor.ts]
const o1: { foo: number, bar: undefined } = { foo: 1, ... { set bar(_v: number) { } } }
const o2: { foo: undefined } = { foo: 1, ... { set foo(_v: number) { } } }


//// [objectSpreadSetonlyAccessor.js]
"use strict";
const o1 = { foo: 1, ...{ set bar(_v) { } } };
const o2 = { foo: 1, ...{ set foo(_v) { } } };
