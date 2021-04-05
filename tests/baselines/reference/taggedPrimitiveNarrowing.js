//// [taggedPrimitiveNarrowing.ts]
type Hash = string & { __hash: true };

function getHashLength(hash: Hash): number {
    if (typeof hash !== "string") {
        throw new Error("This doesn't look like a hash");
    }
    return hash.length;
}


//// [taggedPrimitiveNarrowing.js]
"use strict";
function getHashLength(hash) {
    if (typeof hash !== "string") {
        throw new Error("This doesn't look like a hash");
    }
    return hash.length;
}


//// [taggedPrimitiveNarrowing.d.ts]
declare type Hash = string & {
    __hash: true;
};
declare function getHashLength(hash: Hash): number;
