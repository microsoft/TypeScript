//// [tests/cases/compiler/operationsAvailableOnPromisedType.ts] ////

//// [operationsAvailableOnPromisedType.ts]
async function fn(
    a: number,
    b: Promise<number>,
    c: Promise<string[]>,
    d: Promise<{ prop: string }>,
    e: Promise<() => void>,
    f: Promise<() => void> | (() => void),
    g: Promise<{ new(): any }>
) {
    // All errors
    a | b;
    b | a;
    a + b;
    a > b;
    b++;
    --b;
    a === b;
    [...c];
    for (const s of c) {
        fn(b, b, c, d, e, f, g);
        d.prop;
    }
    for await (const s of c) {}
    e();
    f();
    new g();
    b();
}


//// [operationsAvailableOnPromisedType.js]
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function fn(a, b, c, d, e, f, g) {
    return __awaiter(this, void 0, void 0, function* () {
        // All errors
        a | b;
        b | a;
        a + b;
        a > b;
        b++;
        --b;
        a === b;
        [...c];
        for (const s of c) {
            fn(b, b, c, d, e, f, g);
            d.prop;
        }
        for await (const s of c) { }
        e();
        f();
        new g();
        b();
    });
}
