//// [tests/cases/compiler/isolatedDeclarationsOptionalParameter.ts] ////

//// [package.json]
{
    "name": "foo",
    "types": "index.d.ts"
}

//// [index.d.ts]
export interface Foo<T> {
    a: T;
}

//// [bar.ts]
import { type Foo } from "foo";
export const bar = <T,>(foo?: Foo<T>): void => { };


//// [bar.js]
export const bar = (foo) => { };


//// [bar.d.ts]
import { type Foo } from "foo";
export declare const bar: <T>(foo?: Foo<T>) => void;
