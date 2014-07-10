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
var SimpleConstructor = (function () {
    function SimpleConstructor() {
    }
    return SimpleConstructor;
})();
exports.SimpleConstructor = SimpleConstructor;
var ConstructorWithParameters = (function () {
    function ConstructorWithParameters(a, b) {
        var d = a;
    }
    return ConstructorWithParameters;
})();
exports.ConstructorWithParameters = ConstructorWithParameters;
var ConstructorWithRestParamters = (function () {
    function ConstructorWithRestParamters(a, rests) {
        var rests = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rests[_i - 1] = arguments[_i];
        }
        return a + rests.join("");
    }
    return ConstructorWithRestParamters;
})();
exports.ConstructorWithRestParamters = ConstructorWithRestParamters;
var ConstructorWithOverloads = (function () {
    function ConstructorWithOverloads(a) {
    }
    return ConstructorWithOverloads;
})();
exports.ConstructorWithOverloads = ConstructorWithOverloads;
var ConstructorWithPublicParameterProperty = (function () {
    function ConstructorWithPublicParameterProperty(x) {
        this.x = x;
    }
    return ConstructorWithPublicParameterProperty;
})();
exports.ConstructorWithPublicParameterProperty = ConstructorWithPublicParameterProperty;
var ConstructorWithPrivateParameterProperty = (function () {
    function ConstructorWithPrivateParameterProperty(x) {
        this.x = x;
    }
    return ConstructorWithPrivateParameterProperty;
})();
exports.ConstructorWithPrivateParameterProperty = ConstructorWithPrivateParameterProperty;
var ConstructorWithOptionalParameterProperty = (function () {
    function ConstructorWithOptionalParameterProperty(x) {
        this.x = x;
    }
    return ConstructorWithOptionalParameterProperty;
})();
exports.ConstructorWithOptionalParameterProperty = ConstructorWithOptionalParameterProperty;
var ConstructorWithParameterInitializer = (function () {
    function ConstructorWithParameterInitializer(x) {
        if (x === void 0) { x = "hello"; }
        this.x = x;
    }
    return ConstructorWithParameterInitializer;
})();
exports.ConstructorWithParameterInitializer = ConstructorWithParameterInitializer;
//// [declFileConstructors_1.js]
var GlobalSimpleConstructor = (function () {
    function GlobalSimpleConstructor() {
    }
    return GlobalSimpleConstructor;
})();
var GlobalConstructorWithParameters = (function () {
    function GlobalConstructorWithParameters(a, b) {
        var d = a;
    }
    return GlobalConstructorWithParameters;
})();
var GlobalConstructorWithRestParamters = (function () {
    function GlobalConstructorWithRestParamters(a, rests) {
        var rests = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rests[_i - 1] = arguments[_i];
        }
        return a + rests.join("");
    }
    return GlobalConstructorWithRestParamters;
})();
var GlobalConstructorWithOverloads = (function () {
    function GlobalConstructorWithOverloads(a) {
    }
    return GlobalConstructorWithOverloads;
})();
var GlobalConstructorWithPublicParameterProperty = (function () {
    function GlobalConstructorWithPublicParameterProperty(x) {
        this.x = x;
    }
    return GlobalConstructorWithPublicParameterProperty;
})();
var GlobalConstructorWithPrivateParameterProperty = (function () {
    function GlobalConstructorWithPrivateParameterProperty(x) {
        this.x = x;
    }
    return GlobalConstructorWithPrivateParameterProperty;
})();
var GlobalConstructorWithOptionalParameterProperty = (function () {
    function GlobalConstructorWithOptionalParameterProperty(x) {
        this.x = x;
    }
    return GlobalConstructorWithOptionalParameterProperty;
})();
var GlobalConstructorWithParameterInitializer = (function () {
    function GlobalConstructorWithParameterInitializer(x) {
        if (x === void 0) { x = "hello"; }
        this.x = x;
    }
    return GlobalConstructorWithParameterInitializer;
})();


//// [declFileConstructors_0.d.ts]
export declare class SimpleConstructor {
    constructor ();
}
export declare class ConstructorWithParameters {
    constructor (a, b);
}
export declare class ConstructorWithRestParamters {
    constructor (a, ...rests);
}
export declare class ConstructorWithOverloads {
    constructor (a);
    constructor (a);
}
export declare class ConstructorWithPublicParameterProperty {
    x;
    constructor (x);
}
export declare class ConstructorWithPrivateParameterProperty {
    private x;
    constructor (x);
}
export declare class ConstructorWithOptionalParameterProperty {
    x;
    constructor (x?);
}
export declare class ConstructorWithParameterInitializer {
    x;
    constructor (x?);
}
//// [declFileConstructors_1.d.ts]
declare class GlobalSimpleConstructor {
    constructor ();
}
declare class GlobalConstructorWithParameters {
    constructor (a, b);
}
declare class GlobalConstructorWithRestParamters {
    constructor (a, ...rests);
}
declare class GlobalConstructorWithOverloads {
    constructor (a);
    constructor (a);
}
declare class GlobalConstructorWithPublicParameterProperty {
    x;
    constructor (x);
}
declare class GlobalConstructorWithPrivateParameterProperty {
    private x;
    constructor (x);
}
declare class GlobalConstructorWithOptionalParameterProperty {
    x;
    constructor (x?);
}
declare class GlobalConstructorWithParameterInitializer {
    x;
    constructor (x?);
}
