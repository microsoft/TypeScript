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
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true
        });
    }) : (function(proto, name) {
        proto[name].name = name;
    });
    return function (proto, keys) {
        for (var i = keys.length - 1; i >= 0; i--) {
            name(proto, keys[i])
        }
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var C1 = (function () {
    function C1() {
    }
    C1.prototype.C1 = function () { }; // has to be the same as the class name
    C1.prototype.bar = function () {
        return function (t) {
        };
    };
    __names(C1.prototype, ["C1", "bar"]);
    return C1;
}());
exports.C1 = C1;
var C2 = (function () {
    function C2() {
    }
    C2.prototype.bar = function () {
        return function (t) {
        };
    };
    __names(C2.prototype, ["bar"]);
    return C2;
}());
exports.C2 = C2;
var C3 = (function () {
    function C3() {
    }
    Object.defineProperty(C3.prototype, "C3", {
        get: function () { return 0; } // has to be the same as the class name
        ,
        enumerable: true,
        configurable: true
    });
    C3.prototype.bar = function () {
        return function (t) {
        };
    };
    __names(C3.prototype, ["bar"]);
    return C3;
}());
exports.C3 = C3;
var C4 = (function () {
    function C4() {
    }
    Object.defineProperty(C4.prototype, "C4", {
        set: function (v) { } // has to be the same as the class name
        ,
        enumerable: true,
        configurable: true
    });
    C4.prototype.bar = function () {
        return function (t) {
        };
    };
    __names(C4.prototype, ["bar"]);
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
