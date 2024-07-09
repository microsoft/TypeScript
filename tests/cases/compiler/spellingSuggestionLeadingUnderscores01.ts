// @module: commonjs
// @filename abc.ts
export declare let a: {
    __foo: 10,
}

a.___foo

// @filename def.ts
export let b: {
    __foo: number
}

b = {
    ___foo: 100,
}

