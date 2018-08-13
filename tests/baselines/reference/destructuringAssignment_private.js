//// [destructuringAssignment_private.ts]
class C {
    private x = 0;
    private o = [{ a: 1 }];
}
let x: number;
([{ a: { x } }] = [{ a: new C() }]);
({ o: [{ a: x }]} = new C());


//// [destructuringAssignment_private.js]
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
