// @target: es6
// @filename: a.ts
import { b } from './b';
export const a = {
    f: async () => {
        await b.f();
    }
};
// @filename: b.ts
import { a } from './a';
export const b = {
    f: async () => {
        await a.f();
    }
};