// @filename: example.ts
export default function add(a: number, b: number) {
    return a + b;
}

// @filename: test.ts
import * as example from './example';

declare function test<T>(object: T, method: keyof T): void;

test(example, "default");
