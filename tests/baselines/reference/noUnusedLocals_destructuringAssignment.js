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
    var proto_1 = C.prototype;
    proto_1.m = function () {
        var x;
        (x = this.x);
        return x;
    };
    proto_1.f = function () {
        var f;
        (f = this.f);
        return f;
    };
    return C;
}());
