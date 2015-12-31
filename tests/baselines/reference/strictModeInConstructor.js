//// [strictModeInConstructor.ts]
class A {
}

 

class B extends A {
    public s: number = 9;

    constructor () {
        "use strict";   // No error
        super();
    }
}

class C extends A {
    public s: number = 9;

    constructor () {
        super();            // No error
        "use strict";
    }
}

class D extends A {
    public s: number = 9;

    constructor () {
        var x = 1; // Error
        super();
        "use strict";
    }
}

class Bs extends A {
    public static s: number = 9;

    constructor () {
        "use strict";   // No error
        super();
    }
}

class Cs extends A {
    public static s: number = 9;

    constructor () {
        super();            // No error
        "use strict";
    }
}

class Ds extends A {
    public static s: number = 9;

    constructor () {
        var x = 1; // no Error
        super();
        "use strict";
    }
}

//// [strictModeInConstructor.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var A = (function () {
    function A() {
    }
    return A;
}());
var B = (function (_super) {
    __extends(B, _super);
    function B() {
        "use strict"; // No error
        this.s = 9;
        _super.call(this);
    }
    return B;
}(A));
var C = (function (_super) {
    __extends(C, _super);
    function C() {
        _super.call(this); // No error
        this.s = 9;
        "use strict";
    }
    return C;
}(A));
var D = (function (_super) {
    __extends(D, _super);
    function D() {
        this.s = 9;
        var x = 1; // Error
        _super.call(this);
        "use strict";
    }
    return D;
}(A));
var Bs = (function (_super) {
    __extends(Bs, _super);
    function Bs() {
        "use strict"; // No error
        _super.call(this);
    }
    Bs.s = 9;
    return Bs;
}(A));
var Cs = (function (_super) {
    __extends(Cs, _super);
    function Cs() {
        _super.call(this); // No error
        "use strict";
    }
    Cs.s = 9;
    return Cs;
}(A));
var Ds = (function (_super) {
    __extends(Ds, _super);
    function Ds() {
        var x = 1; // no Error
        _super.call(this);
        "use strict";
    }
    Ds.s = 9;
    return Ds;
}(A));
