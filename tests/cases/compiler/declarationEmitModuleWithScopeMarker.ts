// @target: es5
// @module: commonjs
// @declaration: true

declare module "bar" {
    var before: typeof func;

    export function normal(): void;

    export default function func(): typeof func;

    var after: typeof func;

    export {}
}
