//// [tests/cases/compiler/privacyFunctionParameterDeclFile.ts] ////

//// [privacyFunctionParameterDeclFile_externalModule.ts]

class privateClass {
}

export class publicClass {
}

export interface publicInterfaceWithPrivateParameterTypes {
    new (param: privateClass): publicClass; // Error
    (param: privateClass): publicClass; // Error
    myMethod(param: privateClass): void; // Error
}

export interface publicInterfaceWithPublicParameterTypes {
    new (param: publicClass): publicClass;
    (param: publicClass): publicClass;
    myMethod(param: publicClass): void;
}

interface privateInterfaceWithPrivateParameterTypes {
    new (param: privateClass): privateClass;
    (param: privateClass): privateClass;
    myMethod(param: privateClass): void;
}

interface privateInterfaceWithPublicParameterTypes {
    new (param: publicClass): publicClass;
    (param: publicClass): publicClass;
    myMethod(param: publicClass): void;
}

export class publicClassWithWithPrivateParameterTypes {
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

export class publicClassWithWithPublicParameterTypes {
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

class privateClassWithWithPrivateParameterTypes {
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

class privateClassWithWithPublicParameterTypes {
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

export function publicFunctionWithPrivateParameterTypes(param: privateClass) { // Error
}
export function publicFunctionWithPublicParameterTypes(param: publicClass) {
}
function privateFunctionWithPrivateParameterTypes(param: privateClass) {
}
function privateFunctionWithPublicParameterTypes(param: publicClass) {
}

export declare function publicAmbientFunctionWithPrivateParameterTypes(param: privateClass): void; // Error
export declare function publicAmbientFunctionWithPublicParameterTypes(param: publicClass): void;
declare function privateAmbientFunctionWithPrivateParameterTypes(param: privateClass): void;
declare function privateAmbientFunctionWithPublicParameterTypes(param: publicClass): void;

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


    export interface publicInterfaceWithPrivateParameterTypes {
        new (param: privateClass): publicClass; // Error
        (param: privateClass): publicClass; // Error
        myMethod(param: privateClass): void; // Error
    }

    export interface publicInterfaceWithPublicParameterTypes {
        new (param: publicClass): publicClass;
        (param: publicClass): publicClass;
        myMethod(param: publicClass): void;
    }

    interface privateInterfaceWithPrivateParameterTypes {
        new (param: privateClass): privateClass;
        (param: privateClass): privateClass;
        myMethod(param: privateClass): void;
    }

    interface privateInterfaceWithPublicParameterTypes {
        new (param: publicClass): publicClass;
        (param: publicClass): publicClass;
        myMethod(param: publicClass): void;
    }

    export class publicClassWithWithPrivateParameterTypes {
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

    export class publicClassWithWithPublicParameterTypes {
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

    class privateClassWithWithPrivateParameterTypes {
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

    class privateClassWithWithPublicParameterTypes {
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

    export function publicFunctionWithPrivateParameterTypes(param: privateClass) { // Error
    }
    export function publicFunctionWithPublicParameterTypes(param: publicClass) {
    }
    function privateFunctionWithPrivateParameterTypes(param: privateClass) {
    }
    function privateFunctionWithPublicParameterTypes(param: publicClass) {
    }

    export declare function publicAmbientFunctionWithPrivateParameterTypes(param: privateClass): void; // Error
    export declare function publicAmbientFunctionWithPublicParameterTypes(param: publicClass): void;
    declare function privateAmbientFunctionWithPrivateParameterTypes(param: privateClass): void;
    declare function privateAmbientFunctionWithPublicParameterTypes(param: publicClass): void;

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

    export interface publicInterfaceWithPrivateParameterTypes {
        new (param: privateClass): publicClass;
        (param: privateClass): publicClass;
        myMethod(param: privateClass): void;
    }

    export interface publicInterfaceWithPublicParameterTypes {
        new (param: publicClass): publicClass;
        (param: publicClass): publicClass;
        myMethod(param: publicClass): void;
    }

    interface privateInterfaceWithPrivateParameterTypes {
        new (param: privateClass): privateClass;
        (param: privateClass): privateClass;
        myMethod(param: privateClass): void;
    }

    interface privateInterfaceWithPublicParameterTypes {
        new (param: publicClass): publicClass;
        (param: publicClass): publicClass;
        myMethod(param: publicClass): void;
    }

    export class publicClassWithWithPrivateParameterTypes {
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

    export class publicClassWithWithPublicParameterTypes {
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

    class privateClassWithWithPrivateParameterTypes {
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

    class privateClassWithWithPublicParameterTypes {
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

    export function publicFunctionWithPrivateParameterTypes(param: privateClass) {
    }
    export function publicFunctionWithPublicParameterTypes(param: publicClass) {
    }
    function privateFunctionWithPrivateParameterTypes(param: privateClass) {
    }
    function privateFunctionWithPublicParameterTypes(param: publicClass) {
    }

    export declare function publicAmbientFunctionWithPrivateParameterTypes(param: privateClass): void;
    export declare function publicAmbientFunctionWithPublicParameterTypes(param: publicClass): void;
    declare function privateAmbientFunctionWithPrivateParameterTypes(param: privateClass): void;
    declare function privateAmbientFunctionWithPublicParameterTypes(param: publicClass): void;

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
interface publicInterfaceWithPublicParameterTypesInGlobal {
    new (param: publicClassInGlobal): publicClassInGlobal;
    (param: publicClassInGlobal): publicClassInGlobal;
    myMethod(param: publicClassInGlobal): void;
}
class publicClassWithWithPublicParameterTypesInGlobal {
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
function publicFunctionWithPublicParameterTypesInGlobal(param: publicClassInGlobal) {
}
declare function publicAmbientFunctionWithPublicParameterTypesInGlobal(param: publicClassInGlobal): void;

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

        export interface publicInterfaceWithPrivateParameterTypes {
            new (param: privateClass): publicClass;
            (param: privateClass): publicClass;
            myMethod(param: privateClass): void;
        }

        export interface publicInterfaceWithPublicParameterTypes {
            new (param: publicClass): publicClass;
            (param: publicClass): publicClass;
            myMethod(param: publicClass): void;
        }

        interface privateInterfaceWithPrivateParameterTypes {
            new (param: privateClass): privateClass;
            (param: privateClass): privateClass;
            myMethod(param: privateClass): void;
        }

        interface privateInterfaceWithPublicParameterTypes {
            new (param: publicClass): publicClass;
            (param: publicClass): publicClass;
            myMethod(param: publicClass): void;
        }

        export class publicClassWithWithPrivateParameterTypes {
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

        export class publicClassWithWithPublicParameterTypes {
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

        class privateClassWithWithPrivateParameterTypes {
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

        class privateClassWithWithPublicParameterTypes {
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

        export function publicFunctionWithPrivateParameterTypes(param: privateClass) {
        }
        export function publicFunctionWithPublicParameterTypes(param: publicClass) {
        }
        function privateFunctionWithPrivateParameterTypes(param: privateClass) {
        }
        function privateFunctionWithPublicParameterTypes(param: publicClass) {
        }

        export declare function publicAmbientFunctionWithPrivateParameterTypes(param: privateClass): void;
        export declare function publicAmbientFunctionWithPublicParameterTypes(param: publicClass): void;
        declare function privateAmbientFunctionWithPrivateParameterTypes(param: privateClass): void;
        declare function privateAmbientFunctionWithPublicParameterTypes(param: publicClass): void;

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

    export interface publicInterfaceWithPrivateParameterTypes {
        new (param: privateClass): publicClass; // Error
        (param: privateClass): publicClass; // Error
        myMethod(param: privateClass): void; // Error
    }

    export interface publicInterfaceWithPublicParameterTypes {
        new (param: publicClass): publicClass;
        (param: publicClass): publicClass;
        myMethod(param: publicClass): void;
    }

    interface privateInterfaceWithPrivateParameterTypes {
        new (param: privateClass): privateClass;
        (param: privateClass): privateClass;
        myMethod(param: privateClass): void;
    }

    interface privateInterfaceWithPublicParameterTypes {
        new (param: publicClass): publicClass;
        (param: publicClass): publicClass;
        myMethod(param: publicClass): void;
    }

    export class publicClassWithWithPrivateParameterTypes {
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

    export class publicClassWithWithPublicParameterTypes {
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

    class privateClassWithWithPrivateParameterTypes {
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

    class privateClassWithWithPublicParameterTypes {
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

    export function publicFunctionWithPrivateParameterTypes(param: privateClass) { // Error
    }
    export function publicFunctionWithPublicParameterTypes(param: publicClass) {
    }
    function privateFunctionWithPrivateParameterTypes(param: privateClass) {
    }
    function privateFunctionWithPublicParameterTypes(param: publicClass) {
    }

    export declare function publicAmbientFunctionWithPrivateParameterTypes(param: privateClass): void; // Error
    export declare function publicAmbientFunctionWithPublicParameterTypes(param: publicClass): void;
    declare function privateAmbientFunctionWithPrivateParameterTypes(param: privateClass): void;
    declare function privateAmbientFunctionWithPublicParameterTypes(param: publicClass): void;

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
var privateClass = (function () {
    function privateClass() {
    }
    return privateClass;
}());
var publicClass = (function () {
    function publicClass() {
    }
    return publicClass;
}());
exports.publicClass = publicClass;
var publicClassWithWithPrivateParameterTypes = (function () {
    function publicClassWithWithPrivateParameterTypes(param, param1, param2) {
        this.param1 = param1;
        this.param2 = param2;
    }
    publicClassWithWithPrivateParameterTypes.myPublicStaticMethod = function (param) {
    };
    publicClassWithWithPrivateParameterTypes.myPrivateStaticMethod = function (param) {
    };
    publicClassWithWithPrivateParameterTypes.prototype.myPublicMethod = function (param) {
    };
    publicClassWithWithPrivateParameterTypes.prototype.myPrivateMethod = function (param) {
    };
    return publicClassWithWithPrivateParameterTypes;
}());
exports.publicClassWithWithPrivateParameterTypes = publicClassWithWithPrivateParameterTypes;
var publicClassWithWithPublicParameterTypes = (function () {
    function publicClassWithWithPublicParameterTypes(param, param1, param2) {
        this.param1 = param1;
        this.param2 = param2;
    }
    publicClassWithWithPublicParameterTypes.myPublicStaticMethod = function (param) {
    };
    publicClassWithWithPublicParameterTypes.myPrivateStaticMethod = function (param) {
    };
    publicClassWithWithPublicParameterTypes.prototype.myPublicMethod = function (param) {
    };
    publicClassWithWithPublicParameterTypes.prototype.myPrivateMethod = function (param) {
    };
    return publicClassWithWithPublicParameterTypes;
}());
exports.publicClassWithWithPublicParameterTypes = publicClassWithWithPublicParameterTypes;
var privateClassWithWithPrivateParameterTypes = (function () {
    function privateClassWithWithPrivateParameterTypes(param, param1, param2) {
        this.param1 = param1;
        this.param2 = param2;
    }
    privateClassWithWithPrivateParameterTypes.myPublicStaticMethod = function (param) {
    };
    privateClassWithWithPrivateParameterTypes.myPrivateStaticMethod = function (param) {
    };
    privateClassWithWithPrivateParameterTypes.prototype.myPublicMethod = function (param) {
    };
    privateClassWithWithPrivateParameterTypes.prototype.myPrivateMethod = function (param) {
    };
    return privateClassWithWithPrivateParameterTypes;
}());
var privateClassWithWithPublicParameterTypes = (function () {
    function privateClassWithWithPublicParameterTypes(param, param1, param2) {
        this.param1 = param1;
        this.param2 = param2;
    }
    privateClassWithWithPublicParameterTypes.myPublicStaticMethod = function (param) {
    };
    privateClassWithWithPublicParameterTypes.myPrivateStaticMethod = function (param) {
    };
    privateClassWithWithPublicParameterTypes.prototype.myPublicMethod = function (param) {
    };
    privateClassWithWithPublicParameterTypes.prototype.myPrivateMethod = function (param) {
    };
    return privateClassWithWithPublicParameterTypes;
}());
function publicFunctionWithPrivateParameterTypes(param) {
}
exports.publicFunctionWithPrivateParameterTypes = publicFunctionWithPrivateParameterTypes;
function publicFunctionWithPublicParameterTypes(param) {
}
exports.publicFunctionWithPublicParameterTypes = publicFunctionWithPublicParameterTypes;
function privateFunctionWithPrivateParameterTypes(param) {
}
function privateFunctionWithPublicParameterTypes(param) {
}
var publicClassWithPrivateModuleParameterTypes = (function () {
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
var privateClassWithPrivateModuleParameterTypes = (function () {
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
    var privateClass = (function () {
        function privateClass() {
        }
        return privateClass;
    }());
    var publicClass = (function () {
        function publicClass() {
        }
        return publicClass;
    }());
    publicModule.publicClass = publicClass;
    var publicClassWithWithPrivateParameterTypes = (function () {
        function publicClassWithWithPrivateParameterTypes(param, param1, param2) {
            this.param1 = param1;
            this.param2 = param2;
        }
        publicClassWithWithPrivateParameterTypes.myPublicStaticMethod = function (param) {
        };
        publicClassWithWithPrivateParameterTypes.myPrivateStaticMethod = function (param) {
        };
        publicClassWithWithPrivateParameterTypes.prototype.myPublicMethod = function (param) {
        };
        publicClassWithWithPrivateParameterTypes.prototype.myPrivateMethod = function (param) {
        };
        return publicClassWithWithPrivateParameterTypes;
    }());
    publicModule.publicClassWithWithPrivateParameterTypes = publicClassWithWithPrivateParameterTypes;
    var publicClassWithWithPublicParameterTypes = (function () {
        function publicClassWithWithPublicParameterTypes(param, param1, param2) {
            this.param1 = param1;
            this.param2 = param2;
        }
        publicClassWithWithPublicParameterTypes.myPublicStaticMethod = function (param) {
        };
        publicClassWithWithPublicParameterTypes.myPrivateStaticMethod = function (param) {
        };
        publicClassWithWithPublicParameterTypes.prototype.myPublicMethod = function (param) {
        };
        publicClassWithWithPublicParameterTypes.prototype.myPrivateMethod = function (param) {
        };
        return publicClassWithWithPublicParameterTypes;
    }());
    publicModule.publicClassWithWithPublicParameterTypes = publicClassWithWithPublicParameterTypes;
    var privateClassWithWithPrivateParameterTypes = (function () {
        function privateClassWithWithPrivateParameterTypes(param, param1, param2) {
            this.param1 = param1;
            this.param2 = param2;
        }
        privateClassWithWithPrivateParameterTypes.myPublicStaticMethod = function (param) {
        };
        privateClassWithWithPrivateParameterTypes.myPrivateStaticMethod = function (param) {
        };
        privateClassWithWithPrivateParameterTypes.prototype.myPublicMethod = function (param) {
        };
        privateClassWithWithPrivateParameterTypes.prototype.myPrivateMethod = function (param) {
        };
        return privateClassWithWithPrivateParameterTypes;
    }());
    var privateClassWithWithPublicParameterTypes = (function () {
        function privateClassWithWithPublicParameterTypes(param, param1, param2) {
            this.param1 = param1;
            this.param2 = param2;
        }
        privateClassWithWithPublicParameterTypes.myPublicStaticMethod = function (param) {
        };
        privateClassWithWithPublicParameterTypes.myPrivateStaticMethod = function (param) {
        };
        privateClassWithWithPublicParameterTypes.prototype.myPublicMethod = function (param) {
        };
        privateClassWithWithPublicParameterTypes.prototype.myPrivateMethod = function (param) {
        };
        return privateClassWithWithPublicParameterTypes;
    }());
    function publicFunctionWithPrivateParameterTypes(param) {
    }
    publicModule.publicFunctionWithPrivateParameterTypes = publicFunctionWithPrivateParameterTypes;
    function publicFunctionWithPublicParameterTypes(param) {
    }
    publicModule.publicFunctionWithPublicParameterTypes = publicFunctionWithPublicParameterTypes;
    function privateFunctionWithPrivateParameterTypes(param) {
    }
    function privateFunctionWithPublicParameterTypes(param) {
    }
    var publicClassWithPrivateModuleParameterTypes = (function () {
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
    var privateClassWithPrivateModuleParameterTypes = (function () {
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
    var privateClass = (function () {
        function privateClass() {
        }
        return privateClass;
    }());
    var publicClass = (function () {
        function publicClass() {
        }
        return publicClass;
    }());
    privateModule.publicClass = publicClass;
    var publicClassWithWithPrivateParameterTypes = (function () {
        function publicClassWithWithPrivateParameterTypes(param, param1, param2) {
            this.param1 = param1;
            this.param2 = param2;
        }
        publicClassWithWithPrivateParameterTypes.myPublicStaticMethod = function (param) {
        };
        publicClassWithWithPrivateParameterTypes.myPrivateStaticMethod = function (param) {
        };
        publicClassWithWithPrivateParameterTypes.prototype.myPublicMethod = function (param) {
        };
        publicClassWithWithPrivateParameterTypes.prototype.myPrivateMethod = function (param) {
        };
        return publicClassWithWithPrivateParameterTypes;
    }());
    privateModule.publicClassWithWithPrivateParameterTypes = publicClassWithWithPrivateParameterTypes;
    var publicClassWithWithPublicParameterTypes = (function () {
        function publicClassWithWithPublicParameterTypes(param, param1, param2) {
            this.param1 = param1;
            this.param2 = param2;
        }
        publicClassWithWithPublicParameterTypes.myPublicStaticMethod = function (param) {
        };
        publicClassWithWithPublicParameterTypes.myPrivateStaticMethod = function (param) {
        };
        publicClassWithWithPublicParameterTypes.prototype.myPublicMethod = function (param) {
        };
        publicClassWithWithPublicParameterTypes.prototype.myPrivateMethod = function (param) {
        };
        return publicClassWithWithPublicParameterTypes;
    }());
    privateModule.publicClassWithWithPublicParameterTypes = publicClassWithWithPublicParameterTypes;
    var privateClassWithWithPrivateParameterTypes = (function () {
        function privateClassWithWithPrivateParameterTypes(param, param1, param2) {
            this.param1 = param1;
            this.param2 = param2;
        }
        privateClassWithWithPrivateParameterTypes.myPublicStaticMethod = function (param) {
        };
        privateClassWithWithPrivateParameterTypes.myPrivateStaticMethod = function (param) {
        };
        privateClassWithWithPrivateParameterTypes.prototype.myPublicMethod = function (param) {
        };
        privateClassWithWithPrivateParameterTypes.prototype.myPrivateMethod = function (param) {
        };
        return privateClassWithWithPrivateParameterTypes;
    }());
    var privateClassWithWithPublicParameterTypes = (function () {
        function privateClassWithWithPublicParameterTypes(param, param1, param2) {
            this.param1 = param1;
            this.param2 = param2;
        }
        privateClassWithWithPublicParameterTypes.myPublicStaticMethod = function (param) {
        };
        privateClassWithWithPublicParameterTypes.myPrivateStaticMethod = function (param) {
        };
        privateClassWithWithPublicParameterTypes.prototype.myPublicMethod = function (param) {
        };
        privateClassWithWithPublicParameterTypes.prototype.myPrivateMethod = function (param) {
        };
        return privateClassWithWithPublicParameterTypes;
    }());
    function publicFunctionWithPrivateParameterTypes(param) {
    }
    privateModule.publicFunctionWithPrivateParameterTypes = publicFunctionWithPrivateParameterTypes;
    function publicFunctionWithPublicParameterTypes(param) {
    }
    privateModule.publicFunctionWithPublicParameterTypes = publicFunctionWithPublicParameterTypes;
    function privateFunctionWithPrivateParameterTypes(param) {
    }
    function privateFunctionWithPublicParameterTypes(param) {
    }
    var publicClassWithPrivateModuleParameterTypes = (function () {
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
    var privateClassWithPrivateModuleParameterTypes = (function () {
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
var publicClassInGlobal = (function () {
    function publicClassInGlobal() {
    }
    return publicClassInGlobal;
}());
var publicClassWithWithPublicParameterTypesInGlobal = (function () {
    function publicClassWithWithPublicParameterTypesInGlobal(param, param1, param2) {
        this.param1 = param1;
        this.param2 = param2;
    }
    publicClassWithWithPublicParameterTypesInGlobal.myPublicStaticMethod = function (param) {
    };
    publicClassWithWithPublicParameterTypesInGlobal.myPrivateStaticMethod = function (param) {
    };
    publicClassWithWithPublicParameterTypesInGlobal.prototype.myPublicMethod = function (param) {
    };
    publicClassWithWithPublicParameterTypesInGlobal.prototype.myPrivateMethod = function (param) {
    };
    return publicClassWithWithPublicParameterTypesInGlobal;
}());
function publicFunctionWithPublicParameterTypesInGlobal(param) {
}
var publicModuleInGlobal;
(function (publicModuleInGlobal) {
    var privateClass = (function () {
        function privateClass() {
        }
        return privateClass;
    }());
    var publicClass = (function () {
        function publicClass() {
        }
        return publicClass;
    }());
    publicModuleInGlobal.publicClass = publicClass;
    var privateModule;
    (function (privateModule) {
        var privateClass = (function () {
            function privateClass() {
            }
            return privateClass;
        }());
        var publicClass = (function () {
            function publicClass() {
            }
            return publicClass;
        }());
        privateModule.publicClass = publicClass;
        var publicClassWithWithPrivateParameterTypes = (function () {
            function publicClassWithWithPrivateParameterTypes(param, param1, param2) {
                this.param1 = param1;
                this.param2 = param2;
            }
            publicClassWithWithPrivateParameterTypes.myPublicStaticMethod = function (param) {
            };
            publicClassWithWithPrivateParameterTypes.myPrivateStaticMethod = function (param) {
            };
            publicClassWithWithPrivateParameterTypes.prototype.myPublicMethod = function (param) {
            };
            publicClassWithWithPrivateParameterTypes.prototype.myPrivateMethod = function (param) {
            };
            return publicClassWithWithPrivateParameterTypes;
        }());
        privateModule.publicClassWithWithPrivateParameterTypes = publicClassWithWithPrivateParameterTypes;
        var publicClassWithWithPublicParameterTypes = (function () {
            function publicClassWithWithPublicParameterTypes(param, param1, param2) {
                this.param1 = param1;
                this.param2 = param2;
            }
            publicClassWithWithPublicParameterTypes.myPublicStaticMethod = function (param) {
            };
            publicClassWithWithPublicParameterTypes.myPrivateStaticMethod = function (param) {
            };
            publicClassWithWithPublicParameterTypes.prototype.myPublicMethod = function (param) {
            };
            publicClassWithWithPublicParameterTypes.prototype.myPrivateMethod = function (param) {
            };
            return publicClassWithWithPublicParameterTypes;
        }());
        privateModule.publicClassWithWithPublicParameterTypes = publicClassWithWithPublicParameterTypes;
        var privateClassWithWithPrivateParameterTypes = (function () {
            function privateClassWithWithPrivateParameterTypes(param, param1, param2) {
                this.param1 = param1;
                this.param2 = param2;
            }
            privateClassWithWithPrivateParameterTypes.myPublicStaticMethod = function (param) {
            };
            privateClassWithWithPrivateParameterTypes.myPrivateStaticMethod = function (param) {
            };
            privateClassWithWithPrivateParameterTypes.prototype.myPublicMethod = function (param) {
            };
            privateClassWithWithPrivateParameterTypes.prototype.myPrivateMethod = function (param) {
            };
            return privateClassWithWithPrivateParameterTypes;
        }());
        var privateClassWithWithPublicParameterTypes = (function () {
            function privateClassWithWithPublicParameterTypes(param, param1, param2) {
                this.param1 = param1;
                this.param2 = param2;
            }
            privateClassWithWithPublicParameterTypes.myPublicStaticMethod = function (param) {
            };
            privateClassWithWithPublicParameterTypes.myPrivateStaticMethod = function (param) {
            };
            privateClassWithWithPublicParameterTypes.prototype.myPublicMethod = function (param) {
            };
            privateClassWithWithPublicParameterTypes.prototype.myPrivateMethod = function (param) {
            };
            return privateClassWithWithPublicParameterTypes;
        }());
        function publicFunctionWithPrivateParameterTypes(param) {
        }
        privateModule.publicFunctionWithPrivateParameterTypes = publicFunctionWithPrivateParameterTypes;
        function publicFunctionWithPublicParameterTypes(param) {
        }
        privateModule.publicFunctionWithPublicParameterTypes = publicFunctionWithPublicParameterTypes;
        function privateFunctionWithPrivateParameterTypes(param) {
        }
        function privateFunctionWithPublicParameterTypes(param) {
        }
        var publicClassWithPrivateModuleParameterTypes = (function () {
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
        var privateClassWithPrivateModuleParameterTypes = (function () {
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
    var publicClassWithWithPrivateParameterTypes = (function () {
        function publicClassWithWithPrivateParameterTypes(param, param1, param2) {
            this.param1 = param1;
            this.param2 = param2;
        }
        publicClassWithWithPrivateParameterTypes.myPublicStaticMethod = function (param) {
        };
        publicClassWithWithPrivateParameterTypes.myPrivateStaticMethod = function (param) {
        };
        publicClassWithWithPrivateParameterTypes.prototype.myPublicMethod = function (param) {
        };
        publicClassWithWithPrivateParameterTypes.prototype.myPrivateMethod = function (param) {
        };
        return publicClassWithWithPrivateParameterTypes;
    }());
    publicModuleInGlobal.publicClassWithWithPrivateParameterTypes = publicClassWithWithPrivateParameterTypes;
    var publicClassWithWithPublicParameterTypes = (function () {
        function publicClassWithWithPublicParameterTypes(param, param1, param2) {
            this.param1 = param1;
            this.param2 = param2;
        }
        publicClassWithWithPublicParameterTypes.myPublicStaticMethod = function (param) {
        };
        publicClassWithWithPublicParameterTypes.myPrivateStaticMethod = function (param) {
        };
        publicClassWithWithPublicParameterTypes.prototype.myPublicMethod = function (param) {
        };
        publicClassWithWithPublicParameterTypes.prototype.myPrivateMethod = function (param) {
        };
        return publicClassWithWithPublicParameterTypes;
    }());
    publicModuleInGlobal.publicClassWithWithPublicParameterTypes = publicClassWithWithPublicParameterTypes;
    var privateClassWithWithPrivateParameterTypes = (function () {
        function privateClassWithWithPrivateParameterTypes(param, param1, param2) {
            this.param1 = param1;
            this.param2 = param2;
        }
        privateClassWithWithPrivateParameterTypes.myPublicStaticMethod = function (param) {
        };
        privateClassWithWithPrivateParameterTypes.myPrivateStaticMethod = function (param) {
        };
        privateClassWithWithPrivateParameterTypes.prototype.myPublicMethod = function (param) {
        };
        privateClassWithWithPrivateParameterTypes.prototype.myPrivateMethod = function (param) {
        };
        return privateClassWithWithPrivateParameterTypes;
    }());
    var privateClassWithWithPublicParameterTypes = (function () {
        function privateClassWithWithPublicParameterTypes(param, param1, param2) {
            this.param1 = param1;
            this.param2 = param2;
        }
        privateClassWithWithPublicParameterTypes.myPublicStaticMethod = function (param) {
        };
        privateClassWithWithPublicParameterTypes.myPrivateStaticMethod = function (param) {
        };
        privateClassWithWithPublicParameterTypes.prototype.myPublicMethod = function (param) {
        };
        privateClassWithWithPublicParameterTypes.prototype.myPrivateMethod = function (param) {
        };
        return privateClassWithWithPublicParameterTypes;
    }());
    function publicFunctionWithPrivateParameterTypes(param) {
    }
    publicModuleInGlobal.publicFunctionWithPrivateParameterTypes = publicFunctionWithPrivateParameterTypes;
    function publicFunctionWithPublicParameterTypes(param) {
    }
    publicModuleInGlobal.publicFunctionWithPublicParameterTypes = publicFunctionWithPublicParameterTypes;
    function privateFunctionWithPrivateParameterTypes(param) {
    }
    function privateFunctionWithPublicParameterTypes(param) {
    }
    var publicClassWithPrivateModuleParameterTypes = (function () {
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
    var privateClassWithPrivateModuleParameterTypes = (function () {
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
