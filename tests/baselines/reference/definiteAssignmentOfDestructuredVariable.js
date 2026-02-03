//// [tests/cases/compiler/definiteAssignmentOfDestructuredVariable.ts] ////

//// [definiteAssignmentOfDestructuredVariable.ts]
// https://github.com/Microsoft/TypeScript/issues/20994
interface Options {
    a?: number | object;
    b: () => void;
}

class C<T extends Options> {
    foo!: { [P in keyof T]: T[P] }

    method() {
        let { a, b } = this.foo;
        !(a && b);
        a;
    }
}

//// [definiteAssignmentOfDestructuredVariable.js]
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.method = function () {
        var _a = this.foo, a = _a.a, b = _a.b;
        !(a && b);
        a;
    };
    return C;
}());
