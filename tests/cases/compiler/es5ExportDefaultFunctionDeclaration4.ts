// @target: es5, es2015
// @module: commonjs
// @declaration: true

declare module "bar" {
    var before: typeof func;

    export default function func(): typeof func;

    var after: typeof func;
}