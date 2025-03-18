//// [tests/cases/compiler/privacyTypeParameterOfFunction.ts] ////

//// [privacyTypeParameterOfFunction.ts]
class privateClass {
}

export class publicClass {
}

export interface publicInterfaceWithPrivateTypeParameters {
    // TypeParameter_0_of_constructor_signature_from_exported_interface_has_or_is_using_private_type_1
    new <T extends privateClass>(): privateClass; 

    // TypeParameter_0_of_constructor_signature_from_exported_interface_has_or_is_using_private_type_1
    <T extends privateClass>(): privateClass;

    // TypeParameter_0_of_method_from_exported_interface_has_or_is_using_private_type_1
    myMethod<T extends privateClass>(): privateClass;
}

export interface publicInterfaceWithPublicTypeParameters {
    new <T extends publicClass>(): publicClass;
    <T extends publicClass>(): publicClass;
    myMethod<T extends publicClass>(): publicClass;
}

interface privateInterfaceWithPrivateTypeParameters {
    new <T extends privateClass>(): privateClass;
    <T extends privateClass>(): privateClass;
    myMethod<T extends privateClass>(): privateClass;
}

interface privateInterfaceWithPublicTypeParameters {
    new <T extends publicClass>(): publicClass;
    <T extends publicClass>(): publicClass;
    myMethod<T extends publicClass>(): publicClass;
}

export class publicClassWithWithPrivateTypeParameters {
    // TypeParameter_0_of_public_static_method_from_exported_class_has_or_is_using_private_type_1
    static myPublicStaticMethod<T extends privateClass>() {
    }
    private static myPrivateStaticMethod<T extends privateClass>() { // No error
    }
    // TypeParameter_0_of_public_method_from_exported_class_has_or_is_using_private_type_1
    myPublicMethod<T extends privateClass>() {
    }
    private myPrivateMethod<T extends privateClass>() { // No error
    }
}

export class publicClassWithWithPublicTypeParameters {
    static myPublicStaticMethod<T extends publicClass>() {
    }
    private static myPrivateStaticMethod<T extends publicClass>() { 
    }
    myPublicMethod<T extends publicClass>() {
    }
    private myPrivateMethod<T extends publicClass>() {
    }
}

class privateClassWithWithPrivateTypeParameters {
    static myPublicStaticMethod<T extends privateClass>() {
    }
    private static myPrivateStaticMethod<T extends privateClass>() { // No error
    }
    myPublicMethod<T extends privateClass>() {
    }
    private myPrivateMethod<T extends privateClass>() { // No error
    }
}

class privateClassWithWithPublicTypeParameters {
    static myPublicStaticMethod<T extends publicClass>() {
    }
    private static myPrivateStaticMethod<T extends publicClass>() {
    }
    myPublicMethod<T extends publicClass>() {
    }
    private myPrivateMethod<T extends publicClass>() {
    }
}

// TypeParameter_0_of_exported_function_has_or_is_using_private_type_1
export function publicFunctionWithPrivateTypeParameters<T extends privateClass>() {
}

export function publicFunctionWithPublicTypeParameters<T extends publicClass>() {
}

function privateFunctionWithPrivateTypeParameters<T extends privateClass>() {
}

function privateFunctionWithPublicTypeParameters<T extends publicClass>() {
}

export interface publicInterfaceWithPublicTypeParametersWithoutExtends {
    new <T>(): publicClass;
    <T>(): publicClass;
    myMethod<T>(): publicClass;
}

interface privateInterfaceWithPublicTypeParametersWithoutExtends {
    new <T>(): publicClass;
    <T>(): publicClass;
    myMethod<T>(): publicClass;
}

export class publicClassWithWithPublicTypeParametersWithoutExtends {
    static myPublicStaticMethod<T>() {
    }
    private static myPrivateStaticMethod<T>() {
    }
    myPublicMethod<T>() {
    }
    private myPrivateMethod<T>() {
    }
}
class privateClassWithWithPublicTypeParametersWithoutExtends {
    static myPublicStaticMethod<T>() {
    }
    private static myPrivateStaticMethod<T>() {
    }
    myPublicMethod<T>() {
    }
    private myPrivateMethod<T>() {
    }
}

export function publicFunctionWithPublicTypeParametersWithoutExtends<T>() {
}

function privateFunctionWithPublicTypeParametersWithoutExtends<T>() {
}

//// [privacyTypeParameterOfFunction.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicClassWithWithPublicTypeParametersWithoutExtends = exports.publicClassWithWithPublicTypeParameters = exports.publicClassWithWithPrivateTypeParameters = exports.publicClass = void 0;
exports.publicFunctionWithPrivateTypeParameters = publicFunctionWithPrivateTypeParameters;
exports.publicFunctionWithPublicTypeParameters = publicFunctionWithPublicTypeParameters;
exports.publicFunctionWithPublicTypeParametersWithoutExtends = publicFunctionWithPublicTypeParametersWithoutExtends;
class privateClass {
}
class publicClass {
}
exports.publicClass = publicClass;
class publicClassWithWithPrivateTypeParameters {
    static myPublicStaticMethod() {
    }
    static myPrivateStaticMethod() {
    }
    myPublicMethod() {
    }
    myPrivateMethod() {
    }
}
exports.publicClassWithWithPrivateTypeParameters = publicClassWithWithPrivateTypeParameters;
class publicClassWithWithPublicTypeParameters {
    static myPublicStaticMethod() {
    }
    static myPrivateStaticMethod() {
    }
    myPublicMethod() {
    }
    myPrivateMethod() {
    }
}
exports.publicClassWithWithPublicTypeParameters = publicClassWithWithPublicTypeParameters;
class privateClassWithWithPrivateTypeParameters {
    static myPublicStaticMethod() {
    }
    static myPrivateStaticMethod() {
    }
    myPublicMethod() {
    }
    myPrivateMethod() {
    }
}
class privateClassWithWithPublicTypeParameters {
    static myPublicStaticMethod() {
    }
    static myPrivateStaticMethod() {
    }
    myPublicMethod() {
    }
    myPrivateMethod() {
    }
}
function publicFunctionWithPrivateTypeParameters() {
}
function publicFunctionWithPublicTypeParameters() {
}
function privateFunctionWithPrivateTypeParameters() {
}
function privateFunctionWithPublicTypeParameters() {
}
class publicClassWithWithPublicTypeParametersWithoutExtends {
    static myPublicStaticMethod() {
    }
    static myPrivateStaticMethod() {
    }
    myPublicMethod() {
    }
    myPrivateMethod() {
    }
}
exports.publicClassWithWithPublicTypeParametersWithoutExtends = publicClassWithWithPublicTypeParametersWithoutExtends;
class privateClassWithWithPublicTypeParametersWithoutExtends {
    static myPublicStaticMethod() {
    }
    static myPrivateStaticMethod() {
    }
    myPublicMethod() {
    }
    myPrivateMethod() {
    }
}
function publicFunctionWithPublicTypeParametersWithoutExtends() {
}
function privateFunctionWithPublicTypeParametersWithoutExtends() {
}
