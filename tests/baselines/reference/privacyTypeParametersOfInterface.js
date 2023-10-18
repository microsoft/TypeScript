//// [tests/cases/compiler/privacyTypeParametersOfInterface.ts] ////

//// [privacyTypeParametersOfInterface.ts]
class privateClass {
}

export class publicClass {
}

class privateClassT<T> {
}

export class publicClassT<T> {
}

// TypeParameter_0_of_exported_interface_1_has_or_is_using_private_type_2
export interface publicInterfaceWithPrivateTypeParameters<T extends privateClass> {
    myMethod(val: T): T; // Error
    myMethod0(): publicClassT<T>; // error
    myMethod1(): privateClassT<privateClass>; // error
    myMethod2(): privateClassT<publicClass>; // error
    myMethod3(): publicClassT<privateClass>; //error
    myMethod4(): publicClassT<publicClass>; // no error
}

export interface publicInterfaceWithPublicTypeParameters<T extends publicClass> {
    myMethod(val: T): T; // No Error
    myMethod0(): publicClassT<T>; // No error
    myMethod1(): privateClassT<privateClass>; // error
    myMethod2(): privateClassT<publicClass>; // error
    myMethod3(): publicClassT<privateClass>; //error
    myMethod4(): publicClassT<publicClass>; // no error
}

interface privateInterfaceWithPrivateTypeParameters<T extends privateClass> {
    myMethod(val: T): T; // No Error
    myMethod0(): publicClassT<T>; // No error
    myMethod1(): privateClassT<privateClass>; // No error
    myMethod2(): privateClassT<publicClass>; // No error
    myMethod3(): publicClassT<privateClass>; //No error
    myMethod4(): publicClassT<publicClass>; // no error
}

interface privateInterfaceWithPublicTypeParameters<T extends publicClass> {
    myMethod(val: T): T; // No Error
    myMethod0(): publicClassT<T>; // No error
    myMethod1(): privateClassT<privateClass>; // No error
    myMethod2(): privateClassT<publicClass>; // No error
    myMethod3(): publicClassT<privateClass>; //No error
    myMethod4(): publicClassT<publicClass>; // no error
}

export interface publicInterfaceWithPublicTypeParametersWithoutExtends<T> {
    myMethod(val: T): T; // No Error
    myMethod0(): publicClassT<T>; // No error
}

interface privateInterfaceWithPublicTypeParametersWithoutExtends<T> {
    myMethod(val: T): T; // No Error
    myMethod0(): publicClassT<T>; // No error
}

//// [privacyTypeParametersOfInterface.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicClassT = exports.publicClass = void 0;
var privateClass = /** @class */ (function () {
    function privateClass() {
    }
    return privateClass;
}());
var publicClass = /** @class */ (function () {
    function publicClass() {
    }
    return publicClass;
}());
exports.publicClass = publicClass;
var privateClassT = /** @class */ (function () {
    function privateClassT() {
    }
    return privateClassT;
}());
var publicClassT = /** @class */ (function () {
    function publicClassT() {
    }
    return publicClassT;
}());
exports.publicClassT = publicClassT;
