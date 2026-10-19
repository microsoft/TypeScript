//// [tests/cases/compiler/assertionOperandInLoopAssertionCallNoHang.ts] ////

//// [assertionOperandInLoopAssertionCallNoHang.ts]
declare function assertEqual<T>(actual: unknown, expected: T): asserts actual;
declare class C {}
declare function on(cb: (e: undefined) => void): void;
declare const data: [];

on(e => {
	assertEqual(e, false);
	for (;;) {
		assertEqual(e as C, data);
	}
});


//// [assertionOperandInLoopAssertionCallNoHang.js]
"use strict";
on(e => {
    assertEqual(e, false);
    for (;;) {
        assertEqual(e, data);
    }
});
