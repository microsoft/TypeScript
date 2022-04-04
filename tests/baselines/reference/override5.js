//// [override5.ts]
class B {
    p1: number = 1;
    p2: number = 2;
    p3: number = 3;
    p4: number = 4;
    oop: number;
    pp: number;
    op: number;
}

class D extends B{
    declare p1: number

    override declare p2: number;

    readonly override p3: number;

    override readonly p4: number;

    static override sp: number;

    override override oop: number;

    public override pp: number;
    override public op: number;

    override constructor () {
        super();
    }
}


abstract class AB {
    abstract f (): void;
    abstract b (): void;
}

abstract class AD extends AB {
    override abstract f(): void;
    abstract override b(): void;
}

abstract class AND {
    override abstract f(): void;
    abstract override b(): void;
}

class ADD extends AD {
    f(): void {

    }
    override b(): void {

    }
}


//// [override5.js]
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var B = /** @class */ (function () {
    function B() {
        this.p1 = 1;
        this.p2 = 2;
        this.p3 = 3;
        this.p4 = 4;
    }
    return B;
}());
var D = /** @class */ (function (_super) {
    __extends(D, _super);
    function D() {
        return _super.call(this) || this;
    }
    return D;
}(B));
var AB = /** @class */ (function () {
    function AB() {
    }
    return AB;
}());
var AD = /** @class */ (function (_super) {
    __extends(AD, _super);
    function AD() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return AD;
}(AB));
var AND = /** @class */ (function () {
    function AND() {
    }
    return AND;
}());
var ADD = /** @class */ (function (_super) {
    __extends(ADD, _super);
    function ADD() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ADD.prototype.f = function () {
    };
    ADD.prototype.b = function () {
    };
    return ADD;
}(AD));


//// [override5.d.ts]
declare class B {
    p1: number;
    p2: number;
    p3: number;
    p4: number;
    oop: number;
    pp: number;
    op: number;
}
declare class D extends B {
    p1: number;
    p2: number;
    readonly p3: number;
    readonly p4: number;
    static sp: number;
    oop: number;
    pp: number;
    op: number;
    constructor();
}
declare abstract class AB {
    abstract f(): void;
    abstract b(): void;
}
declare abstract class AD extends AB {
    abstract f(): void;
    abstract b(): void;
}
declare abstract class AND {
    abstract f(): void;
    abstract b(): void;
}
declare class ADD extends AD {
    f(): void;
    b(): void;
}
