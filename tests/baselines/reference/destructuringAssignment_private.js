//// [tests/cases/compiler/destructuringAssignment_private.ts] ////

//// [destructuringAssignment_private.ts]
class C {
    private x = 0;
    private o = [{ a: 1 }];
}
let x: number;
([{ a: { x } }] = [{ a: new C() }]);
({ o: [{ a: x }]} = new C());

const nameX = "x";
([{ a: { [nameX]: x } }] = [{ a: new C() }]);

const nameO = "o";
({ [nameO]: [{ a: x }]} = new C());


//// [destructuringAssignment_private.js]
var _a, _b, _c, _d;
var C = /** @class */ (function () {
    function C() {
        this.x = 0;
        this.o = [{ a: 1 }];
    }
    return C;
}());
var x;
(x = [{ a: new C() }][0].a.x);
(x = new C().o[0].a);
var nameX = "x";
(_a = [{ a: new C() }], _b = nameX, x = _a[0].a[_b]);
var nameO = "o";
(_c = new C(), _d = nameO, x = _c[_d][0].a);
