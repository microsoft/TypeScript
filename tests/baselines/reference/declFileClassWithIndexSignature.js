//// [tests/cases/compiler/declFileClassWithIndexSignature.ts] ////

//// [declFileClassWithIndexSignature.ts]
class BlockIntrinsics {
    [s: string]: string;
}

//// [declFileClassWithIndexSignature.js]
class BlockIntrinsics {
}


//// [declFileClassWithIndexSignature.d.ts]
declare class BlockIntrinsics {
    [s: string]: string;
}
