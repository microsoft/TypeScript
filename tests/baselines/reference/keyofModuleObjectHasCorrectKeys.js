//// [tests/cases/compiler/keyofModuleObjectHasCorrectKeys.ts] ////

//// [example.ts]
export default function add(a: number, b: number) {
    return a + b;
}

//// [test.ts]
import * as example from './example';

declare function test<T>(object: T, method: keyof T): void;

test(example, "default");


//// [example.js]
export default function add(a, b) {
    return a + b;
}
//// [test.js]
import * as example from './example';
test(example, "default");
