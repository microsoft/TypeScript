// @target: es5
// @module: commonjs
// @declaration: true

var before: C = new C();

export default class C {
    method(): C {
        return new C();
    }
}

var after: C = new C();

var t: typeof C = C;

