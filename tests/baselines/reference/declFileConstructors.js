//// [tests/cases/compiler/declFileConstructors.ts] ////

//// [declFileConstructors_0.ts]
export class SimpleConstructor {
    /** This comment should appear for foo*/
    constructor() {
    }
}
export class ConstructorWithParameters {
    /** This is comment for function signature*/
    constructor(/** this is comment about a*/a: string,
        /** this is comment for b*/
        b: number) {
        var d = a;
    }
}

export class ConstructorWithRestParamters {
    constructor(a: string, ...rests: string[]) {
        return a + rests.join("");
    }
}

export class ConstructorWithOverloads {
    constructor(a: string);
    constructor(a: number);
    constructor(a: any) {
    }
}

export class ConstructorWithPublicParameterProperty {
    constructor(public x: string) {
    }
}

export class ConstructorWithPrivateParameterProperty {
    constructor(private x: string) {
    }
}

export class ConstructorWithOptionalParameterProperty {
    constructor(public x?: string) {
    }
}

export class ConstructorWithParameterInitializer {
    constructor(public x = "hello") {
    }
}

//// [declFileConstructors_1.ts]
class GlobalSimpleConstructor {
    /** This comment should appear for foo*/
    constructor() {
    }
}
class GlobalConstructorWithParameters {
    /** This is comment for function signature*/
    constructor(/** this is comment about a*/a: string,
        /** this is comment for b*/
        b: number) {
        var d = a;
    }
}

class GlobalConstructorWithRestParamters {
    constructor(a: string, ...rests: string[]) {
        return a + rests.join("");
    }
}

class GlobalConstructorWithOverloads {
    constructor(a: string);
    constructor(a: number);
    constructor(a: any) {
    }
}

class GlobalConstructorWithPublicParameterProperty {
    constructor(public x: string) {
    }
}

class GlobalConstructorWithPrivateParameterProperty {
    constructor(private x: string) {
    }
}

class GlobalConstructorWithOptionalParameterProperty {
    constructor(public x?: string) {
    }
}

class GlobalConstructorWithParameterInitializer {
    constructor(public x = "hello") {
    }
}

//// [declFileConstructors_0.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConstructorWithParameterInitializer = exports.ConstructorWithOptionalParameterProperty = exports.ConstructorWithPrivateParameterProperty = exports.ConstructorWithPublicParameterProperty = exports.ConstructorWithOverloads = exports.ConstructorWithRestParamters = exports.ConstructorWithParameters = exports.SimpleConstructor = void 0;
var SimpleConstructor = /** @class */ (function () {
    /** This comment should appear for foo*/
    function SimpleConstructor() {
    }
    return SimpleConstructor;
}());
exports.SimpleConstructor = SimpleConstructor;
var ConstructorWithParameters = /** @class */ (function () {
    /** This is comment for function signature*/
    function ConstructorWithParameters(/** this is comment about a*/ a, 
    /** this is comment for b*/
    b) {
        var d = a;
    }
    return ConstructorWithParameters;
}());
exports.ConstructorWithParameters = ConstructorWithParameters;
var ConstructorWithRestParamters = /** @class */ (function () {
    function ConstructorWithRestParamters(a) {
        var rests = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rests[_i - 1] = arguments[_i];
        }
        return a + rests.join("");
    }
    return ConstructorWithRestParamters;
}());
exports.ConstructorWithRestParamters = ConstructorWithRestParamters;
var ConstructorWithOverloads = /** @class */ (function () {
    function ConstructorWithOverloads(a) {
    }
    return ConstructorWithOverloads;
}());
exports.ConstructorWithOverloads = ConstructorWithOverloads;
var ConstructorWithPublicParameterProperty = /** @class */ (function () {
    function ConstructorWithPublicParameterProperty(x) {
        this.x = x;
    }
    return ConstructorWithPublicParameterProperty;
}());
exports.ConstructorWithPublicParameterProperty = ConstructorWithPublicParameterProperty;
var ConstructorWithPrivateParameterProperty = /** @class */ (function () {
    function ConstructorWithPrivateParameterProperty(x) {
        this.x = x;
    }
    return ConstructorWithPrivateParameterProperty;
}());
exports.ConstructorWithPrivateParameterProperty = ConstructorWithPrivateParameterProperty;
var ConstructorWithOptionalParameterProperty = /** @class */ (function () {
    function ConstructorWithOptionalParameterProperty(x) {
        this.x = x;
    }
    return ConstructorWithOptionalParameterProperty;
}());
exports.ConstructorWithOptionalParameterProperty = ConstructorWithOptionalParameterProperty;
var ConstructorWithParameterInitializer = /** @class */ (function () {
    function ConstructorWithParameterInitializer(x) {
        if (x === void 0) { x = "hello"; }
        this.x = x;
    }
    return ConstructorWithParameterInitializer;
}());
exports.ConstructorWithParameterInitializer = ConstructorWithParameterInitializer;
//// [declFileConstructors_1.js]
var GlobalSimpleConstructor = /** @class */ (function () {
    /** This comment should appear for foo*/
    function GlobalSimpleConstructor() {
    }
    return GlobalSimpleConstructor;
}());
var GlobalConstructorWithParameters = /** @class */ (function () {
    /** This is comment for function signature*/
    function GlobalConstructorWithParameters(/** this is comment about a*/ a, 
    /** this is comment for b*/
    b) {
        var d = a;
    }
    return GlobalConstructorWithParameters;
}());
var GlobalConstructorWithRestParamters = /** @class */ (function () {
    function GlobalConstructorWithRestParamters(a) {
        var rests = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rests[_i - 1] = arguments[_i];
        }
        return a + rests.join("");
    }
    return GlobalConstructorWithRestParamters;
}());
var GlobalConstructorWithOverloads = /** @class */ (function () {
    function GlobalConstructorWithOverloads(a) {
    }
    return GlobalConstructorWithOverloads;
}());
var GlobalConstructorWithPublicParameterProperty = /** @class */ (function () {
    function GlobalConstructorWithPublicParameterProperty(x) {
        this.x = x;
    }
    return GlobalConstructorWithPublicParameterProperty;
}());
var GlobalConstructorWithPrivateParameterProperty = /** @class */ (function () {
    function GlobalConstructorWithPrivateParameterProperty(x) {
        this.x = x;
    }
    return GlobalConstructorWithPrivateParameterProperty;
}());
var GlobalConstructorWithOptionalParameterProperty = /** @class */ (function () {
    function GlobalConstructorWithOptionalParameterProperty(x) {
        this.x = x;
    }
    return GlobalConstructorWithOptionalParameterProperty;
}());
var GlobalConstructorWithParameterInitializer = /** @class */ (function () {
    function GlobalConstructorWithParameterInitializer(x) {
        if (x === void 0) { x = "hello"; }
        this.x = x;
    }
    return GlobalConstructorWithParameterInitializer;
}());


//// [declFileConstructors_0.d.ts]
export declare class SimpleConstructor {
    /** This comment should appear for foo*/
    constructor();
}
export declare class ConstructorWithParameters {
    /** This is comment for function signature*/
    constructor(/** this is comment about a*/ a: string, 
    /** this is comment for b*/
    b: number);
}
export declare class ConstructorWithRestParamters {
    constructor(a: string, ...rests: string[]);
}
export declare class ConstructorWithOverloads {
    constructor(a: string);
    constructor(a: number);
}
export declare class ConstructorWithPublicParameterProperty {
    x: string;
    constructor(x: string);
}
export declare class ConstructorWithPrivateParameterProperty {
    private x;
    constructor(x: string);
}
export declare class ConstructorWithOptionalParameterProperty {
    x?: string;
    constructor(x?: string);
}
export declare class ConstructorWithParameterInitializer {
    x: string;
    constructor(x?: string);
}
//// [declFileConstructors_1.d.ts]
declare class GlobalSimpleConstructor {
    /** This comment should appear for foo*/
    constructor();
}
declare class GlobalConstructorWithParameters {
    /** This is comment for function signature*/
    constructor(/** this is comment about a*/ a: string, 
    /** this is comment for b*/
    b: number);
}
declare class GlobalConstructorWithRestParamters {
    constructor(a: string, ...rests: string[]);
}
declare class GlobalConstructorWithOverloads {
    constructor(a: string);
    constructor(a: number);
}
declare class GlobalConstructorWithPublicParameterProperty {
    x: string;
    constructor(x: string);
}
declare class GlobalConstructorWithPrivateParameterProperty {
    private x;
    constructor(x: string);
}
declare class GlobalConstructorWithOptionalParameterProperty {
    x?: string;
    constructor(x?: string);
}
declare class GlobalConstructorWithParameterInitializer {
    x: string;
    constructor(x?: string);
}
