//// [discriminatedUnionTypes3.ts]
// Repro from #44435

type Correct = {
	code: string
	property: true
	err: undefined
}
type Err = {
	err: `${string} is wrong!`
}
type SomeReturnType = Correct | Err;

const example: SomeReturnType = {} as SomeReturnType;

if (example.err === undefined) {
	example.property;  // true
}

//// [discriminatedUnionTypes3.js]
"use strict";
// Repro from #44435
var example = {};
if (example.err === undefined) {
    example.property; // true
}
