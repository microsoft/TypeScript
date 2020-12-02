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
exports.__esModule = true;
exports.publicModule = exports.publicFunctionWithPrivateModuleParameterTypes1 = exports.publicFunctionWithPrivateModuleParameterTypes = exports.publicClassWithPrivateModuleParameterTypes = exports.publicFunctionWithPublicParmeterTypes1 = exports.publicFunctionWithPrivateParmeterTypes1 = exports.publicFunctionWithPublicParmeterTypes = exports.publicFunctionWithPrivateParmeterTypes = exports.publicClassWithWithPublicParmeterTypes = exports.publicClassWithWithPrivateParmeterTypes = exports.publicClass = void 0;
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
    var proto_1 = publicClassWithWithPrivateParmeterTypes.prototype;
    publicClassWithWithPrivateParmeterTypes.myPublicStaticMethod = function () {
        return null;
    };
    publicClassWithWithPrivateParmeterTypes.myPrivateStaticMethod = function () {
        return null;
    };
    proto_1.myPublicMethod = function () {
        return null;
    };
    proto_1.myPrivateMethod = function () {
        return null;
    };
    publicClassWithWithPrivateParmeterTypes.myPublicStaticMethod1 = function () {
        return new privateClass();
    };
    publicClassWithWithPrivateParmeterTypes.myPrivateStaticMethod1 = function () {
        return new privateClass();
    };
    proto_1.myPublicMethod1 = function () {
        return new privateClass();
    };
    proto_1.myPrivateMethod1 = function () {
        return new privateClass();
    };
    return publicClassWithWithPrivateParmeterTypes;
}());
exports.publicClassWithWithPrivateParmeterTypes = publicClassWithWithPrivateParmeterTypes;
var publicClassWithWithPublicParmeterTypes = /** @class */ (function () {
    function publicClassWithWithPublicParmeterTypes() {
    }
    var proto_2 = publicClassWithWithPublicParmeterTypes.prototype;
    publicClassWithWithPublicParmeterTypes.myPublicStaticMethod = function () {
        return null;
    };
    publicClassWithWithPublicParmeterTypes.myPrivateStaticMethod = function () {
        return null;
    };
    proto_2.myPublicMethod = function () {
        return null;
    };
    proto_2.myPrivateMethod = function () {
        return null;
    };
    publicClassWithWithPublicParmeterTypes.myPublicStaticMethod1 = function () {
        return new publicClass();
    };
    publicClassWithWithPublicParmeterTypes.myPrivateStaticMethod1 = function () {
        return new publicClass();
    };
    proto_2.myPublicMethod1 = function () {
        return new publicClass();
    };
    proto_2.myPrivateMethod1 = function () {
        return new publicClass();
    };
    return publicClassWithWithPublicParmeterTypes;
}());
exports.publicClassWithWithPublicParmeterTypes = publicClassWithWithPublicParmeterTypes;
var privateClassWithWithPrivateParmeterTypes = /** @class */ (function () {
    function privateClassWithWithPrivateParmeterTypes() {
    }
    var proto_3 = privateClassWithWithPrivateParmeterTypes.prototype;
    privateClassWithWithPrivateParmeterTypes.myPublicStaticMethod = function () {
        return null;
    };
    privateClassWithWithPrivateParmeterTypes.myPrivateStaticMethod = function () {
        return null;
    };
    proto_3.myPublicMethod = function () {
        return null;
    };
    proto_3.myPrivateMethod = function () {
        return null;
    };
    privateClassWithWithPrivateParmeterTypes.myPublicStaticMethod1 = function () {
        return new privateClass();
    };
    privateClassWithWithPrivateParmeterTypes.myPrivateStaticMethod1 = function () {
        return new privateClass();
    };
    proto_3.myPublicMethod1 = function () {
        return new privateClass();
    };
    proto_3.myPrivateMethod1 = function () {
        return new privateClass();
    };
    return privateClassWithWithPrivateParmeterTypes;
}());
var privateClassWithWithPublicParmeterTypes = /** @class */ (function () {
    function privateClassWithWithPublicParmeterTypes() {
    }
    var proto_4 = privateClassWithWithPublicParmeterTypes.prototype;
    privateClassWithWithPublicParmeterTypes.myPublicStaticMethod = function () {
        return null;
    };
    privateClassWithWithPublicParmeterTypes.myPrivateStaticMethod = function () {
        return null;
    };
    proto_4.myPublicMethod = function () {
        return null;
    };
    proto_4.myPrivateMethod = function () {
        return null;
    };
    privateClassWithWithPublicParmeterTypes.myPublicStaticMethod1 = function () {
        return new publicClass();
    };
    privateClassWithWithPublicParmeterTypes.myPrivateStaticMethod1 = function () {
        return new publicClass();
    };
    proto_4.myPublicMethod1 = function () {
        return new publicClass();
    };
    proto_4.myPrivateMethod1 = function () {
        return new publicClass();
    };
    return privateClassWithWithPublicParmeterTypes;
}());
function publicFunctionWithPrivateParmeterTypes() {
    return null;
}
exports.publicFunctionWithPrivateParmeterTypes = publicFunctionWithPrivateParmeterTypes;
function publicFunctionWithPublicParmeterTypes() {
    return null;
}
exports.publicFunctionWithPublicParmeterTypes = publicFunctionWithPublicParmeterTypes;
function privateFunctionWithPrivateParmeterTypes() {
    return null;
}
function privateFunctionWithPublicParmeterTypes() {
    return null;
}
function publicFunctionWithPrivateParmeterTypes1() {
    return new privateClass();
}
exports.publicFunctionWithPrivateParmeterTypes1 = publicFunctionWithPrivateParmeterTypes1;
function publicFunctionWithPublicParmeterTypes1() {
    return new publicClass();
}
exports.publicFunctionWithPublicParmeterTypes1 = publicFunctionWithPublicParmeterTypes1;
function privateFunctionWithPrivateParmeterTypes1() {
    return new privateClass();
}
function privateFunctionWithPublicParmeterTypes1() {
    return new publicClass();
}
var publicClassWithPrivateModuleParameterTypes = /** @class */ (function () {
    function publicClassWithPrivateModuleParameterTypes() {
    }
    var proto_5 = publicClassWithPrivateModuleParameterTypes.prototype;
    publicClassWithPrivateModuleParameterTypes.myPublicStaticMethod = function () {
        return null;
    };
    proto_5.myPublicMethod = function () {
        return null;
    };
    publicClassWithPrivateModuleParameterTypes.myPublicStaticMethod1 = function () {
        return new privateModule.publicClass();
    };
    proto_5.myPublicMethod1 = function () {
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
var privateClassWithPrivateModuleParameterTypes = /** @class */ (function () {
    function privateClassWithPrivateModuleParameterTypes() {
    }
    var proto_6 = privateClassWithPrivateModuleParameterTypes.prototype;
    privateClassWithPrivateModuleParameterTypes.myPublicStaticMethod = function () {
        return null;
    };
    proto_6.myPublicMethod = function () {
        return null;
    };
    privateClassWithPrivateModuleParameterTypes.myPublicStaticMethod1 = function () {
        return new privateModule.publicClass();
    };
    proto_6.myPublicMethod1 = function () {
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
        var proto_7 = publicClassWithWithPrivateParmeterTypes.prototype;
        publicClassWithWithPrivateParmeterTypes.myPublicStaticMethod = function () {
            return null;
        };
        publicClassWithWithPrivateParmeterTypes.myPrivateStaticMethod = function () {
            return null;
        };
        proto_7.myPublicMethod = function () {
            return null;
        };
        proto_7.myPrivateMethod = function () {
            return null;
        };
        publicClassWithWithPrivateParmeterTypes.myPublicStaticMethod1 = function () {
            return new privateClass();
        };
        publicClassWithWithPrivateParmeterTypes.myPrivateStaticMethod1 = function () {
            return new privateClass();
        };
        proto_7.myPublicMethod1 = function () {
            return new privateClass();
        };
        proto_7.myPrivateMethod1 = function () {
            return new privateClass();
        };
        return publicClassWithWithPrivateParmeterTypes;
    }());
    publicModule.publicClassWithWithPrivateParmeterTypes = publicClassWithWithPrivateParmeterTypes;
    var publicClassWithWithPublicParmeterTypes = /** @class */ (function () {
        function publicClassWithWithPublicParmeterTypes() {
        }
        var proto_8 = publicClassWithWithPublicParmeterTypes.prototype;
        publicClassWithWithPublicParmeterTypes.myPublicStaticMethod = function () {
            return null;
        };
        publicClassWithWithPublicParmeterTypes.myPrivateStaticMethod = function () {
            return null;
        };
        proto_8.myPublicMethod = function () {
            return null;
        };
        proto_8.myPrivateMethod = function () {
            return null;
        };
        publicClassWithWithPublicParmeterTypes.myPublicStaticMethod1 = function () {
            return new publicClass();
        };
        publicClassWithWithPublicParmeterTypes.myPrivateStaticMethod1 = function () {
            return new publicClass();
        };
        proto_8.myPublicMethod1 = function () {
            return new publicClass();
        };
        proto_8.myPrivateMethod1 = function () {
            return new publicClass();
        };
        return publicClassWithWithPublicParmeterTypes;
    }());
    publicModule.publicClassWithWithPublicParmeterTypes = publicClassWithWithPublicParmeterTypes;
    var privateClassWithWithPrivateParmeterTypes = /** @class */ (function () {
        function privateClassWithWithPrivateParmeterTypes() {
        }
        var proto_9 = privateClassWithWithPrivateParmeterTypes.prototype;
        privateClassWithWithPrivateParmeterTypes.myPublicStaticMethod = function () {
            return null;
        };
        privateClassWithWithPrivateParmeterTypes.myPrivateStaticMethod = function () {
            return null;
        };
        proto_9.myPublicMethod = function () {
            return null;
        };
        proto_9.myPrivateMethod = function () {
            return null;
        };
        privateClassWithWithPrivateParmeterTypes.myPublicStaticMethod1 = function () {
            return new privateClass();
        };
        privateClassWithWithPrivateParmeterTypes.myPrivateStaticMethod1 = function () {
            return new privateClass();
        };
        proto_9.myPublicMethod1 = function () {
            return new privateClass();
        };
        proto_9.myPrivateMethod1 = function () {
            return new privateClass();
        };
        return privateClassWithWithPrivateParmeterTypes;
    }());
    var privateClassWithWithPublicParmeterTypes = /** @class */ (function () {
        function privateClassWithWithPublicParmeterTypes() {
        }
        var proto_10 = privateClassWithWithPublicParmeterTypes.prototype;
        privateClassWithWithPublicParmeterTypes.myPublicStaticMethod = function () {
            return null;
        };
        privateClassWithWithPublicParmeterTypes.myPrivateStaticMethod = function () {
            return null;
        };
        proto_10.myPublicMethod = function () {
            return null;
        };
        proto_10.myPrivateMethod = function () {
            return null;
        };
        privateClassWithWithPublicParmeterTypes.myPublicStaticMethod1 = function () {
            return new publicClass();
        };
        privateClassWithWithPublicParmeterTypes.myPrivateStaticMethod1 = function () {
            return new publicClass();
        };
        proto_10.myPublicMethod1 = function () {
            return new publicClass();
        };
        proto_10.myPrivateMethod1 = function () {
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
        var proto_11 = publicClassWithPrivateModuleParameterTypes.prototype;
        publicClassWithPrivateModuleParameterTypes.myPublicStaticMethod = function () {
            return null;
        };
        proto_11.myPublicMethod = function () {
            return null;
        };
        publicClassWithPrivateModuleParameterTypes.myPublicStaticMethod1 = function () {
            return new privateModule.publicClass();
        };
        proto_11.myPublicMethod1 = function () {
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
        var proto_12 = privateClassWithPrivateModuleParameterTypes.prototype;
        privateClassWithPrivateModuleParameterTypes.myPublicStaticMethod = function () {
            return null;
        };
        proto_12.myPublicMethod = function () {
            return null;
        };
        privateClassWithPrivateModuleParameterTypes.myPublicStaticMethod1 = function () {
            return new privateModule.publicClass();
        };
        proto_12.myPublicMethod1 = function () {
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
        var proto_13 = publicClassWithWithPrivateParmeterTypes.prototype;
        publicClassWithWithPrivateParmeterTypes.myPublicStaticMethod = function () {
            return null;
        };
        publicClassWithWithPrivateParmeterTypes.myPrivateStaticMethod = function () {
            return null;
        };
        proto_13.myPublicMethod = function () {
            return null;
        };
        proto_13.myPrivateMethod = function () {
            return null;
        };
        publicClassWithWithPrivateParmeterTypes.myPublicStaticMethod1 = function () {
            return new privateClass();
        };
        publicClassWithWithPrivateParmeterTypes.myPrivateStaticMethod1 = function () {
            return new privateClass();
        };
        proto_13.myPublicMethod1 = function () {
            return new privateClass();
        };
        proto_13.myPrivateMethod1 = function () {
            return new privateClass();
        };
        return publicClassWithWithPrivateParmeterTypes;
    }());
    privateModule.publicClassWithWithPrivateParmeterTypes = publicClassWithWithPrivateParmeterTypes;
    var publicClassWithWithPublicParmeterTypes = /** @class */ (function () {
        function publicClassWithWithPublicParmeterTypes() {
        }
        var proto_14 = publicClassWithWithPublicParmeterTypes.prototype;
        publicClassWithWithPublicParmeterTypes.myPublicStaticMethod = function () {
            return null;
        };
        publicClassWithWithPublicParmeterTypes.myPrivateStaticMethod = function () {
            return null;
        };
        proto_14.myPublicMethod = function () {
            return null;
        };
        proto_14.myPrivateMethod = function () {
            return null;
        };
        publicClassWithWithPublicParmeterTypes.myPublicStaticMethod1 = function () {
            return new publicClass();
        };
        publicClassWithWithPublicParmeterTypes.myPrivateStaticMethod1 = function () {
            return new publicClass();
        };
        proto_14.myPublicMethod1 = function () {
            return new publicClass();
        };
        proto_14.myPrivateMethod1 = function () {
            return new publicClass();
        };
        return publicClassWithWithPublicParmeterTypes;
    }());
    privateModule.publicClassWithWithPublicParmeterTypes = publicClassWithWithPublicParmeterTypes;
    var privateClassWithWithPrivateParmeterTypes = /** @class */ (function () {
        function privateClassWithWithPrivateParmeterTypes() {
        }
        var proto_15 = privateClassWithWithPrivateParmeterTypes.prototype;
        privateClassWithWithPrivateParmeterTypes.myPublicStaticMethod = function () {
            return null;
        };
        privateClassWithWithPrivateParmeterTypes.myPrivateStaticMethod = function () {
            return null;
        };
        proto_15.myPublicMethod = function () {
            return null;
        };
        proto_15.myPrivateMethod = function () {
            return null;
        };
        privateClassWithWithPrivateParmeterTypes.myPublicStaticMethod1 = function () {
            return new privateClass();
        };
        privateClassWithWithPrivateParmeterTypes.myPrivateStaticMethod1 = function () {
            return new privateClass();
        };
        proto_15.myPublicMethod1 = function () {
            return new privateClass();
        };
        proto_15.myPrivateMethod1 = function () {
            return new privateClass();
        };
        return privateClassWithWithPrivateParmeterTypes;
    }());
    var privateClassWithWithPublicParmeterTypes = /** @class */ (function () {
        function privateClassWithWithPublicParmeterTypes() {
        }
        var proto_16 = privateClassWithWithPublicParmeterTypes.prototype;
        privateClassWithWithPublicParmeterTypes.myPublicStaticMethod = function () {
            return null;
        };
        privateClassWithWithPublicParmeterTypes.myPrivateStaticMethod = function () {
            return null;
        };
        proto_16.myPublicMethod = function () {
            return null;
        };
        proto_16.myPrivateMethod = function () {
            return null;
        };
        privateClassWithWithPublicParmeterTypes.myPublicStaticMethod1 = function () {
            return new publicClass();
        };
        privateClassWithWithPublicParmeterTypes.myPrivateStaticMethod1 = function () {
            return new publicClass();
        };
        proto_16.myPublicMethod1 = function () {
            return new publicClass();
        };
        proto_16.myPrivateMethod1 = function () {
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
        var proto_17 = publicClassWithPrivateModuleParameterTypes.prototype;
        publicClassWithPrivateModuleParameterTypes.myPublicStaticMethod = function () {
            return null;
        };
        proto_17.myPublicMethod = function () {
            return null;
        };
        publicClassWithPrivateModuleParameterTypes.myPublicStaticMethod1 = function () {
            return new privateModule.publicClass();
        };
        proto_17.myPublicMethod1 = function () {
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
        var proto_18 = privateClassWithPrivateModuleParameterTypes.prototype;
        privateClassWithPrivateModuleParameterTypes.myPublicStaticMethod = function () {
            return null;
        };
        proto_18.myPublicMethod = function () {
            return null;
        };
        privateClassWithPrivateModuleParameterTypes.myPublicStaticMethod1 = function () {
            return new privateModule.publicClass();
        };
        proto_18.myPublicMethod1 = function () {
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
    var proto_1 = publicClassWithWithPublicParmeterTypesInGlobal.prototype;
    publicClassWithWithPublicParmeterTypesInGlobal.myPublicStaticMethod = function () {
        return null;
    };
    publicClassWithWithPublicParmeterTypesInGlobal.myPrivateStaticMethod = function () {
        return null;
    };
    proto_1.myPublicMethod = function () {
        return null;
    };
    proto_1.myPrivateMethod = function () {
        return null;
    };
    publicClassWithWithPublicParmeterTypesInGlobal.myPublicStaticMethod1 = function () {
        return new publicClassInGlobal();
    };
    publicClassWithWithPublicParmeterTypesInGlobal.myPrivateStaticMethod1 = function () {
        return new publicClassInGlobal();
    };
    proto_1.myPublicMethod1 = function () {
        return new publicClassInGlobal();
    };
    proto_1.myPrivateMethod1 = function () {
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
            var proto_2 = publicClassWithWithPrivateParmeterTypes.prototype;
            publicClassWithWithPrivateParmeterTypes.myPublicStaticMethod = function () {
                return null;
            };
            publicClassWithWithPrivateParmeterTypes.myPrivateStaticMethod = function () {
                return null;
            };
            proto_2.myPublicMethod = function () {
                return null;
            };
            proto_2.myPrivateMethod = function () {
                return null;
            };
            publicClassWithWithPrivateParmeterTypes.myPublicStaticMethod1 = function () {
                return new privateClass();
            };
            publicClassWithWithPrivateParmeterTypes.myPrivateStaticMethod1 = function () {
                return new privateClass();
            };
            proto_2.myPublicMethod1 = function () {
                return new privateClass();
            };
            proto_2.myPrivateMethod1 = function () {
                return new privateClass();
            };
            return publicClassWithWithPrivateParmeterTypes;
        }());
        privateModule.publicClassWithWithPrivateParmeterTypes = publicClassWithWithPrivateParmeterTypes;
        var publicClassWithWithPublicParmeterTypes = /** @class */ (function () {
            function publicClassWithWithPublicParmeterTypes() {
            }
            var proto_3 = publicClassWithWithPublicParmeterTypes.prototype;
            publicClassWithWithPublicParmeterTypes.myPublicStaticMethod = function () {
                return null;
            };
            publicClassWithWithPublicParmeterTypes.myPrivateStaticMethod = function () {
                return null;
            };
            proto_3.myPublicMethod = function () {
                return null;
            };
            proto_3.myPrivateMethod = function () {
                return null;
            };
            publicClassWithWithPublicParmeterTypes.myPublicStaticMethod1 = function () {
                return new publicClass();
            };
            publicClassWithWithPublicParmeterTypes.myPrivateStaticMethod1 = function () {
                return new publicClass();
            };
            proto_3.myPublicMethod1 = function () {
                return new publicClass();
            };
            proto_3.myPrivateMethod1 = function () {
                return new publicClass();
            };
            return publicClassWithWithPublicParmeterTypes;
        }());
        privateModule.publicClassWithWithPublicParmeterTypes = publicClassWithWithPublicParmeterTypes;
        var privateClassWithWithPrivateParmeterTypes = /** @class */ (function () {
            function privateClassWithWithPrivateParmeterTypes() {
            }
            var proto_4 = privateClassWithWithPrivateParmeterTypes.prototype;
            privateClassWithWithPrivateParmeterTypes.myPublicStaticMethod = function () {
                return null;
            };
            privateClassWithWithPrivateParmeterTypes.myPrivateStaticMethod = function () {
                return null;
            };
            proto_4.myPublicMethod = function () {
                return null;
            };
            proto_4.myPrivateMethod = function () {
                return null;
            };
            privateClassWithWithPrivateParmeterTypes.myPublicStaticMethod1 = function () {
                return new privateClass();
            };
            privateClassWithWithPrivateParmeterTypes.myPrivateStaticMethod1 = function () {
                return new privateClass();
            };
            proto_4.myPublicMethod1 = function () {
                return new privateClass();
            };
            proto_4.myPrivateMethod1 = function () {
                return new privateClass();
            };
            return privateClassWithWithPrivateParmeterTypes;
        }());
        var privateClassWithWithPublicParmeterTypes = /** @class */ (function () {
            function privateClassWithWithPublicParmeterTypes() {
            }
            var proto_5 = privateClassWithWithPublicParmeterTypes.prototype;
            privateClassWithWithPublicParmeterTypes.myPublicStaticMethod = function () {
                return null;
            };
            privateClassWithWithPublicParmeterTypes.myPrivateStaticMethod = function () {
                return null;
            };
            proto_5.myPublicMethod = function () {
                return null;
            };
            proto_5.myPrivateMethod = function () {
                return null;
            };
            privateClassWithWithPublicParmeterTypes.myPublicStaticMethod1 = function () {
                return new publicClass();
            };
            privateClassWithWithPublicParmeterTypes.myPrivateStaticMethod1 = function () {
                return new publicClass();
            };
            proto_5.myPublicMethod1 = function () {
                return new publicClass();
            };
            proto_5.myPrivateMethod1 = function () {
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
            var proto_6 = publicClassWithPrivateModuleParameterTypes.prototype;
            publicClassWithPrivateModuleParameterTypes.myPublicStaticMethod = function () {
                return null;
            };
            proto_6.myPublicMethod = function () {
                return null;
            };
            publicClassWithPrivateModuleParameterTypes.myPublicStaticMethod1 = function () {
                return new privateModule.publicClass();
            };
            proto_6.myPublicMethod1 = function () {
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
            var proto_7 = privateClassWithPrivateModuleParameterTypes.prototype;
            privateClassWithPrivateModuleParameterTypes.myPublicStaticMethod = function () {
                return null;
            };
            proto_7.myPublicMethod = function () {
                return null;
            };
            privateClassWithPrivateModuleParameterTypes.myPublicStaticMethod1 = function () {
                return new privateModule.publicClass();
            };
            proto_7.myPublicMethod1 = function () {
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
        var proto_8 = publicClassWithWithPrivateParmeterTypes.prototype;
        publicClassWithWithPrivateParmeterTypes.myPublicStaticMethod = function () {
            return null;
        };
        publicClassWithWithPrivateParmeterTypes.myPrivateStaticMethod = function () {
            return null;
        };
        proto_8.myPublicMethod = function () {
            return null;
        };
        proto_8.myPrivateMethod = function () {
            return null;
        };
        publicClassWithWithPrivateParmeterTypes.myPublicStaticMethod1 = function () {
            return new privateClass();
        };
        publicClassWithWithPrivateParmeterTypes.myPrivateStaticMethod1 = function () {
            return new privateClass();
        };
        proto_8.myPublicMethod1 = function () {
            return new privateClass();
        };
        proto_8.myPrivateMethod1 = function () {
            return new privateClass();
        };
        return publicClassWithWithPrivateParmeterTypes;
    }());
    publicModuleInGlobal.publicClassWithWithPrivateParmeterTypes = publicClassWithWithPrivateParmeterTypes;
    var publicClassWithWithPublicParmeterTypes = /** @class */ (function () {
        function publicClassWithWithPublicParmeterTypes() {
        }
        var proto_9 = publicClassWithWithPublicParmeterTypes.prototype;
        publicClassWithWithPublicParmeterTypes.myPublicStaticMethod = function () {
            return null;
        };
        publicClassWithWithPublicParmeterTypes.myPrivateStaticMethod = function () {
            return null;
        };
        proto_9.myPublicMethod = function () {
            return null;
        };
        proto_9.myPrivateMethod = function () {
            return null;
        };
        publicClassWithWithPublicParmeterTypes.myPublicStaticMethod1 = function () {
            return new publicClass();
        };
        publicClassWithWithPublicParmeterTypes.myPrivateStaticMethod1 = function () {
            return new publicClass();
        };
        proto_9.myPublicMethod1 = function () {
            return new publicClass();
        };
        proto_9.myPrivateMethod1 = function () {
            return new publicClass();
        };
        return publicClassWithWithPublicParmeterTypes;
    }());
    publicModuleInGlobal.publicClassWithWithPublicParmeterTypes = publicClassWithWithPublicParmeterTypes;
    var privateClassWithWithPrivateParmeterTypes = /** @class */ (function () {
        function privateClassWithWithPrivateParmeterTypes() {
        }
        var proto_10 = privateClassWithWithPrivateParmeterTypes.prototype;
        privateClassWithWithPrivateParmeterTypes.myPublicStaticMethod = function () {
            return null;
        };
        privateClassWithWithPrivateParmeterTypes.myPrivateStaticMethod = function () {
            return null;
        };
        proto_10.myPublicMethod = function () {
            return null;
        };
        proto_10.myPrivateMethod = function () {
            return null;
        };
        privateClassWithWithPrivateParmeterTypes.myPublicStaticMethod1 = function () {
            return new privateClass();
        };
        privateClassWithWithPrivateParmeterTypes.myPrivateStaticMethod1 = function () {
            return new privateClass();
        };
        proto_10.myPublicMethod1 = function () {
            return new privateClass();
        };
        proto_10.myPrivateMethod1 = function () {
            return new privateClass();
        };
        return privateClassWithWithPrivateParmeterTypes;
    }());
    var privateClassWithWithPublicParmeterTypes = /** @class */ (function () {
        function privateClassWithWithPublicParmeterTypes() {
        }
        var proto_11 = privateClassWithWithPublicParmeterTypes.prototype;
        privateClassWithWithPublicParmeterTypes.myPublicStaticMethod = function () {
            return null;
        };
        privateClassWithWithPublicParmeterTypes.myPrivateStaticMethod = function () {
            return null;
        };
        proto_11.myPublicMethod = function () {
            return null;
        };
        proto_11.myPrivateMethod = function () {
            return null;
        };
        privateClassWithWithPublicParmeterTypes.myPublicStaticMethod1 = function () {
            return new publicClass();
        };
        privateClassWithWithPublicParmeterTypes.myPrivateStaticMethod1 = function () {
            return new publicClass();
        };
        proto_11.myPublicMethod1 = function () {
            return new publicClass();
        };
        proto_11.myPrivateMethod1 = function () {
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
        var proto_12 = publicClassWithPrivateModuleParameterTypes.prototype;
        publicClassWithPrivateModuleParameterTypes.myPublicStaticMethod = function () {
            return null;
        };
        proto_12.myPublicMethod = function () {
            return null;
        };
        publicClassWithPrivateModuleParameterTypes.myPublicStaticMethod1 = function () {
            return new privateModule.publicClass();
        };
        proto_12.myPublicMethod1 = function () {
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
        var proto_13 = privateClassWithPrivateModuleParameterTypes.prototype;
        privateClassWithPrivateModuleParameterTypes.myPublicStaticMethod = function () {
            return null;
        };
        proto_13.myPublicMethod = function () {
            return null;
        };
        privateClassWithPrivateModuleParameterTypes.myPublicStaticMethod1 = function () {
            return new privateModule.publicClass();
        };
        proto_13.myPublicMethod1 = function () {
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
export declare module publicModule {
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
declare module privateModule {
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
