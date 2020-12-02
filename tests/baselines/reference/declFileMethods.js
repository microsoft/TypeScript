//// [tests/cases/compiler/declFileMethods.ts] ////

//// [declFileMethods_0.ts]
export class c1 {
    /** This comment should appear for foo*/
    public foo() {
    }
    /** This is comment for function signature*/
    public fooWithParameters(/** this is comment about a*/a: string,
        /** this is comment for b*/
        b: number) {
        var d = a;
    }
    public fooWithRestParameters(a: string, ...rests: string[]) {
        return a + rests.join("");
    }

    public fooWithOverloads(a: string): string;
    public fooWithOverloads(a: number): number;
    public fooWithOverloads(a: any): any {
        return a;
    }


    /** This comment should appear for privateFoo*/
    private privateFoo() {
    }
    /** This is comment for function signature*/
    private privateFooWithParameters(/** this is comment about a*/a: string,
        /** this is comment for b*/
        b: number) {
        var d = a;
    }
    private privateFooWithRestParameters(a: string, ...rests: string[]) {
        return a + rests.join("");
    }
    private privateFooWithOverloads(a: string): string;
    private privateFooWithOverloads(a: number): number;
    private privateFooWithOverloads(a: any): any {
        return a;
    }


    /** This comment should appear for static foo*/
    static staticFoo() {
    }
    /** This is comment for function signature*/
    static staticFooWithParameters(/** this is comment about a*/a: string,
        /** this is comment for b*/
        b: number) {
        var d = a;
    }
    static staticFooWithRestParameters(a: string, ...rests: string[]) {
        return a + rests.join("");
    }
    static staticFooWithOverloads(a: string): string;
    static staticFooWithOverloads(a: number): number;
    static staticFooWithOverloads(a: any): any {
        return a;
    }


    /** This comment should appear for privateStaticFoo*/
    private static privateStaticFoo() {
    }
    /** This is comment for function signature*/
    private static privateStaticFooWithParameters(/** this is comment about a*/a: string,
        /** this is comment for b*/
        b: number) {
        var d = a;
    }
    private static privateStaticFooWithRestParameters(a: string, ...rests: string[]) {
        return a + rests.join("");
    }
    private static privateStaticFooWithOverloads(a: string): string;
    private static privateStaticFooWithOverloads(a: number): number;
    private static privateStaticFooWithOverloads(a: any): any {
        return a;
    }
}

export interface I1 {
    /** This comment should appear for foo*/
    foo(): string;

    /** This is comment for function signature*/
    fooWithParameters(/** this is comment about a*/a: string,
        /** this is comment for b*/
        b: number): void;

    fooWithRestParameters(a: string, ...rests: string[]): string;

    fooWithOverloads(a: string): string;
    fooWithOverloads(a: number): number;
}

//// [declFileMethods_1.ts]
class c2 {
    /** This comment should appear for foo*/
    public foo() {
    }
    /** This is comment for function signature*/
    public fooWithParameters(/** this is comment about a*/a: string,
        /** this is comment for b*/
        b: number) {
        var d = a;
    }
    public fooWithRestParameters(a: string, ...rests: string[]) {
        return a + rests.join("");
    }

    public fooWithOverloads(a: string): string;
    public fooWithOverloads(a: number): number;
    public fooWithOverloads(a: any): any {
        return a;
    }


    /** This comment should appear for privateFoo*/
    private privateFoo() {
    }
    /** This is comment for function signature*/
    private privateFooWithParameters(/** this is comment about a*/a: string,
        /** this is comment for b*/
        b: number) {
        var d = a;
    }
    private privateFooWithRestParameters(a: string, ...rests: string[]) {
        return a + rests.join("");
    }
    private privateFooWithOverloads(a: string): string;
    private privateFooWithOverloads(a: number): number;
    private privateFooWithOverloads(a: any): any {
        return a;
    }


    /** This comment should appear for static foo*/
    static staticFoo() {
    }
    /** This is comment for function signature*/
    static staticFooWithParameters(/** this is comment about a*/a: string,
        /** this is comment for b*/
        b: number) {
        var d = a;
    }
    static staticFooWithRestParameters(a: string, ...rests: string[]) {
        return a + rests.join("");
    }
    static staticFooWithOverloads(a: string): string;
    static staticFooWithOverloads(a: number): number;
    static staticFooWithOverloads(a: any): any {
        return a;
    }


    /** This comment should appear for privateStaticFoo*/
    private static privateStaticFoo() {
    }
    /** This is comment for function signature*/
    private static privateStaticFooWithParameters(/** this is comment about a*/a: string,
        /** this is comment for b*/
        b: number) {
        var d = a;
    }
    private static privateStaticFooWithRestParameters(a: string, ...rests: string[]) {
        return a + rests.join("");
    }
    private static privateStaticFooWithOverloads(a: string): string;
    private static privateStaticFooWithOverloads(a: number): number;
    private static privateStaticFooWithOverloads(a: any): any {
        return a;
    }
}

interface I2 {
    /** This comment should appear for foo*/
    foo(): string;

    /** This is comment for function signature*/
    fooWithParameters(/** this is comment about a*/a: string,
        /** this is comment for b*/
        b: number): void;

    fooWithRestParameters(a: string, ...rests: string[]): string;

    fooWithOverloads(a: string): string;
    fooWithOverloads(a: number): number;
}


//// [declFileMethods_0.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.c1 = void 0;
var c1 = /** @class */ (function () {
    function c1() {
    }
    var c1_prototype = c1.prototype;
    /** This comment should appear for foo*/
    c1_prototype.foo = function () {
    };
    /** This is comment for function signature*/
    c1_prototype.fooWithParameters = function (/** this is comment about a*/ a, 
    /** this is comment for b*/
    b) {
        var d = a;
    };
    c1_prototype.fooWithRestParameters = function (a) {
        var rests = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rests[_i - 1] = arguments[_i];
        }
        return a + rests.join("");
    };
    c1_prototype.fooWithOverloads = function (a) {
        return a;
    };
    /** This comment should appear for privateFoo*/
    c1_prototype.privateFoo = function () {
    };
    /** This is comment for function signature*/
    c1_prototype.privateFooWithParameters = function (/** this is comment about a*/ a, 
    /** this is comment for b*/
    b) {
        var d = a;
    };
    c1_prototype.privateFooWithRestParameters = function (a) {
        var rests = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rests[_i - 1] = arguments[_i];
        }
        return a + rests.join("");
    };
    c1_prototype.privateFooWithOverloads = function (a) {
        return a;
    };
    /** This comment should appear for static foo*/
    c1.staticFoo = function () {
    };
    /** This is comment for function signature*/
    c1.staticFooWithParameters = function (/** this is comment about a*/ a, 
    /** this is comment for b*/
    b) {
        var d = a;
    };
    c1.staticFooWithRestParameters = function (a) {
        var rests = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rests[_i - 1] = arguments[_i];
        }
        return a + rests.join("");
    };
    c1.staticFooWithOverloads = function (a) {
        return a;
    };
    /** This comment should appear for privateStaticFoo*/
    c1.privateStaticFoo = function () {
    };
    /** This is comment for function signature*/
    c1.privateStaticFooWithParameters = function (/** this is comment about a*/ a, 
    /** this is comment for b*/
    b) {
        var d = a;
    };
    c1.privateStaticFooWithRestParameters = function (a) {
        var rests = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rests[_i - 1] = arguments[_i];
        }
        return a + rests.join("");
    };
    c1.privateStaticFooWithOverloads = function (a) {
        return a;
    };
    return c1;
}());
exports.c1 = c1;
//// [declFileMethods_1.js]
var c2 = /** @class */ (function () {
    function c2() {
    }
    var c2_prototype = c2.prototype;
    /** This comment should appear for foo*/
    c2_prototype.foo = function () {
    };
    /** This is comment for function signature*/
    c2_prototype.fooWithParameters = function (/** this is comment about a*/ a, 
    /** this is comment for b*/
    b) {
        var d = a;
    };
    c2_prototype.fooWithRestParameters = function (a) {
        var rests = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rests[_i - 1] = arguments[_i];
        }
        return a + rests.join("");
    };
    c2_prototype.fooWithOverloads = function (a) {
        return a;
    };
    /** This comment should appear for privateFoo*/
    c2_prototype.privateFoo = function () {
    };
    /** This is comment for function signature*/
    c2_prototype.privateFooWithParameters = function (/** this is comment about a*/ a, 
    /** this is comment for b*/
    b) {
        var d = a;
    };
    c2_prototype.privateFooWithRestParameters = function (a) {
        var rests = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rests[_i - 1] = arguments[_i];
        }
        return a + rests.join("");
    };
    c2_prototype.privateFooWithOverloads = function (a) {
        return a;
    };
    /** This comment should appear for static foo*/
    c2.staticFoo = function () {
    };
    /** This is comment for function signature*/
    c2.staticFooWithParameters = function (/** this is comment about a*/ a, 
    /** this is comment for b*/
    b) {
        var d = a;
    };
    c2.staticFooWithRestParameters = function (a) {
        var rests = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rests[_i - 1] = arguments[_i];
        }
        return a + rests.join("");
    };
    c2.staticFooWithOverloads = function (a) {
        return a;
    };
    /** This comment should appear for privateStaticFoo*/
    c2.privateStaticFoo = function () {
    };
    /** This is comment for function signature*/
    c2.privateStaticFooWithParameters = function (/** this is comment about a*/ a, 
    /** this is comment for b*/
    b) {
        var d = a;
    };
    c2.privateStaticFooWithRestParameters = function (a) {
        var rests = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rests[_i - 1] = arguments[_i];
        }
        return a + rests.join("");
    };
    c2.privateStaticFooWithOverloads = function (a) {
        return a;
    };
    return c2;
}());


//// [declFileMethods_0.d.ts]
export declare class c1 {
    /** This comment should appear for foo*/
    foo(): void;
    /** This is comment for function signature*/
    fooWithParameters(/** this is comment about a*/ a: string, 
    /** this is comment for b*/
    b: number): void;
    fooWithRestParameters(a: string, ...rests: string[]): string;
    fooWithOverloads(a: string): string;
    fooWithOverloads(a: number): number;
    /** This comment should appear for privateFoo*/
    private privateFoo;
    /** This is comment for function signature*/
    private privateFooWithParameters;
    private privateFooWithRestParameters;
    private privateFooWithOverloads;
    /** This comment should appear for static foo*/
    static staticFoo(): void;
    /** This is comment for function signature*/
    static staticFooWithParameters(/** this is comment about a*/ a: string, 
    /** this is comment for b*/
    b: number): void;
    static staticFooWithRestParameters(a: string, ...rests: string[]): string;
    static staticFooWithOverloads(a: string): string;
    static staticFooWithOverloads(a: number): number;
    /** This comment should appear for privateStaticFoo*/
    private static privateStaticFoo;
    /** This is comment for function signature*/
    private static privateStaticFooWithParameters;
    private static privateStaticFooWithRestParameters;
    private static privateStaticFooWithOverloads;
}
export interface I1 {
    /** This comment should appear for foo*/
    foo(): string;
    /** This is comment for function signature*/
    fooWithParameters(/** this is comment about a*/ a: string, 
    /** this is comment for b*/
    b: number): void;
    fooWithRestParameters(a: string, ...rests: string[]): string;
    fooWithOverloads(a: string): string;
    fooWithOverloads(a: number): number;
}
//// [declFileMethods_1.d.ts]
declare class c2 {
    /** This comment should appear for foo*/
    foo(): void;
    /** This is comment for function signature*/
    fooWithParameters(/** this is comment about a*/ a: string, 
    /** this is comment for b*/
    b: number): void;
    fooWithRestParameters(a: string, ...rests: string[]): string;
    fooWithOverloads(a: string): string;
    fooWithOverloads(a: number): number;
    /** This comment should appear for privateFoo*/
    private privateFoo;
    /** This is comment for function signature*/
    private privateFooWithParameters;
    private privateFooWithRestParameters;
    private privateFooWithOverloads;
    /** This comment should appear for static foo*/
    static staticFoo(): void;
    /** This is comment for function signature*/
    static staticFooWithParameters(/** this is comment about a*/ a: string, 
    /** this is comment for b*/
    b: number): void;
    static staticFooWithRestParameters(a: string, ...rests: string[]): string;
    static staticFooWithOverloads(a: string): string;
    static staticFooWithOverloads(a: number): number;
    /** This comment should appear for privateStaticFoo*/
    private static privateStaticFoo;
    /** This is comment for function signature*/
    private static privateStaticFooWithParameters;
    private static privateStaticFooWithRestParameters;
    private static privateStaticFooWithOverloads;
}
interface I2 {
    /** This comment should appear for foo*/
    foo(): string;
    /** This is comment for function signature*/
    fooWithParameters(/** this is comment about a*/ a: string, 
    /** this is comment for b*/
    b: number): void;
    fooWithRestParameters(a: string, ...rests: string[]): string;
    fooWithOverloads(a: string): string;
    fooWithOverloads(a: number): number;
}
