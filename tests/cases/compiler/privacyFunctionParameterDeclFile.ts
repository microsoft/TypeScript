// @module: commonjs
// @declaration: true

// @Filename:privacyFunctionParameterDeclFile_externalModule.ts
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

// @Filename: privacyFunctionParameterDeclFile_GlobalFile.ts
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