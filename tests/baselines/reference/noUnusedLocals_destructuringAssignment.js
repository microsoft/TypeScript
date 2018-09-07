//// [noUnusedLocals_destructuringAssignment.ts]
class C {
    private x = 0;

    m(): number {
        let x: number;
        ({ x } = this);
        return x;
    }

    private f(): Function {
        let f: Function;
        ({ f } = this);
        return f;
    }
}


//// [noUnusedLocals_destructuringAssignment.js]
var C = /** @class */ (function () {
    function C() {
        this.x = 0;
    }
    C.prototype.m = function () {
        var x;
        (x = this.x);
        return x;
    };
    C.prototype.f = function () {
        var f;
        (f = this.f);
        return f;
    };
    return C;
}());
