//// [privacyTypeParameterOfFunctionDeclFile.ts]
class privateClass {
}

export class publicClass {
}

export interface publicInterfaceWithPrivateTypeParameters {
    new <T extends privateClass>(): privateClass;  // Error
    <T extends privateClass>(): privateClass;  // Error
    myMethod<T extends privateClass>(): privateClass;  // Error
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
    static myPublicStaticMethod<T extends privateClass>() {  // Error
    }
    private static myPrivateStaticMethod<T extends privateClass>() {
    }
    myPublicMethod<T extends privateClass>() {  // Error
    }
    private myPrivateMethod<T extends privateClass>() {
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
    private static myPrivateStaticMethod<T extends privateClass>() {
    }
    myPublicMethod<T extends privateClass>() {
    }
    private myPrivateMethod<T extends privateClass>() {
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

export function publicFunctionWithPrivateTypeParameters<T extends privateClass>() {  // Error
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

export interface publicInterfaceWithPrivatModuleTypeParameters {
    new <T extends privateModule.publicClass>(): privateModule.publicClass;  // Error
    <T extends privateModule.publicClass>(): privateModule.publicClass;  // Error
    myMethod<T extends privateModule.publicClass>(): privateModule.publicClass;  // Error
}
export class publicClassWithWithPrivateModuleTypeParameters {
    static myPublicStaticMethod<T extends privateModule.publicClass>() {  // Error
    }
    myPublicMethod<T extends privateModule.publicClass>() {  // Error
    }
}
export function publicFunctionWithPrivateMopduleTypeParameters<T extends privateModule.publicClass>() {  // Error
}


interface privateInterfaceWithPrivatModuleTypeParameters {
    new <T extends privateModule.publicClass>(): privateModule.publicClass;
    <T extends privateModule.publicClass>(): privateModule.publicClass;
    myMethod<T extends privateModule.publicClass>(): privateModule.publicClass;
}
class privateClassWithWithPrivateModuleTypeParameters {
    static myPublicStaticMethod<T extends privateModule.publicClass>() {
    }
    myPublicMethod<T extends privateModule.publicClass>() {
    }
}
function privateFunctionWithPrivateMopduleTypeParameters<T extends privateModule.publicClass>() {
}


export module publicModule {
    class privateClass {
    }

    export class publicClass {
    }

    export interface publicInterfaceWithPrivateTypeParameters {
        new <T extends privateClass>(): privateClass;  // Error
        <T extends privateClass>(): privateClass;  // Error
        myMethod<T extends privateClass>(): privateClass;  // Error
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
        static myPublicStaticMethod<T extends privateClass>() {  // Error
        }
        private static myPrivateStaticMethod<T extends privateClass>() {
        }
        myPublicMethod<T extends privateClass>() {  // Error
        }
        private myPrivateMethod<T extends privateClass>() {
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
        private static myPrivateStaticMethod<T extends privateClass>() {
        }
        myPublicMethod<T extends privateClass>() {
        }
        private myPrivateMethod<T extends privateClass>() {
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

    export function publicFunctionWithPrivateTypeParameters<T extends privateClass>() {  // Error
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

    export interface publicInterfaceWithPrivatModuleTypeParameters {
        new <T extends privateModule.publicClass>(): privateModule.publicClass;  // Error
        <T extends privateModule.publicClass>(): privateModule.publicClass;  // Error
        myMethod<T extends privateModule.publicClass>(): privateModule.publicClass;  // Error
    }
    export class publicClassWithWithPrivateModuleTypeParameters {
        static myPublicStaticMethod<T extends privateModule.publicClass>() {  // Error
        }
        myPublicMethod<T extends privateModule.publicClass>() {  // Error
        }
    }
    export function publicFunctionWithPrivateMopduleTypeParameters<T extends privateModule.publicClass>() {  // Error
    }


    interface privateInterfaceWithPrivatModuleTypeParameters {
        new <T extends privateModule.publicClass>(): privateModule.publicClass;  
        <T extends privateModule.publicClass>(): privateModule.publicClass;  
        myMethod<T extends privateModule.publicClass>(): privateModule.publicClass;  
    }
    class privateClassWithWithPrivateModuleTypeParameters {
        static myPublicStaticMethod<T extends privateModule.publicClass>() {  
        }
        myPublicMethod<T extends privateModule.publicClass>() { 
        }
    }
    function privateFunctionWithPrivateMopduleTypeParameters<T extends privateModule.publicClass>() { 
    }

}

module privateModule {
    class privateClass {
    }

    export class publicClass {
    }

    export interface publicInterfaceWithPrivateTypeParameters {
        new <T extends privateClass>(): privateClass; 
        <T extends privateClass>(): privateClass;
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
        static myPublicStaticMethod<T extends privateClass>() { 
        }
        private static myPrivateStaticMethod<T extends privateClass>() {
        }
        myPublicMethod<T extends privateClass>() {  
        }
        private myPrivateMethod<T extends privateClass>() {
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
        private static myPrivateStaticMethod<T extends privateClass>() {
        }
        myPublicMethod<T extends privateClass>() {
        }
        private myPrivateMethod<T extends privateClass>() {
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
}

//// [privacyTypeParameterOfFunctionDeclFile.js]
"use strict";
exports.__esModule = true;
exports.publicModule = exports.publicFunctionWithPrivateMopduleTypeParameters = exports.publicClassWithWithPrivateModuleTypeParameters = exports.publicFunctionWithPublicTypeParametersWithoutExtends = exports.publicClassWithWithPublicTypeParametersWithoutExtends = exports.publicFunctionWithPublicTypeParameters = exports.publicFunctionWithPrivateTypeParameters = exports.publicClassWithWithPublicTypeParameters = exports.publicClassWithWithPrivateTypeParameters = exports.publicClass = void 0;
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
    var proto_1 = publicClassWithWithPrivateTypeParameters.prototype;
    publicClassWithWithPrivateTypeParameters.myPublicStaticMethod = function () {
    };
    publicClassWithWithPrivateTypeParameters.myPrivateStaticMethod = function () {
    };
    proto_1.myPublicMethod = function () {
    };
    proto_1.myPrivateMethod = function () {
    };
    return publicClassWithWithPrivateTypeParameters;
}());
exports.publicClassWithWithPrivateTypeParameters = publicClassWithWithPrivateTypeParameters;
var publicClassWithWithPublicTypeParameters = /** @class */ (function () {
    function publicClassWithWithPublicTypeParameters() {
    }
    var proto_2 = publicClassWithWithPublicTypeParameters.prototype;
    publicClassWithWithPublicTypeParameters.myPublicStaticMethod = function () {
    };
    publicClassWithWithPublicTypeParameters.myPrivateStaticMethod = function () {
    };
    proto_2.myPublicMethod = function () {
    };
    proto_2.myPrivateMethod = function () {
    };
    return publicClassWithWithPublicTypeParameters;
}());
exports.publicClassWithWithPublicTypeParameters = publicClassWithWithPublicTypeParameters;
var privateClassWithWithPrivateTypeParameters = /** @class */ (function () {
    function privateClassWithWithPrivateTypeParameters() {
    }
    var proto_3 = privateClassWithWithPrivateTypeParameters.prototype;
    privateClassWithWithPrivateTypeParameters.myPublicStaticMethod = function () {
    };
    privateClassWithWithPrivateTypeParameters.myPrivateStaticMethod = function () {
    };
    proto_3.myPublicMethod = function () {
    };
    proto_3.myPrivateMethod = function () {
    };
    return privateClassWithWithPrivateTypeParameters;
}());
var privateClassWithWithPublicTypeParameters = /** @class */ (function () {
    function privateClassWithWithPublicTypeParameters() {
    }
    var proto_4 = privateClassWithWithPublicTypeParameters.prototype;
    privateClassWithWithPublicTypeParameters.myPublicStaticMethod = function () {
    };
    privateClassWithWithPublicTypeParameters.myPrivateStaticMethod = function () {
    };
    proto_4.myPublicMethod = function () {
    };
    proto_4.myPrivateMethod = function () {
    };
    return privateClassWithWithPublicTypeParameters;
}());
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
    var proto_5 = publicClassWithWithPublicTypeParametersWithoutExtends.prototype;
    publicClassWithWithPublicTypeParametersWithoutExtends.myPublicStaticMethod = function () {
    };
    publicClassWithWithPublicTypeParametersWithoutExtends.myPrivateStaticMethod = function () {
    };
    proto_5.myPublicMethod = function () {
    };
    proto_5.myPrivateMethod = function () {
    };
    return publicClassWithWithPublicTypeParametersWithoutExtends;
}());
exports.publicClassWithWithPublicTypeParametersWithoutExtends = publicClassWithWithPublicTypeParametersWithoutExtends;
var privateClassWithWithPublicTypeParametersWithoutExtends = /** @class */ (function () {
    function privateClassWithWithPublicTypeParametersWithoutExtends() {
    }
    var proto_6 = privateClassWithWithPublicTypeParametersWithoutExtends.prototype;
    privateClassWithWithPublicTypeParametersWithoutExtends.myPublicStaticMethod = function () {
    };
    privateClassWithWithPublicTypeParametersWithoutExtends.myPrivateStaticMethod = function () {
    };
    proto_6.myPublicMethod = function () {
    };
    proto_6.myPrivateMethod = function () {
    };
    return privateClassWithWithPublicTypeParametersWithoutExtends;
}());
function publicFunctionWithPublicTypeParametersWithoutExtends() {
}
exports.publicFunctionWithPublicTypeParametersWithoutExtends = publicFunctionWithPublicTypeParametersWithoutExtends;
function privateFunctionWithPublicTypeParametersWithoutExtends() {
}
var publicClassWithWithPrivateModuleTypeParameters = /** @class */ (function () {
    function publicClassWithWithPrivateModuleTypeParameters() {
    }
    publicClassWithWithPrivateModuleTypeParameters.myPublicStaticMethod = function () {
    };
    publicClassWithWithPrivateModuleTypeParameters.prototype.myPublicMethod = function () {
    };
    return publicClassWithWithPrivateModuleTypeParameters;
}());
exports.publicClassWithWithPrivateModuleTypeParameters = publicClassWithWithPrivateModuleTypeParameters;
function publicFunctionWithPrivateMopduleTypeParameters() {
}
exports.publicFunctionWithPrivateMopduleTypeParameters = publicFunctionWithPrivateMopduleTypeParameters;
var privateClassWithWithPrivateModuleTypeParameters = /** @class */ (function () {
    function privateClassWithWithPrivateModuleTypeParameters() {
    }
    privateClassWithWithPrivateModuleTypeParameters.myPublicStaticMethod = function () {
    };
    privateClassWithWithPrivateModuleTypeParameters.prototype.myPublicMethod = function () {
    };
    return privateClassWithWithPrivateModuleTypeParameters;
}());
function privateFunctionWithPrivateMopduleTypeParameters() {
}
var publicModule;
(function (publicModule) {
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
    publicModule.publicClass = publicClass;
    var publicClassWithWithPrivateTypeParameters = /** @class */ (function () {
        function publicClassWithWithPrivateTypeParameters() {
        }
        var proto_7 = publicClassWithWithPrivateTypeParameters.prototype;
        publicClassWithWithPrivateTypeParameters.myPublicStaticMethod = function () {
        };
        publicClassWithWithPrivateTypeParameters.myPrivateStaticMethod = function () {
        };
        proto_7.myPublicMethod = function () {
        };
        proto_7.myPrivateMethod = function () {
        };
        return publicClassWithWithPrivateTypeParameters;
    }());
    publicModule.publicClassWithWithPrivateTypeParameters = publicClassWithWithPrivateTypeParameters;
    var publicClassWithWithPublicTypeParameters = /** @class */ (function () {
        function publicClassWithWithPublicTypeParameters() {
        }
        var proto_8 = publicClassWithWithPublicTypeParameters.prototype;
        publicClassWithWithPublicTypeParameters.myPublicStaticMethod = function () {
        };
        publicClassWithWithPublicTypeParameters.myPrivateStaticMethod = function () {
        };
        proto_8.myPublicMethod = function () {
        };
        proto_8.myPrivateMethod = function () {
        };
        return publicClassWithWithPublicTypeParameters;
    }());
    publicModule.publicClassWithWithPublicTypeParameters = publicClassWithWithPublicTypeParameters;
    var privateClassWithWithPrivateTypeParameters = /** @class */ (function () {
        function privateClassWithWithPrivateTypeParameters() {
        }
        var proto_9 = privateClassWithWithPrivateTypeParameters.prototype;
        privateClassWithWithPrivateTypeParameters.myPublicStaticMethod = function () {
        };
        privateClassWithWithPrivateTypeParameters.myPrivateStaticMethod = function () {
        };
        proto_9.myPublicMethod = function () {
        };
        proto_9.myPrivateMethod = function () {
        };
        return privateClassWithWithPrivateTypeParameters;
    }());
    var privateClassWithWithPublicTypeParameters = /** @class */ (function () {
        function privateClassWithWithPublicTypeParameters() {
        }
        var proto_10 = privateClassWithWithPublicTypeParameters.prototype;
        privateClassWithWithPublicTypeParameters.myPublicStaticMethod = function () {
        };
        privateClassWithWithPublicTypeParameters.myPrivateStaticMethod = function () {
        };
        proto_10.myPublicMethod = function () {
        };
        proto_10.myPrivateMethod = function () {
        };
        return privateClassWithWithPublicTypeParameters;
    }());
    function publicFunctionWithPrivateTypeParameters() {
    }
    publicModule.publicFunctionWithPrivateTypeParameters = publicFunctionWithPrivateTypeParameters;
    function publicFunctionWithPublicTypeParameters() {
    }
    publicModule.publicFunctionWithPublicTypeParameters = publicFunctionWithPublicTypeParameters;
    function privateFunctionWithPrivateTypeParameters() {
    }
    function privateFunctionWithPublicTypeParameters() {
    }
    var publicClassWithWithPublicTypeParametersWithoutExtends = /** @class */ (function () {
        function publicClassWithWithPublicTypeParametersWithoutExtends() {
        }
        var proto_11 = publicClassWithWithPublicTypeParametersWithoutExtends.prototype;
        publicClassWithWithPublicTypeParametersWithoutExtends.myPublicStaticMethod = function () {
        };
        publicClassWithWithPublicTypeParametersWithoutExtends.myPrivateStaticMethod = function () {
        };
        proto_11.myPublicMethod = function () {
        };
        proto_11.myPrivateMethod = function () {
        };
        return publicClassWithWithPublicTypeParametersWithoutExtends;
    }());
    publicModule.publicClassWithWithPublicTypeParametersWithoutExtends = publicClassWithWithPublicTypeParametersWithoutExtends;
    var privateClassWithWithPublicTypeParametersWithoutExtends = /** @class */ (function () {
        function privateClassWithWithPublicTypeParametersWithoutExtends() {
        }
        var proto_12 = privateClassWithWithPublicTypeParametersWithoutExtends.prototype;
        privateClassWithWithPublicTypeParametersWithoutExtends.myPublicStaticMethod = function () {
        };
        privateClassWithWithPublicTypeParametersWithoutExtends.myPrivateStaticMethod = function () {
        };
        proto_12.myPublicMethod = function () {
        };
        proto_12.myPrivateMethod = function () {
        };
        return privateClassWithWithPublicTypeParametersWithoutExtends;
    }());
    function publicFunctionWithPublicTypeParametersWithoutExtends() {
    }
    publicModule.publicFunctionWithPublicTypeParametersWithoutExtends = publicFunctionWithPublicTypeParametersWithoutExtends;
    function privateFunctionWithPublicTypeParametersWithoutExtends() {
    }
    var publicClassWithWithPrivateModuleTypeParameters = /** @class */ (function () {
        function publicClassWithWithPrivateModuleTypeParameters() {
        }
        publicClassWithWithPrivateModuleTypeParameters.myPublicStaticMethod = function () {
        };
        publicClassWithWithPrivateModuleTypeParameters.prototype.myPublicMethod = function () {
        };
        return publicClassWithWithPrivateModuleTypeParameters;
    }());
    publicModule.publicClassWithWithPrivateModuleTypeParameters = publicClassWithWithPrivateModuleTypeParameters;
    function publicFunctionWithPrivateMopduleTypeParameters() {
    }
    publicModule.publicFunctionWithPrivateMopduleTypeParameters = publicFunctionWithPrivateMopduleTypeParameters;
    var privateClassWithWithPrivateModuleTypeParameters = /** @class */ (function () {
        function privateClassWithWithPrivateModuleTypeParameters() {
        }
        privateClassWithWithPrivateModuleTypeParameters.myPublicStaticMethod = function () {
        };
        privateClassWithWithPrivateModuleTypeParameters.prototype.myPublicMethod = function () {
        };
        return privateClassWithWithPrivateModuleTypeParameters;
    }());
    function privateFunctionWithPrivateMopduleTypeParameters() {
    }
})(publicModule = exports.publicModule || (exports.publicModule = {}));
var privateModule;
(function (privateModule) {
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
    privateModule.publicClass = publicClass;
    var publicClassWithWithPrivateTypeParameters = /** @class */ (function () {
        function publicClassWithWithPrivateTypeParameters() {
        }
        var proto_13 = publicClassWithWithPrivateTypeParameters.prototype;
        publicClassWithWithPrivateTypeParameters.myPublicStaticMethod = function () {
        };
        publicClassWithWithPrivateTypeParameters.myPrivateStaticMethod = function () {
        };
        proto_13.myPublicMethod = function () {
        };
        proto_13.myPrivateMethod = function () {
        };
        return publicClassWithWithPrivateTypeParameters;
    }());
    privateModule.publicClassWithWithPrivateTypeParameters = publicClassWithWithPrivateTypeParameters;
    var publicClassWithWithPublicTypeParameters = /** @class */ (function () {
        function publicClassWithWithPublicTypeParameters() {
        }
        var proto_14 = publicClassWithWithPublicTypeParameters.prototype;
        publicClassWithWithPublicTypeParameters.myPublicStaticMethod = function () {
        };
        publicClassWithWithPublicTypeParameters.myPrivateStaticMethod = function () {
        };
        proto_14.myPublicMethod = function () {
        };
        proto_14.myPrivateMethod = function () {
        };
        return publicClassWithWithPublicTypeParameters;
    }());
    privateModule.publicClassWithWithPublicTypeParameters = publicClassWithWithPublicTypeParameters;
    var privateClassWithWithPrivateTypeParameters = /** @class */ (function () {
        function privateClassWithWithPrivateTypeParameters() {
        }
        var proto_15 = privateClassWithWithPrivateTypeParameters.prototype;
        privateClassWithWithPrivateTypeParameters.myPublicStaticMethod = function () {
        };
        privateClassWithWithPrivateTypeParameters.myPrivateStaticMethod = function () {
        };
        proto_15.myPublicMethod = function () {
        };
        proto_15.myPrivateMethod = function () {
        };
        return privateClassWithWithPrivateTypeParameters;
    }());
    var privateClassWithWithPublicTypeParameters = /** @class */ (function () {
        function privateClassWithWithPublicTypeParameters() {
        }
        var proto_16 = privateClassWithWithPublicTypeParameters.prototype;
        privateClassWithWithPublicTypeParameters.myPublicStaticMethod = function () {
        };
        privateClassWithWithPublicTypeParameters.myPrivateStaticMethod = function () {
        };
        proto_16.myPublicMethod = function () {
        };
        proto_16.myPrivateMethod = function () {
        };
        return privateClassWithWithPublicTypeParameters;
    }());
    function publicFunctionWithPrivateTypeParameters() {
    }
    privateModule.publicFunctionWithPrivateTypeParameters = publicFunctionWithPrivateTypeParameters;
    function publicFunctionWithPublicTypeParameters() {
    }
    privateModule.publicFunctionWithPublicTypeParameters = publicFunctionWithPublicTypeParameters;
    function privateFunctionWithPrivateTypeParameters() {
    }
    function privateFunctionWithPublicTypeParameters() {
    }
    var publicClassWithWithPublicTypeParametersWithoutExtends = /** @class */ (function () {
        function publicClassWithWithPublicTypeParametersWithoutExtends() {
        }
        var proto_17 = publicClassWithWithPublicTypeParametersWithoutExtends.prototype;
        publicClassWithWithPublicTypeParametersWithoutExtends.myPublicStaticMethod = function () {
        };
        publicClassWithWithPublicTypeParametersWithoutExtends.myPrivateStaticMethod = function () {
        };
        proto_17.myPublicMethod = function () {
        };
        proto_17.myPrivateMethod = function () {
        };
        return publicClassWithWithPublicTypeParametersWithoutExtends;
    }());
    privateModule.publicClassWithWithPublicTypeParametersWithoutExtends = publicClassWithWithPublicTypeParametersWithoutExtends;
    var privateClassWithWithPublicTypeParametersWithoutExtends = /** @class */ (function () {
        function privateClassWithWithPublicTypeParametersWithoutExtends() {
        }
        var proto_18 = privateClassWithWithPublicTypeParametersWithoutExtends.prototype;
        privateClassWithWithPublicTypeParametersWithoutExtends.myPublicStaticMethod = function () {
        };
        privateClassWithWithPublicTypeParametersWithoutExtends.myPrivateStaticMethod = function () {
        };
        proto_18.myPublicMethod = function () {
        };
        proto_18.myPrivateMethod = function () {
        };
        return privateClassWithWithPublicTypeParametersWithoutExtends;
    }());
    function publicFunctionWithPublicTypeParametersWithoutExtends() {
    }
    privateModule.publicFunctionWithPublicTypeParametersWithoutExtends = publicFunctionWithPublicTypeParametersWithoutExtends;
    function privateFunctionWithPublicTypeParametersWithoutExtends() {
    }
})(privateModule || (privateModule = {}));


//// [privacyTypeParameterOfFunctionDeclFile.d.ts]
declare class privateClass {
}
export declare class publicClass {
}
export interface publicInterfaceWithPrivateTypeParameters {
    new <T extends privateClass>(): privateClass;
    <T extends privateClass>(): privateClass;
    myMethod<T extends privateClass>(): privateClass;
}
export interface publicInterfaceWithPublicTypeParameters {
    new <T extends publicClass>(): publicClass;
    <T extends publicClass>(): publicClass;
    myMethod<T extends publicClass>(): publicClass;
}
export declare class publicClassWithWithPrivateTypeParameters {
    static myPublicStaticMethod<T extends privateClass>(): void;
    private static myPrivateStaticMethod;
    myPublicMethod<T extends privateClass>(): void;
    private myPrivateMethod;
}
export declare class publicClassWithWithPublicTypeParameters {
    static myPublicStaticMethod<T extends publicClass>(): void;
    private static myPrivateStaticMethod;
    myPublicMethod<T extends publicClass>(): void;
    private myPrivateMethod;
}
export declare function publicFunctionWithPrivateTypeParameters<T extends privateClass>(): void;
export declare function publicFunctionWithPublicTypeParameters<T extends publicClass>(): void;
export interface publicInterfaceWithPublicTypeParametersWithoutExtends {
    new <T>(): publicClass;
    <T>(): publicClass;
    myMethod<T>(): publicClass;
}
export declare class publicClassWithWithPublicTypeParametersWithoutExtends {
    static myPublicStaticMethod<T>(): void;
    private static myPrivateStaticMethod;
    myPublicMethod<T>(): void;
    private myPrivateMethod;
}
export declare function publicFunctionWithPublicTypeParametersWithoutExtends<T>(): void;
export interface publicInterfaceWithPrivatModuleTypeParameters {
    new <T extends privateModule.publicClass>(): privateModule.publicClass;
    <T extends privateModule.publicClass>(): privateModule.publicClass;
    myMethod<T extends privateModule.publicClass>(): privateModule.publicClass;
}
export declare class publicClassWithWithPrivateModuleTypeParameters {
    static myPublicStaticMethod<T extends privateModule.publicClass>(): void;
    myPublicMethod<T extends privateModule.publicClass>(): void;
}
export declare function publicFunctionWithPrivateMopduleTypeParameters<T extends privateModule.publicClass>(): void;
export declare module publicModule {
    class privateClass {
    }
    export class publicClass {
    }
    export interface publicInterfaceWithPrivateTypeParameters {
        new <T extends privateClass>(): privateClass;
        <T extends privateClass>(): privateClass;
        myMethod<T extends privateClass>(): privateClass;
    }
    export interface publicInterfaceWithPublicTypeParameters {
        new <T extends publicClass>(): publicClass;
        <T extends publicClass>(): publicClass;
        myMethod<T extends publicClass>(): publicClass;
    }
    export class publicClassWithWithPrivateTypeParameters {
        static myPublicStaticMethod<T extends privateClass>(): void;
        private static myPrivateStaticMethod;
        myPublicMethod<T extends privateClass>(): void;
        private myPrivateMethod;
    }
    export class publicClassWithWithPublicTypeParameters {
        static myPublicStaticMethod<T extends publicClass>(): void;
        private static myPrivateStaticMethod;
        myPublicMethod<T extends publicClass>(): void;
        private myPrivateMethod;
    }
    export function publicFunctionWithPrivateTypeParameters<T extends privateClass>(): void;
    export function publicFunctionWithPublicTypeParameters<T extends publicClass>(): void;
    export interface publicInterfaceWithPublicTypeParametersWithoutExtends {
        new <T>(): publicClass;
        <T>(): publicClass;
        myMethod<T>(): publicClass;
    }
    export class publicClassWithWithPublicTypeParametersWithoutExtends {
        static myPublicStaticMethod<T>(): void;
        private static myPrivateStaticMethod;
        myPublicMethod<T>(): void;
        private myPrivateMethod;
    }
    export function publicFunctionWithPublicTypeParametersWithoutExtends<T>(): void;
    export interface publicInterfaceWithPrivatModuleTypeParameters {
        new <T extends privateModule.publicClass>(): privateModule.publicClass;
        <T extends privateModule.publicClass>(): privateModule.publicClass;
        myMethod<T extends privateModule.publicClass>(): privateModule.publicClass;
    }
    export class publicClassWithWithPrivateModuleTypeParameters {
        static myPublicStaticMethod<T extends privateModule.publicClass>(): void;
        myPublicMethod<T extends privateModule.publicClass>(): void;
    }
    export function publicFunctionWithPrivateMopduleTypeParameters<T extends privateModule.publicClass>(): void;
    export {};
}
declare module privateModule {
    class privateClass {
    }
    export class publicClass {
    }
    export interface publicInterfaceWithPrivateTypeParameters {
        new <T extends privateClass>(): privateClass;
        <T extends privateClass>(): privateClass;
        myMethod<T extends privateClass>(): privateClass;
    }
    export interface publicInterfaceWithPublicTypeParameters {
        new <T extends publicClass>(): publicClass;
        <T extends publicClass>(): publicClass;
        myMethod<T extends publicClass>(): publicClass;
    }
    export class publicClassWithWithPrivateTypeParameters {
        static myPublicStaticMethod<T extends privateClass>(): void;
        private static myPrivateStaticMethod;
        myPublicMethod<T extends privateClass>(): void;
        private myPrivateMethod;
    }
    export class publicClassWithWithPublicTypeParameters {
        static myPublicStaticMethod<T extends publicClass>(): void;
        private static myPrivateStaticMethod;
        myPublicMethod<T extends publicClass>(): void;
        private myPrivateMethod;
    }
    export function publicFunctionWithPrivateTypeParameters<T extends privateClass>(): void;
    export function publicFunctionWithPublicTypeParameters<T extends publicClass>(): void;
    export interface publicInterfaceWithPublicTypeParametersWithoutExtends {
        new <T>(): publicClass;
        <T>(): publicClass;
        myMethod<T>(): publicClass;
    }
    export class publicClassWithWithPublicTypeParametersWithoutExtends {
        static myPublicStaticMethod<T>(): void;
        private static myPrivateStaticMethod;
        myPublicMethod<T>(): void;
        private myPrivateMethod;
    }
    export function publicFunctionWithPublicTypeParametersWithoutExtends<T>(): void;
    export {};
}
export {};
