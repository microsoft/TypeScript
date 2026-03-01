// @target: es5, es2015
// @module: commonjs
// @declaration: true

var before: typeof func = func();

export default function func(): typeof func {
    return func;
}

var after: typeof func = func();