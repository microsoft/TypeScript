// @module: commonjs

export namespace M {
    export var v = 0;
    export let x;
}

const x = 0;
export namespace M {
    v;
    export {x};
}
