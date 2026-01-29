//// [tests/cases/compiler/fixCrashAliasLookupForDefauledImport.ts] ////

//// [input.ts]
export type Foo<T = string> = {};

//// [usage.ts]
import {Foo} from "./input";

function bar<T>(element: Foo) {
    return 1;
}

bar(1 as Foo<number>);


//// [input.js]
export {};
//// [usage.js]
function bar(element) {
    return 1;
}
bar(1);
export {};
