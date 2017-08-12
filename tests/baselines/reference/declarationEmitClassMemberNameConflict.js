//// [declarationEmitClassMemberNameConflict.ts]
export class C1 {
    C1() { } // has to be the same as the class name

    bar() {
        return function (t: typeof C1) {
        };
    }
}

export class C2 {
    C2: any // has to be the same as the class name

    bar() {
        return function (t: typeof C2) {
        };
    }
}

export class C3 {
    get C3() { return 0; } // has to be the same as the class name

    bar() {
        return function (t: typeof C3) {
        };
    }
}

export class C4 {
    set C4(v) { } // has to be the same as the class name

    bar() {
        return function (t: typeof C4) {
        };
    }
}

//// [declarationEmitClassMemberNameConflict.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var C1 = (function () {
    function C1() {
    }
    var proto_1 = C1.prototype;
    proto_1.C1 = function () { }; // has to be the same as the class name
    proto_1.bar = function () {
        return function (t) {
        };
    };
    return C1;
}());
exports.C1 = C1;
var C2 = (function () {
    function C2() {
    }
    var proto_2 = C2.prototype;
    proto_2.bar = function () {
        return function (t) {
        };
    };
    return C2;
}());
exports.C2 = C2;
var C3 = (function () {
    function C3() {
    }
    var proto_3 = C3.prototype;
    Object.defineProperty(proto_3, "C3", {
        get: function () { return 0; } // has to be the same as the class name
        ,
        enumerable: true,
        configurable: true
    });
    proto_3.bar = function () {
        return function (t) {
        };
    };
    return C3;
}());
exports.C3 = C3;
var C4 = (function () {
    function C4() {
    }
    var proto_4 = C4.prototype;
    Object.defineProperty(proto_4, "C4", {
        set: function (v) { } // has to be the same as the class name
        ,
        enumerable: true,
        configurable: true
    });
    proto_4.bar = function () {
        return function (t) {
        };
    };
    return C4;
}());
exports.C4 = C4;


//// [declarationEmitClassMemberNameConflict.d.ts]
export declare class C1 {
    C1(): void;
    bar(): (t: typeof C1) => void;
}
export declare class C2 {
    C2: any;
    bar(): (t: typeof C2) => void;
}
export declare class C3 {
    readonly C3: number;
    bar(): (t: typeof C3) => void;
}
export declare class C4 {
    C4: any;
    bar(): (t: typeof C4) => void;
}
