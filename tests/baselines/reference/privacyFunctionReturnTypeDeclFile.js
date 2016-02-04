//// [tests/cases/compiler/privacyFunctionReturnTypeDeclFile.ts] ////

//// [privacyFunctionReturnTypeDeclFile_externalModule.ts]

class privateClass {
}

export class publicClass {
}

export interface publicInterfaceWithPrivateParameterTypes {
    new (): privateClass; // Error
    (): privateClass; // Error
    [x: number]: privateClass; // Error
    myMethod(): privateClass; // Error
}

export interface publicInterfaceWithPublicParameterTypes {
    new (): publicClass;
    (): publicClass;
    [x: number]: publicClass;
    myMethod(): publicClass;
}

interface privateInterfaceWithPrivateParameterTypes {
    new (): privateClass;
    (): privateClass;
    [x: number]: privateClass;
    myMethod(): privateClass;
}

interface privateInterfaceWithPublicParameterTypes {
    new (): publicClass;
    (): publicClass;
    [x: number]: publicClass;
    myMethod(): publicClass;
}

export class publicClassWithWithPrivateParameterTypes {
    static myPublicStaticMethod(): privateClass { // Error
        return null;
    }
    private static myPrivateStaticMethod(): privateClass {
        return null;
    }
    myPublicMethod(): privateClass { // Error
        return null;
    }
    private myPrivateMethod(): privateClass {
        return null;
    }
    static myPublicStaticMethod1() { // Error
        return new privateClass();
    }
    private static myPrivateStaticMethod1() {
        return new privateClass();
    }
    myPublicMethod1() { // Error
        return new privateClass();
    }
    private myPrivateMethod1() {
        return new privateClass();
    }
}

export class publicClassWithWithPublicParameterTypes {
    static myPublicStaticMethod(): publicClass { 
        return null;
    }
    private static myPrivateStaticMethod(): publicClass {
        return null;
    }
    myPublicMethod(): publicClass { 
        return null;
    }
    private myPrivateMethod(): publicClass {
        return null;
    }
    static myPublicStaticMethod1() {
        return new publicClass();
    }
    private static myPrivateStaticMethod1() {
        return new publicClass();
    }
    myPublicMethod1() { 
        return new publicClass();
    }
    private myPrivateMethod1() {
        return new publicClass();
    }
}

class privateClassWithWithPrivateParameterTypes {
    static myPublicStaticMethod(): privateClass {
        return null;
    }
    private static myPrivateStaticMethod(): privateClass {
        return null;
    }
    myPublicMethod(): privateClass {
        return null;
    }
    private myPrivateMethod(): privateClass {
        return null;
    }
    static myPublicStaticMethod1() {
        return new privateClass();
    }
    private static myPrivateStaticMethod1() {
        return new privateClass();
    }
    myPublicMethod1() {
        return new privateClass();
    }
    private myPrivateMethod1() {
        return new privateClass();
    }
}

class privateClassWithWithPublicParameterTypes {
    static myPublicStaticMethod(): publicClass {
        return null;
    }
    private static myPrivateStaticMethod(): publicClass {
        return null;
    }
    myPublicMethod(): publicClass {
        return null;
    }
    private myPrivateMethod(): publicClass {
        return null;
    }
    static myPublicStaticMethod1() {
        return new publicClass();
    }
    private static myPrivateStaticMethod1() {
        return new publicClass();
    }
    myPublicMethod1() {
        return new publicClass();
    }
    private myPrivateMethod1() {
        return new publicClass();
    }
}

export function publicFunctionWithPrivateParameterTypes(): privateClass { // Error
    return null;
}
export function publicFunctionWithPublicParameterTypes(): publicClass {
    return null;
}
function privateFunctionWithPrivateParameterTypes(): privateClass {
    return null;
}
function privateFunctionWithPublicParameterTypes(): publicClass {
    return null;
}
export function publicFunctionWithPrivateParameterTypes1() { // Error
    return new privateClass();
}
export function publicFunctionWithPublicParameterTypes1() {
    return new publicClass();
}
function privateFunctionWithPrivateParameterTypes1() {
    return new privateClass();
}
function privateFunctionWithPublicParameterTypes1() {
    return new publicClass();
}

export declare function publicAmbientFunctionWithPrivateParameterTypes(): privateClass; // Error
export declare function publicAmbientFunctionWithPublicParameterTypes(): publicClass;
declare function privateAmbientFunctionWithPrivateParameterTypes(): privateClass;
declare function privateAmbientFunctionWithPublicParameterTypes(): publicClass;

export interface publicInterfaceWithPrivateModuleParameterTypes {
    new (): privateModule.publicClass; // Error
    (): privateModule.publicClass; // Error
    [x: number]: privateModule.publicClass // Error
    myMethod(): privateModule.publicClass; // Error
}
export class publicClassWithPrivateModuleParameterTypes {
    static myPublicStaticMethod(): privateModule.publicClass { // Error
        return null;
    }
    myPublicMethod(): privateModule.publicClass { // Error
        return null;
    }
    static myPublicStaticMethod1() { // Error
        return new privateModule.publicClass();
    }
    myPublicMethod1() { // Error
        return new privateModule.publicClass();
    }
}
export function publicFunctionWithPrivateModuleParameterTypes(): privateModule.publicClass { // Error
    return null;
}
export function publicFunctionWithPrivateModuleParameterTypes1() { // Error
    return new privateModule.publicClass();
}
export declare function publicAmbientFunctionWithPrivateModuleParameterTypes(): privateModule.publicClass; // Error

interface privateInterfaceWithPrivateModuleParameterTypes {
    new (): privateModule.publicClass; 
    (): privateModule.publicClass;
    [x: number]: privateModule.publicClass
    myMethod(): privateModule.publicClass;
}
class privateClassWithPrivateModuleParameterTypes {
    static myPublicStaticMethod(): privateModule.publicClass { 
        return null;
    }
    myPublicMethod(): privateModule.publicClass { 
        return null;
    }
    static myPublicStaticMethod1() { 
        return new privateModule.publicClass();
    }
    myPublicMethod1() { 
        return new privateModule.publicClass();
    }
}
function privateFunctionWithPrivateModuleParameterTypes(): privateModule.publicClass { 
    return null;
}
function privateFunctionWithPrivateModuleParameterTypes1() { 
    return new privateModule.publicClass();
}
declare function privateAmbientFunctionWithPrivateModuleParameterTypes(): privateModule.publicClass; 

export module publicModule {
    class privateClass {
    }

    export class publicClass {
    }

    export interface publicInterfaceWithPrivateParameterTypes {
        new (): privateClass; // Error
        (): privateClass; // Error
        [x: number]: privateClass; // Error
        myMethod(): privateClass; // Error
    }

    export interface publicInterfaceWithPublicParameterTypes {
        new (): publicClass;
        (): publicClass;
        [x: number]: publicClass;
        myMethod(): publicClass;
    }

    interface privateInterfaceWithPrivateParameterTypes {
        new (): privateClass;
        (): privateClass;
        [x: number]: privateClass;
        myMethod(): privateClass;
    }

    interface privateInterfaceWithPublicParameterTypes {
        new (): publicClass;
        (): publicClass;
        [x: number]: publicClass;
        myMethod(): publicClass;
    }

    export class publicClassWithWithPrivateParameterTypes {
        static myPublicStaticMethod(): privateClass { // Error
            return null;
        }
        private static myPrivateStaticMethod(): privateClass {
            return null;
        }
        myPublicMethod(): privateClass { // Error
            return null;
        }
        private myPrivateMethod(): privateClass {
            return null;
        }
        static myPublicStaticMethod1() { // Error
            return new privateClass();
        }
        private static myPrivateStaticMethod1() {
            return new privateClass();
        }
        myPublicMethod1() { // Error
            return new privateClass();
        }
        private myPrivateMethod1() {
            return new privateClass();
        }
    }

    export class publicClassWithWithPublicParameterTypes {
        static myPublicStaticMethod(): publicClass {
            return null;
        }
        private static myPrivateStaticMethod(): publicClass {
            return null;
        }
        myPublicMethod(): publicClass {
            return null;
        }
        private myPrivateMethod(): publicClass {
            return null;
        }
        static myPublicStaticMethod1() {
            return new publicClass();
        }
        private static myPrivateStaticMethod1() {
            return new publicClass();
        }
        myPublicMethod1() {
            return new publicClass();
        }
        private myPrivateMethod1() {
            return new publicClass();
        }
    }

    class privateClassWithWithPrivateParameterTypes {
        static myPublicStaticMethod(): privateClass {
            return null;
        }
        private static myPrivateStaticMethod(): privateClass {
            return null;
        }
        myPublicMethod(): privateClass {
            return null;
        }
        private myPrivateMethod(): privateClass {
            return null;
        }
        static myPublicStaticMethod1() {
            return new privateClass();
        }
        private static myPrivateStaticMethod1() {
            return new privateClass();
        }
        myPublicMethod1() {
            return new privateClass();
        }
        private myPrivateMethod1() {
            return new privateClass();
        }
    }

    class privateClassWithWithPublicParameterTypes {
        static myPublicStaticMethod(): publicClass {
            return null;
        }
        private static myPrivateStaticMethod(): publicClass {
            return null;
        }
        myPublicMethod(): publicClass {
            return null;
        }
        private myPrivateMethod(): publicClass {
            return null;
        }
        static myPublicStaticMethod1() {
            return new publicClass();
        }
        private static myPrivateStaticMethod1() {
            return new publicClass();
        }
        myPublicMethod1() {
            return new publicClass();
        }
        private myPrivateMethod1() {
            return new publicClass();
        }
    }

    export function publicFunctionWithPrivateParameterTypes(): privateClass { // Error
        return null;
    }
    export function publicFunctionWithPublicParameterTypes(): publicClass {
        return null;
    }
    function privateFunctionWithPrivateParameterTypes(): privateClass {
        return null;
    }
    function privateFunctionWithPublicParameterTypes(): publicClass {
        return null;
    }
    export function publicFunctionWithPrivateParameterTypes1() { // Error
        return new privateClass();
    }
    export function publicFunctionWithPublicParameterTypes1() {
        return new publicClass();
    }
    function privateFunctionWithPrivateParameterTypes1() {
        return new privateClass();
    }
    function privateFunctionWithPublicParameterTypes1() {
        return new publicClass();
    }

    export declare function publicAmbientFunctionWithPrivateParameterTypes(): privateClass; // Error
    export declare function publicAmbientFunctionWithPublicParameterTypes(): publicClass;
    declare function privateAmbientFunctionWithPrivateParameterTypes(): privateClass;
    declare function privateAmbientFunctionWithPublicParameterTypes(): publicClass;

    export interface publicInterfaceWithPrivateModuleParameterTypes {
        new (): privateModule.publicClass; // Error
        (): privateModule.publicClass; // Error
        [x: number]: privateModule.publicClass; // Error
        myMethod(): privateModule.publicClass; // Error
    }
    export class publicClassWithPrivateModuleParameterTypes {
        static myPublicStaticMethod(): privateModule.publicClass { // Error
            return null;
        }
        myPublicMethod(): privateModule.publicClass { // Error
            return null;
        }
        static myPublicStaticMethod1() { // Error
            return new privateModule.publicClass();
        }
        myPublicMethod1() { // Error
            return new privateModule.publicClass();
        }
    }
    export function publicFunctionWithPrivateModuleParameterTypes(): privateModule.publicClass { // Error
        return null;
    }
    export function publicFunctionWithPrivateModuleParameterTypes1() { // Error
        return new privateModule.publicClass();
    }
    export declare function publicAmbientFunctionWithPrivateModuleParameterTypes(): privateModule.publicClass; // Error

    interface privateInterfaceWithPrivateModuleParameterTypes {
        new (): privateModule.publicClass;
        (): privateModule.publicClass;
        [x: number]: privateModule.publicClass;
        myMethod(): privateModule.publicClass;
    }
    class privateClassWithPrivateModuleParameterTypes {
        static myPublicStaticMethod(): privateModule.publicClass {
            return null;
        }
        myPublicMethod(): privateModule.publicClass {
            return null;
        }
        static myPublicStaticMethod1() {
            return new privateModule.publicClass();
        }
        myPublicMethod1() {
            return new privateModule.publicClass();
        }
    }
    function privateFunctionWithPrivateModuleParameterTypes(): privateModule.publicClass {
        return null;
    }
    function privateFunctionWithPrivateModuleParameterTypes1() {
        return new privateModule.publicClass();
    }
    declare function privateAmbientFunctionWithPrivateModuleParameterTypes(): privateModule.publicClass; 
}

module privateModule {
    class privateClass {
    }

    export class publicClass {
    }

    export interface publicInterfaceWithPrivateParameterTypes {
        new (): privateClass; 
        (): privateClass; 
        [x: number]: privateClass; 
        myMethod(): privateClass; 
    }

    export interface publicInterfaceWithPublicParameterTypes {
        new (): publicClass;
        (): publicClass;
        [x: number]: publicClass;
        myMethod(): publicClass;
    }

    interface privateInterfaceWithPrivateParameterTypes {
        new (): privateClass;
        (): privateClass;
        [x: number]: privateClass;
        myMethod(): privateClass;
    }

    interface privateInterfaceWithPublicParameterTypes {
        new (): publicClass;
        (): publicClass;
        [x: number]: publicClass;
        myMethod(): publicClass;
    }

    export class publicClassWithWithPrivateParameterTypes {
        static myPublicStaticMethod(): privateClass { 
            return null;
        }
        private static myPrivateStaticMethod(): privateClass {
            return null;
        }
        myPublicMethod(): privateClass { 
            return null;
        }
        private myPrivateMethod(): privateClass {
            return null;
        }
        static myPublicStaticMethod1() { 
            return new privateClass();
        }
        private static myPrivateStaticMethod1() {
            return new privateClass();
        }
        myPublicMethod1() { 
            return new privateClass();
        }
        private myPrivateMethod1() {
            return new privateClass();
        }
    }

    export class publicClassWithWithPublicParameterTypes {
        static myPublicStaticMethod(): publicClass {
            return null;
        }
        private static myPrivateStaticMethod(): publicClass {
            return null;
        }
        myPublicMethod(): publicClass {
            return null;
        }
        private myPrivateMethod(): publicClass {
            return null;
        }
        static myPublicStaticMethod1() {
            return new publicClass();
        }
        private static myPrivateStaticMethod1() {
            return new publicClass();
        }
        myPublicMethod1() {
            return new publicClass();
        }
        private myPrivateMethod1() {
            return new publicClass();
        }
    }

    class privateClassWithWithPrivateParameterTypes {
        static myPublicStaticMethod(): privateClass {
            return null;
        }
        private static myPrivateStaticMethod(): privateClass {
            return null;
        }
        myPublicMethod(): privateClass {
            return null;
        }
        private myPrivateMethod(): privateClass {
            return null;
        }
        static myPublicStaticMethod1() {
            return new privateClass();
        }
        private static myPrivateStaticMethod1() {
            return new privateClass();
        }
        myPublicMethod1() {
            return new privateClass();
        }
        private myPrivateMethod1() {
            return new privateClass();
        }
    }

    class privateClassWithWithPublicParameterTypes {
        static myPublicStaticMethod(): publicClass {
            return null;
        }
        private static myPrivateStaticMethod(): publicClass {
            return null;
        }
        myPublicMethod(): publicClass {
            return null;
        }
        private myPrivateMethod(): publicClass {
            return null;
        }
        static myPublicStaticMethod1() {
            return new publicClass();
        }
        private static myPrivateStaticMethod1() {
            return new publicClass();
        }
        myPublicMethod1() {
            return new publicClass();
        }
        private myPrivateMethod1() {
            return new publicClass();
        }
    }

    export function publicFunctionWithPrivateParameterTypes(): privateClass { 
        return null;
    }
    export function publicFunctionWithPublicParameterTypes(): publicClass {
        return null;
    }
    function privateFunctionWithPrivateParameterTypes(): privateClass {
        return null;
    }
    function privateFunctionWithPublicParameterTypes(): publicClass {
        return null;
    }
    export function publicFunctionWithPrivateParameterTypes1() { 
        return new privateClass();
    }
    export function publicFunctionWithPublicParameterTypes1() {
        return new publicClass();
    }
    function privateFunctionWithPrivateParameterTypes1() {
        return new privateClass();
    }
    function privateFunctionWithPublicParameterTypes1() {
        return new publicClass();
    }

    export declare function publicAmbientFunctionWithPrivateParameterTypes(): privateClass; 
    export declare function publicAmbientFunctionWithPublicParameterTypes(): publicClass;
    declare function privateAmbientFunctionWithPrivateParameterTypes(): privateClass;
    declare function privateAmbientFunctionWithPublicParameterTypes(): publicClass;

    export interface publicInterfaceWithPrivateModuleParameterTypes {
        new (): privateModule.publicClass;
        (): privateModule.publicClass;
        [x: number]: privateModule.publicClass;
        myMethod(): privateModule.publicClass;
    }
    export class publicClassWithPrivateModuleParameterTypes {
        static myPublicStaticMethod(): privateModule.publicClass { 
            return null;
        }
        myPublicMethod(): privateModule.publicClass { 
            return null;
        }
        static myPublicStaticMethod1() { 
            return new privateModule.publicClass();
        }
        myPublicMethod1() { 
            return new privateModule.publicClass();
        }
    }
    export function publicFunctionWithPrivateModuleParameterTypes(): privateModule.publicClass { 
        return null;
    }
    export function publicFunctionWithPrivateModuleParameterTypes1() { 
        return new privateModule.publicClass();
    }
    export declare function publicAmbientFunctionWithPrivateModuleParameterTypes(): privateModule.publicClass; 

    interface privateInterfaceWithPrivateModuleParameterTypes {
        new (): privateModule.publicClass;
        (): privateModule.publicClass;
        [x: number]: privateModule.publicClass;
        myMethod(): privateModule.publicClass;
    }
    class privateClassWithPrivateModuleParameterTypes {
        static myPublicStaticMethod(): privateModule.publicClass {
            return null;
        }
        myPublicMethod(): privateModule.publicClass {
            return null;
        }
        static myPublicStaticMethod1() {
            return new privateModule.publicClass();
        }
        myPublicMethod1() {
            return new privateModule.publicClass();
        }
    }
    function privateFunctionWithPrivateModuleParameterTypes(): privateModule.publicClass {
        return null;
    }
    function privateFunctionWithPrivateModuleParameterTypes1() {
        return new privateModule.publicClass();
    }
    declare function privateAmbientFunctionWithPrivateModuleParameterTypes(): privateModule.publicClass; 
}

//// [privacyFunctionReturnTypeDeclFile_GlobalFile.ts]
class publicClassInGlobal {
}
interface publicInterfaceWithPublicParameterTypesInGlobal {
    new (): publicClassInGlobal;
    (): publicClassInGlobal;
    [x: number]: publicClassInGlobal;
    myMethod(): publicClassInGlobal;
}
class publicClassWithWithPublicParameterTypesInGlobal {
    static myPublicStaticMethod(): publicClassInGlobal {
        return null;
    }
    private static myPrivateStaticMethod(): publicClassInGlobal {
        return null;
    }
    myPublicMethod(): publicClassInGlobal {
        return null;
    }
    private myPrivateMethod(): publicClassInGlobal {
        return null;
    }
    static myPublicStaticMethod1() {
        return new publicClassInGlobal();
    }
    private static myPrivateStaticMethod1() {
        return new publicClassInGlobal();
    }
    myPublicMethod1() {
        return new publicClassInGlobal();
    }
    private myPrivateMethod1() {
        return new publicClassInGlobal();
    }
}
function publicFunctionWithPublicParameterTypesInGlobal(): publicClassInGlobal {
    return null;
}
function publicFunctionWithPublicParameterTypesInGlobal1() {
    return new publicClassInGlobal();
}
declare function publicAmbientFunctionWithPublicParameterTypesInGlobal(): publicClassInGlobal;

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
            new (): privateClass;
            (): privateClass;
            [x: number]: privateClass;
            myMethod(): privateClass;
        }

        export interface publicInterfaceWithPublicParameterTypes {
            new (): publicClass;
            (): publicClass;
            [x: number]: publicClass;
            myMethod(): publicClass;
        }

        interface privateInterfaceWithPrivateParameterTypes {
            new (): privateClass;
            (): privateClass;
            [x: number]: privateClass;
            myMethod(): privateClass;
        }

        interface privateInterfaceWithPublicParameterTypes {
            new (): publicClass;
            (): publicClass;
            [x: number]: publicClass;
            myMethod(): publicClass;
        }

        export class publicClassWithWithPrivateParameterTypes {
            static myPublicStaticMethod(): privateClass {
                return null;
            }
            private static myPrivateStaticMethod(): privateClass {
                return null;
            }
            myPublicMethod(): privateClass {
                return null;
            }
            private myPrivateMethod(): privateClass {
                return null;
            }
            static myPublicStaticMethod1() {
                return new privateClass();
            }
            private static myPrivateStaticMethod1() {
                return new privateClass();
            }
            myPublicMethod1() {
                return new privateClass();
            }
            private myPrivateMethod1() {
                return new privateClass();
            }
        }

        export class publicClassWithWithPublicParameterTypes {
            static myPublicStaticMethod(): publicClass {
                return null;
            }
            private static myPrivateStaticMethod(): publicClass {
                return null;
            }
            myPublicMethod(): publicClass {
                return null;
            }
            private myPrivateMethod(): publicClass {
                return null;
            }
            static myPublicStaticMethod1() {
                return new publicClass();
            }
            private static myPrivateStaticMethod1() {
                return new publicClass();
            }
            myPublicMethod1() {
                return new publicClass();
            }
            private myPrivateMethod1() {
                return new publicClass();
            }
        }

        class privateClassWithWithPrivateParameterTypes {
            static myPublicStaticMethod(): privateClass {
                return null;
            }
            private static myPrivateStaticMethod(): privateClass {
                return null;
            }
            myPublicMethod(): privateClass {
                return null;
            }
            private myPrivateMethod(): privateClass {
                return null;
            }
            static myPublicStaticMethod1() {
                return new privateClass();
            }
            private static myPrivateStaticMethod1() {
                return new privateClass();
            }
            myPublicMethod1() {
                return new privateClass();
            }
            private myPrivateMethod1() {
                return new privateClass();
            }
        }

        class privateClassWithWithPublicParameterTypes {
            static myPublicStaticMethod(): publicClass {
                return null;
            }
            private static myPrivateStaticMethod(): publicClass {
                return null;
            }
            myPublicMethod(): publicClass {
                return null;
            }
            private myPrivateMethod(): publicClass {
                return null;
            }
            static myPublicStaticMethod1() {
                return new publicClass();
            }
            private static myPrivateStaticMethod1() {
                return new publicClass();
            }
            myPublicMethod1() {
                return new publicClass();
            }
            private myPrivateMethod1() {
                return new publicClass();
            }
        }

        export function publicFunctionWithPrivateParameterTypes(): privateClass {
            return null;
        }
        export function publicFunctionWithPublicParameterTypes(): publicClass {
            return null;
        }
        function privateFunctionWithPrivateParameterTypes(): privateClass {
            return null;
        }
        function privateFunctionWithPublicParameterTypes(): publicClass {
            return null;
        }
        export function publicFunctionWithPrivateParameterTypes1() {
            return new privateClass();
        }
        export function publicFunctionWithPublicParameterTypes1() {
            return new publicClass();
        }
        function privateFunctionWithPrivateParameterTypes1() {
            return new privateClass();
        }
        function privateFunctionWithPublicParameterTypes1() {
            return new publicClass();
        }

        export declare function publicAmbientFunctionWithPrivateParameterTypes(): privateClass;
        export declare function publicAmbientFunctionWithPublicParameterTypes(): publicClass;
        declare function privateAmbientFunctionWithPrivateParameterTypes(): privateClass;
        declare function privateAmbientFunctionWithPublicParameterTypes(): publicClass;

        export interface publicInterfaceWithPrivateModuleParameterTypes {
            new (): privateModule.publicClass;
            (): privateModule.publicClass;
            [x: number]: privateModule.publicClass;
            myMethod(): privateModule.publicClass;
        }
        export class publicClassWithPrivateModuleParameterTypes {
            static myPublicStaticMethod(): privateModule.publicClass {
                return null;
            }
            myPublicMethod(): privateModule.publicClass {
                return null;
            }
            static myPublicStaticMethod1() {
                return new privateModule.publicClass();
            }
            myPublicMethod1() {
                return new privateModule.publicClass();
            }
        }
        export function publicFunctionWithPrivateModuleParameterTypes(): privateModule.publicClass {
            return null;
        }
        export function publicFunctionWithPrivateModuleParameterTypes1() {
            return new privateModule.publicClass();
        }
        export declare function publicAmbientFunctionWithPrivateModuleParameterTypes(): privateModule.publicClass;

        interface privateInterfaceWithPrivateModuleParameterTypes {
            new (): privateModule.publicClass;
            (): privateModule.publicClass;
            [x: number]: privateModule.publicClass;
            myMethod(): privateModule.publicClass;
        }
        class privateClassWithPrivateModuleParameterTypes {
            static myPublicStaticMethod(): privateModule.publicClass {
                return null;
            }
            myPublicMethod(): privateModule.publicClass {
                return null;
            }
            static myPublicStaticMethod1() {
                return new privateModule.publicClass();
            }
            myPublicMethod1() {
                return new privateModule.publicClass();
            }
        }
        function privateFunctionWithPrivateModuleParameterTypes(): privateModule.publicClass {
            return null;
        }
        function privateFunctionWithPrivateModuleParameterTypes1() {
            return new privateModule.publicClass();
        }
        declare function privateAmbientFunctionWithPrivateModuleParameterTypes(): privateModule.publicClass;
    }

    export interface publicInterfaceWithPrivateParameterTypes {
        new (): privateClass; // Error
        (): privateClass; // Error
        [x: number]: privateClass; // Error
        myMethod(): privateClass; // Error
    }

    export interface publicInterfaceWithPublicParameterTypes {
        new (): publicClass;
        (): publicClass;
        [x: number]: publicClass;
        myMethod(): publicClass;
    }

    interface privateInterfaceWithPrivateParameterTypes {
        new (): privateClass;
        (): privateClass;
        [x: number]: privateClass;
        myMethod(): privateClass;
    }

    interface privateInterfaceWithPublicParameterTypes {
        new (): publicClass;
        (): publicClass;
        [x: number]: publicClass;
        myMethod(): publicClass;
    }

    export class publicClassWithWithPrivateParameterTypes {
        static myPublicStaticMethod(): privateClass { // Error
            return null;
        }
        private static myPrivateStaticMethod(): privateClass {
            return null;
        }
        myPublicMethod(): privateClass { // Error
            return null;
        }
        private myPrivateMethod(): privateClass {
            return null;
        }
        static myPublicStaticMethod1() { // Error
            return new privateClass();
        }
        private static myPrivateStaticMethod1() {
            return new privateClass();
        }
        myPublicMethod1() { // Error
            return new privateClass();
        }
        private myPrivateMethod1() {
            return new privateClass();
        }
    }

    export class publicClassWithWithPublicParameterTypes {
        static myPublicStaticMethod(): publicClass {
            return null;
        }
        private static myPrivateStaticMethod(): publicClass {
            return null;
        }
        myPublicMethod(): publicClass {
            return null;
        }
        private myPrivateMethod(): publicClass {
            return null;
        }
        static myPublicStaticMethod1() {
            return new publicClass();
        }
        private static myPrivateStaticMethod1() {
            return new publicClass();
        }
        myPublicMethod1() {
            return new publicClass();
        }
        private myPrivateMethod1() {
            return new publicClass();
        }
    }

    class privateClassWithWithPrivateParameterTypes {
        static myPublicStaticMethod(): privateClass {
            return null;
        }
        private static myPrivateStaticMethod(): privateClass {
            return null;
        }
        myPublicMethod(): privateClass {
            return null;
        }
        private myPrivateMethod(): privateClass {
            return null;
        }
        static myPublicStaticMethod1() {
            return new privateClass();
        }
        private static myPrivateStaticMethod1() {
            return new privateClass();
        }
        myPublicMethod1() {
            return new privateClass();
        }
        private myPrivateMethod1() {
            return new privateClass();
        }
    }

    class privateClassWithWithPublicParameterTypes {
        static myPublicStaticMethod(): publicClass {
            return null;
        }
        private static myPrivateStaticMethod(): publicClass {
            return null;
        }
        myPublicMethod(): publicClass {
            return null;
        }
        private myPrivateMethod(): publicClass {
            return null;
        }
        static myPublicStaticMethod1() {
            return new publicClass();
        }
        private static myPrivateStaticMethod1() {
            return new publicClass();
        }
        myPublicMethod1() {
            return new publicClass();
        }
        private myPrivateMethod1() {
            return new publicClass();
        }
    }

    export function publicFunctionWithPrivateParameterTypes(): privateClass { // Error
        return null;
    }
    export function publicFunctionWithPublicParameterTypes(): publicClass {
        return null;
    }
    function privateFunctionWithPrivateParameterTypes(): privateClass {
        return null;
    }
    function privateFunctionWithPublicParameterTypes(): publicClass {
        return null;
    }
    export function publicFunctionWithPrivateParameterTypes1() { // Error
        return new privateClass();
    }
    export function publicFunctionWithPublicParameterTypes1() {
        return new publicClass();
    }
    function privateFunctionWithPrivateParameterTypes1() {
        return new privateClass();
    }
    function privateFunctionWithPublicParameterTypes1() {
        return new publicClass();
    }

    export declare function publicAmbientFunctionWithPrivateParameterTypes(): privateClass; // Error
    export declare function publicAmbientFunctionWithPublicParameterTypes(): publicClass;
    declare function privateAmbientFunctionWithPrivateParameterTypes(): privateClass;
    declare function privateAmbientFunctionWithPublicParameterTypes(): publicClass;

    export interface publicInterfaceWithPrivateModuleParameterTypes {
        new (): privateModule.publicClass; // Error
        (): privateModule.publicClass; // Error
        [x: number]: privateModule.publicClass; // Error
        myMethod(): privateModule.publicClass; // Error
    }
    export class publicClassWithPrivateModuleParameterTypes {
        static myPublicStaticMethod(): privateModule.publicClass { // Error
            return null;
        }
        myPublicMethod(): privateModule.publicClass { // Error
            return null;
        }
        static myPublicStaticMethod1() { // Error
            return new privateModule.publicClass();
        }
        myPublicMethod1() { // Error
            return new privateModule.publicClass();
        }
    }
    export function publicFunctionWithPrivateModuleParameterTypes(): privateModule.publicClass { // Error
        return null;
    }
    export function publicFunctionWithPrivateModuleParameterTypes1() { // Error
        return new privateModule.publicClass();
    }
    export declare function publicAmbientFunctionWithPrivateModuleParameterTypes(): privateModule.publicClass; // Error

    interface privateInterfaceWithPrivateModuleParameterTypes {
        new (): privateModule.publicClass;
        (): privateModule.publicClass;
        [x: number]: privateModule.publicClass;
        myMethod(): privateModule.publicClass;
    }
    class privateClassWithPrivateModuleParameterTypes {
        static myPublicStaticMethod(): privateModule.publicClass {
            return null;
        }
        myPublicMethod(): privateModule.publicClass {
            return null;
        }
        static myPublicStaticMethod1() {
            return new privateModule.publicClass();
        }
        myPublicMethod1() {
            return new privateModule.publicClass();
        }
    }
    function privateFunctionWithPrivateModuleParameterTypes(): privateModule.publicClass {
        return null;
    }
    function privateFunctionWithPrivateModuleParameterTypes1() {
        return new privateModule.publicClass();
    }
    declare function privateAmbientFunctionWithPrivateModuleParameterTypes(): privateModule.publicClass;
}

//// [privacyFunctionReturnTypeDeclFile_externalModule.js]
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
    function publicClassWithWithPrivateParameterTypes() {
    }
    publicClassWithWithPrivateParameterTypes.myPublicStaticMethod = function () {
        return null;
    };
    publicClassWithWithPrivateParameterTypes.myPrivateStaticMethod = function () {
        return null;
    };
    publicClassWithWithPrivateParameterTypes.prototype.myPublicMethod = function () {
        return null;
    };
    publicClassWithWithPrivateParameterTypes.prototype.myPrivateMethod = function () {
        return null;
    };
    publicClassWithWithPrivateParameterTypes.myPublicStaticMethod1 = function () {
        return new privateClass();
    };
    publicClassWithWithPrivateParameterTypes.myPrivateStaticMethod1 = function () {
        return new privateClass();
    };
    publicClassWithWithPrivateParameterTypes.prototype.myPublicMethod1 = function () {
        return new privateClass();
    };
    publicClassWithWithPrivateParameterTypes.prototype.myPrivateMethod1 = function () {
        return new privateClass();
    };
    return publicClassWithWithPrivateParameterTypes;
}());
exports.publicClassWithWithPrivateParameterTypes = publicClassWithWithPrivateParameterTypes;
var publicClassWithWithPublicParameterTypes = (function () {
    function publicClassWithWithPublicParameterTypes() {
    }
    publicClassWithWithPublicParameterTypes.myPublicStaticMethod = function () {
        return null;
    };
    publicClassWithWithPublicParameterTypes.myPrivateStaticMethod = function () {
        return null;
    };
    publicClassWithWithPublicParameterTypes.prototype.myPublicMethod = function () {
        return null;
    };
    publicClassWithWithPublicParameterTypes.prototype.myPrivateMethod = function () {
        return null;
    };
    publicClassWithWithPublicParameterTypes.myPublicStaticMethod1 = function () {
        return new publicClass();
    };
    publicClassWithWithPublicParameterTypes.myPrivateStaticMethod1 = function () {
        return new publicClass();
    };
    publicClassWithWithPublicParameterTypes.prototype.myPublicMethod1 = function () {
        return new publicClass();
    };
    publicClassWithWithPublicParameterTypes.prototype.myPrivateMethod1 = function () {
        return new publicClass();
    };
    return publicClassWithWithPublicParameterTypes;
}());
exports.publicClassWithWithPublicParameterTypes = publicClassWithWithPublicParameterTypes;
var privateClassWithWithPrivateParameterTypes = (function () {
    function privateClassWithWithPrivateParameterTypes() {
    }
    privateClassWithWithPrivateParameterTypes.myPublicStaticMethod = function () {
        return null;
    };
    privateClassWithWithPrivateParameterTypes.myPrivateStaticMethod = function () {
        return null;
    };
    privateClassWithWithPrivateParameterTypes.prototype.myPublicMethod = function () {
        return null;
    };
    privateClassWithWithPrivateParameterTypes.prototype.myPrivateMethod = function () {
        return null;
    };
    privateClassWithWithPrivateParameterTypes.myPublicStaticMethod1 = function () {
        return new privateClass();
    };
    privateClassWithWithPrivateParameterTypes.myPrivateStaticMethod1 = function () {
        return new privateClass();
    };
    privateClassWithWithPrivateParameterTypes.prototype.myPublicMethod1 = function () {
        return new privateClass();
    };
    privateClassWithWithPrivateParameterTypes.prototype.myPrivateMethod1 = function () {
        return new privateClass();
    };
    return privateClassWithWithPrivateParameterTypes;
}());
var privateClassWithWithPublicParameterTypes = (function () {
    function privateClassWithWithPublicParameterTypes() {
    }
    privateClassWithWithPublicParameterTypes.myPublicStaticMethod = function () {
        return null;
    };
    privateClassWithWithPublicParameterTypes.myPrivateStaticMethod = function () {
        return null;
    };
    privateClassWithWithPublicParameterTypes.prototype.myPublicMethod = function () {
        return null;
    };
    privateClassWithWithPublicParameterTypes.prototype.myPrivateMethod = function () {
        return null;
    };
    privateClassWithWithPublicParameterTypes.myPublicStaticMethod1 = function () {
        return new publicClass();
    };
    privateClassWithWithPublicParameterTypes.myPrivateStaticMethod1 = function () {
        return new publicClass();
    };
    privateClassWithWithPublicParameterTypes.prototype.myPublicMethod1 = function () {
        return new publicClass();
    };
    privateClassWithWithPublicParameterTypes.prototype.myPrivateMethod1 = function () {
        return new publicClass();
    };
    return privateClassWithWithPublicParameterTypes;
}());
function publicFunctionWithPrivateParameterTypes() {
    return null;
}
exports.publicFunctionWithPrivateParameterTypes = publicFunctionWithPrivateParameterTypes;
function publicFunctionWithPublicParameterTypes() {
    return null;
}
exports.publicFunctionWithPublicParameterTypes = publicFunctionWithPublicParameterTypes;
function privateFunctionWithPrivateParameterTypes() {
    return null;
}
function privateFunctionWithPublicParameterTypes() {
    return null;
}
function publicFunctionWithPrivateParameterTypes1() {
    return new privateClass();
}
exports.publicFunctionWithPrivateParameterTypes1 = publicFunctionWithPrivateParameterTypes1;
function publicFunctionWithPublicParameterTypes1() {
    return new publicClass();
}
exports.publicFunctionWithPublicParameterTypes1 = publicFunctionWithPublicParameterTypes1;
function privateFunctionWithPrivateParameterTypes1() {
    return new privateClass();
}
function privateFunctionWithPublicParameterTypes1() {
    return new publicClass();
}
var publicClassWithPrivateModuleParameterTypes = (function () {
    function publicClassWithPrivateModuleParameterTypes() {
    }
    publicClassWithPrivateModuleParameterTypes.myPublicStaticMethod = function () {
        return null;
    };
    publicClassWithPrivateModuleParameterTypes.prototype.myPublicMethod = function () {
        return null;
    };
    publicClassWithPrivateModuleParameterTypes.myPublicStaticMethod1 = function () {
        return new privateModule.publicClass();
    };
    publicClassWithPrivateModuleParameterTypes.prototype.myPublicMethod1 = function () {
        return new privateModule.publicClass();
    };
    return publicClassWithPrivateModuleParameterTypes;
}());
exports.publicClassWithPrivateModuleParameterTypes = publicClassWithPrivateModuleParameterTypes;
function publicFunctionWithPrivateModuleParameterTypes() {
    return null;
}
exports.publicFunctionWithPrivateModuleParameterTypes = publicFunctionWithPrivateModuleParameterTypes;
function publicFunctionWithPrivateModuleParameterTypes1() {
    return new privateModule.publicClass();
}
exports.publicFunctionWithPrivateModuleParameterTypes1 = publicFunctionWithPrivateModuleParameterTypes1;
var privateClassWithPrivateModuleParameterTypes = (function () {
    function privateClassWithPrivateModuleParameterTypes() {
    }
    privateClassWithPrivateModuleParameterTypes.myPublicStaticMethod = function () {
        return null;
    };
    privateClassWithPrivateModuleParameterTypes.prototype.myPublicMethod = function () {
        return null;
    };
    privateClassWithPrivateModuleParameterTypes.myPublicStaticMethod1 = function () {
        return new privateModule.publicClass();
    };
    privateClassWithPrivateModuleParameterTypes.prototype.myPublicMethod1 = function () {
        return new privateModule.publicClass();
    };
    return privateClassWithPrivateModuleParameterTypes;
}());
function privateFunctionWithPrivateModuleParameterTypes() {
    return null;
}
function privateFunctionWithPrivateModuleParameterTypes1() {
    return new privateModule.publicClass();
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
        function publicClassWithWithPrivateParameterTypes() {
        }
        publicClassWithWithPrivateParameterTypes.myPublicStaticMethod = function () {
            return null;
        };
        publicClassWithWithPrivateParameterTypes.myPrivateStaticMethod = function () {
            return null;
        };
        publicClassWithWithPrivateParameterTypes.prototype.myPublicMethod = function () {
            return null;
        };
        publicClassWithWithPrivateParameterTypes.prototype.myPrivateMethod = function () {
            return null;
        };
        publicClassWithWithPrivateParameterTypes.myPublicStaticMethod1 = function () {
            return new privateClass();
        };
        publicClassWithWithPrivateParameterTypes.myPrivateStaticMethod1 = function () {
            return new privateClass();
        };
        publicClassWithWithPrivateParameterTypes.prototype.myPublicMethod1 = function () {
            return new privateClass();
        };
        publicClassWithWithPrivateParameterTypes.prototype.myPrivateMethod1 = function () {
            return new privateClass();
        };
        return publicClassWithWithPrivateParameterTypes;
    }());
    publicModule.publicClassWithWithPrivateParameterTypes = publicClassWithWithPrivateParameterTypes;
    var publicClassWithWithPublicParameterTypes = (function () {
        function publicClassWithWithPublicParameterTypes() {
        }
        publicClassWithWithPublicParameterTypes.myPublicStaticMethod = function () {
            return null;
        };
        publicClassWithWithPublicParameterTypes.myPrivateStaticMethod = function () {
            return null;
        };
        publicClassWithWithPublicParameterTypes.prototype.myPublicMethod = function () {
            return null;
        };
        publicClassWithWithPublicParameterTypes.prototype.myPrivateMethod = function () {
            return null;
        };
        publicClassWithWithPublicParameterTypes.myPublicStaticMethod1 = function () {
            return new publicClass();
        };
        publicClassWithWithPublicParameterTypes.myPrivateStaticMethod1 = function () {
            return new publicClass();
        };
        publicClassWithWithPublicParameterTypes.prototype.myPublicMethod1 = function () {
            return new publicClass();
        };
        publicClassWithWithPublicParameterTypes.prototype.myPrivateMethod1 = function () {
            return new publicClass();
        };
        return publicClassWithWithPublicParameterTypes;
    }());
    publicModule.publicClassWithWithPublicParameterTypes = publicClassWithWithPublicParameterTypes;
    var privateClassWithWithPrivateParameterTypes = (function () {
        function privateClassWithWithPrivateParameterTypes() {
        }
        privateClassWithWithPrivateParameterTypes.myPublicStaticMethod = function () {
            return null;
        };
        privateClassWithWithPrivateParameterTypes.myPrivateStaticMethod = function () {
            return null;
        };
        privateClassWithWithPrivateParameterTypes.prototype.myPublicMethod = function () {
            return null;
        };
        privateClassWithWithPrivateParameterTypes.prototype.myPrivateMethod = function () {
            return null;
        };
        privateClassWithWithPrivateParameterTypes.myPublicStaticMethod1 = function () {
            return new privateClass();
        };
        privateClassWithWithPrivateParameterTypes.myPrivateStaticMethod1 = function () {
            return new privateClass();
        };
        privateClassWithWithPrivateParameterTypes.prototype.myPublicMethod1 = function () {
            return new privateClass();
        };
        privateClassWithWithPrivateParameterTypes.prototype.myPrivateMethod1 = function () {
            return new privateClass();
        };
        return privateClassWithWithPrivateParameterTypes;
    }());
    var privateClassWithWithPublicParameterTypes = (function () {
        function privateClassWithWithPublicParameterTypes() {
        }
        privateClassWithWithPublicParameterTypes.myPublicStaticMethod = function () {
            return null;
        };
        privateClassWithWithPublicParameterTypes.myPrivateStaticMethod = function () {
            return null;
        };
        privateClassWithWithPublicParameterTypes.prototype.myPublicMethod = function () {
            return null;
        };
        privateClassWithWithPublicParameterTypes.prototype.myPrivateMethod = function () {
            return null;
        };
        privateClassWithWithPublicParameterTypes.myPublicStaticMethod1 = function () {
            return new publicClass();
        };
        privateClassWithWithPublicParameterTypes.myPrivateStaticMethod1 = function () {
            return new publicClass();
        };
        privateClassWithWithPublicParameterTypes.prototype.myPublicMethod1 = function () {
            return new publicClass();
        };
        privateClassWithWithPublicParameterTypes.prototype.myPrivateMethod1 = function () {
            return new publicClass();
        };
        return privateClassWithWithPublicParameterTypes;
    }());
    function publicFunctionWithPrivateParameterTypes() {
        return null;
    }
    publicModule.publicFunctionWithPrivateParameterTypes = publicFunctionWithPrivateParameterTypes;
    function publicFunctionWithPublicParameterTypes() {
        return null;
    }
    publicModule.publicFunctionWithPublicParameterTypes = publicFunctionWithPublicParameterTypes;
    function privateFunctionWithPrivateParameterTypes() {
        return null;
    }
    function privateFunctionWithPublicParameterTypes() {
        return null;
    }
    function publicFunctionWithPrivateParameterTypes1() {
        return new privateClass();
    }
    publicModule.publicFunctionWithPrivateParameterTypes1 = publicFunctionWithPrivateParameterTypes1;
    function publicFunctionWithPublicParameterTypes1() {
        return new publicClass();
    }
    publicModule.publicFunctionWithPublicParameterTypes1 = publicFunctionWithPublicParameterTypes1;
    function privateFunctionWithPrivateParameterTypes1() {
        return new privateClass();
    }
    function privateFunctionWithPublicParameterTypes1() {
        return new publicClass();
    }
    var publicClassWithPrivateModuleParameterTypes = (function () {
        function publicClassWithPrivateModuleParameterTypes() {
        }
        publicClassWithPrivateModuleParameterTypes.myPublicStaticMethod = function () {
            return null;
        };
        publicClassWithPrivateModuleParameterTypes.prototype.myPublicMethod = function () {
            return null;
        };
        publicClassWithPrivateModuleParameterTypes.myPublicStaticMethod1 = function () {
            return new privateModule.publicClass();
        };
        publicClassWithPrivateModuleParameterTypes.prototype.myPublicMethod1 = function () {
            return new privateModule.publicClass();
        };
        return publicClassWithPrivateModuleParameterTypes;
    }());
    publicModule.publicClassWithPrivateModuleParameterTypes = publicClassWithPrivateModuleParameterTypes;
    function publicFunctionWithPrivateModuleParameterTypes() {
        return null;
    }
    publicModule.publicFunctionWithPrivateModuleParameterTypes = publicFunctionWithPrivateModuleParameterTypes;
    function publicFunctionWithPrivateModuleParameterTypes1() {
        return new privateModule.publicClass();
    }
    publicModule.publicFunctionWithPrivateModuleParameterTypes1 = publicFunctionWithPrivateModuleParameterTypes1;
    var privateClassWithPrivateModuleParameterTypes = (function () {
        function privateClassWithPrivateModuleParameterTypes() {
        }
        privateClassWithPrivateModuleParameterTypes.myPublicStaticMethod = function () {
            return null;
        };
        privateClassWithPrivateModuleParameterTypes.prototype.myPublicMethod = function () {
            return null;
        };
        privateClassWithPrivateModuleParameterTypes.myPublicStaticMethod1 = function () {
            return new privateModule.publicClass();
        };
        privateClassWithPrivateModuleParameterTypes.prototype.myPublicMethod1 = function () {
            return new privateModule.publicClass();
        };
        return privateClassWithPrivateModuleParameterTypes;
    }());
    function privateFunctionWithPrivateModuleParameterTypes() {
        return null;
    }
    function privateFunctionWithPrivateModuleParameterTypes1() {
        return new privateModule.publicClass();
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
        function publicClassWithWithPrivateParameterTypes() {
        }
        publicClassWithWithPrivateParameterTypes.myPublicStaticMethod = function () {
            return null;
        };
        publicClassWithWithPrivateParameterTypes.myPrivateStaticMethod = function () {
            return null;
        };
        publicClassWithWithPrivateParameterTypes.prototype.myPublicMethod = function () {
            return null;
        };
        publicClassWithWithPrivateParameterTypes.prototype.myPrivateMethod = function () {
            return null;
        };
        publicClassWithWithPrivateParameterTypes.myPublicStaticMethod1 = function () {
            return new privateClass();
        };
        publicClassWithWithPrivateParameterTypes.myPrivateStaticMethod1 = function () {
            return new privateClass();
        };
        publicClassWithWithPrivateParameterTypes.prototype.myPublicMethod1 = function () {
            return new privateClass();
        };
        publicClassWithWithPrivateParameterTypes.prototype.myPrivateMethod1 = function () {
            return new privateClass();
        };
        return publicClassWithWithPrivateParameterTypes;
    }());
    privateModule.publicClassWithWithPrivateParameterTypes = publicClassWithWithPrivateParameterTypes;
    var publicClassWithWithPublicParameterTypes = (function () {
        function publicClassWithWithPublicParameterTypes() {
        }
        publicClassWithWithPublicParameterTypes.myPublicStaticMethod = function () {
            return null;
        };
        publicClassWithWithPublicParameterTypes.myPrivateStaticMethod = function () {
            return null;
        };
        publicClassWithWithPublicParameterTypes.prototype.myPublicMethod = function () {
            return null;
        };
        publicClassWithWithPublicParameterTypes.prototype.myPrivateMethod = function () {
            return null;
        };
        publicClassWithWithPublicParameterTypes.myPublicStaticMethod1 = function () {
            return new publicClass();
        };
        publicClassWithWithPublicParameterTypes.myPrivateStaticMethod1 = function () {
            return new publicClass();
        };
        publicClassWithWithPublicParameterTypes.prototype.myPublicMethod1 = function () {
            return new publicClass();
        };
        publicClassWithWithPublicParameterTypes.prototype.myPrivateMethod1 = function () {
            return new publicClass();
        };
        return publicClassWithWithPublicParameterTypes;
    }());
    privateModule.publicClassWithWithPublicParameterTypes = publicClassWithWithPublicParameterTypes;
    var privateClassWithWithPrivateParameterTypes = (function () {
        function privateClassWithWithPrivateParameterTypes() {
        }
        privateClassWithWithPrivateParameterTypes.myPublicStaticMethod = function () {
            return null;
        };
        privateClassWithWithPrivateParameterTypes.myPrivateStaticMethod = function () {
            return null;
        };
        privateClassWithWithPrivateParameterTypes.prototype.myPublicMethod = function () {
            return null;
        };
        privateClassWithWithPrivateParameterTypes.prototype.myPrivateMethod = function () {
            return null;
        };
        privateClassWithWithPrivateParameterTypes.myPublicStaticMethod1 = function () {
            return new privateClass();
        };
        privateClassWithWithPrivateParameterTypes.myPrivateStaticMethod1 = function () {
            return new privateClass();
        };
        privateClassWithWithPrivateParameterTypes.prototype.myPublicMethod1 = function () {
            return new privateClass();
        };
        privateClassWithWithPrivateParameterTypes.prototype.myPrivateMethod1 = function () {
            return new privateClass();
        };
        return privateClassWithWithPrivateParameterTypes;
    }());
    var privateClassWithWithPublicParameterTypes = (function () {
        function privateClassWithWithPublicParameterTypes() {
        }
        privateClassWithWithPublicParameterTypes.myPublicStaticMethod = function () {
            return null;
        };
        privateClassWithWithPublicParameterTypes.myPrivateStaticMethod = function () {
            return null;
        };
        privateClassWithWithPublicParameterTypes.prototype.myPublicMethod = function () {
            return null;
        };
        privateClassWithWithPublicParameterTypes.prototype.myPrivateMethod = function () {
            return null;
        };
        privateClassWithWithPublicParameterTypes.myPublicStaticMethod1 = function () {
            return new publicClass();
        };
        privateClassWithWithPublicParameterTypes.myPrivateStaticMethod1 = function () {
            return new publicClass();
        };
        privateClassWithWithPublicParameterTypes.prototype.myPublicMethod1 = function () {
            return new publicClass();
        };
        privateClassWithWithPublicParameterTypes.prototype.myPrivateMethod1 = function () {
            return new publicClass();
        };
        return privateClassWithWithPublicParameterTypes;
    }());
    function publicFunctionWithPrivateParameterTypes() {
        return null;
    }
    privateModule.publicFunctionWithPrivateParameterTypes = publicFunctionWithPrivateParameterTypes;
    function publicFunctionWithPublicParameterTypes() {
        return null;
    }
    privateModule.publicFunctionWithPublicParameterTypes = publicFunctionWithPublicParameterTypes;
    function privateFunctionWithPrivateParameterTypes() {
        return null;
    }
    function privateFunctionWithPublicParameterTypes() {
        return null;
    }
    function publicFunctionWithPrivateParameterTypes1() {
        return new privateClass();
    }
    privateModule.publicFunctionWithPrivateParameterTypes1 = publicFunctionWithPrivateParameterTypes1;
    function publicFunctionWithPublicParameterTypes1() {
        return new publicClass();
    }
    privateModule.publicFunctionWithPublicParameterTypes1 = publicFunctionWithPublicParameterTypes1;
    function privateFunctionWithPrivateParameterTypes1() {
        return new privateClass();
    }
    function privateFunctionWithPublicParameterTypes1() {
        return new publicClass();
    }
    var publicClassWithPrivateModuleParameterTypes = (function () {
        function publicClassWithPrivateModuleParameterTypes() {
        }
        publicClassWithPrivateModuleParameterTypes.myPublicStaticMethod = function () {
            return null;
        };
        publicClassWithPrivateModuleParameterTypes.prototype.myPublicMethod = function () {
            return null;
        };
        publicClassWithPrivateModuleParameterTypes.myPublicStaticMethod1 = function () {
            return new privateModule.publicClass();
        };
        publicClassWithPrivateModuleParameterTypes.prototype.myPublicMethod1 = function () {
            return new privateModule.publicClass();
        };
        return publicClassWithPrivateModuleParameterTypes;
    }());
    privateModule.publicClassWithPrivateModuleParameterTypes = publicClassWithPrivateModuleParameterTypes;
    function publicFunctionWithPrivateModuleParameterTypes() {
        return null;
    }
    privateModule.publicFunctionWithPrivateModuleParameterTypes = publicFunctionWithPrivateModuleParameterTypes;
    function publicFunctionWithPrivateModuleParameterTypes1() {
        return new privateModule.publicClass();
    }
    privateModule.publicFunctionWithPrivateModuleParameterTypes1 = publicFunctionWithPrivateModuleParameterTypes1;
    var privateClassWithPrivateModuleParameterTypes = (function () {
        function privateClassWithPrivateModuleParameterTypes() {
        }
        privateClassWithPrivateModuleParameterTypes.myPublicStaticMethod = function () {
            return null;
        };
        privateClassWithPrivateModuleParameterTypes.prototype.myPublicMethod = function () {
            return null;
        };
        privateClassWithPrivateModuleParameterTypes.myPublicStaticMethod1 = function () {
            return new privateModule.publicClass();
        };
        privateClassWithPrivateModuleParameterTypes.prototype.myPublicMethod1 = function () {
            return new privateModule.publicClass();
        };
        return privateClassWithPrivateModuleParameterTypes;
    }());
    function privateFunctionWithPrivateModuleParameterTypes() {
        return null;
    }
    function privateFunctionWithPrivateModuleParameterTypes1() {
        return new privateModule.publicClass();
    }
})(privateModule || (privateModule = {}));
//// [privacyFunctionReturnTypeDeclFile_GlobalFile.js]
var publicClassInGlobal = (function () {
    function publicClassInGlobal() {
    }
    return publicClassInGlobal;
}());
var publicClassWithWithPublicParameterTypesInGlobal = (function () {
    function publicClassWithWithPublicParameterTypesInGlobal() {
    }
    publicClassWithWithPublicParameterTypesInGlobal.myPublicStaticMethod = function () {
        return null;
    };
    publicClassWithWithPublicParameterTypesInGlobal.myPrivateStaticMethod = function () {
        return null;
    };
    publicClassWithWithPublicParameterTypesInGlobal.prototype.myPublicMethod = function () {
        return null;
    };
    publicClassWithWithPublicParameterTypesInGlobal.prototype.myPrivateMethod = function () {
        return null;
    };
    publicClassWithWithPublicParameterTypesInGlobal.myPublicStaticMethod1 = function () {
        return new publicClassInGlobal();
    };
    publicClassWithWithPublicParameterTypesInGlobal.myPrivateStaticMethod1 = function () {
        return new publicClassInGlobal();
    };
    publicClassWithWithPublicParameterTypesInGlobal.prototype.myPublicMethod1 = function () {
        return new publicClassInGlobal();
    };
    publicClassWithWithPublicParameterTypesInGlobal.prototype.myPrivateMethod1 = function () {
        return new publicClassInGlobal();
    };
    return publicClassWithWithPublicParameterTypesInGlobal;
}());
function publicFunctionWithPublicParameterTypesInGlobal() {
    return null;
}
function publicFunctionWithPublicParameterTypesInGlobal1() {
    return new publicClassInGlobal();
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
            function publicClassWithWithPrivateParameterTypes() {
            }
            publicClassWithWithPrivateParameterTypes.myPublicStaticMethod = function () {
                return null;
            };
            publicClassWithWithPrivateParameterTypes.myPrivateStaticMethod = function () {
                return null;
            };
            publicClassWithWithPrivateParameterTypes.prototype.myPublicMethod = function () {
                return null;
            };
            publicClassWithWithPrivateParameterTypes.prototype.myPrivateMethod = function () {
                return null;
            };
            publicClassWithWithPrivateParameterTypes.myPublicStaticMethod1 = function () {
                return new privateClass();
            };
            publicClassWithWithPrivateParameterTypes.myPrivateStaticMethod1 = function () {
                return new privateClass();
            };
            publicClassWithWithPrivateParameterTypes.prototype.myPublicMethod1 = function () {
                return new privateClass();
            };
            publicClassWithWithPrivateParameterTypes.prototype.myPrivateMethod1 = function () {
                return new privateClass();
            };
            return publicClassWithWithPrivateParameterTypes;
        }());
        privateModule.publicClassWithWithPrivateParameterTypes = publicClassWithWithPrivateParameterTypes;
        var publicClassWithWithPublicParameterTypes = (function () {
            function publicClassWithWithPublicParameterTypes() {
            }
            publicClassWithWithPublicParameterTypes.myPublicStaticMethod = function () {
                return null;
            };
            publicClassWithWithPublicParameterTypes.myPrivateStaticMethod = function () {
                return null;
            };
            publicClassWithWithPublicParameterTypes.prototype.myPublicMethod = function () {
                return null;
            };
            publicClassWithWithPublicParameterTypes.prototype.myPrivateMethod = function () {
                return null;
            };
            publicClassWithWithPublicParameterTypes.myPublicStaticMethod1 = function () {
                return new publicClass();
            };
            publicClassWithWithPublicParameterTypes.myPrivateStaticMethod1 = function () {
                return new publicClass();
            };
            publicClassWithWithPublicParameterTypes.prototype.myPublicMethod1 = function () {
                return new publicClass();
            };
            publicClassWithWithPublicParameterTypes.prototype.myPrivateMethod1 = function () {
                return new publicClass();
            };
            return publicClassWithWithPublicParameterTypes;
        }());
        privateModule.publicClassWithWithPublicParameterTypes = publicClassWithWithPublicParameterTypes;
        var privateClassWithWithPrivateParameterTypes = (function () {
            function privateClassWithWithPrivateParameterTypes() {
            }
            privateClassWithWithPrivateParameterTypes.myPublicStaticMethod = function () {
                return null;
            };
            privateClassWithWithPrivateParameterTypes.myPrivateStaticMethod = function () {
                return null;
            };
            privateClassWithWithPrivateParameterTypes.prototype.myPublicMethod = function () {
                return null;
            };
            privateClassWithWithPrivateParameterTypes.prototype.myPrivateMethod = function () {
                return null;
            };
            privateClassWithWithPrivateParameterTypes.myPublicStaticMethod1 = function () {
                return new privateClass();
            };
            privateClassWithWithPrivateParameterTypes.myPrivateStaticMethod1 = function () {
                return new privateClass();
            };
            privateClassWithWithPrivateParameterTypes.prototype.myPublicMethod1 = function () {
                return new privateClass();
            };
            privateClassWithWithPrivateParameterTypes.prototype.myPrivateMethod1 = function () {
                return new privateClass();
            };
            return privateClassWithWithPrivateParameterTypes;
        }());
        var privateClassWithWithPublicParameterTypes = (function () {
            function privateClassWithWithPublicParameterTypes() {
            }
            privateClassWithWithPublicParameterTypes.myPublicStaticMethod = function () {
                return null;
            };
            privateClassWithWithPublicParameterTypes.myPrivateStaticMethod = function () {
                return null;
            };
            privateClassWithWithPublicParameterTypes.prototype.myPublicMethod = function () {
                return null;
            };
            privateClassWithWithPublicParameterTypes.prototype.myPrivateMethod = function () {
                return null;
            };
            privateClassWithWithPublicParameterTypes.myPublicStaticMethod1 = function () {
                return new publicClass();
            };
            privateClassWithWithPublicParameterTypes.myPrivateStaticMethod1 = function () {
                return new publicClass();
            };
            privateClassWithWithPublicParameterTypes.prototype.myPublicMethod1 = function () {
                return new publicClass();
            };
            privateClassWithWithPublicParameterTypes.prototype.myPrivateMethod1 = function () {
                return new publicClass();
            };
            return privateClassWithWithPublicParameterTypes;
        }());
        function publicFunctionWithPrivateParameterTypes() {
            return null;
        }
        privateModule.publicFunctionWithPrivateParameterTypes = publicFunctionWithPrivateParameterTypes;
        function publicFunctionWithPublicParameterTypes() {
            return null;
        }
        privateModule.publicFunctionWithPublicParameterTypes = publicFunctionWithPublicParameterTypes;
        function privateFunctionWithPrivateParameterTypes() {
            return null;
        }
        function privateFunctionWithPublicParameterTypes() {
            return null;
        }
        function publicFunctionWithPrivateParameterTypes1() {
            return new privateClass();
        }
        privateModule.publicFunctionWithPrivateParameterTypes1 = publicFunctionWithPrivateParameterTypes1;
        function publicFunctionWithPublicParameterTypes1() {
            return new publicClass();
        }
        privateModule.publicFunctionWithPublicParameterTypes1 = publicFunctionWithPublicParameterTypes1;
        function privateFunctionWithPrivateParameterTypes1() {
            return new privateClass();
        }
        function privateFunctionWithPublicParameterTypes1() {
            return new publicClass();
        }
        var publicClassWithPrivateModuleParameterTypes = (function () {
            function publicClassWithPrivateModuleParameterTypes() {
            }
            publicClassWithPrivateModuleParameterTypes.myPublicStaticMethod = function () {
                return null;
            };
            publicClassWithPrivateModuleParameterTypes.prototype.myPublicMethod = function () {
                return null;
            };
            publicClassWithPrivateModuleParameterTypes.myPublicStaticMethod1 = function () {
                return new privateModule.publicClass();
            };
            publicClassWithPrivateModuleParameterTypes.prototype.myPublicMethod1 = function () {
                return new privateModule.publicClass();
            };
            return publicClassWithPrivateModuleParameterTypes;
        }());
        privateModule.publicClassWithPrivateModuleParameterTypes = publicClassWithPrivateModuleParameterTypes;
        function publicFunctionWithPrivateModuleParameterTypes() {
            return null;
        }
        privateModule.publicFunctionWithPrivateModuleParameterTypes = publicFunctionWithPrivateModuleParameterTypes;
        function publicFunctionWithPrivateModuleParameterTypes1() {
            return new privateModule.publicClass();
        }
        privateModule.publicFunctionWithPrivateModuleParameterTypes1 = publicFunctionWithPrivateModuleParameterTypes1;
        var privateClassWithPrivateModuleParameterTypes = (function () {
            function privateClassWithPrivateModuleParameterTypes() {
            }
            privateClassWithPrivateModuleParameterTypes.myPublicStaticMethod = function () {
                return null;
            };
            privateClassWithPrivateModuleParameterTypes.prototype.myPublicMethod = function () {
                return null;
            };
            privateClassWithPrivateModuleParameterTypes.myPublicStaticMethod1 = function () {
                return new privateModule.publicClass();
            };
            privateClassWithPrivateModuleParameterTypes.prototype.myPublicMethod1 = function () {
                return new privateModule.publicClass();
            };
            return privateClassWithPrivateModuleParameterTypes;
        }());
        function privateFunctionWithPrivateModuleParameterTypes() {
            return null;
        }
        function privateFunctionWithPrivateModuleParameterTypes1() {
            return new privateModule.publicClass();
        }
    })(privateModule || (privateModule = {}));
    var publicClassWithWithPrivateParameterTypes = (function () {
        function publicClassWithWithPrivateParameterTypes() {
        }
        publicClassWithWithPrivateParameterTypes.myPublicStaticMethod = function () {
            return null;
        };
        publicClassWithWithPrivateParameterTypes.myPrivateStaticMethod = function () {
            return null;
        };
        publicClassWithWithPrivateParameterTypes.prototype.myPublicMethod = function () {
            return null;
        };
        publicClassWithWithPrivateParameterTypes.prototype.myPrivateMethod = function () {
            return null;
        };
        publicClassWithWithPrivateParameterTypes.myPublicStaticMethod1 = function () {
            return new privateClass();
        };
        publicClassWithWithPrivateParameterTypes.myPrivateStaticMethod1 = function () {
            return new privateClass();
        };
        publicClassWithWithPrivateParameterTypes.prototype.myPublicMethod1 = function () {
            return new privateClass();
        };
        publicClassWithWithPrivateParameterTypes.prototype.myPrivateMethod1 = function () {
            return new privateClass();
        };
        return publicClassWithWithPrivateParameterTypes;
    }());
    publicModuleInGlobal.publicClassWithWithPrivateParameterTypes = publicClassWithWithPrivateParameterTypes;
    var publicClassWithWithPublicParameterTypes = (function () {
        function publicClassWithWithPublicParameterTypes() {
        }
        publicClassWithWithPublicParameterTypes.myPublicStaticMethod = function () {
            return null;
        };
        publicClassWithWithPublicParameterTypes.myPrivateStaticMethod = function () {
            return null;
        };
        publicClassWithWithPublicParameterTypes.prototype.myPublicMethod = function () {
            return null;
        };
        publicClassWithWithPublicParameterTypes.prototype.myPrivateMethod = function () {
            return null;
        };
        publicClassWithWithPublicParameterTypes.myPublicStaticMethod1 = function () {
            return new publicClass();
        };
        publicClassWithWithPublicParameterTypes.myPrivateStaticMethod1 = function () {
            return new publicClass();
        };
        publicClassWithWithPublicParameterTypes.prototype.myPublicMethod1 = function () {
            return new publicClass();
        };
        publicClassWithWithPublicParameterTypes.prototype.myPrivateMethod1 = function () {
            return new publicClass();
        };
        return publicClassWithWithPublicParameterTypes;
    }());
    publicModuleInGlobal.publicClassWithWithPublicParameterTypes = publicClassWithWithPublicParameterTypes;
    var privateClassWithWithPrivateParameterTypes = (function () {
        function privateClassWithWithPrivateParameterTypes() {
        }
        privateClassWithWithPrivateParameterTypes.myPublicStaticMethod = function () {
            return null;
        };
        privateClassWithWithPrivateParameterTypes.myPrivateStaticMethod = function () {
            return null;
        };
        privateClassWithWithPrivateParameterTypes.prototype.myPublicMethod = function () {
            return null;
        };
        privateClassWithWithPrivateParameterTypes.prototype.myPrivateMethod = function () {
            return null;
        };
        privateClassWithWithPrivateParameterTypes.myPublicStaticMethod1 = function () {
            return new privateClass();
        };
        privateClassWithWithPrivateParameterTypes.myPrivateStaticMethod1 = function () {
            return new privateClass();
        };
        privateClassWithWithPrivateParameterTypes.prototype.myPublicMethod1 = function () {
            return new privateClass();
        };
        privateClassWithWithPrivateParameterTypes.prototype.myPrivateMethod1 = function () {
            return new privateClass();
        };
        return privateClassWithWithPrivateParameterTypes;
    }());
    var privateClassWithWithPublicParameterTypes = (function () {
        function privateClassWithWithPublicParameterTypes() {
        }
        privateClassWithWithPublicParameterTypes.myPublicStaticMethod = function () {
            return null;
        };
        privateClassWithWithPublicParameterTypes.myPrivateStaticMethod = function () {
            return null;
        };
        privateClassWithWithPublicParameterTypes.prototype.myPublicMethod = function () {
            return null;
        };
        privateClassWithWithPublicParameterTypes.prototype.myPrivateMethod = function () {
            return null;
        };
        privateClassWithWithPublicParameterTypes.myPublicStaticMethod1 = function () {
            return new publicClass();
        };
        privateClassWithWithPublicParameterTypes.myPrivateStaticMethod1 = function () {
            return new publicClass();
        };
        privateClassWithWithPublicParameterTypes.prototype.myPublicMethod1 = function () {
            return new publicClass();
        };
        privateClassWithWithPublicParameterTypes.prototype.myPrivateMethod1 = function () {
            return new publicClass();
        };
        return privateClassWithWithPublicParameterTypes;
    }());
    function publicFunctionWithPrivateParameterTypes() {
        return null;
    }
    publicModuleInGlobal.publicFunctionWithPrivateParameterTypes = publicFunctionWithPrivateParameterTypes;
    function publicFunctionWithPublicParameterTypes() {
        return null;
    }
    publicModuleInGlobal.publicFunctionWithPublicParameterTypes = publicFunctionWithPublicParameterTypes;
    function privateFunctionWithPrivateParameterTypes() {
        return null;
    }
    function privateFunctionWithPublicParameterTypes() {
        return null;
    }
    function publicFunctionWithPrivateParameterTypes1() {
        return new privateClass();
    }
    publicModuleInGlobal.publicFunctionWithPrivateParameterTypes1 = publicFunctionWithPrivateParameterTypes1;
    function publicFunctionWithPublicParameterTypes1() {
        return new publicClass();
    }
    publicModuleInGlobal.publicFunctionWithPublicParameterTypes1 = publicFunctionWithPublicParameterTypes1;
    function privateFunctionWithPrivateParameterTypes1() {
        return new privateClass();
    }
    function privateFunctionWithPublicParameterTypes1() {
        return new publicClass();
    }
    var publicClassWithPrivateModuleParameterTypes = (function () {
        function publicClassWithPrivateModuleParameterTypes() {
        }
        publicClassWithPrivateModuleParameterTypes.myPublicStaticMethod = function () {
            return null;
        };
        publicClassWithPrivateModuleParameterTypes.prototype.myPublicMethod = function () {
            return null;
        };
        publicClassWithPrivateModuleParameterTypes.myPublicStaticMethod1 = function () {
            return new privateModule.publicClass();
        };
        publicClassWithPrivateModuleParameterTypes.prototype.myPublicMethod1 = function () {
            return new privateModule.publicClass();
        };
        return publicClassWithPrivateModuleParameterTypes;
    }());
    publicModuleInGlobal.publicClassWithPrivateModuleParameterTypes = publicClassWithPrivateModuleParameterTypes;
    function publicFunctionWithPrivateModuleParameterTypes() {
        return null;
    }
    publicModuleInGlobal.publicFunctionWithPrivateModuleParameterTypes = publicFunctionWithPrivateModuleParameterTypes;
    function publicFunctionWithPrivateModuleParameterTypes1() {
        return new privateModule.publicClass();
    }
    publicModuleInGlobal.publicFunctionWithPrivateModuleParameterTypes1 = publicFunctionWithPrivateModuleParameterTypes1;
    var privateClassWithPrivateModuleParameterTypes = (function () {
        function privateClassWithPrivateModuleParameterTypes() {
        }
        privateClassWithPrivateModuleParameterTypes.myPublicStaticMethod = function () {
            return null;
        };
        privateClassWithPrivateModuleParameterTypes.prototype.myPublicMethod = function () {
            return null;
        };
        privateClassWithPrivateModuleParameterTypes.myPublicStaticMethod1 = function () {
            return new privateModule.publicClass();
        };
        privateClassWithPrivateModuleParameterTypes.prototype.myPublicMethod1 = function () {
            return new privateModule.publicClass();
        };
        return privateClassWithPrivateModuleParameterTypes;
    }());
    function privateFunctionWithPrivateModuleParameterTypes() {
        return null;
    }
    function privateFunctionWithPrivateModuleParameterTypes1() {
        return new privateModule.publicClass();
    }
})(publicModuleInGlobal || (publicModuleInGlobal = {}));
