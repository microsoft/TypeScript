//// [tests/cases/compiler/privacyFunctionReturnTypeDeclFile.ts] ////

//// [privacyFunctionReturnTypeDeclFile_externalModule.ts]
class privateClass {
}

export class publicClass {
}

export interface publicInterfaceWithPrivateParmeterTypes {
    new (): privateClass; // Error
    (): privateClass; // Error
    [x: number]: privateClass; // Error
    myMethod(): privateClass; // Error
}

export interface publicInterfaceWithPublicParmeterTypes {
    new (): publicClass;
    (): publicClass;
    [x: number]: publicClass;
    myMethod(): publicClass;
}

interface privateInterfaceWithPrivateParmeterTypes {
    new (): privateClass;
    (): privateClass;
    [x: number]: privateClass;
    myMethod(): privateClass;
}

interface privateInterfaceWithPublicParmeterTypes {
    new (): publicClass;
    (): publicClass;
    [x: number]: publicClass;
    myMethod(): publicClass;
}

export class publicClassWithWithPrivateParmeterTypes {
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

export class publicClassWithWithPublicParmeterTypes {
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

class privateClassWithWithPrivateParmeterTypes {
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

class privateClassWithWithPublicParmeterTypes {
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

export function publicFunctionWithPrivateParmeterTypes(): privateClass { // Error
    return null;
}
export function publicFunctionWithPublicParmeterTypes(): publicClass {
    return null;
}
function privateFunctionWithPrivateParmeterTypes(): privateClass {
    return null;
}
function privateFunctionWithPublicParmeterTypes(): publicClass {
    return null;
}
export function publicFunctionWithPrivateParmeterTypes1() { // Error
    return new privateClass();
}
export function publicFunctionWithPublicParmeterTypes1() {
    return new publicClass();
}
function privateFunctionWithPrivateParmeterTypes1() {
    return new privateClass();
}
function privateFunctionWithPublicParmeterTypes1() {
    return new publicClass();
}

export declare function publicAmbientFunctionWithPrivateParmeterTypes(): privateClass; // Error
export declare function publicAmbientFunctionWithPublicParmeterTypes(): publicClass;
declare function privateAmbientFunctionWithPrivateParmeterTypes(): privateClass;
declare function privateAmbientFunctionWithPublicParmeterTypes(): publicClass;

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

    export interface publicInterfaceWithPrivateParmeterTypes {
        new (): privateClass; // Error
        (): privateClass; // Error
        [x: number]: privateClass; // Error
        myMethod(): privateClass; // Error
    }

    export interface publicInterfaceWithPublicParmeterTypes {
        new (): publicClass;
        (): publicClass;
        [x: number]: publicClass;
        myMethod(): publicClass;
    }

    interface privateInterfaceWithPrivateParmeterTypes {
        new (): privateClass;
        (): privateClass;
        [x: number]: privateClass;
        myMethod(): privateClass;
    }

    interface privateInterfaceWithPublicParmeterTypes {
        new (): publicClass;
        (): publicClass;
        [x: number]: publicClass;
        myMethod(): publicClass;
    }

    export class publicClassWithWithPrivateParmeterTypes {
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

    export class publicClassWithWithPublicParmeterTypes {
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

    class privateClassWithWithPrivateParmeterTypes {
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

    class privateClassWithWithPublicParmeterTypes {
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

    export function publicFunctionWithPrivateParmeterTypes(): privateClass { // Error
        return null;
    }
    export function publicFunctionWithPublicParmeterTypes(): publicClass {
        return null;
    }
    function privateFunctionWithPrivateParmeterTypes(): privateClass {
        return null;
    }
    function privateFunctionWithPublicParmeterTypes(): publicClass {
        return null;
    }
    export function publicFunctionWithPrivateParmeterTypes1() { // Error
        return new privateClass();
    }
    export function publicFunctionWithPublicParmeterTypes1() {
        return new publicClass();
    }
    function privateFunctionWithPrivateParmeterTypes1() {
        return new privateClass();
    }
    function privateFunctionWithPublicParmeterTypes1() {
        return new publicClass();
    }

    export declare function publicAmbientFunctionWithPrivateParmeterTypes(): privateClass; // Error
    export declare function publicAmbientFunctionWithPublicParmeterTypes(): publicClass;
    declare function privateAmbientFunctionWithPrivateParmeterTypes(): privateClass;
    declare function privateAmbientFunctionWithPublicParmeterTypes(): publicClass;

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

    export interface publicInterfaceWithPrivateParmeterTypes {
        new (): privateClass; 
        (): privateClass; 
        [x: number]: privateClass; 
        myMethod(): privateClass; 
    }

    export interface publicInterfaceWithPublicParmeterTypes {
        new (): publicClass;
        (): publicClass;
        [x: number]: publicClass;
        myMethod(): publicClass;
    }

    interface privateInterfaceWithPrivateParmeterTypes {
        new (): privateClass;
        (): privateClass;
        [x: number]: privateClass;
        myMethod(): privateClass;
    }

    interface privateInterfaceWithPublicParmeterTypes {
        new (): publicClass;
        (): publicClass;
        [x: number]: publicClass;
        myMethod(): publicClass;
    }

    export class publicClassWithWithPrivateParmeterTypes {
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

    export class publicClassWithWithPublicParmeterTypes {
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

    class privateClassWithWithPrivateParmeterTypes {
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

    class privateClassWithWithPublicParmeterTypes {
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

    export function publicFunctionWithPrivateParmeterTypes(): privateClass { 
        return null;
    }
    export function publicFunctionWithPublicParmeterTypes(): publicClass {
        return null;
    }
    function privateFunctionWithPrivateParmeterTypes(): privateClass {
        return null;
    }
    function privateFunctionWithPublicParmeterTypes(): publicClass {
        return null;
    }
    export function publicFunctionWithPrivateParmeterTypes1() { 
        return new privateClass();
    }
    export function publicFunctionWithPublicParmeterTypes1() {
        return new publicClass();
    }
    function privateFunctionWithPrivateParmeterTypes1() {
        return new privateClass();
    }
    function privateFunctionWithPublicParmeterTypes1() {
        return new publicClass();
    }

    export declare function publicAmbientFunctionWithPrivateParmeterTypes(): privateClass; 
    export declare function publicAmbientFunctionWithPublicParmeterTypes(): publicClass;
    declare function privateAmbientFunctionWithPrivateParmeterTypes(): privateClass;
    declare function privateAmbientFunctionWithPublicParmeterTypes(): publicClass;

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
interface publicInterfaceWithPublicParmeterTypesInGlobal {
    new (): publicClassInGlobal;
    (): publicClassInGlobal;
    [x: number]: publicClassInGlobal;
    myMethod(): publicClassInGlobal;
}
class publicClassWithWithPublicParmeterTypesInGlobal {
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
function publicFunctionWithPublicParmeterTypesInGlobal(): publicClassInGlobal {
    return null;
}
function publicFunctionWithPublicParmeterTypesInGlobal1() {
    return new publicClassInGlobal();
}
declare function publicAmbientFunctionWithPublicParmeterTypesInGlobal(): publicClassInGlobal;

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
            new (): privateClass;
            (): privateClass;
            [x: number]: privateClass;
            myMethod(): privateClass;
        }

        export interface publicInterfaceWithPublicParmeterTypes {
            new (): publicClass;
            (): publicClass;
            [x: number]: publicClass;
            myMethod(): publicClass;
        }

        interface privateInterfaceWithPrivateParmeterTypes {
            new (): privateClass;
            (): privateClass;
            [x: number]: privateClass;
            myMethod(): privateClass;
        }

        interface privateInterfaceWithPublicParmeterTypes {
            new (): publicClass;
            (): publicClass;
            [x: number]: publicClass;
            myMethod(): publicClass;
        }

        export class publicClassWithWithPrivateParmeterTypes {
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

        export class publicClassWithWithPublicParmeterTypes {
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

        class privateClassWithWithPrivateParmeterTypes {
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

        class privateClassWithWithPublicParmeterTypes {
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

        export function publicFunctionWithPrivateParmeterTypes(): privateClass {
            return null;
        }
        export function publicFunctionWithPublicParmeterTypes(): publicClass {
            return null;
        }
        function privateFunctionWithPrivateParmeterTypes(): privateClass {
            return null;
        }
        function privateFunctionWithPublicParmeterTypes(): publicClass {
            return null;
        }
        export function publicFunctionWithPrivateParmeterTypes1() {
            return new privateClass();
        }
        export function publicFunctionWithPublicParmeterTypes1() {
            return new publicClass();
        }
        function privateFunctionWithPrivateParmeterTypes1() {
            return new privateClass();
        }
        function privateFunctionWithPublicParmeterTypes1() {
            return new publicClass();
        }

        export declare function publicAmbientFunctionWithPrivateParmeterTypes(): privateClass;
        export declare function publicAmbientFunctionWithPublicParmeterTypes(): publicClass;
        declare function privateAmbientFunctionWithPrivateParmeterTypes(): privateClass;
        declare function privateAmbientFunctionWithPublicParmeterTypes(): publicClass;

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

    export interface publicInterfaceWithPrivateParmeterTypes {
        new (): privateClass; // Error
        (): privateClass; // Error
        [x: number]: privateClass; // Error
        myMethod(): privateClass; // Error
    }

    export interface publicInterfaceWithPublicParmeterTypes {
        new (): publicClass;
        (): publicClass;
        [x: number]: publicClass;
        myMethod(): publicClass;
    }

    interface privateInterfaceWithPrivateParmeterTypes {
        new (): privateClass;
        (): privateClass;
        [x: number]: privateClass;
        myMethod(): privateClass;
    }

    interface privateInterfaceWithPublicParmeterTypes {
        new (): publicClass;
        (): publicClass;
        [x: number]: publicClass;
        myMethod(): publicClass;
    }

    export class publicClassWithWithPrivateParmeterTypes {
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

    export class publicClassWithWithPublicParmeterTypes {
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

    class privateClassWithWithPrivateParmeterTypes {
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

    class privateClassWithWithPublicParmeterTypes {
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

    export function publicFunctionWithPrivateParmeterTypes(): privateClass { // Error
        return null;
    }
    export function publicFunctionWithPublicParmeterTypes(): publicClass {
        return null;
    }
    function privateFunctionWithPrivateParmeterTypes(): privateClass {
        return null;
    }
    function privateFunctionWithPublicParmeterTypes(): publicClass {
        return null;
    }
    export function publicFunctionWithPrivateParmeterTypes1() { // Error
        return new privateClass();
    }
    export function publicFunctionWithPublicParmeterTypes1() {
        return new publicClass();
    }
    function privateFunctionWithPrivateParmeterTypes1() {
        return new privateClass();
    }
    function privateFunctionWithPublicParmeterTypes1() {
        return new publicClass();
    }

    export declare function publicAmbientFunctionWithPrivateParmeterTypes(): privateClass; // Error
    export declare function publicAmbientFunctionWithPublicParmeterTypes(): publicClass;
    declare function privateAmbientFunctionWithPrivateParmeterTypes(): privateClass;
    declare function privateAmbientFunctionWithPublicParmeterTypes(): publicClass;

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicModule = exports.publicClassWithPrivateModuleParameterTypes = exports.publicClassWithWithPublicParmeterTypes = exports.publicClassWithWithPrivateParmeterTypes = exports.publicClass = void 0;
exports.publicFunctionWithPrivateParmeterTypes = publicFunctionWithPrivateParmeterTypes;
exports.publicFunctionWithPublicParmeterTypes = publicFunctionWithPublicParmeterTypes;
exports.publicFunctionWithPrivateParmeterTypes1 = publicFunctionWithPrivateParmeterTypes1;
exports.publicFunctionWithPublicParmeterTypes1 = publicFunctionWithPublicParmeterTypes1;
exports.publicFunctionWithPrivateModuleParameterTypes = publicFunctionWithPrivateModuleParameterTypes;
exports.publicFunctionWithPrivateModuleParameterTypes1 = publicFunctionWithPrivateModuleParameterTypes1;
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
    function publicClassWithWithPrivateParmeterTypes() {
    }
    publicClassWithWithPrivateParmeterTypes.myPublicStaticMethod = function () {
        return null;
    };
    publicClassWithWithPrivateParmeterTypes.myPrivateStaticMethod = function () {
        return null;
    };
    publicClassWithWithPrivateParmeterTypes.prototype.myPublicMethod = function () {
        return null;
    };
    publicClassWithWithPrivateParmeterTypes.prototype.myPrivateMethod = function () {
        return null;
    };
    publicClassWithWithPrivateParmeterTypes.myPublicStaticMethod1 = function () {
        return new privateClass();
    };
    publicClassWithWithPrivateParmeterTypes.myPrivateStaticMethod1 = function () {
        return new privateClass();
    };
    publicClassWithWithPrivateParmeterTypes.prototype.myPublicMethod1 = function () {
        return new privateClass();
    };
    publicClassWithWithPrivateParmeterTypes.prototype.myPrivateMethod1 = function () {
        return new privateClass();
    };
    return publicClassWithWithPrivateParmeterTypes;
}());
exports.publicClassWithWithPrivateParmeterTypes = publicClassWithWithPrivateParmeterTypes;
var publicClassWithWithPublicParmeterTypes = /** @class */ (function () {
    function publicClassWithWithPublicParmeterTypes() {
    }
    publicClassWithWithPublicParmeterTypes.myPublicStaticMethod = function () {
        return null;
    };
    publicClassWithWithPublicParmeterTypes.myPrivateStaticMethod = function () {
        return null;
    };
    publicClassWithWithPublicParmeterTypes.prototype.myPublicMethod = function () {
        return null;
    };
    publicClassWithWithPublicParmeterTypes.prototype.myPrivateMethod = function () {
        return null;
    };
    publicClassWithWithPublicParmeterTypes.myPublicStaticMethod1 = function () {
        return new publicClass();
    };
    publicClassWithWithPublicParmeterTypes.myPrivateStaticMethod1 = function () {
        return new publicClass();
    };
    publicClassWithWithPublicParmeterTypes.prototype.myPublicMethod1 = function () {
        return new publicClass();
    };
    publicClassWithWithPublicParmeterTypes.prototype.myPrivateMethod1 = function () {
        return new publicClass();
    };
    return publicClassWithWithPublicParmeterTypes;
}());
exports.publicClassWithWithPublicParmeterTypes = publicClassWithWithPublicParmeterTypes;
var privateClassWithWithPrivateParmeterTypes = /** @class */ (function () {
    function privateClassWithWithPrivateParmeterTypes() {
    }
    privateClassWithWithPrivateParmeterTypes.myPublicStaticMethod = function () {
        return null;
    };
    privateClassWithWithPrivateParmeterTypes.myPrivateStaticMethod = function () {
        return null;
    };
    privateClassWithWithPrivateParmeterTypes.prototype.myPublicMethod = function () {
        return null;
    };
    privateClassWithWithPrivateParmeterTypes.prototype.myPrivateMethod = function () {
        return null;
    };
    privateClassWithWithPrivateParmeterTypes.myPublicStaticMethod1 = function () {
        return new privateClass();
    };
    privateClassWithWithPrivateParmeterTypes.myPrivateStaticMethod1 = function () {
        return new privateClass();
    };
    privateClassWithWithPrivateParmeterTypes.prototype.myPublicMethod1 = function () {
        return new privateClass();
    };
    privateClassWithWithPrivateParmeterTypes.prototype.myPrivateMethod1 = function () {
        return new privateClass();
    };
    return privateClassWithWithPrivateParmeterTypes;
}());
var privateClassWithWithPublicParmeterTypes = /** @class */ (function () {
    function privateClassWithWithPublicParmeterTypes() {
    }
    privateClassWithWithPublicParmeterTypes.myPublicStaticMethod = function () {
        return null;
    };
    privateClassWithWithPublicParmeterTypes.myPrivateStaticMethod = function () {
        return null;
    };
    privateClassWithWithPublicParmeterTypes.prototype.myPublicMethod = function () {
        return null;
    };
    privateClassWithWithPublicParmeterTypes.prototype.myPrivateMethod = function () {
        return null;
    };
    privateClassWithWithPublicParmeterTypes.myPublicStaticMethod1 = function () {
        return new publicClass();
    };
    privateClassWithWithPublicParmeterTypes.myPrivateStaticMethod1 = function () {
        return new publicClass();
    };
    privateClassWithWithPublicParmeterTypes.prototype.myPublicMethod1 = function () {
        return new publicClass();
    };
    privateClassWithWithPublicParmeterTypes.prototype.myPrivateMethod1 = function () {
        return new publicClass();
    };
    return privateClassWithWithPublicParmeterTypes;
}());
function publicFunctionWithPrivateParmeterTypes() {
    return null;
}
function publicFunctionWithPublicParmeterTypes() {
    return null;
}
function privateFunctionWithPrivateParmeterTypes() {
    return null;
}
function privateFunctionWithPublicParmeterTypes() {
    return null;
}
function publicFunctionWithPrivateParmeterTypes1() {
    return new privateClass();
}
function publicFunctionWithPublicParmeterTypes1() {
    return new publicClass();
}
function privateFunctionWithPrivateParmeterTypes1() {
    return new privateClass();
}
function privateFunctionWithPublicParmeterTypes1() {
    return new publicClass();
}
var publicClassWithPrivateModuleParameterTypes = /** @class */ (function () {
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
function publicFunctionWithPrivateModuleParameterTypes1() {
    return new privateModule.publicClass();
}
var privateClassWithPrivateModuleParameterTypes = /** @class */ (function () {
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
        function publicClassWithWithPrivateParmeterTypes() {
        }
        publicClassWithWithPrivateParmeterTypes.myPublicStaticMethod = function () {
            return null;
        };
        publicClassWithWithPrivateParmeterTypes.myPrivateStaticMethod = function () {
            return null;
        };
        publicClassWithWithPrivateParmeterTypes.prototype.myPublicMethod = function () {
            return null;
        };
        publicClassWithWithPrivateParmeterTypes.prototype.myPrivateMethod = function () {
            return null;
        };
        publicClassWithWithPrivateParmeterTypes.myPublicStaticMethod1 = function () {
            return new privateClass();
        };
        publicClassWithWithPrivateParmeterTypes.myPrivateStaticMethod1 = function () {
            return new privateClass();
        };
        publicClassWithWithPrivateParmeterTypes.prototype.myPublicMethod1 = function () {
            return new privateClass();
        };
        publicClassWithWithPrivateParmeterTypes.prototype.myPrivateMethod1 = function () {
            return new privateClass();
        };
        return publicClassWithWithPrivateParmeterTypes;
    }());
    publicModule.publicClassWithWithPrivateParmeterTypes = publicClassWithWithPrivateParmeterTypes;
    var publicClassWithWithPublicParmeterTypes = /** @class */ (function () {
        function publicClassWithWithPublicParmeterTypes() {
        }
        publicClassWithWithPublicParmeterTypes.myPublicStaticMethod = function () {
            return null;
        };
        publicClassWithWithPublicParmeterTypes.myPrivateStaticMethod = function () {
            return null;
        };
        publicClassWithWithPublicParmeterTypes.prototype.myPublicMethod = function () {
            return null;
        };
        publicClassWithWithPublicParmeterTypes.prototype.myPrivateMethod = function () {
            return null;
        };
        publicClassWithWithPublicParmeterTypes.myPublicStaticMethod1 = function () {
            return new publicClass();
        };
        publicClassWithWithPublicParmeterTypes.myPrivateStaticMethod1 = function () {
            return new publicClass();
        };
        publicClassWithWithPublicParmeterTypes.prototype.myPublicMethod1 = function () {
            return new publicClass();
        };
        publicClassWithWithPublicParmeterTypes.prototype.myPrivateMethod1 = function () {
            return new publicClass();
        };
        return publicClassWithWithPublicParmeterTypes;
    }());
    publicModule.publicClassWithWithPublicParmeterTypes = publicClassWithWithPublicParmeterTypes;
    var privateClassWithWithPrivateParmeterTypes = /** @class */ (function () {
        function privateClassWithWithPrivateParmeterTypes() {
        }
        privateClassWithWithPrivateParmeterTypes.myPublicStaticMethod = function () {
            return null;
        };
        privateClassWithWithPrivateParmeterTypes.myPrivateStaticMethod = function () {
            return null;
        };
        privateClassWithWithPrivateParmeterTypes.prototype.myPublicMethod = function () {
            return null;
        };
        privateClassWithWithPrivateParmeterTypes.prototype.myPrivateMethod = function () {
            return null;
        };
        privateClassWithWithPrivateParmeterTypes.myPublicStaticMethod1 = function () {
            return new privateClass();
        };
        privateClassWithWithPrivateParmeterTypes.myPrivateStaticMethod1 = function () {
            return new privateClass();
        };
        privateClassWithWithPrivateParmeterTypes.prototype.myPublicMethod1 = function () {
            return new privateClass();
        };
        privateClassWithWithPrivateParmeterTypes.prototype.myPrivateMethod1 = function () {
            return new privateClass();
        };
        return privateClassWithWithPrivateParmeterTypes;
    }());
    var privateClassWithWithPublicParmeterTypes = /** @class */ (function () {
        function privateClassWithWithPublicParmeterTypes() {
        }
        privateClassWithWithPublicParmeterTypes.myPublicStaticMethod = function () {
            return null;
        };
        privateClassWithWithPublicParmeterTypes.myPrivateStaticMethod = function () {
            return null;
        };
        privateClassWithWithPublicParmeterTypes.prototype.myPublicMethod = function () {
            return null;
        };
        privateClassWithWithPublicParmeterTypes.prototype.myPrivateMethod = function () {
            return null;
        };
        privateClassWithWithPublicParmeterTypes.myPublicStaticMethod1 = function () {
            return new publicClass();
        };
        privateClassWithWithPublicParmeterTypes.myPrivateStaticMethod1 = function () {
            return new publicClass();
        };
        privateClassWithWithPublicParmeterTypes.prototype.myPublicMethod1 = function () {
            return new publicClass();
        };
        privateClassWithWithPublicParmeterTypes.prototype.myPrivateMethod1 = function () {
            return new publicClass();
        };
        return privateClassWithWithPublicParmeterTypes;
    }());
    function publicFunctionWithPrivateParmeterTypes() {
        return null;
    }
    publicModule.publicFunctionWithPrivateParmeterTypes = publicFunctionWithPrivateParmeterTypes;
    function publicFunctionWithPublicParmeterTypes() {
        return null;
    }
    publicModule.publicFunctionWithPublicParmeterTypes = publicFunctionWithPublicParmeterTypes;
    function privateFunctionWithPrivateParmeterTypes() {
        return null;
    }
    function privateFunctionWithPublicParmeterTypes() {
        return null;
    }
    function publicFunctionWithPrivateParmeterTypes1() {
        return new privateClass();
    }
    publicModule.publicFunctionWithPrivateParmeterTypes1 = publicFunctionWithPrivateParmeterTypes1;
    function publicFunctionWithPublicParmeterTypes1() {
        return new publicClass();
    }
    publicModule.publicFunctionWithPublicParmeterTypes1 = publicFunctionWithPublicParmeterTypes1;
    function privateFunctionWithPrivateParmeterTypes1() {
        return new privateClass();
    }
    function privateFunctionWithPublicParmeterTypes1() {
        return new publicClass();
    }
    var publicClassWithPrivateModuleParameterTypes = /** @class */ (function () {
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
    var privateClassWithPrivateModuleParameterTypes = /** @class */ (function () {
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
})(publicModule || (exports.publicModule = publicModule = {}));
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
        function publicClassWithWithPrivateParmeterTypes() {
        }
        publicClassWithWithPrivateParmeterTypes.myPublicStaticMethod = function () {
            return null;
        };
        publicClassWithWithPrivateParmeterTypes.myPrivateStaticMethod = function () {
            return null;
        };
        publicClassWithWithPrivateParmeterTypes.prototype.myPublicMethod = function () {
            return null;
        };
        publicClassWithWithPrivateParmeterTypes.prototype.myPrivateMethod = function () {
            return null;
        };
        publicClassWithWithPrivateParmeterTypes.myPublicStaticMethod1 = function () {
            return new privateClass();
        };
        publicClassWithWithPrivateParmeterTypes.myPrivateStaticMethod1 = function () {
            return new privateClass();
        };
        publicClassWithWithPrivateParmeterTypes.prototype.myPublicMethod1 = function () {
            return new privateClass();
        };
        publicClassWithWithPrivateParmeterTypes.prototype.myPrivateMethod1 = function () {
            return new privateClass();
        };
        return publicClassWithWithPrivateParmeterTypes;
    }());
    privateModule.publicClassWithWithPrivateParmeterTypes = publicClassWithWithPrivateParmeterTypes;
    var publicClassWithWithPublicParmeterTypes = /** @class */ (function () {
        function publicClassWithWithPublicParmeterTypes() {
        }
        publicClassWithWithPublicParmeterTypes.myPublicStaticMethod = function () {
            return null;
        };
        publicClassWithWithPublicParmeterTypes.myPrivateStaticMethod = function () {
            return null;
        };
        publicClassWithWithPublicParmeterTypes.prototype.myPublicMethod = function () {
            return null;
        };
        publicClassWithWithPublicParmeterTypes.prototype.myPrivateMethod = function () {
            return null;
        };
        publicClassWithWithPublicParmeterTypes.myPublicStaticMethod1 = function () {
            return new publicClass();
        };
        publicClassWithWithPublicParmeterTypes.myPrivateStaticMethod1 = function () {
            return new publicClass();
        };
        publicClassWithWithPublicParmeterTypes.prototype.myPublicMethod1 = function () {
            return new publicClass();
        };
        publicClassWithWithPublicParmeterTypes.prototype.myPrivateMethod1 = function () {
            return new publicClass();
        };
        return publicClassWithWithPublicParmeterTypes;
    }());
    privateModule.publicClassWithWithPublicParmeterTypes = publicClassWithWithPublicParmeterTypes;
    var privateClassWithWithPrivateParmeterTypes = /** @class */ (function () {
        function privateClassWithWithPrivateParmeterTypes() {
        }
        privateClassWithWithPrivateParmeterTypes.myPublicStaticMethod = function () {
            return null;
        };
        privateClassWithWithPrivateParmeterTypes.myPrivateStaticMethod = function () {
            return null;
        };
        privateClassWithWithPrivateParmeterTypes.prototype.myPublicMethod = function () {
            return null;
        };
        privateClassWithWithPrivateParmeterTypes.prototype.myPrivateMethod = function () {
            return null;
        };
        privateClassWithWithPrivateParmeterTypes.myPublicStaticMethod1 = function () {
            return new privateClass();
        };
        privateClassWithWithPrivateParmeterTypes.myPrivateStaticMethod1 = function () {
            return new privateClass();
        };
        privateClassWithWithPrivateParmeterTypes.prototype.myPublicMethod1 = function () {
            return new privateClass();
        };
        privateClassWithWithPrivateParmeterTypes.prototype.myPrivateMethod1 = function () {
            return new privateClass();
        };
        return privateClassWithWithPrivateParmeterTypes;
    }());
    var privateClassWithWithPublicParmeterTypes = /** @class */ (function () {
        function privateClassWithWithPublicParmeterTypes() {
        }
        privateClassWithWithPublicParmeterTypes.myPublicStaticMethod = function () {
            return null;
        };
        privateClassWithWithPublicParmeterTypes.myPrivateStaticMethod = function () {
            return null;
        };
        privateClassWithWithPublicParmeterTypes.prototype.myPublicMethod = function () {
            return null;
        };
        privateClassWithWithPublicParmeterTypes.prototype.myPrivateMethod = function () {
            return null;
        };
        privateClassWithWithPublicParmeterTypes.myPublicStaticMethod1 = function () {
            return new publicClass();
        };
        privateClassWithWithPublicParmeterTypes.myPrivateStaticMethod1 = function () {
            return new publicClass();
        };
        privateClassWithWithPublicParmeterTypes.prototype.myPublicMethod1 = function () {
            return new publicClass();
        };
        privateClassWithWithPublicParmeterTypes.prototype.myPrivateMethod1 = function () {
            return new publicClass();
        };
        return privateClassWithWithPublicParmeterTypes;
    }());
    function publicFunctionWithPrivateParmeterTypes() {
        return null;
    }
    privateModule.publicFunctionWithPrivateParmeterTypes = publicFunctionWithPrivateParmeterTypes;
    function publicFunctionWithPublicParmeterTypes() {
        return null;
    }
    privateModule.publicFunctionWithPublicParmeterTypes = publicFunctionWithPublicParmeterTypes;
    function privateFunctionWithPrivateParmeterTypes() {
        return null;
    }
    function privateFunctionWithPublicParmeterTypes() {
        return null;
    }
    function publicFunctionWithPrivateParmeterTypes1() {
        return new privateClass();
    }
    privateModule.publicFunctionWithPrivateParmeterTypes1 = publicFunctionWithPrivateParmeterTypes1;
    function publicFunctionWithPublicParmeterTypes1() {
        return new publicClass();
    }
    privateModule.publicFunctionWithPublicParmeterTypes1 = publicFunctionWithPublicParmeterTypes1;
    function privateFunctionWithPrivateParmeterTypes1() {
        return new privateClass();
    }
    function privateFunctionWithPublicParmeterTypes1() {
        return new publicClass();
    }
    var publicClassWithPrivateModuleParameterTypes = /** @class */ (function () {
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
    var privateClassWithPrivateModuleParameterTypes = /** @class */ (function () {
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
var publicClassInGlobal = /** @class */ (function () {
    function publicClassInGlobal() {
    }
    return publicClassInGlobal;
}());
var publicClassWithWithPublicParmeterTypesInGlobal = /** @class */ (function () {
    function publicClassWithWithPublicParmeterTypesInGlobal() {
    }
    publicClassWithWithPublicParmeterTypesInGlobal.myPublicStaticMethod = function () {
        return null;
    };
    publicClassWithWithPublicParmeterTypesInGlobal.myPrivateStaticMethod = function () {
        return null;
    };
    publicClassWithWithPublicParmeterTypesInGlobal.prototype.myPublicMethod = function () {
        return null;
    };
    publicClassWithWithPublicParmeterTypesInGlobal.prototype.myPrivateMethod = function () {
        return null;
    };
    publicClassWithWithPublicParmeterTypesInGlobal.myPublicStaticMethod1 = function () {
        return new publicClassInGlobal();
    };
    publicClassWithWithPublicParmeterTypesInGlobal.myPrivateStaticMethod1 = function () {
        return new publicClassInGlobal();
    };
    publicClassWithWithPublicParmeterTypesInGlobal.prototype.myPublicMethod1 = function () {
        return new publicClassInGlobal();
    };
    publicClassWithWithPublicParmeterTypesInGlobal.prototype.myPrivateMethod1 = function () {
        return new publicClassInGlobal();
    };
    return publicClassWithWithPublicParmeterTypesInGlobal;
}());
function publicFunctionWithPublicParmeterTypesInGlobal() {
    return null;
}
function publicFunctionWithPublicParmeterTypesInGlobal1() {
    return new publicClassInGlobal();
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
            function publicClassWithWithPrivateParmeterTypes() {
            }
            publicClassWithWithPrivateParmeterTypes.myPublicStaticMethod = function () {
                return null;
            };
            publicClassWithWithPrivateParmeterTypes.myPrivateStaticMethod = function () {
                return null;
            };
            publicClassWithWithPrivateParmeterTypes.prototype.myPublicMethod = function () {
                return null;
            };
            publicClassWithWithPrivateParmeterTypes.prototype.myPrivateMethod = function () {
                return null;
            };
            publicClassWithWithPrivateParmeterTypes.myPublicStaticMethod1 = function () {
                return new privateClass();
            };
            publicClassWithWithPrivateParmeterTypes.myPrivateStaticMethod1 = function () {
                return new privateClass();
            };
            publicClassWithWithPrivateParmeterTypes.prototype.myPublicMethod1 = function () {
                return new privateClass();
            };
            publicClassWithWithPrivateParmeterTypes.prototype.myPrivateMethod1 = function () {
                return new privateClass();
            };
            return publicClassWithWithPrivateParmeterTypes;
        }());
        privateModule.publicClassWithWithPrivateParmeterTypes = publicClassWithWithPrivateParmeterTypes;
        var publicClassWithWithPublicParmeterTypes = /** @class */ (function () {
            function publicClassWithWithPublicParmeterTypes() {
            }
            publicClassWithWithPublicParmeterTypes.myPublicStaticMethod = function () {
                return null;
            };
            publicClassWithWithPublicParmeterTypes.myPrivateStaticMethod = function () {
                return null;
            };
            publicClassWithWithPublicParmeterTypes.prototype.myPublicMethod = function () {
                return null;
            };
            publicClassWithWithPublicParmeterTypes.prototype.myPrivateMethod = function () {
                return null;
            };
            publicClassWithWithPublicParmeterTypes.myPublicStaticMethod1 = function () {
                return new publicClass();
            };
            publicClassWithWithPublicParmeterTypes.myPrivateStaticMethod1 = function () {
                return new publicClass();
            };
            publicClassWithWithPublicParmeterTypes.prototype.myPublicMethod1 = function () {
                return new publicClass();
            };
            publicClassWithWithPublicParmeterTypes.prototype.myPrivateMethod1 = function () {
                return new publicClass();
            };
            return publicClassWithWithPublicParmeterTypes;
        }());
        privateModule.publicClassWithWithPublicParmeterTypes = publicClassWithWithPublicParmeterTypes;
        var privateClassWithWithPrivateParmeterTypes = /** @class */ (function () {
            function privateClassWithWithPrivateParmeterTypes() {
            }
            privateClassWithWithPrivateParmeterTypes.myPublicStaticMethod = function () {
                return null;
            };
            privateClassWithWithPrivateParmeterTypes.myPrivateStaticMethod = function () {
                return null;
            };
            privateClassWithWithPrivateParmeterTypes.prototype.myPublicMethod = function () {
                return null;
            };
            privateClassWithWithPrivateParmeterTypes.prototype.myPrivateMethod = function () {
                return null;
            };
            privateClassWithWithPrivateParmeterTypes.myPublicStaticMethod1 = function () {
                return new privateClass();
            };
            privateClassWithWithPrivateParmeterTypes.myPrivateStaticMethod1 = function () {
                return new privateClass();
            };
            privateClassWithWithPrivateParmeterTypes.prototype.myPublicMethod1 = function () {
                return new privateClass();
            };
            privateClassWithWithPrivateParmeterTypes.prototype.myPrivateMethod1 = function () {
                return new privateClass();
            };
            return privateClassWithWithPrivateParmeterTypes;
        }());
        var privateClassWithWithPublicParmeterTypes = /** @class */ (function () {
            function privateClassWithWithPublicParmeterTypes() {
            }
            privateClassWithWithPublicParmeterTypes.myPublicStaticMethod = function () {
                return null;
            };
            privateClassWithWithPublicParmeterTypes.myPrivateStaticMethod = function () {
                return null;
            };
            privateClassWithWithPublicParmeterTypes.prototype.myPublicMethod = function () {
                return null;
            };
            privateClassWithWithPublicParmeterTypes.prototype.myPrivateMethod = function () {
                return null;
            };
            privateClassWithWithPublicParmeterTypes.myPublicStaticMethod1 = function () {
                return new publicClass();
            };
            privateClassWithWithPublicParmeterTypes.myPrivateStaticMethod1 = function () {
                return new publicClass();
            };
            privateClassWithWithPublicParmeterTypes.prototype.myPublicMethod1 = function () {
                return new publicClass();
            };
            privateClassWithWithPublicParmeterTypes.prototype.myPrivateMethod1 = function () {
                return new publicClass();
            };
            return privateClassWithWithPublicParmeterTypes;
        }());
        function publicFunctionWithPrivateParmeterTypes() {
            return null;
        }
        privateModule.publicFunctionWithPrivateParmeterTypes = publicFunctionWithPrivateParmeterTypes;
        function publicFunctionWithPublicParmeterTypes() {
            return null;
        }
        privateModule.publicFunctionWithPublicParmeterTypes = publicFunctionWithPublicParmeterTypes;
        function privateFunctionWithPrivateParmeterTypes() {
            return null;
        }
        function privateFunctionWithPublicParmeterTypes() {
            return null;
        }
        function publicFunctionWithPrivateParmeterTypes1() {
            return new privateClass();
        }
        privateModule.publicFunctionWithPrivateParmeterTypes1 = publicFunctionWithPrivateParmeterTypes1;
        function publicFunctionWithPublicParmeterTypes1() {
            return new publicClass();
        }
        privateModule.publicFunctionWithPublicParmeterTypes1 = publicFunctionWithPublicParmeterTypes1;
        function privateFunctionWithPrivateParmeterTypes1() {
            return new privateClass();
        }
        function privateFunctionWithPublicParmeterTypes1() {
            return new publicClass();
        }
        var publicClassWithPrivateModuleParameterTypes = /** @class */ (function () {
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
        var privateClassWithPrivateModuleParameterTypes = /** @class */ (function () {
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
    var publicClassWithWithPrivateParmeterTypes = /** @class */ (function () {
        function publicClassWithWithPrivateParmeterTypes() {
        }
        publicClassWithWithPrivateParmeterTypes.myPublicStaticMethod = function () {
            return null;
        };
        publicClassWithWithPrivateParmeterTypes.myPrivateStaticMethod = function () {
            return null;
        };
        publicClassWithWithPrivateParmeterTypes.prototype.myPublicMethod = function () {
            return null;
        };
        publicClassWithWithPrivateParmeterTypes.prototype.myPrivateMethod = function () {
            return null;
        };
        publicClassWithWithPrivateParmeterTypes.myPublicStaticMethod1 = function () {
            return new privateClass();
        };
        publicClassWithWithPrivateParmeterTypes.myPrivateStaticMethod1 = function () {
            return new privateClass();
        };
        publicClassWithWithPrivateParmeterTypes.prototype.myPublicMethod1 = function () {
            return new privateClass();
        };
        publicClassWithWithPrivateParmeterTypes.prototype.myPrivateMethod1 = function () {
            return new privateClass();
        };
        return publicClassWithWithPrivateParmeterTypes;
    }());
    publicModuleInGlobal.publicClassWithWithPrivateParmeterTypes = publicClassWithWithPrivateParmeterTypes;
    var publicClassWithWithPublicParmeterTypes = /** @class */ (function () {
        function publicClassWithWithPublicParmeterTypes() {
        }
        publicClassWithWithPublicParmeterTypes.myPublicStaticMethod = function () {
            return null;
        };
        publicClassWithWithPublicParmeterTypes.myPrivateStaticMethod = function () {
            return null;
        };
        publicClassWithWithPublicParmeterTypes.prototype.myPublicMethod = function () {
            return null;
        };
        publicClassWithWithPublicParmeterTypes.prototype.myPrivateMethod = function () {
            return null;
        };
        publicClassWithWithPublicParmeterTypes.myPublicStaticMethod1 = function () {
            return new publicClass();
        };
        publicClassWithWithPublicParmeterTypes.myPrivateStaticMethod1 = function () {
            return new publicClass();
        };
        publicClassWithWithPublicParmeterTypes.prototype.myPublicMethod1 = function () {
            return new publicClass();
        };
        publicClassWithWithPublicParmeterTypes.prototype.myPrivateMethod1 = function () {
            return new publicClass();
        };
        return publicClassWithWithPublicParmeterTypes;
    }());
    publicModuleInGlobal.publicClassWithWithPublicParmeterTypes = publicClassWithWithPublicParmeterTypes;
    var privateClassWithWithPrivateParmeterTypes = /** @class */ (function () {
        function privateClassWithWithPrivateParmeterTypes() {
        }
        privateClassWithWithPrivateParmeterTypes.myPublicStaticMethod = function () {
            return null;
        };
        privateClassWithWithPrivateParmeterTypes.myPrivateStaticMethod = function () {
            return null;
        };
        privateClassWithWithPrivateParmeterTypes.prototype.myPublicMethod = function () {
            return null;
        };
        privateClassWithWithPrivateParmeterTypes.prototype.myPrivateMethod = function () {
            return null;
        };
        privateClassWithWithPrivateParmeterTypes.myPublicStaticMethod1 = function () {
            return new privateClass();
        };
        privateClassWithWithPrivateParmeterTypes.myPrivateStaticMethod1 = function () {
            return new privateClass();
        };
        privateClassWithWithPrivateParmeterTypes.prototype.myPublicMethod1 = function () {
            return new privateClass();
        };
        privateClassWithWithPrivateParmeterTypes.prototype.myPrivateMethod1 = function () {
            return new privateClass();
        };
        return privateClassWithWithPrivateParmeterTypes;
    }());
    var privateClassWithWithPublicParmeterTypes = /** @class */ (function () {
        function privateClassWithWithPublicParmeterTypes() {
        }
        privateClassWithWithPublicParmeterTypes.myPublicStaticMethod = function () {
            return null;
        };
        privateClassWithWithPublicParmeterTypes.myPrivateStaticMethod = function () {
            return null;
        };
        privateClassWithWithPublicParmeterTypes.prototype.myPublicMethod = function () {
            return null;
        };
        privateClassWithWithPublicParmeterTypes.prototype.myPrivateMethod = function () {
            return null;
        };
        privateClassWithWithPublicParmeterTypes.myPublicStaticMethod1 = function () {
            return new publicClass();
        };
        privateClassWithWithPublicParmeterTypes.myPrivateStaticMethod1 = function () {
            return new publicClass();
        };
        privateClassWithWithPublicParmeterTypes.prototype.myPublicMethod1 = function () {
            return new publicClass();
        };
        privateClassWithWithPublicParmeterTypes.prototype.myPrivateMethod1 = function () {
            return new publicClass();
        };
        return privateClassWithWithPublicParmeterTypes;
    }());
    function publicFunctionWithPrivateParmeterTypes() {
        return null;
    }
    publicModuleInGlobal.publicFunctionWithPrivateParmeterTypes = publicFunctionWithPrivateParmeterTypes;
    function publicFunctionWithPublicParmeterTypes() {
        return null;
    }
    publicModuleInGlobal.publicFunctionWithPublicParmeterTypes = publicFunctionWithPublicParmeterTypes;
    function privateFunctionWithPrivateParmeterTypes() {
        return null;
    }
    function privateFunctionWithPublicParmeterTypes() {
        return null;
    }
    function publicFunctionWithPrivateParmeterTypes1() {
        return new privateClass();
    }
    publicModuleInGlobal.publicFunctionWithPrivateParmeterTypes1 = publicFunctionWithPrivateParmeterTypes1;
    function publicFunctionWithPublicParmeterTypes1() {
        return new publicClass();
    }
    publicModuleInGlobal.publicFunctionWithPublicParmeterTypes1 = publicFunctionWithPublicParmeterTypes1;
    function privateFunctionWithPrivateParmeterTypes1() {
        return new privateClass();
    }
    function privateFunctionWithPublicParmeterTypes1() {
        return new publicClass();
    }
    var publicClassWithPrivateModuleParameterTypes = /** @class */ (function () {
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
    var privateClassWithPrivateModuleParameterTypes = /** @class */ (function () {
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


//// [privacyFunctionReturnTypeDeclFile_externalModule.d.ts]
declare class privateClass {
}
export declare class publicClass {
}
export interface publicInterfaceWithPrivateParmeterTypes {
    new (): privateClass;
    (): privateClass;
    [x: number]: privateClass;
    myMethod(): privateClass;
}
export interface publicInterfaceWithPublicParmeterTypes {
    new (): publicClass;
    (): publicClass;
    [x: number]: publicClass;
    myMethod(): publicClass;
}
export declare class publicClassWithWithPrivateParmeterTypes {
    static myPublicStaticMethod(): privateClass;
    private static myPrivateStaticMethod;
    myPublicMethod(): privateClass;
    private myPrivateMethod;
    static myPublicStaticMethod1(): privateClass;
    private static myPrivateStaticMethod1;
    myPublicMethod1(): privateClass;
    private myPrivateMethod1;
}
export declare class publicClassWithWithPublicParmeterTypes {
    static myPublicStaticMethod(): publicClass;
    private static myPrivateStaticMethod;
    myPublicMethod(): publicClass;
    private myPrivateMethod;
    static myPublicStaticMethod1(): publicClass;
    private static myPrivateStaticMethod1;
    myPublicMethod1(): publicClass;
    private myPrivateMethod1;
}
export declare function publicFunctionWithPrivateParmeterTypes(): privateClass;
export declare function publicFunctionWithPublicParmeterTypes(): publicClass;
export declare function publicFunctionWithPrivateParmeterTypes1(): privateClass;
export declare function publicFunctionWithPublicParmeterTypes1(): publicClass;
export declare function publicAmbientFunctionWithPrivateParmeterTypes(): privateClass;
export declare function publicAmbientFunctionWithPublicParmeterTypes(): publicClass;
export interface publicInterfaceWithPrivateModuleParameterTypes {
    new (): privateModule.publicClass;
    (): privateModule.publicClass;
    [x: number]: privateModule.publicClass;
    myMethod(): privateModule.publicClass;
}
export declare class publicClassWithPrivateModuleParameterTypes {
    static myPublicStaticMethod(): privateModule.publicClass;
    myPublicMethod(): privateModule.publicClass;
    static myPublicStaticMethod1(): privateModule.publicClass;
    myPublicMethod1(): privateModule.publicClass;
}
export declare function publicFunctionWithPrivateModuleParameterTypes(): privateModule.publicClass;
export declare function publicFunctionWithPrivateModuleParameterTypes1(): privateModule.publicClass;
export declare function publicAmbientFunctionWithPrivateModuleParameterTypes(): privateModule.publicClass;
export declare namespace publicModule {
    class privateClass {
    }
    export class publicClass {
    }
    export interface publicInterfaceWithPrivateParmeterTypes {
        new (): privateClass;
        (): privateClass;
        [x: number]: privateClass;
        myMethod(): privateClass;
    }
    export interface publicInterfaceWithPublicParmeterTypes {
        new (): publicClass;
        (): publicClass;
        [x: number]: publicClass;
        myMethod(): publicClass;
    }
    export class publicClassWithWithPrivateParmeterTypes {
        static myPublicStaticMethod(): privateClass;
        private static myPrivateStaticMethod;
        myPublicMethod(): privateClass;
        private myPrivateMethod;
        static myPublicStaticMethod1(): privateClass;
        private static myPrivateStaticMethod1;
        myPublicMethod1(): privateClass;
        private myPrivateMethod1;
    }
    export class publicClassWithWithPublicParmeterTypes {
        static myPublicStaticMethod(): publicClass;
        private static myPrivateStaticMethod;
        myPublicMethod(): publicClass;
        private myPrivateMethod;
        static myPublicStaticMethod1(): publicClass;
        private static myPrivateStaticMethod1;
        myPublicMethod1(): publicClass;
        private myPrivateMethod1;
    }
    export function publicFunctionWithPrivateParmeterTypes(): privateClass;
    export function publicFunctionWithPublicParmeterTypes(): publicClass;
    export function publicFunctionWithPrivateParmeterTypes1(): privateClass;
    export function publicFunctionWithPublicParmeterTypes1(): publicClass;
    export function publicAmbientFunctionWithPrivateParmeterTypes(): privateClass;
    export function publicAmbientFunctionWithPublicParmeterTypes(): publicClass;
    export interface publicInterfaceWithPrivateModuleParameterTypes {
        new (): privateModule.publicClass;
        (): privateModule.publicClass;
        [x: number]: privateModule.publicClass;
        myMethod(): privateModule.publicClass;
    }
    export class publicClassWithPrivateModuleParameterTypes {
        static myPublicStaticMethod(): privateModule.publicClass;
        myPublicMethod(): privateModule.publicClass;
        static myPublicStaticMethod1(): privateModule.publicClass;
        myPublicMethod1(): privateModule.publicClass;
    }
    export function publicFunctionWithPrivateModuleParameterTypes(): privateModule.publicClass;
    export function publicFunctionWithPrivateModuleParameterTypes1(): privateModule.publicClass;
    export function publicAmbientFunctionWithPrivateModuleParameterTypes(): privateModule.publicClass;
    export {};
}
declare namespace privateModule {
    class privateClass {
    }
    export class publicClass {
    }
    export interface publicInterfaceWithPrivateParmeterTypes {
        new (): privateClass;
        (): privateClass;
        [x: number]: privateClass;
        myMethod(): privateClass;
    }
    export interface publicInterfaceWithPublicParmeterTypes {
        new (): publicClass;
        (): publicClass;
        [x: number]: publicClass;
        myMethod(): publicClass;
    }
    export class publicClassWithWithPrivateParmeterTypes {
        static myPublicStaticMethod(): privateClass;
        private static myPrivateStaticMethod;
        myPublicMethod(): privateClass;
        private myPrivateMethod;
        static myPublicStaticMethod1(): privateClass;
        private static myPrivateStaticMethod1;
        myPublicMethod1(): privateClass;
        private myPrivateMethod1;
    }
    export class publicClassWithWithPublicParmeterTypes {
        static myPublicStaticMethod(): publicClass;
        private static myPrivateStaticMethod;
        myPublicMethod(): publicClass;
        private myPrivateMethod;
        static myPublicStaticMethod1(): publicClass;
        private static myPrivateStaticMethod1;
        myPublicMethod1(): publicClass;
        private myPrivateMethod1;
    }
    export function publicFunctionWithPrivateParmeterTypes(): privateClass;
    export function publicFunctionWithPublicParmeterTypes(): publicClass;
    export function publicFunctionWithPrivateParmeterTypes1(): privateClass;
    export function publicFunctionWithPublicParmeterTypes1(): publicClass;
    export function publicAmbientFunctionWithPrivateParmeterTypes(): privateClass;
    export function publicAmbientFunctionWithPublicParmeterTypes(): publicClass;
    export interface publicInterfaceWithPrivateModuleParameterTypes {
        new (): privateModule.publicClass;
        (): privateModule.publicClass;
        [x: number]: privateModule.publicClass;
        myMethod(): privateModule.publicClass;
    }
    export class publicClassWithPrivateModuleParameterTypes {
        static myPublicStaticMethod(): privateModule.publicClass;
        myPublicMethod(): privateModule.publicClass;
        static myPublicStaticMethod1(): publicClass;
        myPublicMethod1(): publicClass;
    }
    export function publicFunctionWithPrivateModuleParameterTypes(): privateModule.publicClass;
    export function publicFunctionWithPrivateModuleParameterTypes1(): publicClass;
    export function publicAmbientFunctionWithPrivateModuleParameterTypes(): privateModule.publicClass;
    export {};
}
export {};
//// [privacyFunctionReturnTypeDeclFile_GlobalFile.d.ts]
declare class publicClassInGlobal {
}
interface publicInterfaceWithPublicParmeterTypesInGlobal {
    new (): publicClassInGlobal;
    (): publicClassInGlobal;
    [x: number]: publicClassInGlobal;
    myMethod(): publicClassInGlobal;
}
declare class publicClassWithWithPublicParmeterTypesInGlobal {
    static myPublicStaticMethod(): publicClassInGlobal;
    private static myPrivateStaticMethod;
    myPublicMethod(): publicClassInGlobal;
    private myPrivateMethod;
    static myPublicStaticMethod1(): publicClassInGlobal;
    private static myPrivateStaticMethod1;
    myPublicMethod1(): publicClassInGlobal;
    private myPrivateMethod1;
}
declare function publicFunctionWithPublicParmeterTypesInGlobal(): publicClassInGlobal;
declare function publicFunctionWithPublicParmeterTypesInGlobal1(): publicClassInGlobal;
declare function publicAmbientFunctionWithPublicParmeterTypesInGlobal(): publicClassInGlobal;
declare namespace publicModuleInGlobal {
    class privateClass {
    }
    export class publicClass {
    }
    namespace privateModule {
        class privateClass {
        }
        export class publicClass {
        }
        export interface publicInterfaceWithPrivateParmeterTypes {
            new (): privateClass;
            (): privateClass;
            [x: number]: privateClass;
            myMethod(): privateClass;
        }
        export interface publicInterfaceWithPublicParmeterTypes {
            new (): publicClass;
            (): publicClass;
            [x: number]: publicClass;
            myMethod(): publicClass;
        }
        export class publicClassWithWithPrivateParmeterTypes {
            static myPublicStaticMethod(): privateClass;
            private static myPrivateStaticMethod;
            myPublicMethod(): privateClass;
            private myPrivateMethod;
            static myPublicStaticMethod1(): privateClass;
            private static myPrivateStaticMethod1;
            myPublicMethod1(): privateClass;
            private myPrivateMethod1;
        }
        export class publicClassWithWithPublicParmeterTypes {
            static myPublicStaticMethod(): publicClass;
            private static myPrivateStaticMethod;
            myPublicMethod(): publicClass;
            private myPrivateMethod;
            static myPublicStaticMethod1(): publicClass;
            private static myPrivateStaticMethod1;
            myPublicMethod1(): publicClass;
            private myPrivateMethod1;
        }
        export function publicFunctionWithPrivateParmeterTypes(): privateClass;
        export function publicFunctionWithPublicParmeterTypes(): publicClass;
        export function publicFunctionWithPrivateParmeterTypes1(): privateClass;
        export function publicFunctionWithPublicParmeterTypes1(): publicClass;
        export function publicAmbientFunctionWithPrivateParmeterTypes(): privateClass;
        export function publicAmbientFunctionWithPublicParmeterTypes(): publicClass;
        export interface publicInterfaceWithPrivateModuleParameterTypes {
            new (): privateModule.publicClass;
            (): privateModule.publicClass;
            [x: number]: privateModule.publicClass;
            myMethod(): privateModule.publicClass;
        }
        export class publicClassWithPrivateModuleParameterTypes {
            static myPublicStaticMethod(): privateModule.publicClass;
            myPublicMethod(): privateModule.publicClass;
            static myPublicStaticMethod1(): publicClass;
            myPublicMethod1(): publicClass;
        }
        export function publicFunctionWithPrivateModuleParameterTypes(): privateModule.publicClass;
        export function publicFunctionWithPrivateModuleParameterTypes1(): publicClass;
        export function publicAmbientFunctionWithPrivateModuleParameterTypes(): privateModule.publicClass;
        export {};
    }
    export interface publicInterfaceWithPrivateParmeterTypes {
        new (): privateClass;
        (): privateClass;
        [x: number]: privateClass;
        myMethod(): privateClass;
    }
    export interface publicInterfaceWithPublicParmeterTypes {
        new (): publicClass;
        (): publicClass;
        [x: number]: publicClass;
        myMethod(): publicClass;
    }
    export class publicClassWithWithPrivateParmeterTypes {
        static myPublicStaticMethod(): privateClass;
        private static myPrivateStaticMethod;
        myPublicMethod(): privateClass;
        private myPrivateMethod;
        static myPublicStaticMethod1(): privateClass;
        private static myPrivateStaticMethod1;
        myPublicMethod1(): privateClass;
        private myPrivateMethod1;
    }
    export class publicClassWithWithPublicParmeterTypes {
        static myPublicStaticMethod(): publicClass;
        private static myPrivateStaticMethod;
        myPublicMethod(): publicClass;
        private myPrivateMethod;
        static myPublicStaticMethod1(): publicClass;
        private static myPrivateStaticMethod1;
        myPublicMethod1(): publicClass;
        private myPrivateMethod1;
    }
    export function publicFunctionWithPrivateParmeterTypes(): privateClass;
    export function publicFunctionWithPublicParmeterTypes(): publicClass;
    export function publicFunctionWithPrivateParmeterTypes1(): privateClass;
    export function publicFunctionWithPublicParmeterTypes1(): publicClass;
    export function publicAmbientFunctionWithPrivateParmeterTypes(): privateClass;
    export function publicAmbientFunctionWithPublicParmeterTypes(): publicClass;
    export interface publicInterfaceWithPrivateModuleParameterTypes {
        new (): privateModule.publicClass;
        (): privateModule.publicClass;
        [x: number]: privateModule.publicClass;
        myMethod(): privateModule.publicClass;
    }
    export class publicClassWithPrivateModuleParameterTypes {
        static myPublicStaticMethod(): privateModule.publicClass;
        myPublicMethod(): privateModule.publicClass;
        static myPublicStaticMethod1(): privateModule.publicClass;
        myPublicMethod1(): privateModule.publicClass;
    }
    export function publicFunctionWithPrivateModuleParameterTypes(): privateModule.publicClass;
    export function publicFunctionWithPrivateModuleParameterTypes1(): privateModule.publicClass;
    export function publicAmbientFunctionWithPrivateModuleParameterTypes(): privateModule.publicClass;
    export {};
}
