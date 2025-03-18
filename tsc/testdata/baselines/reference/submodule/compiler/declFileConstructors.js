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
class SimpleConstructor {
    constructor() {
    }
}
exports.SimpleConstructor = SimpleConstructor;
class ConstructorWithParameters {
    constructor(a, b) {
        var d = a;
    }
}
exports.ConstructorWithParameters = ConstructorWithParameters;
class ConstructorWithRestParamters {
    constructor(a, ...rests) {
        return a + rests.join("");
    }
}
exports.ConstructorWithRestParamters = ConstructorWithRestParamters;
class ConstructorWithOverloads {
    constructor(a) {
    }
}
exports.ConstructorWithOverloads = ConstructorWithOverloads;
class ConstructorWithPublicParameterProperty {
    x;
    constructor(x) {
        this.x = x;
    }
}
exports.ConstructorWithPublicParameterProperty = ConstructorWithPublicParameterProperty;
class ConstructorWithPrivateParameterProperty {
    x;
    constructor(x) {
        this.x = x;
    }
}
exports.ConstructorWithPrivateParameterProperty = ConstructorWithPrivateParameterProperty;
class ConstructorWithOptionalParameterProperty {
    x;
    constructor(x) {
        this.x = x;
    }
}
exports.ConstructorWithOptionalParameterProperty = ConstructorWithOptionalParameterProperty;
class ConstructorWithParameterInitializer {
    x;
    constructor(x = "hello") {
        this.x = x;
    }
}
exports.ConstructorWithParameterInitializer = ConstructorWithParameterInitializer;
//// [declFileConstructors_1.js]
class GlobalSimpleConstructor {
    constructor() {
    }
}
class GlobalConstructorWithParameters {
    constructor(a, b) {
        var d = a;
    }
}
class GlobalConstructorWithRestParamters {
    constructor(a, ...rests) {
        return a + rests.join("");
    }
}
class GlobalConstructorWithOverloads {
    constructor(a) {
    }
}
class GlobalConstructorWithPublicParameterProperty {
    x;
    constructor(x) {
        this.x = x;
    }
}
class GlobalConstructorWithPrivateParameterProperty {
    x;
    constructor(x) {
        this.x = x;
    }
}
class GlobalConstructorWithOptionalParameterProperty {
    x;
    constructor(x) {
        this.x = x;
    }
}
class GlobalConstructorWithParameterInitializer {
    x;
    constructor(x = "hello") {
        this.x = x;
    }
}
