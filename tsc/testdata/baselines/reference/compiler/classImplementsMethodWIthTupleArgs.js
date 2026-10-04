//// [tests/cases/compiler/classImplementsMethodWIthTupleArgs.ts] ////

//// [classImplementsMethodWIthTupleArgs.ts]
declare class MySettable implements Settable {
    set(option: Record<string, unknown>): void;
    set(name: string, value: unknown): void;
}

interface Settable {
    set(...args: [option: Record<string, unknown>] | [name: string, value: unknown] | [name: string]): void;
}


//// [classImplementsMethodWIthTupleArgs.js]
"use strict";
