//// [tests/cases/compiler/indexMappedTypeWithFilteredKeysWithNegation.ts] ////

//// [indexMappedTypeWithFilteredKeysWithNegation.ts]
type ExcludeKey<T, TKey> = {
    [K in keyof T as K extends TKey ? never : K]: T[K]
};

interface Test {
    a: string;
    b: number;
    c: boolean;
}

declare const test: ExcludeKey<Test, "b">; 
declare var possibleKey: string & keyof Test & not "b";

test[possibleKey];

function f<T extends Test>(test: ExcludeKey<T, "b">, possibleKey: string & keyof T & not "b") {
    test[possibleKey];
}


//// [indexMappedTypeWithFilteredKeysWithNegation.js]
"use strict";
test[possibleKey];
function f(test, possibleKey) {
    test[possibleKey];
}
