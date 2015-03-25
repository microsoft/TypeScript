// @module: commonjs

export module M {
    export var v = 0;
    export let x;
}

const x = 0;
export module M {
    v;
    export {x};
}
