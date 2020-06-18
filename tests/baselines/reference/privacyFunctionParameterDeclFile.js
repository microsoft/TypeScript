//// [tests/cases/compiler/privacyFunctionParameterDeclFile.ts] ////

//// [privacyFunctionParameterDeclFile_externalModule.ts]
class privateClass {
}

export class publicClass {
}

export interface publicInterfaceWithPrivateParmeterTypes {
    new (param: privateClass): publicClass; // Error
    (param: privateClass): publicClass; // Error
    myMethod(param: privateClass): void; // Error
}

export interface publicInterfaceWithPublicParmeterTypes {
    new (param: publicClass): publicClass;
    (param: publicClass): publicClass;
    myMethod(param: publicClass): void;
}

interface privateInterfaceWithPrivateParmeterTypes {
    new (param: privateClass): privateClass;
    (param: privateClass): privateClass;
    myMethod(param: privateClass): void;
}

interface privateInterfaceWithPublicParmeterTypes {
    new (param: publicClass): publicClass;
    (param: publicClass): publicClass;
    myMethod(param: publicClass): void;
}

export class publicClassWithWithPrivateParmeterTypes {
    static myPublicStaticMethod(param: privateClass) { // Error
    }
    private static myPrivateStaticMethod(param: privateClass) {
    }
    myPublicMethod(param: privateClass) { // Error
    }
    private myPrivateMethod(param: privateClass) {
    }
    constructor(param: privateClass, private param1: privateClass, public param2: privateClass) { // Error
    }
}

export class publicClassWithWithPublicParmeterTypes {
    static myPublicStaticMethod(param: publicClass) {
    }
    private static myPrivateStaticMethod(param: publicClass) {
    }
    myPublicMethod(param: publicClass) {
    }
    private myPrivateMethod(param: publicClass) {
    }
    constructor(param: publicClass, private param1: publicClass, public param2: publicClass) {
    }
}

class privateClassWithWithPrivateParmeterTypes {
    static myPublicStaticMethod(param: privateClass) {
    }
    private static myPrivateStaticMethod(param: privateClass) {
    }
    myPublicMethod(param: privateClass) { 
    }
    private myPrivateMethod(param: privateClass) {
    }
    constructor(param: privateClass, private param1: privateClass, public param2: privateClass) {
    }
}

class privateClassWithWithPublicParmeterTypes {
    static myPublicStaticMethod(param: publicClass) {
    }
    private static myPrivateStaticMethod(param: publicClass) {
    }
    myPublicMethod(param: publicClass) {
    }
    private myPrivateMethod(param: publicClass) {
    }
    constructor(param: publicClass, private param1: publicClass, public param2: publicClass) {
    }
}

export function publicFunctionWithPrivateParmeterTypes(param: privateClass) { // Error
}
export function publicFunctionWithPublicParmeterTypes(param: publicClass) {
}
function privateFunctionWithPrivateParmeterTypes(param: privateClass) {
}
function privateFunctionWithPublicParmeterTypes(param: publicClass) {
}

export declare function publicAmbientFunctionWithPrivateParmeterTypes(param: privateClass): void; // Error
export declare function publicAmbientFunctionWithPublicParmeterTypes(param: publicClass): void;
declare function privateAmbientFunctionWithPrivateParmeterTypes(param: privateClass): void;
declare function privateAmbientFunctionWithPublicParmeterTypes(param: publicClass): void;

export interface publicInterfaceWithPrivateModuleParameterTypes {
    new (param: privateModule.publicClass): publicClass; // Error
    (param: privateModule.publicClass): publicClass; // Error
    myMethod(param: privateModule.publicClass): void; // Error
}
export class publicClassWithPrivateModuleParameterTypes {
    static myPublicStaticMethod(param: privateModule.publicClass) { // Error
    }
    myPublicMethod(param: privateModule.publicClass) { // Error
    }
    constructor(param: privateModule.publicClass, private param1: privateModule.publicClass, public param2: privateModule.publicClass) { // Error
    }
}
export function publicFunctionWithPrivateModuleParameterTypes(param: privateModule.publicClass) { // Error
}
export declare function publicAmbientFunctionWithPrivateModuleParameterTypes(param: privateModule.publicClass): void; // Error

interface privateInterfaceWithPrivateModuleParameterTypes {
    new (param: privateModule.publicClass): publicClass;
    (param: privateModule.publicClass): publicClass;
    myMethod(param: privateModule.publicClass): void;
}
class privateClassWithPrivateModuleParameterTypes {
    static myPublicStaticMethod(param: privateModule.publicClass) {
    }
    myPublicMethod(param: privateModule.publicClass) {
    }
    constructor(param: privateModule.publicClass, private param1: privateModule.publicClass, public param2: privateModule.publicClass) {
    }
}
function privateFunctionWithPrivateModuleParameterTypes(param: privateModule.publicClass) {
}
declare function privateAmbientFunctionWithPrivateModuleParameterTypes(param: privateModule.publicClass): void;

export module publicModule {
    class privateClass {
    }

    export class publicClass {
    }


    export interface publicInterfaceWithPrivateParmeterTypes {
        new (param: privateClass): publicClass; // Error
        (param: privateClass): publicClass; // Error
        myMethod(param: privateClass): void; // Error
    }

    export interface publicInterfaceWithPublicParmeterTypes {
        new (param: publicClass): publicClass;
        (param: publicClass): publicClass;
        myMethod(param: publicClass): void;
    }

    interface privateInterfaceWithPrivateParmeterTypes {
        new (param: privateClass): privateClass;
        (param: privateClass): privateClass;
        myMethod(param: privateClass): void;
    }

    interface privateInterfaceWithPublicParmeterTypes {
        new (param: publicClass): publicClass;
        (param: publicClass): publicClass;
        myMethod(param: publicClass): void;
    }

    export class publicClassWithWithPrivateParmeterTypes {
        static myPublicStaticMethod(param: privateClass) { // Error
        }
        private static myPrivateStaticMethod(param: privateClass) {
        }
        myPublicMethod(param: privateClass) { // Error
        }
        private myPrivateMethod(param: privateClass) {
        }
        constructor(param: privateClass, private param1: privateClass, public param2: privateClass) { // Error
        }
    }

    export class publicClassWithWithPublicParmeterTypes {
        static myPublicStaticMethod(param: publicClass) {
        }
        private static myPrivateStaticMethod(param: publicClass) {
        }
        myPublicMethod(param: publicClass) {
        }
        private myPrivateMethod(param: publicClass) {
        }
        constructor(param: publicClass, private param1: publicClass, public param2: publicClass) {
        }
    }

    class privateClassWithWithPrivateParmeterTypes {
        static myPublicStaticMethod(param: privateClass) {
        }
        private static myPrivateStaticMethod(param: privateClass) {
        }
        myPublicMethod(param: privateClass) {
        }
        private myPrivateMethod(param: privateClass) {
        }
        constructor(param: privateClass, private param1: privateClass, public param2: privateClass) {
        }
    }

    class privateClassWithWithPublicParmeterTypes {
        static myPublicStaticMethod(param: publicClass) {
        }
        private static myPrivateStaticMethod(param: publicClass) {
        }
        myPublicMethod(param: publicClass) {
        }
        private myPrivateMethod(param: publicClass) {
        }
        constructor(param: publicClass, private param1: publicClass, public param2: publicClass) {
        }
    }

    export function publicFunctionWithPrivateParmeterTypes(param: privateClass) { // Error
    }
    export function publicFunctionWithPublicParmeterTypes(param: publicClass) {
    }
    function privateFunctionWithPrivateParmeterTypes(param: privateClass) {
    }
    function privateFunctionWithPublicParmeterTypes(param: publicClass) {
    }

    export declare function publicAmbientFunctionWithPrivateParmeterTypes(param: privateClass): void; // Error
    export declare function publicAmbientFunctionWithPublicParmeterTypes(param: publicClass): void;
    declare function privateAmbientFunctionWithPrivateParmeterTypes(param: privateClass): void;
    declare function privateAmbientFunctionWithPublicParmeterTypes(param: publicClass): void;

    export interface publicInterfaceWithPrivateModuleParameterTypes {
        new (param: privateModule.publicClass): publicClass; // Error
        (param: privateModule.publicClass): publicClass; // Error
        myMethod(param: privateModule.publicClass): void; // Error
    }
    export class publicClassWithPrivateModuleParameterTypes {
        static myPublicStaticMethod(param: privateModule.publicClass) { // Error
        }
        myPublicMethod(param: privateModule.publicClass) { // Error
        }
        constructor(param: privateModule.publicClass, private param1: privateModule.publicClass, public param2: privateModule.publicClass) { // Error
        }
    }
    export function publicFunctionWithPrivateModuleParameterTypes(param: privateModule.publicClass) { // Error
    }
    export declare function publicAmbientFunctionWithPrivateModuleParameterTypes(param: privateModule.publicClass): void; // Error

    interface privateInterfaceWithPrivateModuleParameterTypes {
        new (param: privateModule.publicClass): publicClass;
        (param: privateModule.publicClass): publicClass;
        myMethod(param: privateModule.publicClass): void;
    }
    class privateClassWithPrivateModuleParameterTypes {
        static myPublicStaticMethod(param: privateModule.publicClass) {
        }
        myPublicMethod(param: privateModule.publicClass) {
        }
        constructor(param: privateModule.publicClass, private param1: privateModule.publicClass, public param2: privateModule.publicClass) {
        }
    }
    function privateFunctionWithPrivateModuleParameterTypes(param: privateModule.publicClass) {
    }
    declare function privateAmbientFunctionWithPrivateModuleParameterTypes(param: privateModule.publicClass): void;

}

module privateModule {
    class privateClass {
    }

    export class publicClass {
    }

    export interface publicInterfaceWithPrivateParmeterTypes {
        new (param: privateClass): publicClass;
        (param: privateClass): publicClass;
        myMethod(param: privateClass): void;
    }

    export interface publicInterfaceWithPublicParmeterTypes {
        new (param: publicClass): publicClass;
        (param: publicClass): publicClass;
        myMethod(param: publicClass): void;
    }

    interface privateInterfaceWithPrivateParmeterTypes {
        new (param: privateClass): privateClass;
        (param: privateClass): privateClass;
        myMethod(param: privateClass): void;
    }

    interface privateInterfaceWithPublicParmeterTypes {
        new (param: publicClass): publicClass;
        (param: publicClass): publicClass;
        myMethod(param: publicClass): void;
    }

    export class publicClassWithWithPrivateParmeterTypes {
        static myPublicStaticMethod(param: privateClass) {
        }
        private static myPrivateStaticMethod(param: privateClass) {
        }
        myPublicMethod(param: privateClass) {
        }
        private myPrivateMethod(param: privateClass) {
        }
        constructor(param: privateClass, private param1: privateClass, public param2: privateClass) {
        }
    }

    export class publicClassWithWithPublicParmeterTypes {
        static myPublicStaticMethod(param: publicClass) {
        }
        private static myPrivateStaticMethod(param: publicClass) {
        }
        myPublicMethod(param: publicClass) {
        }
        private myPrivateMethod(param: publicClass) {
        }
        constructor(param: publicClass, private param1: publicClass, public param2: publicClass) {
        }
    }

    class privateClassWithWithPrivateParmeterTypes {
        static myPublicStaticMethod(param: privateClass) {
        }
        private static myPrivateStaticMethod(param: privateClass) {
        }
        myPublicMethod(param: privateClass) {
        }
        private myPrivateMethod(param: privateClass) {
        }
        constructor(param: privateClass, private param1: privateClass, public param2: privateClass) {
        }
    }

    class privateClassWithWithPublicParmeterTypes {
        static myPublicStaticMethod(param: publicClass) {
        }
        private static myPrivateStaticMethod(param: publicClass) {
        }
        myPublicMethod(param: publicClass) {
        }
        private myPrivateMethod(param: publicClass) {
        }
        constructor(param: publicClass, private param1: publicClass, public param2: publicClass) {
        }
    }

    export function publicFunctionWithPrivateParmeterTypes(param: privateClass) {
    }
    export function publicFunctionWithPublicParmeterTypes(param: publicClass) {
    }
    function privateFunctionWithPrivateParmeterTypes(param: privateClass) {
    }
    function privateFunctionWithPublicParmeterTypes(param: publicClass) {
    }

    export declare function publicAmbientFunctionWithPrivateParmeterTypes(param: privateClass): void;
    export declare function publicAmbientFunctionWithPublicParmeterTypes(param: publicClass): void;
    declare function privateAmbientFunctionWithPrivateParmeterTypes(param: privateClass): void;
    declare function privateAmbientFunctionWithPublicParmeterTypes(param: publicClass): void;

    export interface publicInterfaceWithPrivateModuleParameterTypes {
        new (param: privateModule.publicClass): publicClass;
        (param: privateModule.publicClass): publicClass;
        myMethod(param: privateModule.publicClass): void;
    }
    export class publicClassWithPrivateModuleParameterTypes {
        static myPublicStaticMethod(param: privateModule.publicClass) {
        }
        myPublicMethod(param: privateModule.publicClass) {
        }
        constructor(param: privateModule.publicClass, private param1: privateModule.publicClass, public param2: privateModule.publicClass) {
        }
    }
    export function publicFunctionWithPrivateModuleParameterTypes(param: privateModule.publicClass) {
    }
    export declare function publicAmbientFunctionWithPrivateModuleParameterTypes(param: privateModule.publicClass): void;

    interface privateInterfaceWithPrivateModuleParameterTypes {
        new (param: privateModule.publicClass): publicClass;
        (param: privateModule.publicClass): publicClass;
        myMethod(param: privateModule.publicClass): void;
    }
    class privateClassWithPrivateModuleParameterTypes {
        static myPublicStaticMethod(param: privateModule.publicClass) {
        }
        myPublicMethod(param: privateModule.publicClass) {
        }
        constructor(param: privateModule.publicClass, private param1: privateModule.publicClass, public param2: privateModule.publicClass) {
        }
    }
    function privateFunctionWithPrivateModuleParameterTypes(param: privateModule.publicClass) {
    }
    declare function privateAmbientFunctionWithPrivateModuleParameterTypes(param: privateModule.publicClass): void;
}

//// [privacyFunctionParameterDeclFile_GlobalFile.ts]
class publicClassInGlobal {
}
interface publicInterfaceWithPublicParmeterTypesInGlobal {
    new (param: publicClassInGlobal): publicClassInGlobal;
    (param: publicClassInGlobal): publicClassInGlobal;
    myMethod(param: publicClassInGlobal): void;
}
class publicClassWithWithPublicParmeterTypesInGlobal {
    static myPublicStaticMethod(param: publicClassInGlobal) {
    }
    private static myPrivateStaticMethod(param: publicClassInGlobal) {
    }
    myPublicMethod(param: publicClassInGlobal) {
    }
    private myPrivateMethod(param: publicClassInGlobal) {
    }
    constructor(param: publicClassInGlobal, private param1: publicClassInGlobal, public param2: publicClassInGlobal) {
    }
}
function publicFunctionWithPublicParmeterTypesInGlobal(param: publicClassInGlobal) {
}
declare function publicAmbientFunctionWithPublicParmeterTypesInGlobal(param: publicClassInGlobal): void;

module publicModuleInGlobal {
    class privateClass {
    }

    export class publicClass {
    }

    module privateModule {
        class privateClass {
        }

        export class publicClass {
        }

        export interface publicInterfaceWithPrivateParmeterTypes {
            new (param: privateClass): publicClass;
            (param: privateClass): publicClass;
            myMethod(param: privateClass): void;
        }

        export interface publicInterfaceWithPublicParmeterTypes {
            new (param: publicClass): publicClass;
            (param: publicClass): publicClass;
            myMethod(param: publicClass): void;
        }

        interface privateInterfaceWithPrivateParmeterTypes {
            new (param: privateClass): privateClass;
            (param: privateClass): privateClass;
            myMethod(param: privateClass): void;
        }

        interface privateInterfaceWithPublicParmeterTypes {
            new (param: publicClass): publicClass;
            (param: publicClass): publicClass;
            myMethod(param: publicClass): void;
        }

        export class publicClassWithWithPrivateParmeterTypes {
            static myPublicStaticMethod(param: privateClass) {
            }
            private static myPrivateStaticMethod(param: privateClass) {
            }
            myPublicMethod(param: privateClass) {
            }
            private myPrivateMethod(param: privateClass) {
            }
            constructor(param: privateClass, private param1: privateClass, public param2: privateClass) {
            }
        }

        export class publicClassWithWithPublicParmeterTypes {
            static myPublicStaticMethod(param: publicClass) {
            }
            private static myPrivateStaticMethod(param: publicClass) {
            }
            myPublicMethod(param: publicClass) {
            }
            private myPrivateMethod(param: publicClass) {
            }
            constructor(param: publicClass, private param1: publicClass, public param2: publicClass) {
            }
        }

        class privateClassWithWithPrivateParmeterTypes {
            static myPublicStaticMethod(param: privateClass) {
            }
            private static myPrivateStaticMethod(param: privateClass) {
            }
            myPublicMethod(param: privateClass) {
            }
            private myPrivateMethod(param: privateClass) {
            }
            constructor(param: privateClass, private param1: privateClass, public param2: privateClass) {
            }
        }

        class privateClassWithWithPublicParmeterTypes {
            static myPublicStaticMethod(param: publicClass) {
            }
            private static myPrivateStaticMethod(param: publicClass) {
            }
            myPublicMethod(param: publicClass) {
            }
            private myPrivateMethod(param: publicClass) {
            }
            constructor(param: publicClass, private param1: publicClass, public param2: publicClass) {
            }
        }

        export function publicFunctionWithPrivateParmeterTypes(param: privateClass) {
        }
        export function publicFunctionWithPublicParmeterTypes(param: publicClass) {
        }
        function privateFunctionWithPrivateParmeterTypes(param: privateClass) {
        }
        function privateFunctionWithPublicParmeterTypes(param: publicClass) {
        }

        export declare function publicAmbientFunctionWithPrivateParmeterTypes(param: privateClass): void;
        export declare function publicAmbientFunctionWithPublicParmeterTypes(param: publicClass): void;
        declare function privateAmbientFunctionWithPrivateParmeterTypes(param: privateClass): void;
        declare function privateAmbientFunctionWithPublicParmeterTypes(param: publicClass): void;

        export interface publicInterfaceWithPrivateModuleParameterTypes {
            new (param: privateModule.publicClass): publicClass;
            (param: privateModule.publicClass): publicClass;
            myMethod(param: privateModule.publicClass): void;
        }
        export class publicClassWithPrivateModuleParameterTypes {
            static myPublicStaticMethod(param: privateModule.publicClass) {
            }
            myPublicMethod(param: privateModule.publicClass) {
            }
            constructor(param: privateModule.publicClass, private param1: privateModule.publicClass, public param2: privateModule.publicClass) {
            }
        }
        export function publicFunctionWithPrivateModuleParameterTypes(param: privateModule.publicClass) {
        }
        export declare function publicAmbientFunctionWithPrivateModuleParameterTypes(param: privateModule.publicClass): void;

        interface privateInterfaceWithPrivateModuleParameterTypes {
            new (param: privateModule.publicClass): publicClass;
            (param: privateModule.publicClass): publicClass;
            myMethod(param: privateModule.publicClass): void;
        }
        class privateClassWithPrivateModuleParameterTypes {
            static myPublicStaticMethod(param: privateModule.publicClass) {
            }
            myPublicMethod(param: privateModule.publicClass) {
            }
            constructor(param: privateModule.publicClass, private param1: privateModule.publicClass, public param2: privateModule.publicClass) {
            }
        }
        function privateFunctionWithPrivateModuleParameterTypes(param: privateModule.publicClass) {
        }
        declare function privateAmbientFunctionWithPrivateModuleParameterTypes(param: privateModule.publicClass): void;
    }

    export interface publicInterfaceWithPrivateParmeterTypes {
        new (param: privateClass): publicClass; // Error
        (param: privateClass): publicClass; // Error
        myMethod(param: privateClass): void; // Error
    }

    export interface publicInterfaceWithPublicParmeterTypes {
        new (param: publicClass): publicClass;
        (param: publicClass): publicClass;
        myMethod(param: publicClass): void;
    }

    interface privateInterfaceWithPrivateParmeterTypes {
        new (param: privateClass): privateClass;
        (param: privateClass): privateClass;
        myMethod(param: privateClass): void;
    }

    interface privateInterfaceWithPublicParmeterTypes {
        new (param: publicClass): publicClass;
        (param: publicClass): publicClass;
        myMethod(param: publicClass): void;
    }

    export class publicClassWithWithPrivateParmeterTypes {
        static myPublicStaticMethod(param: privateClass) { // Error
        }
        private static myPrivateStaticMethod(param: privateClass) {
        }
        myPublicMethod(param: privateClass) { // Error
        }
        private myPrivateMethod(param: privateClass) {
        }
        constructor(param: privateClass, private param1: privateClass, public param2: privateClass) { // Error
        }
    }

    export class publicClassWithWithPublicParmeterTypes {
        static myPublicStaticMethod(param: publicClass) {
        }
        private static myPrivateStaticMethod(param: publicClass) {
        }
        myPublicMethod(param: publicClass) {
        }
        private myPrivateMethod(param: publicClass) {
        }
        constructor(param: publicClass, private param1: publicClass, public param2: publicClass) {
        }
    }

    class privateClassWithWithPrivateParmeterTypes {
        static myPublicStaticMethod(param: privateClass) {
        }
        private static myPrivateStaticMethod(param: privateClass) {
        }
        myPublicMethod(param: privateClass) {
        }
        private myPrivateMethod(param: privateClass) {
        }
        constructor(param: privateClass, private param1: privateClass, public param2: privateClass) {
        }
    }

    class privateClassWithWithPublicParmeterTypes {
        static myPublicStaticMethod(param: publicClass) {
        }
        private static myPrivateStaticMethod(param: publicClass) {
        }
        myPublicMethod(param: publicClass) {
        }
        private myPrivateMethod(param: publicClass) {
        }
        constructor(param: publicClass, private param1: publicClass, public param2: publicClass) {
        }
    }

    export function publicFunctionWithPrivateParmeterTypes(param: privateClass) { // Error
    }
    export function publicFunctionWithPublicParmeterTypes(param: publicClass) {
    }
    function privateFunctionWithPrivateParmeterTypes(param: privateClass) {
    }
    function privateFunctionWithPublicParmeterTypes(param: publicClass) {
    }

    export declare function publicAmbientFunctionWithPrivateParmeterTypes(param: privateClass): void; // Error
    export declare function publicAmbientFunctionWithPublicParmeterTypes(param: publicClass): void;
    declare function privateAmbientFunctionWithPrivateParmeterTypes(param: privateClass): void;
    declare function privateAmbientFunctionWithPublicParmeterTypes(param: publicClass): void;

    export interface publicInterfaceWithPrivateModuleParameterTypes {
        new (param: privateModule.publicClass): publicClass; // Error
        (param: privateModule.publicClass): publicClass; // Error
        myMethod(param: privateModule.publicClass): void; // Error
    }
    export class publicClassWithPrivateModuleParameterTypes {
        static myPublicStaticMethod(param: privateModule.publicClass) { // Error
        }
        myPublicMethod(param: privateModule.publicClass) { // Error
        }
        constructor(param: privateModule.publicClass, private param1: privateModule.publicClass, public param2: privateModule.publicClass) { // Error
        }
    }
    export function publicFunctionWithPrivateModuleParameterTypes(param: privateModule.publicClass) { // Error
    }
    export declare function publicAmbientFunctionWithPrivateModuleParameterTypes(param: privateModule.publicClass): void; // Error

    interface privateInterfaceWithPrivateModuleParameterTypes {
        new (param: privateModule.publicClass): publicClass;
        (param: privateModule.publicClass): publicClass;
        myMethod(param: privateModule.publicClass): void;
    }
    class privateClassWithPrivateModuleParameterTypes {
        static myPublicStaticMethod(param: privateModule.publicClass) {
        }
        myPublicMethod(param: privateModule.publicClass) {
        }
        constructor(param: privateModule.publicClass, private param1: privateModule.publicClass, public param2: privateModule.publicClass) {
        }
    }
    function privateFunctionWithPrivateModuleParameterTypes(param: privateModule.publicClass) {
    }
    declare function privateAmbientFunctionWithPrivateModuleParameterTypes(param: privateModule.publicClass): void;
}

//// [privacyFunctionParameterDeclFile_externalModule.js]
"use strict";
exports.__esModule = true;
exports.publicModule = exports.publicFunctionWithPrivateModuleParameterTypes = exports.publicClassWithPrivateModuleParameterTypes = exports.publicFunctionWithPublicParmeterTypes = exports.publicFunctionWithPrivateParmeterTypes = exports.publicClassWithWithPublicParmeterTypes = exports.publicClassWithWithPrivateParmeterTypes = exports.publicClass = void 0;
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
var publicClassWithWithPrivateParmeterTypes = /** @class */ (function () {
    function publicClassWithWithPrivateParmeterTypes(param, param1, param2) {
        this.param1 = param1;
        this.param2 = param2;
    }
    publicClassWithWithPrivateParmeterTypes.myPublicStaticMethod = function (param) {
    };
    publicClassWithWithPrivateParmeterTypes.myPrivateStaticMethod = function (param) {
    };
    publicClassWithWithPrivateParmeterTypes.prototype.myPublicMethod = function (param) {
    };
    publicClassWithWithPrivateParmeterTypes.prototype.myPrivateMethod = function (param) {
    };
    return publicClassWithWithPrivateParmeterTypes;
}());
exports.publicClassWithWithPrivateParmeterTypes = publicClassWithWithPrivateParmeterTypes;
var publicClassWithWithPublicParmeterTypes = /** @class */ (function () {
    function publicClassWithWithPublicParmeterTypes(param, param1, param2) {
        this.param1 = param1;
        this.param2 = param2;
    }
    publicClassWithWithPublicParmeterTypes.myPublicStaticMethod = function (param) {
    };
    publicClassWithWithPublicParmeterTypes.myPrivateStaticMethod = function (param) {
    };
    publicClassWithWithPublicParmeterTypes.prototype.myPublicMethod = function (param) {
    };
    publicClassWithWithPublicParmeterTypes.prototype.myPrivateMethod = function (param) {
    };
    return publicClassWithWithPublicParmeterTypes;
}());
exports.publicClassWithWithPublicParmeterTypes = publicClassWithWithPublicParmeterTypes;
var privateClassWithWithPrivateParmeterTypes = /** @class */ (function () {
    function privateClassWithWithPrivateParmeterTypes(param, param1, param2) {
        this.param1 = param1;
        this.param2 = param2;
    }
    privateClassWithWithPrivateParmeterTypes.myPublicStaticMethod = function (param) {
    };
    privateClassWithWithPrivateParmeterTypes.myPrivateStaticMethod = function (param) {
    };
    privateClassWithWithPrivateParmeterTypes.prototype.myPublicMethod = function (param) {
    };
    privateClassWithWithPrivateParmeterTypes.prototype.myPrivateMethod = function (param) {
    };
    return privateClassWithWithPrivateParmeterTypes;
}());
var privateClassWithWithPublicParmeterTypes = /** @class */ (function () {
    function privateClassWithWithPublicParmeterTypes(param, param1, param2) {
        this.param1 = param1;
        this.param2 = param2;
    }
    privateClassWithWithPublicParmeterTypes.myPublicStaticMethod = function (param) {
    };
    privateClassWithWithPublicParmeterTypes.myPrivateStaticMethod = function (param) {
    };
    privateClassWithWithPublicParmeterTypes.prototype.myPublicMethod = function (param) {
    };
    privateClassWithWithPublicParmeterTypes.prototype.myPrivateMethod = function (param) {
    };
    return privateClassWithWithPublicParmeterTypes;
}());
function publicFunctionWithPrivateParmeterTypes(param) {
}
exports.publicFunctionWithPrivateParmeterTypes = publicFunctionWithPrivateParmeterTypes;
function publicFunctionWithPublicParmeterTypes(param) {
}
exports.publicFunctionWithPublicParmeterTypes = publicFunctionWithPublicParmeterTypes;
function privateFunctionWithPrivateParmeterTypes(param) {
}
function privateFunctionWithPublicParmeterTypes(param) {
}
var publicClassWithPrivateModuleParameterTypes = /** @class */ (function () {
    function publicClassWithPrivateModuleParameterTypes(param, param1, param2) {
        this.param1 = param1;
        this.param2 = param2;
    }
    publicClassWithPrivateModuleParameterTypes.myPublicStaticMethod = function (param) {
    };
    publicClassWithPrivateModuleParameterTypes.prototype.myPublicMethod = function (param) {
    };
    return publicClassWithPrivateModuleParameterTypes;
}());
exports.publicClassWithPrivateModuleParameterTypes = publicClassWithPrivateModuleParameterTypes;
function publicFunctionWithPrivateModuleParameterTypes(param) {
}
exports.publicFunctionWithPrivateModuleParameterTypes = publicFunctionWithPrivateModuleParameterTypes;
var privateClassWithPrivateModuleParameterTypes = /** @class */ (function () {
    function privateClassWithPrivateModuleParameterTypes(param, param1, param2) {
        this.param1 = param1;
        this.param2 = param2;
    }
    privateClassWithPrivateModuleParameterTypes.myPublicStaticMethod = function (param) {
    };
    privateClassWithPrivateModuleParameterTypes.prototype.myPublicMethod = function (param) {
    };
    return privateClassWithPrivateModuleParameterTypes;
}());
function privateFunctionWithPrivateModuleParameterTypes(param) {
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
    var publicClassWithWithPrivateParmeterTypes = /** @class */ (function () {
        function publicClassWithWithPrivateParmeterTypes(param, param1, param2) {
            this.param1 = param1;
            this.param2 = param2;
        }
        publicClassWithWithPrivateParmeterTypes.myPublicStaticMethod = function (param) {
        };
        publicClassWithWithPrivateParmeterTypes.myPrivateStaticMethod = function (param) {
        };
        publicClassWithWithPrivateParmeterTypes.prototype.myPublicMethod = function (param) {
        };
        publicClassWithWithPrivateParmeterTypes.prototype.myPrivateMethod = function (param) {
        };
        return publicClassWithWithPrivateParmeterTypes;
    }());
    publicModule.publicClassWithWithPrivateParmeterTypes = publicClassWithWithPrivateParmeterTypes;
    var publicClassWithWithPublicParmeterTypes = /** @class */ (function () {
        function publicClassWithWithPublicParmeterTypes(param, param1, param2) {
            this.param1 = param1;
            this.param2 = param2;
        }
        publicClassWithWithPublicParmeterTypes.myPublicStaticMethod = function (param) {
        };
        publicClassWithWithPublicParmeterTypes.myPrivateStaticMethod = function (param) {
        };
        publicClassWithWithPublicParmeterTypes.prototype.myPublicMethod = function (param) {
        };
        publicClassWithWithPublicParmeterTypes.prototype.myPrivateMethod = function (param) {
        };
        return publicClassWithWithPublicParmeterTypes;
    }());
    publicModule.publicClassWithWithPublicParmeterTypes = publicClassWithWithPublicParmeterTypes;
    var privateClassWithWithPrivateParmeterTypes = /** @class */ (function () {
        function privateClassWithWithPrivateParmeterTypes(param, param1, param2) {
            this.param1 = param1;
            this.param2 = param2;
        }
        privateClassWithWithPrivateParmeterTypes.myPublicStaticMethod = function (param) {
        };
        privateClassWithWithPrivateParmeterTypes.myPrivateStaticMethod = function (param) {
        };
        privateClassWithWithPrivateParmeterTypes.prototype.myPublicMethod = function (param) {
        };
        privateClassWithWithPrivateParmeterTypes.prototype.myPrivateMethod = function (param) {
        };
        return privateClassWithWithPrivateParmeterTypes;
    }());
    var privateClassWithWithPublicParmeterTypes = /** @class */ (function () {
        function privateClassWithWithPublicParmeterTypes(param, param1, param2) {
            this.param1 = param1;
            this.param2 = param2;
        }
        privateClassWithWithPublicParmeterTypes.myPublicStaticMethod = function (param) {
        };
        privateClassWithWithPublicParmeterTypes.myPrivateStaticMethod = function (param) {
        };
        privateClassWithWithPublicParmeterTypes.prototype.myPublicMethod = function (param) {
        };
        privateClassWithWithPublicParmeterTypes.prototype.myPrivateMethod = function (param) {
        };
        return privateClassWithWithPublicParmeterTypes;
    }());
    function publicFunctionWithPrivateParmeterTypes(param) {
    }
    publicModule.publicFunctionWithPrivateParmeterTypes = publicFunctionWithPrivateParmeterTypes;
    function publicFunctionWithPublicParmeterTypes(param) {
    }
    publicModule.publicFunctionWithPublicParmeterTypes = publicFunctionWithPublicParmeterTypes;
    function privateFunctionWithPrivateParmeterTypes(param) {
    }
    function privateFunctionWithPublicParmeterTypes(param) {
    }
    var publicClassWithPrivateModuleParameterTypes = /** @class */ (function () {
        function publicClassWithPrivateModuleParameterTypes(param, param1, param2) {
            this.param1 = param1;
            this.param2 = param2;
        }
        publicClassWithPrivateModuleParameterTypes.myPublicStaticMethod = function (param) {
        };
        publicClassWithPrivateModuleParameterTypes.prototype.myPublicMethod = function (param) {
        };
        return publicClassWithPrivateModuleParameterTypes;
    }());
    publicModule.publicClassWithPrivateModuleParameterTypes = publicClassWithPrivateModuleParameterTypes;
    function publicFunctionWithPrivateModuleParameterTypes(param) {
    }
    publicModule.publicFunctionWithPrivateModuleParameterTypes = publicFunctionWithPrivateModuleParameterTypes;
    var privateClassWithPrivateModuleParameterTypes = /** @class */ (function () {
        function privateClassWithPrivateModuleParameterTypes(param, param1, param2) {
            this.param1 = param1;
            this.param2 = param2;
        }
        privateClassWithPrivateModuleParameterTypes.myPublicStaticMethod = function (param) {
        };
        privateClassWithPrivateModuleParameterTypes.prototype.myPublicMethod = function (param) {
        };
        return privateClassWithPrivateModuleParameterTypes;
    }());
    function privateFunctionWithPrivateModuleParameterTypes(param) {
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
    var publicClassWithWithPrivateParmeterTypes = /** @class */ (function () {
        function publicClassWithWithPrivateParmeterTypes(param, param1, param2) {
            this.param1 = param1;
            this.param2 = param2;
        }
        publicClassWithWithPrivateParmeterTypes.myPublicStaticMethod = function (param) {
        };
        publicClassWithWithPrivateParmeterTypes.myPrivateStaticMethod = function (param) {
        };
        publicClassWithWithPrivateParmeterTypes.prototype.myPublicMethod = function (param) {
        };
        publicClassWithWithPrivateParmeterTypes.prototype.myPrivateMethod = function (param) {
        };
        return publicClassWithWithPrivateParmeterTypes;
    }());
    privateModule.publicClassWithWithPrivateParmeterTypes = publicClassWithWithPrivateParmeterTypes;
    var publicClassWithWithPublicParmeterTypes = /** @class */ (function () {
        function publicClassWithWithPublicParmeterTypes(param, param1, param2) {
            this.param1 = param1;
            this.param2 = param2;
        }
        publicClassWithWithPublicParmeterTypes.myPublicStaticMethod = function (param) {
        };
        publicClassWithWithPublicParmeterTypes.myPrivateStaticMethod = function (param) {
        };
        publicClassWithWithPublicParmeterTypes.prototype.myPublicMethod = function (param) {
        };
        publicClassWithWithPublicParmeterTypes.prototype.myPrivateMethod = function (param) {
        };
        return publicClassWithWithPublicParmeterTypes;
    }());
    privateModule.publicClassWithWithPublicParmeterTypes = publicClassWithWithPublicParmeterTypes;
    var privateClassWithWithPrivateParmeterTypes = /** @class */ (function () {
        function privateClassWithWithPrivateParmeterTypes(param, param1, param2) {
            this.param1 = param1;
            this.param2 = param2;
        }
        privateClassWithWithPrivateParmeterTypes.myPublicStaticMethod = function (param) {
        };
        privateClassWithWithPrivateParmeterTypes.myPrivateStaticMethod = function (param) {
        };
        privateClassWithWithPrivateParmeterTypes.prototype.myPublicMethod = function (param) {
        };
        privateClassWithWithPrivateParmeterTypes.prototype.myPrivateMethod = function (param) {
        };
        return privateClassWithWithPrivateParmeterTypes;
    }());
    var privateClassWithWithPublicParmeterTypes = /** @class */ (function () {
        function privateClassWithWithPublicParmeterTypes(param, param1, param2) {
            this.param1 = param1;
            this.param2 = param2;
        }
        privateClassWithWithPublicParmeterTypes.myPublicStaticMethod = function (param) {
        };
        privateClassWithWithPublicParmeterTypes.myPrivateStaticMethod = function (param) {
        };
        privateClassWithWithPublicParmeterTypes.prototype.myPublicMethod = function (param) {
        };
        privateClassWithWithPublicParmeterTypes.prototype.myPrivateMethod = function (param) {
        };
        return privateClassWithWithPublicParmeterTypes;
    }());
    function publicFunctionWithPrivateParmeterTypes(param) {
    }
    privateModule.publicFunctionWithPrivateParmeterTypes = publicFunctionWithPrivateParmeterTypes;
    function publicFunctionWithPublicParmeterTypes(param) {
    }
    privateModule.publicFunctionWithPublicParmeterTypes = publicFunctionWithPublicParmeterTypes;
    function privateFunctionWithPrivateParmeterTypes(param) {
    }
    function privateFunctionWithPublicParmeterTypes(param) {
    }
    var publicClassWithPrivateModuleParameterTypes = /** @class */ (function () {
        function publicClassWithPrivateModuleParameterTypes(param, param1, param2) {
            this.param1 = param1;
            this.param2 = param2;
        }
        publicClassWithPrivateModuleParameterTypes.myPublicStaticMethod = function (param) {
        };
        publicClassWithPrivateModuleParameterTypes.prototype.myPublicMethod = function (param) {
        };
        return publicClassWithPrivateModuleParameterTypes;
    }());
    privateModule.publicClassWithPrivateModuleParameterTypes = publicClassWithPrivateModuleParameterTypes;
    function publicFunctionWithPrivateModuleParameterTypes(param) {
    }
    privateModule.publicFunctionWithPrivateModuleParameterTypes = publicFunctionWithPrivateModuleParameterTypes;
    var privateClassWithPrivateModuleParameterTypes = /** @class */ (function () {
        function privateClassWithPrivateModuleParameterTypes(param, param1, param2) {
            this.param1 = param1;
            this.param2 = param2;
        }
        privateClassWithPrivateModuleParameterTypes.myPublicStaticMethod = function (param) {
        };
        privateClassWithPrivateModuleParameterTypes.prototype.myPublicMethod = function (param) {
        };
        return privateClassWithPrivateModuleParameterTypes;
    }());
    function privateFunctionWithPrivateModuleParameterTypes(param) {
    }
})(privateModule || (privateModule = {}));
//// [privacyFunctionParameterDeclFile_GlobalFile.js]
var publicClassInGlobal = /** @class */ (function () {
    function publicClassInGlobal() {
    }
    return publicClassInGlobal;
}());
var publicClassWithWithPublicParmeterTypesInGlobal = /** @class */ (function () {
    function publicClassWithWithPublicParmeterTypesInGlobal(param, param1, param2) {
        this.param1 = param1;
        this.param2 = param2;
    }
    publicClassWithWithPublicParmeterTypesInGlobal.myPublicStaticMethod = function (param) {
    };
    publicClassWithWithPublicParmeterTypesInGlobal.myPrivateStaticMethod = function (param) {
    };
    publicClassWithWithPublicParmeterTypesInGlobal.prototype.myPublicMethod = function (param) {
    };
    publicClassWithWithPublicParmeterTypesInGlobal.prototype.myPrivateMethod = function (param) {
    };
    return publicClassWithWithPublicParmeterTypesInGlobal;
}());
function publicFunctionWithPublicParmeterTypesInGlobal(param) {
}
var publicModuleInGlobal;
(function (publicModuleInGlobal) {
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
    publicModuleInGlobal.publicClass = publicClass;
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
        var publicClassWithWithPrivateParmeterTypes = /** @class */ (function () {
            function publicClassWithWithPrivateParmeterTypes(param, param1, param2) {
                this.param1 = param1;
                this.param2 = param2;
            }
            publicClassWithWithPrivateParmeterTypes.myPublicStaticMethod = function (param) {
            };
            publicClassWithWithPrivateParmeterTypes.myPrivateStaticMethod = function (param) {
            };
            publicClassWithWithPrivateParmeterTypes.prototype.myPublicMethod = function (param) {
            };
            publicClassWithWithPrivateParmeterTypes.prototype.myPrivateMethod = function (param) {
            };
            return publicClassWithWithPrivateParmeterTypes;
        }());
        privateModule.publicClassWithWithPrivateParmeterTypes = publicClassWithWithPrivateParmeterTypes;
        var publicClassWithWithPublicParmeterTypes = /** @class */ (function () {
            function publicClassWithWithPublicParmeterTypes(param, param1, param2) {
                this.param1 = param1;
                this.param2 = param2;
            }
            publicClassWithWithPublicParmeterTypes.myPublicStaticMethod = function (param) {
            };
            publicClassWithWithPublicParmeterTypes.myPrivateStaticMethod = function (param) {
            };
            publicClassWithWithPublicParmeterTypes.prototype.myPublicMethod = function (param) {
            };
            publicClassWithWithPublicParmeterTypes.prototype.myPrivateMethod = function (param) {
            };
            return publicClassWithWithPublicParmeterTypes;
        }());
        privateModule.publicClassWithWithPublicParmeterTypes = publicClassWithWithPublicParmeterTypes;
        var privateClassWithWithPrivateParmeterTypes = /** @class */ (function () {
            function privateClassWithWithPrivateParmeterTypes(param, param1, param2) {
                this.param1 = param1;
                this.param2 = param2;
            }
            privateClassWithWithPrivateParmeterTypes.myPublicStaticMethod = function (param) {
            };
            privateClassWithWithPrivateParmeterTypes.myPrivateStaticMethod = function (param) {
            };
            privateClassWithWithPrivateParmeterTypes.prototype.myPublicMethod = function (param) {
            };
            privateClassWithWithPrivateParmeterTypes.prototype.myPrivateMethod = function (param) {
            };
            return privateClassWithWithPrivateParmeterTypes;
        }());
        var privateClassWithWithPublicParmeterTypes = /** @class */ (function () {
            function privateClassWithWithPublicParmeterTypes(param, param1, param2) {
                this.param1 = param1;
                this.param2 = param2;
            }
            privateClassWithWithPublicParmeterTypes.myPublicStaticMethod = function (param) {
            };
            privateClassWithWithPublicParmeterTypes.myPrivateStaticMethod = function (param) {
            };
            privateClassWithWithPublicParmeterTypes.prototype.myPublicMethod = function (param) {
            };
            privateClassWithWithPublicParmeterTypes.prototype.myPrivateMethod = function (param) {
            };
            return privateClassWithWithPublicParmeterTypes;
        }());
        function publicFunctionWithPrivateParmeterTypes(param) {
        }
        privateModule.publicFunctionWithPrivateParmeterTypes = publicFunctionWithPrivateParmeterTypes;
        function publicFunctionWithPublicParmeterTypes(param) {
        }
        privateModule.publicFunctionWithPublicParmeterTypes = publicFunctionWithPublicParmeterTypes;
        function privateFunctionWithPrivateParmeterTypes(param) {
        }
        function privateFunctionWithPublicParmeterTypes(param) {
        }
        var publicClassWithPrivateModuleParameterTypes = /** @class */ (function () {
            function publicClassWithPrivateModuleParameterTypes(param, param1, param2) {
                this.param1 = param1;
                this.param2 = param2;
            }
            publicClassWithPrivateModuleParameterTypes.myPublicStaticMethod = function (param) {
            };
            publicClassWithPrivateModuleParameterTypes.prototype.myPublicMethod = function (param) {
            };
            return publicClassWithPrivateModuleParameterTypes;
        }());
        privateModule.publicClassWithPrivateModuleParameterTypes = publicClassWithPrivateModuleParameterTypes;
        function publicFunctionWithPrivateModuleParameterTypes(param) {
        }
        privateModule.publicFunctionWithPrivateModuleParameterTypes = publicFunctionWithPrivateModuleParameterTypes;
        var privateClassWithPrivateModuleParameterTypes = /** @class */ (function () {
            function privateClassWithPrivateModuleParameterTypes(param, param1, param2) {
                this.param1 = param1;
                this.param2 = param2;
            }
            privateClassWithPrivateModuleParameterTypes.myPublicStaticMethod = function (param) {
            };
            privateClassWithPrivateModuleParameterTypes.prototype.myPublicMethod = function (param) {
            };
            return privateClassWithPrivateModuleParameterTypes;
        }());
        function privateFunctionWithPrivateModuleParameterTypes(param) {
        }
    })(privateModule || (privateModule = {}));
    var publicClassWithWithPrivateParmeterTypes = /** @class */ (function () {
        function publicClassWithWithPrivateParmeterTypes(param, param1, param2) {
            this.param1 = param1;
            this.param2 = param2;
        }
        publicClassWithWithPrivateParmeterTypes.myPublicStaticMethod = function (param) {
        };
        publicClassWithWithPrivateParmeterTypes.myPrivateStaticMethod = function (param) {
        };
        publicClassWithWithPrivateParmeterTypes.prototype.myPublicMethod = function (param) {
        };
        publicClassWithWithPrivateParmeterTypes.prototype.myPrivateMethod = function (param) {
        };
        return publicClassWithWithPrivateParmeterTypes;
    }());
    publicModuleInGlobal.publicClassWithWithPrivateParmeterTypes = publicClassWithWithPrivateParmeterTypes;
    var publicClassWithWithPublicParmeterTypes = /** @class */ (function () {
        function publicClassWithWithPublicParmeterTypes(param, param1, param2) {
            this.param1 = param1;
            this.param2 = param2;
        }
        publicClassWithWithPublicParmeterTypes.myPublicStaticMethod = function (param) {
        };
        publicClassWithWithPublicParmeterTypes.myPrivateStaticMethod = function (param) {
        };
        publicClassWithWithPublicParmeterTypes.prototype.myPublicMethod = function (param) {
        };
        publicClassWithWithPublicParmeterTypes.prototype.myPrivateMethod = function (param) {
        };
        return publicClassWithWithPublicParmeterTypes;
    }());
    publicModuleInGlobal.publicClassWithWithPublicParmeterTypes = publicClassWithWithPublicParmeterTypes;
    var privateClassWithWithPrivateParmeterTypes = /** @class */ (function () {
        function privateClassWithWithPrivateParmeterTypes(param, param1, param2) {
            this.param1 = param1;
            this.param2 = param2;
        }
        privateClassWithWithPrivateParmeterTypes.myPublicStaticMethod = function (param) {
        };
        privateClassWithWithPrivateParmeterTypes.myPrivateStaticMethod = function (param) {
        };
        privateClassWithWithPrivateParmeterTypes.prototype.myPublicMethod = function (param) {
        };
        privateClassWithWithPrivateParmeterTypes.prototype.myPrivateMethod = function (param) {
        };
        return privateClassWithWithPrivateParmeterTypes;
    }());
    var privateClassWithWithPublicParmeterTypes = /** @class */ (function () {
        function privateClassWithWithPublicParmeterTypes(param, param1, param2) {
            this.param1 = param1;
            this.param2 = param2;
        }
        privateClassWithWithPublicParmeterTypes.myPublicStaticMethod = function (param) {
        };
        privateClassWithWithPublicParmeterTypes.myPrivateStaticMethod = function (param) {
        };
        privateClassWithWithPublicParmeterTypes.prototype.myPublicMethod = function (param) {
        };
        privateClassWithWithPublicParmeterTypes.prototype.myPrivateMethod = function (param) {
        };
        return privateClassWithWithPublicParmeterTypes;
    }());
    function publicFunctionWithPrivateParmeterTypes(param) {
    }
    publicModuleInGlobal.publicFunctionWithPrivateParmeterTypes = publicFunctionWithPrivateParmeterTypes;
    function publicFunctionWithPublicParmeterTypes(param) {
    }
    publicModuleInGlobal.publicFunctionWithPublicParmeterTypes = publicFunctionWithPublicParmeterTypes;
    function privateFunctionWithPrivateParmeterTypes(param) {
    }
    function privateFunctionWithPublicParmeterTypes(param) {
    }
    var publicClassWithPrivateModuleParameterTypes = /** @class */ (function () {
        function publicClassWithPrivateModuleParameterTypes(param, param1, param2) {
            this.param1 = param1;
            this.param2 = param2;
        }
        publicClassWithPrivateModuleParameterTypes.myPublicStaticMethod = function (param) {
        };
        publicClassWithPrivateModuleParameterTypes.prototype.myPublicMethod = function (param) {
        };
        return publicClassWithPrivateModuleParameterTypes;
    }());
    publicModuleInGlobal.publicClassWithPrivateModuleParameterTypes = publicClassWithPrivateModuleParameterTypes;
    function publicFunctionWithPrivateModuleParameterTypes(param) {
    }
    publicModuleInGlobal.publicFunctionWithPrivateModuleParameterTypes = publicFunctionWithPrivateModuleParameterTypes;
    var privateClassWithPrivateModuleParameterTypes = /** @class */ (function () {
        function privateClassWithPrivateModuleParameterTypes(param, param1, param2) {
            this.param1 = param1;
            this.param2 = param2;
        }
        privateClassWithPrivateModuleParameterTypes.myPublicStaticMethod = function (param) {
        };
        privateClassWithPrivateModuleParameterTypes.prototype.myPublicMethod = function (param) {
        };
        return privateClassWithPrivateModuleParameterTypes;
    }());
    function privateFunctionWithPrivateModuleParameterTypes(param) {
    }
})(publicModuleInGlobal || (publicModuleInGlobal = {}));


//// [privacyFunctionParameterDeclFile_externalModule.d.ts]
declare class privateClass {
}
export declare class publicClass {
}
export interface publicInterfaceWithPrivateParmeterTypes {
    new (param: privateClass): publicClass;
    (param: privateClass): publicClass;
    myMethod(param: privateClass): void;
}
export interface publicInterfaceWithPublicParmeterTypes {
    new (param: publicClass): publicClass;
    (param: publicClass): publicClass;
    myMethod(param: publicClass): void;
}
export declare class publicClassWithWithPrivateParmeterTypes {
    private param1;
    param2: privateClass;
    static myPublicStaticMethod(param: privateClass): void;
    private static myPrivateStaticMethod;
    myPublicMethod(param: privateClass): void;
    private myPrivateMethod;
    constructor(param: privateClass, param1: privateClass, param2: privateClass);
}
export declare class publicClassWithWithPublicParmeterTypes {
    private param1;
    param2: publicClass;
    static myPublicStaticMethod(param: publicClass): void;
    private static myPrivateStaticMethod;
    myPublicMethod(param: publicClass): void;
    private myPrivateMethod;
    constructor(param: publicClass, param1: publicClass, param2: publicClass);
}
export declare function publicFunctionWithPrivateParmeterTypes(param: privateClass): void;
export declare function publicFunctionWithPublicParmeterTypes(param: publicClass): void;
export declare function publicAmbientFunctionWithPrivateParmeterTypes(param: privateClass): void;
export declare function publicAmbientFunctionWithPublicParmeterTypes(param: publicClass): void;
export interface publicInterfaceWithPrivateModuleParameterTypes {
    new (param: privateModule.publicClass): publicClass;
    (param: privateModule.publicClass): publicClass;
    myMethod(param: privateModule.publicClass): void;
}
export declare class publicClassWithPrivateModuleParameterTypes {
    private param1;
    param2: privateModule.publicClass;
    static myPublicStaticMethod(param: privateModule.publicClass): void;
    myPublicMethod(param: privateModule.publicClass): void;
    constructor(param: privateModule.publicClass, param1: privateModule.publicClass, param2: privateModule.publicClass);
}
export declare function publicFunctionWithPrivateModuleParameterTypes(param: privateModule.publicClass): void;
export declare function publicAmbientFunctionWithPrivateModuleParameterTypes(param: privateModule.publicClass): void;
export declare module publicModule {
    class privateClass {
    }
    export class publicClass {
    }
    export interface publicInterfaceWithPrivateParmeterTypes {
        new (param: privateClass): publicClass;
        (param: privateClass): publicClass;
        myMethod(param: privateClass): void;
    }
    export interface publicInterfaceWithPublicParmeterTypes {
        new (param: publicClass): publicClass;
        (param: publicClass): publicClass;
        myMethod(param: publicClass): void;
    }
    export class publicClassWithWithPrivateParmeterTypes {
        private param1;
        param2: privateClass;
        static myPublicStaticMethod(param: privateClass): void;
        private static myPrivateStaticMethod;
        myPublicMethod(param: privateClass): void;
        private myPrivateMethod;
        constructor(param: privateClass, param1: privateClass, param2: privateClass);
    }
    export class publicClassWithWithPublicParmeterTypes {
        private param1;
        param2: publicClass;
        static myPublicStaticMethod(param: publicClass): void;
        private static myPrivateStaticMethod;
        myPublicMethod(param: publicClass): void;
        private myPrivateMethod;
        constructor(param: publicClass, param1: publicClass, param2: publicClass);
    }
    export function publicFunctionWithPrivateParmeterTypes(param: privateClass): void;
    export function publicFunctionWithPublicParmeterTypes(param: publicClass): void;
    export function publicAmbientFunctionWithPrivateParmeterTypes(param: privateClass): void;
    export function publicAmbientFunctionWithPublicParmeterTypes(param: publicClass): void;
    export interface publicInterfaceWithPrivateModuleParameterTypes {
        new (param: privateModule.publicClass): publicClass;
        (param: privateModule.publicClass): publicClass;
        myMethod(param: privateModule.publicClass): void;
    }
    export class publicClassWithPrivateModuleParameterTypes {
        private param1;
        param2: privateModule.publicClass;
        static myPublicStaticMethod(param: privateModule.publicClass): void;
        myPublicMethod(param: privateModule.publicClass): void;
        constructor(param: privateModule.publicClass, param1: privateModule.publicClass, param2: privateModule.publicClass);
    }
    export function publicFunctionWithPrivateModuleParameterTypes(param: privateModule.publicClass): void;
    export function publicAmbientFunctionWithPrivateModuleParameterTypes(param: privateModule.publicClass): void;
    export {};
}
declare module privateModule {
    class privateClass {
    }
    export class publicClass {
    }
    export interface publicInterfaceWithPrivateParmeterTypes {
        new (param: privateClass): publicClass;
        (param: privateClass): publicClass;
        myMethod(param: privateClass): void;
    }
    export interface publicInterfaceWithPublicParmeterTypes {
        new (param: publicClass): publicClass;
        (param: publicClass): publicClass;
        myMethod(param: publicClass): void;
    }
    export class publicClassWithWithPrivateParmeterTypes {
        private param1;
        param2: privateClass;
        static myPublicStaticMethod(param: privateClass): void;
        private static myPrivateStaticMethod;
        myPublicMethod(param: privateClass): void;
        private myPrivateMethod;
        constructor(param: privateClass, param1: privateClass, param2: privateClass);
    }
    export class publicClassWithWithPublicParmeterTypes {
        private param1;
        param2: publicClass;
        static myPublicStaticMethod(param: publicClass): void;
        private static myPrivateStaticMethod;
        myPublicMethod(param: publicClass): void;
        private myPrivateMethod;
        constructor(param: publicClass, param1: publicClass, param2: publicClass);
    }
    export function publicFunctionWithPrivateParmeterTypes(param: privateClass): void;
    export function publicFunctionWithPublicParmeterTypes(param: publicClass): void;
    export function publicAmbientFunctionWithPrivateParmeterTypes(param: privateClass): void;
    export function publicAmbientFunctionWithPublicParmeterTypes(param: publicClass): void;
    export interface publicInterfaceWithPrivateModuleParameterTypes {
        new (param: privateModule.publicClass): publicClass;
        (param: privateModule.publicClass): publicClass;
        myMethod(param: privateModule.publicClass): void;
    }
    export class publicClassWithPrivateModuleParameterTypes {
        private param1;
        param2: privateModule.publicClass;
        static myPublicStaticMethod(param: privateModule.publicClass): void;
        myPublicMethod(param: privateModule.publicClass): void;
        constructor(param: privateModule.publicClass, param1: privateModule.publicClass, param2: privateModule.publicClass);
    }
    export function publicFunctionWithPrivateModuleParameterTypes(param: privateModule.publicClass): void;
    export function publicAmbientFunctionWithPrivateModuleParameterTypes(param: privateModule.publicClass): void;
    export {};
}
export {};
//// [privacyFunctionParameterDeclFile_GlobalFile.d.ts]
declare class publicClassInGlobal {
}
interface publicInterfaceWithPublicParmeterTypesInGlobal {
    new (param: publicClassInGlobal): publicClassInGlobal;
    (param: publicClassInGlobal): publicClassInGlobal;
    myMethod(param: publicClassInGlobal): void;
}
declare class publicClassWithWithPublicParmeterTypesInGlobal {
    private param1;
    param2: publicClassInGlobal;
    static myPublicStaticMethod(param: publicClassInGlobal): void;
    private static myPrivateStaticMethod;
    myPublicMethod(param: publicClassInGlobal): void;
    private myPrivateMethod;
    constructor(param: publicClassInGlobal, param1: publicClassInGlobal, param2: publicClassInGlobal);
}
declare function publicFunctionWithPublicParmeterTypesInGlobal(param: publicClassInGlobal): void;
declare function publicAmbientFunctionWithPublicParmeterTypesInGlobal(param: publicClassInGlobal): void;
declare module publicModuleInGlobal {
    class privateClass {
    }
    export class publicClass {
    }
    module privateModule {
        class privateClass {
        }
        export class publicClass {
        }
        export interface publicInterfaceWithPrivateParmeterTypes {
            new (param: privateClass): publicClass;
            (param: privateClass): publicClass;
            myMethod(param: privateClass): void;
        }
        export interface publicInterfaceWithPublicParmeterTypes {
            new (param: publicClass): publicClass;
            (param: publicClass): publicClass;
            myMethod(param: publicClass): void;
        }
        export class publicClassWithWithPrivateParmeterTypes {
            private param1;
            param2: privateClass;
            static myPublicStaticMethod(param: privateClass): void;
            private static myPrivateStaticMethod;
            myPublicMethod(param: privateClass): void;
            private myPrivateMethod;
            constructor(param: privateClass, param1: privateClass, param2: privateClass);
        }
        export class publicClassWithWithPublicParmeterTypes {
            private param1;
            param2: publicClass;
            static myPublicStaticMethod(param: publicClass): void;
            private static myPrivateStaticMethod;
            myPublicMethod(param: publicClass): void;
            private myPrivateMethod;
            constructor(param: publicClass, param1: publicClass, param2: publicClass);
        }
        export function publicFunctionWithPrivateParmeterTypes(param: privateClass): void;
        export function publicFunctionWithPublicParmeterTypes(param: publicClass): void;
        export function publicAmbientFunctionWithPrivateParmeterTypes(param: privateClass): void;
        export function publicAmbientFunctionWithPublicParmeterTypes(param: publicClass): void;
        export interface publicInterfaceWithPrivateModuleParameterTypes {
            new (param: privateModule.publicClass): publicClass;
            (param: privateModule.publicClass): publicClass;
            myMethod(param: privateModule.publicClass): void;
        }
        export class publicClassWithPrivateModuleParameterTypes {
            private param1;
            param2: privateModule.publicClass;
            static myPublicStaticMethod(param: privateModule.publicClass): void;
            myPublicMethod(param: privateModule.publicClass): void;
            constructor(param: privateModule.publicClass, param1: privateModule.publicClass, param2: privateModule.publicClass);
        }
        export function publicFunctionWithPrivateModuleParameterTypes(param: privateModule.publicClass): void;
        export function publicAmbientFunctionWithPrivateModuleParameterTypes(param: privateModule.publicClass): void;
        export {};
    }
    export interface publicInterfaceWithPrivateParmeterTypes {
        new (param: privateClass): publicClass;
        (param: privateClass): publicClass;
        myMethod(param: privateClass): void;
    }
    export interface publicInterfaceWithPublicParmeterTypes {
        new (param: publicClass): publicClass;
        (param: publicClass): publicClass;
        myMethod(param: publicClass): void;
    }
    export class publicClassWithWithPrivateParmeterTypes {
        private param1;
        param2: privateClass;
        static myPublicStaticMethod(param: privateClass): void;
        private static myPrivateStaticMethod;
        myPublicMethod(param: privateClass): void;
        private myPrivateMethod;
        constructor(param: privateClass, param1: privateClass, param2: privateClass);
    }
    export class publicClassWithWithPublicParmeterTypes {
        private param1;
        param2: publicClass;
        static myPublicStaticMethod(param: publicClass): void;
        private static myPrivateStaticMethod;
        myPublicMethod(param: publicClass): void;
        private myPrivateMethod;
        constructor(param: publicClass, param1: publicClass, param2: publicClass);
    }
    export function publicFunctionWithPrivateParmeterTypes(param: privateClass): void;
    export function publicFunctionWithPublicParmeterTypes(param: publicClass): void;
    export function publicAmbientFunctionWithPrivateParmeterTypes(param: privateClass): void;
    export function publicAmbientFunctionWithPublicParmeterTypes(param: publicClass): void;
    export interface publicInterfaceWithPrivateModuleParameterTypes {
        new (param: privateModule.publicClass): publicClass;
        (param: privateModule.publicClass): publicClass;
        myMethod(param: privateModule.publicClass): void;
    }
    export class publicClassWithPrivateModuleParameterTypes {
        private param1;
        param2: privateModule.publicClass;
        static myPublicStaticMethod(param: privateModule.publicClass): void;
        myPublicMethod(param: privateModule.publicClass): void;
        constructor(param: privateModule.publicClass, param1: privateModule.publicClass, param2: privateModule.publicClass);
    }
    export function publicFunctionWithPrivateModuleParameterTypes(param: privateModule.publicClass): void;
    export function publicAmbientFunctionWithPrivateModuleParameterTypes(param: privateModule.publicClass): void;
    export {};
}
