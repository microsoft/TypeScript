//// [tests/cases/compiler/asyncFunctionsAcrossFiles.ts] ////

//// [a.ts]
import { b } from './b';
export const a = {
    f: async () => {
        await b.f();
    }
};
//// [b.ts]
import { a } from './a';
export const b = {
    f: async () => {
        await a.f();
    }
};

//// [b.js]
import { a } from './a';
export const b = {
    f: async () => {
        await a.f();
    }
};
//// [a.js]
import { b } from './b';
export const a = {
    f: async () => {
        await b.f();
    }
};
