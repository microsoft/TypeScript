// @module: commonjs

// @filename: file1.d.ts
declare namespace NS1 {
    export var foo: number;
}

declare namespace NS2 {
    export var foo: number;
}

// @filename: file2.ts
export {NS1, NS1 as NNS1};
export {NS2, NS2 as NNS2};
export {NS1 as NNNS1};
export {NS2 as NNNS2};