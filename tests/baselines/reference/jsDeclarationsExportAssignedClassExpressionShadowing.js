//// [index.js]
// TODO: Fixup
class A {
    member = new Q();
}
class Q {
    x = 42;
}
module.exports = class Q {
    constructor() {
        this.x = new A();
    }
}
module.exports.Another = Q;


//// [index.js]
// TODO: Fixup
var A = /** @class */ (function () {
    function A() {
        this.member = new Q();
    }
    return A;
}());
var Q = /** @class */ (function () {
    function Q() {
        this.x = 42;
    }
    return Q;
}());
module.exports = /** @class */ (function () {
    function Q() {
        this.x = new A();
    }
    return Q;
}());
module.exports.Another = Q;


//// [index.d.ts]
export = Q;
declare class Q {
    x: A;
}
declare namespace Q {
    export { Another };
}
declare class A {
    member: Q;
}
declare var Another: typeof Q;
declare class Q {
    x: number;
}


//// [DtsFileErrors]


out/index.d.ts(2,15): error TS2300: Duplicate identifier 'Q'.
out/index.d.ts(5,19): error TS2300: Duplicate identifier 'Q'.
out/index.d.ts(12,15): error TS2300: Duplicate identifier 'Q'.


==== ./out/index.d.ts (3 errors) ====
    export = Q;
    declare class Q {
                  ~
!!! error TS2300: Duplicate identifier 'Q'.
        x: A;
    }
    declare namespace Q {
                      ~
!!! error TS2300: Duplicate identifier 'Q'.
        export { Another };
    }
    declare class A {
        member: Q;
    }
    declare var Another: typeof Q;
    declare class Q {
                  ~
!!! error TS2300: Duplicate identifier 'Q'.
        x: number;
    }
    