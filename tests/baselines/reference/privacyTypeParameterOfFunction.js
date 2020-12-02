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
exports.__esModule = true;
exports.publicFunctionWithPublicTypeParametersWithoutExtends = exports.publicClassWithWithPublicTypeParametersWithoutExtends = exports.publicFunctionWithPublicTypeParameters = exports.publicFunctionWithPrivateTypeParameters = exports.publicClassWithWithPublicTypeParameters = exports.publicClassWithWithPrivateTypeParameters = exports.publicClass = void 0;
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
var publicClassWithWithPrivateTypeParameters = /** @class */ (function () {
    function publicClassWithWithPrivateTypeParameters() {
    }
    var publicClassWithWithPrivateTypeParameters_prototype = publicClassWithWithPrivateTypeParameters.prototype;
    // TypeParameter_0_of_public_static_method_from_exported_class_has_or_is_using_private_type_1
    publicClassWithWithPrivateTypeParameters.myPublicStaticMethod = function () {
    };
    publicClassWithWithPrivateTypeParameters.myPrivateStaticMethod = function () {
    };
    // TypeParameter_0_of_public_method_from_exported_class_has_or_is_using_private_type_1
    publicClassWithWithPrivateTypeParameters_prototype.myPublicMethod = function () {
    };
    publicClassWithWithPrivateTypeParameters_prototype.myPrivateMethod = function () {
    };
    return publicClassWithWithPrivateTypeParameters;
}());
exports.publicClassWithWithPrivateTypeParameters = publicClassWithWithPrivateTypeParameters;
var publicClassWithWithPublicTypeParameters = /** @class */ (function () {
    function publicClassWithWithPublicTypeParameters() {
    }
    var publicClassWithWithPublicTypeParameters_prototype = publicClassWithWithPublicTypeParameters.prototype;
    publicClassWithWithPublicTypeParameters.myPublicStaticMethod = function () {
    };
    publicClassWithWithPublicTypeParameters.myPrivateStaticMethod = function () {
    };
    publicClassWithWithPublicTypeParameters_prototype.myPublicMethod = function () {
    };
    publicClassWithWithPublicTypeParameters_prototype.myPrivateMethod = function () {
    };
    return publicClassWithWithPublicTypeParameters;
}());
exports.publicClassWithWithPublicTypeParameters = publicClassWithWithPublicTypeParameters;
var privateClassWithWithPrivateTypeParameters = /** @class */ (function () {
    function privateClassWithWithPrivateTypeParameters() {
    }
    var privateClassWithWithPrivateTypeParameters_prototype = privateClassWithWithPrivateTypeParameters.prototype;
    privateClassWithWithPrivateTypeParameters.myPublicStaticMethod = function () {
    };
    privateClassWithWithPrivateTypeParameters.myPrivateStaticMethod = function () {
    };
    privateClassWithWithPrivateTypeParameters_prototype.myPublicMethod = function () {
    };
    privateClassWithWithPrivateTypeParameters_prototype.myPrivateMethod = function () {
    };
    return privateClassWithWithPrivateTypeParameters;
}());
var privateClassWithWithPublicTypeParameters = /** @class */ (function () {
    function privateClassWithWithPublicTypeParameters() {
    }
    var privateClassWithWithPublicTypeParameters_prototype = privateClassWithWithPublicTypeParameters.prototype;
    privateClassWithWithPublicTypeParameters.myPublicStaticMethod = function () {
    };
    privateClassWithWithPublicTypeParameters.myPrivateStaticMethod = function () {
    };
    privateClassWithWithPublicTypeParameters_prototype.myPublicMethod = function () {
    };
    privateClassWithWithPublicTypeParameters_prototype.myPrivateMethod = function () {
    };
    return privateClassWithWithPublicTypeParameters;
}());
// TypeParameter_0_of_exported_function_has_or_is_using_private_type_1
function publicFunctionWithPrivateTypeParameters() {
}
exports.publicFunctionWithPrivateTypeParameters = publicFunctionWithPrivateTypeParameters;
function publicFunctionWithPublicTypeParameters() {
}
exports.publicFunctionWithPublicTypeParameters = publicFunctionWithPublicTypeParameters;
function privateFunctionWithPrivateTypeParameters() {
}
function privateFunctionWithPublicTypeParameters() {
}
var publicClassWithWithPublicTypeParametersWithoutExtends = /** @class */ (function () {
    function publicClassWithWithPublicTypeParametersWithoutExtends() {
    }
    var publicClassWithWithPublicTypeParametersWithoutExtends_prototype = publicClassWithWithPublicTypeParametersWithoutExtends.prototype;
    publicClassWithWithPublicTypeParametersWithoutExtends.myPublicStaticMethod = function () {
    };
    publicClassWithWithPublicTypeParametersWithoutExtends.myPrivateStaticMethod = function () {
    };
    publicClassWithWithPublicTypeParametersWithoutExtends_prototype.myPublicMethod = function () {
    };
    publicClassWithWithPublicTypeParametersWithoutExtends_prototype.myPrivateMethod = function () {
    };
    return publicClassWithWithPublicTypeParametersWithoutExtends;
}());
exports.publicClassWithWithPublicTypeParametersWithoutExtends = publicClassWithWithPublicTypeParametersWithoutExtends;
var privateClassWithWithPublicTypeParametersWithoutExtends = /** @class */ (function () {
    function privateClassWithWithPublicTypeParametersWithoutExtends() {
    }
    var privateClassWithWithPublicTypeParametersWithoutExtends_prototype = privateClassWithWithPublicTypeParametersWithoutExtends.prototype;
    privateClassWithWithPublicTypeParametersWithoutExtends.myPublicStaticMethod = function () {
    };
    privateClassWithWithPublicTypeParametersWithoutExtends.myPrivateStaticMethod = function () {
    };
    privateClassWithWithPublicTypeParametersWithoutExtends_prototype.myPublicMethod = function () {
    };
    privateClassWithWithPublicTypeParametersWithoutExtends_prototype.myPrivateMethod = function () {
    };
    return privateClassWithWithPublicTypeParametersWithoutExtends;
}());
function publicFunctionWithPublicTypeParametersWithoutExtends() {
}
exports.publicFunctionWithPublicTypeParametersWithoutExtends = publicFunctionWithPublicTypeParametersWithoutExtends;
function privateFunctionWithPublicTypeParametersWithoutExtends() {
}
