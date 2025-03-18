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
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicModule = exports.publicClassWithPrivateModuleParameterTypes = exports.publicClassWithWithPublicParmeterTypes = exports.publicClassWithWithPrivateParmeterTypes = exports.publicClass = void 0;
exports.publicFunctionWithPrivateParmeterTypes = publicFunctionWithPrivateParmeterTypes;
exports.publicFunctionWithPublicParmeterTypes = publicFunctionWithPublicParmeterTypes;
exports.publicFunctionWithPrivateModuleParameterTypes = publicFunctionWithPrivateModuleParameterTypes;
class privateClass {
}
class publicClass {
}
exports.publicClass = publicClass;
class publicClassWithWithPrivateParmeterTypes {
    param1;
    param2;
    static myPublicStaticMethod(param) {
    }
    static myPrivateStaticMethod(param) {
    }
    myPublicMethod(param) {
    }
    myPrivateMethod(param) {
    }
    constructor(param, param1, param2) {
        this.param1 = param1;
        this.param2 = param2;
    }
}
exports.publicClassWithWithPrivateParmeterTypes = publicClassWithWithPrivateParmeterTypes;
class publicClassWithWithPublicParmeterTypes {
    param1;
    param2;
    static myPublicStaticMethod(param) {
    }
    static myPrivateStaticMethod(param) {
    }
    myPublicMethod(param) {
    }
    myPrivateMethod(param) {
    }
    constructor(param, param1, param2) {
        this.param1 = param1;
        this.param2 = param2;
    }
}
exports.publicClassWithWithPublicParmeterTypes = publicClassWithWithPublicParmeterTypes;
class privateClassWithWithPrivateParmeterTypes {
    param1;
    param2;
    static myPublicStaticMethod(param) {
    }
    static myPrivateStaticMethod(param) {
    }
    myPublicMethod(param) {
    }
    myPrivateMethod(param) {
    }
    constructor(param, param1, param2) {
        this.param1 = param1;
        this.param2 = param2;
    }
}
class privateClassWithWithPublicParmeterTypes {
    param1;
    param2;
    static myPublicStaticMethod(param) {
    }
    static myPrivateStaticMethod(param) {
    }
    myPublicMethod(param) {
    }
    myPrivateMethod(param) {
    }
    constructor(param, param1, param2) {
        this.param1 = param1;
        this.param2 = param2;
    }
}
function publicFunctionWithPrivateParmeterTypes(param) {
}
function publicFunctionWithPublicParmeterTypes(param) {
}
function privateFunctionWithPrivateParmeterTypes(param) {
}
function privateFunctionWithPublicParmeterTypes(param) {
}
class publicClassWithPrivateModuleParameterTypes {
    param1;
    param2;
    static myPublicStaticMethod(param) {
    }
    myPublicMethod(param) {
    }
    constructor(param, param1, param2) {
        this.param1 = param1;
        this.param2 = param2;
    }
}
exports.publicClassWithPrivateModuleParameterTypes = publicClassWithPrivateModuleParameterTypes;
function publicFunctionWithPrivateModuleParameterTypes(param) {
}
class privateClassWithPrivateModuleParameterTypes {
    param1;
    param2;
    static myPublicStaticMethod(param) {
    }
    myPublicMethod(param) {
    }
    constructor(param, param1, param2) {
        this.param1 = param1;
        this.param2 = param2;
    }
}
function privateFunctionWithPrivateModuleParameterTypes(param) {
}
var publicModule;
(function (publicModule) {
    class privateClass {
    }
    class publicClass {
    }
    publicModule.publicClass = publicClass;
    class publicClassWithWithPrivateParmeterTypes {
        param1;
        param2;
        static myPublicStaticMethod(param) {
        }
        static myPrivateStaticMethod(param) {
        }
        myPublicMethod(param) {
        }
        myPrivateMethod(param) {
        }
        constructor(param, param1, param2) {
            this.param1 = param1;
            this.param2 = param2;
        }
    }
    publicModule.publicClassWithWithPrivateParmeterTypes = publicClassWithWithPrivateParmeterTypes;
    class publicClassWithWithPublicParmeterTypes {
        param1;
        param2;
        static myPublicStaticMethod(param) {
        }
        static myPrivateStaticMethod(param) {
        }
        myPublicMethod(param) {
        }
        myPrivateMethod(param) {
        }
        constructor(param, param1, param2) {
            this.param1 = param1;
            this.param2 = param2;
        }
    }
    publicModule.publicClassWithWithPublicParmeterTypes = publicClassWithWithPublicParmeterTypes;
    class privateClassWithWithPrivateParmeterTypes {
        param1;
        param2;
        static myPublicStaticMethod(param) {
        }
        static myPrivateStaticMethod(param) {
        }
        myPublicMethod(param) {
        }
        myPrivateMethod(param) {
        }
        constructor(param, param1, param2) {
            this.param1 = param1;
            this.param2 = param2;
        }
    }
    class privateClassWithWithPublicParmeterTypes {
        param1;
        param2;
        static myPublicStaticMethod(param) {
        }
        static myPrivateStaticMethod(param) {
        }
        myPublicMethod(param) {
        }
        myPrivateMethod(param) {
        }
        constructor(param, param1, param2) {
            this.param1 = param1;
            this.param2 = param2;
        }
    }
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
    class publicClassWithPrivateModuleParameterTypes {
        param1;
        param2;
        static myPublicStaticMethod(param) {
        }
        myPublicMethod(param) {
        }
        constructor(param, param1, param2) {
            this.param1 = param1;
            this.param2 = param2;
        }
    }
    publicModule.publicClassWithPrivateModuleParameterTypes = publicClassWithPrivateModuleParameterTypes;
    function publicFunctionWithPrivateModuleParameterTypes(param) {
    }
    publicModule.publicFunctionWithPrivateModuleParameterTypes = publicFunctionWithPrivateModuleParameterTypes;
    class privateClassWithPrivateModuleParameterTypes {
        param1;
        param2;
        static myPublicStaticMethod(param) {
        }
        myPublicMethod(param) {
        }
        constructor(param, param1, param2) {
            this.param1 = param1;
            this.param2 = param2;
        }
    }
    function privateFunctionWithPrivateModuleParameterTypes(param) {
    }
})(publicModule || (exports.publicModule = publicModule = {}));
var privateModule;
(function (privateModule) {
    class privateClass {
    }
    class publicClass {
    }
    privateModule.publicClass = publicClass;
    class publicClassWithWithPrivateParmeterTypes {
        param1;
        param2;
        static myPublicStaticMethod(param) {
        }
        static myPrivateStaticMethod(param) {
        }
        myPublicMethod(param) {
        }
        myPrivateMethod(param) {
        }
        constructor(param, param1, param2) {
            this.param1 = param1;
            this.param2 = param2;
        }
    }
    privateModule.publicClassWithWithPrivateParmeterTypes = publicClassWithWithPrivateParmeterTypes;
    class publicClassWithWithPublicParmeterTypes {
        param1;
        param2;
        static myPublicStaticMethod(param) {
        }
        static myPrivateStaticMethod(param) {
        }
        myPublicMethod(param) {
        }
        myPrivateMethod(param) {
        }
        constructor(param, param1, param2) {
            this.param1 = param1;
            this.param2 = param2;
        }
    }
    privateModule.publicClassWithWithPublicParmeterTypes = publicClassWithWithPublicParmeterTypes;
    class privateClassWithWithPrivateParmeterTypes {
        param1;
        param2;
        static myPublicStaticMethod(param) {
        }
        static myPrivateStaticMethod(param) {
        }
        myPublicMethod(param) {
        }
        myPrivateMethod(param) {
        }
        constructor(param, param1, param2) {
            this.param1 = param1;
            this.param2 = param2;
        }
    }
    class privateClassWithWithPublicParmeterTypes {
        param1;
        param2;
        static myPublicStaticMethod(param) {
        }
        static myPrivateStaticMethod(param) {
        }
        myPublicMethod(param) {
        }
        myPrivateMethod(param) {
        }
        constructor(param, param1, param2) {
            this.param1 = param1;
            this.param2 = param2;
        }
    }
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
    class publicClassWithPrivateModuleParameterTypes {
        param1;
        param2;
        static myPublicStaticMethod(param) {
        }
        myPublicMethod(param) {
        }
        constructor(param, param1, param2) {
            this.param1 = param1;
            this.param2 = param2;
        }
    }
    privateModule.publicClassWithPrivateModuleParameterTypes = publicClassWithPrivateModuleParameterTypes;
    function publicFunctionWithPrivateModuleParameterTypes(param) {
    }
    privateModule.publicFunctionWithPrivateModuleParameterTypes = publicFunctionWithPrivateModuleParameterTypes;
    class privateClassWithPrivateModuleParameterTypes {
        param1;
        param2;
        static myPublicStaticMethod(param) {
        }
        myPublicMethod(param) {
        }
        constructor(param, param1, param2) {
            this.param1 = param1;
            this.param2 = param2;
        }
    }
    function privateFunctionWithPrivateModuleParameterTypes(param) {
    }
})(privateModule || (privateModule = {}));
//// [privacyFunctionParameterDeclFile_GlobalFile.js]
class publicClassInGlobal {
}
class publicClassWithWithPublicParmeterTypesInGlobal {
    param1;
    param2;
    static myPublicStaticMethod(param) {
    }
    static myPrivateStaticMethod(param) {
    }
    myPublicMethod(param) {
    }
    myPrivateMethod(param) {
    }
    constructor(param, param1, param2) {
        this.param1 = param1;
        this.param2 = param2;
    }
}
function publicFunctionWithPublicParmeterTypesInGlobal(param) {
}
var publicModuleInGlobal;
(function (publicModuleInGlobal) {
    class privateClass {
    }
    class publicClass {
    }
    publicModuleInGlobal.publicClass = publicClass;
    let privateModule;
    (function (privateModule) {
        class privateClass {
        }
        class publicClass {
        }
        privateModule.publicClass = publicClass;
        class publicClassWithWithPrivateParmeterTypes {
            param1;
            param2;
            static myPublicStaticMethod(param) {
            }
            static myPrivateStaticMethod(param) {
            }
            myPublicMethod(param) {
            }
            myPrivateMethod(param) {
            }
            constructor(param, param1, param2) {
                this.param1 = param1;
                this.param2 = param2;
            }
        }
        privateModule.publicClassWithWithPrivateParmeterTypes = publicClassWithWithPrivateParmeterTypes;
        class publicClassWithWithPublicParmeterTypes {
            param1;
            param2;
            static myPublicStaticMethod(param) {
            }
            static myPrivateStaticMethod(param) {
            }
            myPublicMethod(param) {
            }
            myPrivateMethod(param) {
            }
            constructor(param, param1, param2) {
                this.param1 = param1;
                this.param2 = param2;
            }
        }
        privateModule.publicClassWithWithPublicParmeterTypes = publicClassWithWithPublicParmeterTypes;
        class privateClassWithWithPrivateParmeterTypes {
            param1;
            param2;
            static myPublicStaticMethod(param) {
            }
            static myPrivateStaticMethod(param) {
            }
            myPublicMethod(param) {
            }
            myPrivateMethod(param) {
            }
            constructor(param, param1, param2) {
                this.param1 = param1;
                this.param2 = param2;
            }
        }
        class privateClassWithWithPublicParmeterTypes {
            param1;
            param2;
            static myPublicStaticMethod(param) {
            }
            static myPrivateStaticMethod(param) {
            }
            myPublicMethod(param) {
            }
            myPrivateMethod(param) {
            }
            constructor(param, param1, param2) {
                this.param1 = param1;
                this.param2 = param2;
            }
        }
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
        class publicClassWithPrivateModuleParameterTypes {
            param1;
            param2;
            static myPublicStaticMethod(param) {
            }
            myPublicMethod(param) {
            }
            constructor(param, param1, param2) {
                this.param1 = param1;
                this.param2 = param2;
            }
        }
        privateModule.publicClassWithPrivateModuleParameterTypes = publicClassWithPrivateModuleParameterTypes;
        function publicFunctionWithPrivateModuleParameterTypes(param) {
        }
        privateModule.publicFunctionWithPrivateModuleParameterTypes = publicFunctionWithPrivateModuleParameterTypes;
        class privateClassWithPrivateModuleParameterTypes {
            param1;
            param2;
            static myPublicStaticMethod(param) {
            }
            myPublicMethod(param) {
            }
            constructor(param, param1, param2) {
                this.param1 = param1;
                this.param2 = param2;
            }
        }
        function privateFunctionWithPrivateModuleParameterTypes(param) {
        }
    })(privateModule || (privateModule = {}));
    class publicClassWithWithPrivateParmeterTypes {
        param1;
        param2;
        static myPublicStaticMethod(param) {
        }
        static myPrivateStaticMethod(param) {
        }
        myPublicMethod(param) {
        }
        myPrivateMethod(param) {
        }
        constructor(param, param1, param2) {
            this.param1 = param1;
            this.param2 = param2;
        }
    }
    publicModuleInGlobal.publicClassWithWithPrivateParmeterTypes = publicClassWithWithPrivateParmeterTypes;
    class publicClassWithWithPublicParmeterTypes {
        param1;
        param2;
        static myPublicStaticMethod(param) {
        }
        static myPrivateStaticMethod(param) {
        }
        myPublicMethod(param) {
        }
        myPrivateMethod(param) {
        }
        constructor(param, param1, param2) {
            this.param1 = param1;
            this.param2 = param2;
        }
    }
    publicModuleInGlobal.publicClassWithWithPublicParmeterTypes = publicClassWithWithPublicParmeterTypes;
    class privateClassWithWithPrivateParmeterTypes {
        param1;
        param2;
        static myPublicStaticMethod(param) {
        }
        static myPrivateStaticMethod(param) {
        }
        myPublicMethod(param) {
        }
        myPrivateMethod(param) {
        }
        constructor(param, param1, param2) {
            this.param1 = param1;
            this.param2 = param2;
        }
    }
    class privateClassWithWithPublicParmeterTypes {
        param1;
        param2;
        static myPublicStaticMethod(param) {
        }
        static myPrivateStaticMethod(param) {
        }
        myPublicMethod(param) {
        }
        myPrivateMethod(param) {
        }
        constructor(param, param1, param2) {
            this.param1 = param1;
            this.param2 = param2;
        }
    }
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
    class publicClassWithPrivateModuleParameterTypes {
        param1;
        param2;
        static myPublicStaticMethod(param) {
        }
        myPublicMethod(param) {
        }
        constructor(param, param1, param2) {
            this.param1 = param1;
            this.param2 = param2;
        }
    }
    publicModuleInGlobal.publicClassWithPrivateModuleParameterTypes = publicClassWithPrivateModuleParameterTypes;
    function publicFunctionWithPrivateModuleParameterTypes(param) {
    }
    publicModuleInGlobal.publicFunctionWithPrivateModuleParameterTypes = publicFunctionWithPrivateModuleParameterTypes;
    class privateClassWithPrivateModuleParameterTypes {
        param1;
        param2;
        static myPublicStaticMethod(param) {
        }
        myPublicMethod(param) {
        }
        constructor(param, param1, param2) {
            this.param1 = param1;
            this.param2 = param2;
        }
    }
    function privateFunctionWithPrivateModuleParameterTypes(param) {
    }
})(publicModuleInGlobal || (publicModuleInGlobal = {}));
