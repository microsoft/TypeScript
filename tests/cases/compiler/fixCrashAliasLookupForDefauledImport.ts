// @filename: input.ts
export type Foo<T = string> = {};

// @filename: usage.ts
import {Foo} from "./input";

function bar<T>(element: Foo) {
    return 1;
}

bar(1 as Foo<number>);
