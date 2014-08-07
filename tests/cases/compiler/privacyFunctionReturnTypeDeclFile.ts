// @module: commonjs
// @declaration: true

// @Filename:privacyFunctionReturnTypeDeclFile_externalModule.ts
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

// @Filename: privacyFunctionReturnTypeDeclFile_GlobalFile.ts
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