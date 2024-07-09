// @target: es5
// @module: commonjs
// @declaration: true

declare module "foo" {
    export var before: C;

    export default class C {
        method(): C;
    }

    export var after: C;

    export var t: typeof C;
}

