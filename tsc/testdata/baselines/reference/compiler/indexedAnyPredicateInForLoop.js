//// [tests/cases/compiler/indexedAnyPredicateInForLoop.ts] ////

//// [indexedAnyPredicateInForLoop.ts]
declare function isPrimitive(value: any): value is string | number;
declare function createText(text: string | undefined): object;
function normalize(children: any) {
    for (let index = 0; index < children.length; ++index) {
        if (isPrimitive(children[index])) {
            children[index] = createText(children[index]);
        }
    }
}


//// [indexedAnyPredicateInForLoop.js]
"use strict";
function normalize(children) {
    for (let index = 0; index < children.length; ++index) {
        if (isPrimitive(children[index])) {
            children[index] = createText(children[index]);
        }
    }
}
