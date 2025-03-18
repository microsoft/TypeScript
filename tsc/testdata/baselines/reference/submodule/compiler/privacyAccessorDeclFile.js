//// [tests/cases/compiler/privacyAccessorDeclFile.ts] ////

//// [privacyAccessorDeclFile_externalModule.ts]
class privateClass {
}

export class publicClass {
}

export class publicClassWithWithPrivateGetAccessorTypes {
    static get myPublicStaticMethod(): privateClass { // Error
        return null;
    }
    private static get myPrivateStaticMethod(): privateClass {
        return null;
    }
    get myPublicMethod(): privateClass { // Error
        return null;
    }
    private get myPrivateMethod(): privateClass {
        return null;
    }
    static get myPublicStaticMethod1() { // Error
        return new privateClass();
    }
    private static get myPrivateStaticMethod1() {
        return new privateClass();
    }
    get myPublicMethod1() { // Error
        return new privateClass();
    }
    private get myPrivateMethod1() {
        return new privateClass();
    }
}

export class publicClassWithWithPublicGetAccessorTypes {
    static get myPublicStaticMethod(): publicClass {
        return null;
    }
    private static get myPrivateStaticMethod(): publicClass {
        return null;
    }
    get myPublicMethod(): publicClass {
        return null;
    }
    private get myPrivateMethod(): publicClass {
        return null;
    }
    static get myPublicStaticMethod1() {
        return new publicClass();
    }
    private static get myPrivateStaticMethod1() {
        return new publicClass();
    }
    get myPublicMethod1() {
        return new publicClass();
    }
    private get myPrivateMethod1() {
        return new publicClass();
    }
}

class privateClassWithWithPrivateGetAccessorTypes {
    static get myPublicStaticMethod(): privateClass {
        return null;
    }
    private static get myPrivateStaticMethod(): privateClass {
        return null;
    }
    get myPublicMethod(): privateClass {
        return null;
    }
    private get myPrivateMethod(): privateClass {
        return null;
    }
    static get myPublicStaticMethod1() {
        return new privateClass();
    }
    private static get myPrivateStaticMethod1() {
        return new privateClass();
    }
    get myPublicMethod1() {
        return new privateClass();
    }
    private get myPrivateMethod1() {
        return new privateClass();
    }
}

class privateClassWithWithPublicGetAccessorTypes {
    static get myPublicStaticMethod(): publicClass {
        return null;
    }
    private static get myPrivateStaticMethod(): publicClass {
        return null;
    }
    get myPublicMethod(): publicClass {
        return null;
    }
    private get myPrivateMethod(): publicClass {
        return null;
    }
    static get myPublicStaticMethod1() {
        return new publicClass();
    }
    private static get myPrivateStaticMethod1() {
        return new publicClass();
    }
    get myPublicMethod1() {
        return new publicClass();
    }
    private get myPrivateMethod1() {
        return new publicClass();
    }
}

export class publicClassWithWithPrivateSetAccessorTypes {
    static set myPublicStaticMethod(param: privateClass) { // Error
    }
    private static set myPrivateStaticMethod(param: privateClass) {
    }
    set myPublicMethod(param: privateClass) { // Error
    }
    private set myPrivateMethod(param: privateClass) {
    }
}

export class publicClassWithWithPublicSetAccessorTypes {
    static set myPublicStaticMethod(param: publicClass) {
    }
    private static set myPrivateStaticMethod(param: publicClass) {
    }
    set myPublicMethod(param: publicClass) {
    }
    private set myPrivateMethod(param: publicClass) {
    }
}

class privateClassWithWithPrivateSetAccessorTypes {
    static set myPublicStaticMethod(param: privateClass) {
    }
    private static set myPrivateStaticMethod(param: privateClass) {
    }
    set myPublicMethod(param: privateClass) { 
    }
    private set myPrivateMethod(param: privateClass) {
    }
}

class privateClassWithWithPublicSetAccessorTypes {
    static set myPublicStaticMethod(param: publicClass) {
    }
    private static set myPrivateStaticMethod(param: publicClass) {
    }
    set myPublicMethod(param: publicClass) {
    }
    private set myPrivateMethod(param: publicClass) {
    }
}

export class publicClassWithPrivateModuleGetAccessorTypes {
    static get myPublicStaticMethod(): privateModule.publicClass { // Error
        return null;
    }
    get myPublicMethod(): privateModule.publicClass { // Error
        return null;
    }
    static get myPublicStaticMethod1() { // Error
        return new privateModule.publicClass();
    }
    get myPublicMethod1() { // Error
        return new privateModule.publicClass();
    }
}

export class publicClassWithPrivateModuleSetAccessorTypes {
    static set myPublicStaticMethod(param: privateModule.publicClass) { // Error
    }
    set myPublicMethod(param: privateModule.publicClass) { // Error
    }
}

class privateClassWithPrivateModuleGetAccessorTypes {
    static get myPublicStaticMethod(): privateModule.publicClass {
        return null;
    }
    get myPublicMethod(): privateModule.publicClass {
        return null;
    }
    static get myPublicStaticMethod1() {
        return new privateModule.publicClass();
    }
    get myPublicMethod1() {
        return new privateModule.publicClass();
    }
}

class privateClassWithPrivateModuleSetAccessorTypes {
    static set myPublicStaticMethod(param: privateModule.publicClass) {
    }
    set myPublicMethod(param: privateModule.publicClass) {
    }
}

export module publicModule {
    class privateClass {
    }

    export class publicClass {
    }
    export class publicClassWithWithPrivateGetAccessorTypes {
        static get myPublicStaticMethod(): privateClass { // Error
            return null;
        }
        private static get myPrivateStaticMethod(): privateClass {
            return null;
        }
        get myPublicMethod(): privateClass { // Error
            return null;
        }
        private get myPrivateMethod(): privateClass {
            return null;
        }
        static get myPublicStaticMethod1() { // Error
            return new privateClass();
        }
        private static get myPrivateStaticMethod1() {
            return new privateClass();
        }
        get myPublicMethod1() { // Error
            return new privateClass();
        }
        private get myPrivateMethod1() {
            return new privateClass();
        }
    }

    export class publicClassWithWithPublicGetAccessorTypes {
        static get myPublicStaticMethod(): publicClass {
            return null;
        }
        private static get myPrivateStaticMethod(): publicClass {
            return null;
        }
        get myPublicMethod(): publicClass {
            return null;
        }
        private get myPrivateMethod(): publicClass {
            return null;
        }
        static get myPublicStaticMethod1() {
            return new publicClass();
        }
        private static get myPrivateStaticMethod1() {
            return new publicClass();
        }
        get myPublicMethod1() {
            return new publicClass();
        }
        private get myPrivateMethod1() {
            return new publicClass();
        }
    }

    class privateClassWithWithPrivateGetAccessorTypes {
        static get myPublicStaticMethod(): privateClass {
            return null;
        }
        private static get myPrivateStaticMethod(): privateClass {
            return null;
        }
        get myPublicMethod(): privateClass {
            return null;
        }
        private get myPrivateMethod(): privateClass {
            return null;
        }
        static get myPublicStaticMethod1() {
            return new privateClass();
        }
        private static get myPrivateStaticMethod1() {
            return new privateClass();
        }
        get myPublicMethod1() {
            return new privateClass();
        }
        private get myPrivateMethod1() {
            return new privateClass();
        }
    }

    class privateClassWithWithPublicGetAccessorTypes {
        static get myPublicStaticMethod(): publicClass {
            return null;
        }
        private static get myPrivateStaticMethod(): publicClass {
            return null;
        }
        get myPublicMethod(): publicClass {
            return null;
        }
        private get myPrivateMethod(): publicClass {
            return null;
        }
        static get myPublicStaticMethod1() {
            return new publicClass();
        }
        private static get myPrivateStaticMethod1() {
            return new publicClass();
        }
        get myPublicMethod1() {
            return new publicClass();
        }
        private get myPrivateMethod1() {
            return new publicClass();
        }
    }

    export class publicClassWithWithPrivateSetAccessorTypes {
        static set myPublicStaticMethod(param: privateClass) { // Error
        }
        private static set myPrivateStaticMethod(param: privateClass) {
        }
        set myPublicMethod(param: privateClass) { // Error
        }
        private set myPrivateMethod(param: privateClass) {
        }
    }

    export class publicClassWithWithPublicSetAccessorTypes {
        static set myPublicStaticMethod(param: publicClass) {
        }
        private static set myPrivateStaticMethod(param: publicClass) {
        }
        set myPublicMethod(param: publicClass) {
        }
        private set myPrivateMethod(param: publicClass) {
        }
    }

    class privateClassWithWithPrivateSetAccessorTypes {
        static set myPublicStaticMethod(param: privateClass) {
        }
        private static set myPrivateStaticMethod(param: privateClass) {
        }
        set myPublicMethod(param: privateClass) {
        }
        private set myPrivateMethod(param: privateClass) {
        }
    }

    class privateClassWithWithPublicSetAccessorTypes {
        static set myPublicStaticMethod(param: publicClass) {
        }
        private static set myPrivateStaticMethod(param: publicClass) {
        }
        set myPublicMethod(param: publicClass) {
        }
        private set myPrivateMethod(param: publicClass) {
        }
    }

    export class publicClassWithPrivateModuleGetAccessorTypes {
        static get myPublicStaticMethod(): privateModule.publicClass { // Error
            return null;
        }
        get myPublicMethod(): privateModule.publicClass { // Error
            return null;
        }
        static get myPublicStaticMethod1() { // Error
            return new privateModule.publicClass();
        }
        get myPublicMethod1() { // Error
            return new privateModule.publicClass();
        }
    }

    export class publicClassWithPrivateModuleSetAccessorTypes {
        static set myPublicStaticMethod(param: privateModule.publicClass) { // Error
        }
        set myPublicMethod(param: privateModule.publicClass) { // Error
        }
    }

    class privateClassWithPrivateModuleGetAccessorTypes {
        static get myPublicStaticMethod(): privateModule.publicClass {
            return null;
        }
        get myPublicMethod(): privateModule.publicClass {
            return null;
        }
        static get myPublicStaticMethod1() {
            return new privateModule.publicClass();
        }
        get myPublicMethod1() {
            return new privateModule.publicClass();
        }
    }

    class privateClassWithPrivateModuleSetAccessorTypes {
        static set myPublicStaticMethod(param: privateModule.publicClass) {
        }
        set myPublicMethod(param: privateModule.publicClass) {
        }
    }
}

module privateModule {
    class privateClass {
    }

    export class publicClass {
    }
    export class publicClassWithWithPrivateGetAccessorTypes {
        static get myPublicStaticMethod(): privateClass { 
            return null;
        }
        private static get myPrivateStaticMethod(): privateClass {
            return null;
        }
        get myPublicMethod(): privateClass { 
            return null;
        }
        private get myPrivateMethod(): privateClass {
            return null;
        }
        static get myPublicStaticMethod1() { 
            return new privateClass();
        }
        private static get myPrivateStaticMethod1() {
            return new privateClass();
        }
        get myPublicMethod1() { 
            return new privateClass();
        }
        private get myPrivateMethod1() {
            return new privateClass();
        }
    }

    export class publicClassWithWithPublicGetAccessorTypes {
        static get myPublicStaticMethod(): publicClass {
            return null;
        }
        private static get myPrivateStaticMethod(): publicClass {
            return null;
        }
        get myPublicMethod(): publicClass {
            return null;
        }
        private get myPrivateMethod(): publicClass {
            return null;
        }
        static get myPublicStaticMethod1() {
            return new publicClass();
        }
        private static get myPrivateStaticMethod1() {
            return new publicClass();
        }
        get myPublicMethod1() {
            return new publicClass();
        }
        private get myPrivateMethod1() {
            return new publicClass();
        }
    }

    class privateClassWithWithPrivateGetAccessorTypes {
        static get myPublicStaticMethod(): privateClass {
            return null;
        }
        private static get myPrivateStaticMethod(): privateClass {
            return null;
        }
        get myPublicMethod(): privateClass {
            return null;
        }
        private get myPrivateMethod(): privateClass {
            return null;
        }
        static get myPublicStaticMethod1() {
            return new privateClass();
        }
        private static get myPrivateStaticMethod1() {
            return new privateClass();
        }
        get myPublicMethod1() {
            return new privateClass();
        }
        private get myPrivateMethod1() {
            return new privateClass();
        }
    }

    class privateClassWithWithPublicGetAccessorTypes {
        static get myPublicStaticMethod(): publicClass {
            return null;
        }
        private static get myPrivateStaticMethod(): publicClass {
            return null;
        }
        get myPublicMethod(): publicClass {
            return null;
        }
        private get myPrivateMethod(): publicClass {
            return null;
        }
        static get myPublicStaticMethod1() {
            return new publicClass();
        }
        private static get myPrivateStaticMethod1() {
            return new publicClass();
        }
        get myPublicMethod1() {
            return new publicClass();
        }
        private get myPrivateMethod1() {
            return new publicClass();
        }
    }

    export class publicClassWithWithPrivateSetAccessorTypes {
        static set myPublicStaticMethod(param: privateClass) { 
        }
        private static set myPrivateStaticMethod(param: privateClass) {
        }
        set myPublicMethod(param: privateClass) { 
        }
        private set myPrivateMethod(param: privateClass) {
        }
    }

    export class publicClassWithWithPublicSetAccessorTypes {
        static set myPublicStaticMethod(param: publicClass) {
        }
        private static set myPrivateStaticMethod(param: publicClass) {
        }
        set myPublicMethod(param: publicClass) {
        }
        private set myPrivateMethod(param: publicClass) {
        }
    }

    class privateClassWithWithPrivateSetAccessorTypes {
        static set myPublicStaticMethod(param: privateClass) {
        }
        private static set myPrivateStaticMethod(param: privateClass) {
        }
        set myPublicMethod(param: privateClass) {
        }
        private set myPrivateMethod(param: privateClass) {
        }
    }

    class privateClassWithWithPublicSetAccessorTypes {
        static set myPublicStaticMethod(param: publicClass) {
        }
        private static set myPrivateStaticMethod(param: publicClass) {
        }
        set myPublicMethod(param: publicClass) {
        }
        private set myPrivateMethod(param: publicClass) {
        }
    }

    export class publicClassWithPrivateModuleGetAccessorTypes {
        static get myPublicStaticMethod(): privateModule.publicClass { 
            return null;
        }
        get myPublicMethod(): privateModule.publicClass { 
            return null;
        }
        static get myPublicStaticMethod1() { 
            return new privateModule.publicClass();
        }
        get myPublicMethod1() { 
            return new privateModule.publicClass();
        }
    }

    export class publicClassWithPrivateModuleSetAccessorTypes {
        static set myPublicStaticMethod(param: privateModule.publicClass) { 
        }
        set myPublicMethod(param: privateModule.publicClass) { 
        }
    }

    class privateClassWithPrivateModuleGetAccessorTypes {
        static get myPublicStaticMethod(): privateModule.publicClass {
            return null;
        }
        get myPublicMethod(): privateModule.publicClass {
            return null;
        }
        static get myPublicStaticMethod1() {
            return new privateModule.publicClass();
        }
        get myPublicMethod1() {
            return new privateModule.publicClass();
        }
    }

    class privateClassWithPrivateModuleSetAccessorTypes {
        static set myPublicStaticMethod(param: privateModule.publicClass) {
        }
        set myPublicMethod(param: privateModule.publicClass) {
        }
    }
}

//// [privacyAccessorDeclFile_GlobalFile.ts]
class publicClassInGlobal {
}

class publicClassInGlobalWithPublicGetAccessorTypes {
    static get myPublicStaticMethod(): publicClassInGlobal {
        return null;
    }
    private static get myPrivateStaticMethod(): publicClassInGlobal {
        return null;
    }
    get myPublicMethod(): publicClassInGlobal {
        return null;
    }
    private get myPrivateMethod(): publicClassInGlobal {
        return null;
    }
    static get myPublicStaticMethod1() {
        return new publicClassInGlobal();
    }
    private static get myPrivateStaticMethod1() {
        return new publicClassInGlobal();
    }
    get myPublicMethod1() {
        return new publicClassInGlobal();
    }
    private get myPrivateMethod1() {
        return new publicClassInGlobal();
    }
}

class publicClassInGlobalWithWithPublicSetAccessorTypes {
    static set myPublicStaticMethod(param: publicClassInGlobal) {
    }
    private static set myPrivateStaticMethod(param: publicClassInGlobal) {
    }
    set myPublicMethod(param: publicClassInGlobal) {
    }
    private set myPrivateMethod(param: publicClassInGlobal) {
    }
}

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
        export class publicClassWithWithPrivateGetAccessorTypes {
            static get myPublicStaticMethod(): privateClass {
                return null;
            }
            private static get myPrivateStaticMethod(): privateClass {
                return null;
            }
            get myPublicMethod(): privateClass {
                return null;
            }
            private get myPrivateMethod(): privateClass {
                return null;
            }
            static get myPublicStaticMethod1() {
                return new privateClass();
            }
            private static get myPrivateStaticMethod1() {
                return new privateClass();
            }
            get myPublicMethod1() {
                return new privateClass();
            }
            private get myPrivateMethod1() {
                return new privateClass();
            }
        }

        export class publicClassWithWithPublicGetAccessorTypes {
            static get myPublicStaticMethod(): publicClass {
                return null;
            }
            private static get myPrivateStaticMethod(): publicClass {
                return null;
            }
            get myPublicMethod(): publicClass {
                return null;
            }
            private get myPrivateMethod(): publicClass {
                return null;
            }
            static get myPublicStaticMethod1() {
                return new publicClass();
            }
            private static get myPrivateStaticMethod1() {
                return new publicClass();
            }
            get myPublicMethod1() {
                return new publicClass();
            }
            private get myPrivateMethod1() {
                return new publicClass();
            }
        }

        class privateClassWithWithPrivateGetAccessorTypes {
            static get myPublicStaticMethod(): privateClass {
                return null;
            }
            private static get myPrivateStaticMethod(): privateClass {
                return null;
            }
            get myPublicMethod(): privateClass {
                return null;
            }
            private get myPrivateMethod(): privateClass {
                return null;
            }
            static get myPublicStaticMethod1() {
                return new privateClass();
            }
            private static get myPrivateStaticMethod1() {
                return new privateClass();
            }
            get myPublicMethod1() {
                return new privateClass();
            }
            private get myPrivateMethod1() {
                return new privateClass();
            }
        }

        class privateClassWithWithPublicGetAccessorTypes {
            static get myPublicStaticMethod(): publicClass {
                return null;
            }
            private static get myPrivateStaticMethod(): publicClass {
                return null;
            }
            get myPublicMethod(): publicClass {
                return null;
            }
            private get myPrivateMethod(): publicClass {
                return null;
            }
            static get myPublicStaticMethod1() {
                return new publicClass();
            }
            private static get myPrivateStaticMethod1() {
                return new publicClass();
            }
            get myPublicMethod1() {
                return new publicClass();
            }
            private get myPrivateMethod1() {
                return new publicClass();
            }
        }

        export class publicClassWithWithPrivateSetAccessorTypes {
            static set myPublicStaticMethod(param: privateClass) {
            }
            private static set myPrivateStaticMethod(param: privateClass) {
            }
            set myPublicMethod(param: privateClass) {
            }
            private set myPrivateMethod(param: privateClass) {
            }
        }

        export class publicClassWithWithPublicSetAccessorTypes {
            static set myPublicStaticMethod(param: publicClass) {
            }
            private static set myPrivateStaticMethod(param: publicClass) {
            }
            set myPublicMethod(param: publicClass) {
            }
            private set myPrivateMethod(param: publicClass) {
            }
        }

        class privateClassWithWithPrivateSetAccessorTypes {
            static set myPublicStaticMethod(param: privateClass) {
            }
            private static set myPrivateStaticMethod(param: privateClass) {
            }
            set myPublicMethod(param: privateClass) {
            }
            private set myPrivateMethod(param: privateClass) {
            }
        }

        class privateClassWithWithPublicSetAccessorTypes {
            static set myPublicStaticMethod(param: publicClass) {
            }
            private static set myPrivateStaticMethod(param: publicClass) {
            }
            set myPublicMethod(param: publicClass) {
            }
            private set myPrivateMethod(param: publicClass) {
            }
        }

        export class publicClassWithPrivateModuleGetAccessorTypes {
            static get myPublicStaticMethod(): privateModule.publicClass {
                return null;
            }
            get myPublicMethod(): privateModule.publicClass {
                return null;
            }
            static get myPublicStaticMethod1() {
                return new privateModule.publicClass();
            }
            get myPublicMethod1() {
                return new privateModule.publicClass();
            }
        }

        export class publicClassWithPrivateModuleSetAccessorTypes {
            static set myPublicStaticMethod(param: privateModule.publicClass) {
            }
            set myPublicMethod(param: privateModule.publicClass) {
            }
        }

        class privateClassWithPrivateModuleGetAccessorTypes {
            static get myPublicStaticMethod(): privateModule.publicClass {
                return null;
            }
            get myPublicMethod(): privateModule.publicClass {
                return null;
            }
            static get myPublicStaticMethod1() {
                return new privateModule.publicClass();
            }
            get myPublicMethod1() {
                return new privateModule.publicClass();
            }
        }

        class privateClassWithPrivateModuleSetAccessorTypes {
            static set myPublicStaticMethod(param: privateModule.publicClass) {
            }
            set myPublicMethod(param: privateModule.publicClass) {
            }
        }
    }

    export class publicClassWithWithPrivateGetAccessorTypes {
        static get myPublicStaticMethod(): privateClass { // Error
            return null;
        }
        private static get myPrivateStaticMethod(): privateClass {
            return null;
        }
        get myPublicMethod(): privateClass { // Error
            return null;
        }
        private get myPrivateMethod(): privateClass {
            return null;
        }
        static get myPublicStaticMethod1() { // Error
            return new privateClass();
        }
        private static get myPrivateStaticMethod1() {
            return new privateClass();
        }
        get myPublicMethod1() { // Error
            return new privateClass();
        }
        private get myPrivateMethod1() {
            return new privateClass();
        }
    }

    export class publicClassWithWithPublicGetAccessorTypes {
        static get myPublicStaticMethod(): publicClass {
            return null;
        }
        private static get myPrivateStaticMethod(): publicClass {
            return null;
        }
        get myPublicMethod(): publicClass {
            return null;
        }
        private get myPrivateMethod(): publicClass {
            return null;
        }
        static get myPublicStaticMethod1() {
            return new publicClass();
        }
        private static get myPrivateStaticMethod1() {
            return new publicClass();
        }
        get myPublicMethod1() {
            return new publicClass();
        }
        private get myPrivateMethod1() {
            return new publicClass();
        }
    }

    class privateClassWithWithPrivateGetAccessorTypes {
        static get myPublicStaticMethod(): privateClass {
            return null;
        }
        private static get myPrivateStaticMethod(): privateClass {
            return null;
        }
        get myPublicMethod(): privateClass {
            return null;
        }
        private get myPrivateMethod(): privateClass {
            return null;
        }
        static get myPublicStaticMethod1() {
            return new privateClass();
        }
        private static get myPrivateStaticMethod1() {
            return new privateClass();
        }
        get myPublicMethod1() {
            return new privateClass();
        }
        private get myPrivateMethod1() {
            return new privateClass();
        }
    }

    class privateClassWithWithPublicGetAccessorTypes {
        static get myPublicStaticMethod(): publicClass {
            return null;
        }
        private static get myPrivateStaticMethod(): publicClass {
            return null;
        }
        get myPublicMethod(): publicClass {
            return null;
        }
        private get myPrivateMethod(): publicClass {
            return null;
        }
        static get myPublicStaticMethod1() {
            return new publicClass();
        }
        private static get myPrivateStaticMethod1() {
            return new publicClass();
        }
        get myPublicMethod1() {
            return new publicClass();
        }
        private get myPrivateMethod1() {
            return new publicClass();
        }
    }

    export class publicClassWithWithPrivateSetAccessorTypes {
        static set myPublicStaticMethod(param: privateClass) { // Error
        }
        private static set myPrivateStaticMethod(param: privateClass) {
        }
        set myPublicMethod(param: privateClass) { // Error
        }
        private set myPrivateMethod(param: privateClass) {
        }
    }

    export class publicClassWithWithPublicSetAccessorTypes {
        static set myPublicStaticMethod(param: publicClass) {
        }
        private static set myPrivateStaticMethod(param: publicClass) {
        }
        set myPublicMethod(param: publicClass) {
        }
        private set myPrivateMethod(param: publicClass) {
        }
    }

    class privateClassWithWithPrivateSetAccessorTypes {
        static set myPublicStaticMethod(param: privateClass) {
        }
        private static set myPrivateStaticMethod(param: privateClass) {
        }
        set myPublicMethod(param: privateClass) {
        }
        private set myPrivateMethod(param: privateClass) {
        }
    }

    class privateClassWithWithPublicSetAccessorTypes {
        static set myPublicStaticMethod(param: publicClass) {
        }
        private static set myPrivateStaticMethod(param: publicClass) {
        }
        set myPublicMethod(param: publicClass) {
        }
        private set myPrivateMethod(param: publicClass) {
        }
    }

    export class publicClassWithPrivateModuleGetAccessorTypes {
        static get myPublicStaticMethod(): privateModule.publicClass { // Error
            return null;
        }
        get myPublicMethod(): privateModule.publicClass { // Error
            return null;
        }
        static get myPublicStaticMethod1() { // Error
            return new privateModule.publicClass();
        }
        get myPublicMethod1() { // Error
            return new privateModule.publicClass();
        }
    }

    export class publicClassWithPrivateModuleSetAccessorTypes {
        static set myPublicStaticMethod(param: privateModule.publicClass) { // Error
        }
        set myPublicMethod(param: privateModule.publicClass) { // Error
        }
    }

    class privateClassWithPrivateModuleGetAccessorTypes {
        static get myPublicStaticMethod(): privateModule.publicClass {
            return null;
        }
        get myPublicMethod(): privateModule.publicClass {
            return null;
        }
        static get myPublicStaticMethod1() {
            return new privateModule.publicClass();
        }
        get myPublicMethod1() {
            return new privateModule.publicClass();
        }
    }

    class privateClassWithPrivateModuleSetAccessorTypes {
        static set myPublicStaticMethod(param: privateModule.publicClass) {
        }
        set myPublicMethod(param: privateModule.publicClass) {
        }
    }
}

//// [privacyAccessorDeclFile_externalModule.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicModule = exports.publicClassWithPrivateModuleSetAccessorTypes = exports.publicClassWithPrivateModuleGetAccessorTypes = exports.publicClassWithWithPublicSetAccessorTypes = exports.publicClassWithWithPrivateSetAccessorTypes = exports.publicClassWithWithPublicGetAccessorTypes = exports.publicClassWithWithPrivateGetAccessorTypes = exports.publicClass = void 0;
class privateClass {
}
class publicClass {
}
exports.publicClass = publicClass;
class publicClassWithWithPrivateGetAccessorTypes {
    static get myPublicStaticMethod() {
        return null;
    }
    static get myPrivateStaticMethod() {
        return null;
    }
    get myPublicMethod() {
        return null;
    }
    get myPrivateMethod() {
        return null;
    }
    static get myPublicStaticMethod1() {
        return new privateClass();
    }
    static get myPrivateStaticMethod1() {
        return new privateClass();
    }
    get myPublicMethod1() {
        return new privateClass();
    }
    get myPrivateMethod1() {
        return new privateClass();
    }
}
exports.publicClassWithWithPrivateGetAccessorTypes = publicClassWithWithPrivateGetAccessorTypes;
class publicClassWithWithPublicGetAccessorTypes {
    static get myPublicStaticMethod() {
        return null;
    }
    static get myPrivateStaticMethod() {
        return null;
    }
    get myPublicMethod() {
        return null;
    }
    get myPrivateMethod() {
        return null;
    }
    static get myPublicStaticMethod1() {
        return new publicClass();
    }
    static get myPrivateStaticMethod1() {
        return new publicClass();
    }
    get myPublicMethod1() {
        return new publicClass();
    }
    get myPrivateMethod1() {
        return new publicClass();
    }
}
exports.publicClassWithWithPublicGetAccessorTypes = publicClassWithWithPublicGetAccessorTypes;
class privateClassWithWithPrivateGetAccessorTypes {
    static get myPublicStaticMethod() {
        return null;
    }
    static get myPrivateStaticMethod() {
        return null;
    }
    get myPublicMethod() {
        return null;
    }
    get myPrivateMethod() {
        return null;
    }
    static get myPublicStaticMethod1() {
        return new privateClass();
    }
    static get myPrivateStaticMethod1() {
        return new privateClass();
    }
    get myPublicMethod1() {
        return new privateClass();
    }
    get myPrivateMethod1() {
        return new privateClass();
    }
}
class privateClassWithWithPublicGetAccessorTypes {
    static get myPublicStaticMethod() {
        return null;
    }
    static get myPrivateStaticMethod() {
        return null;
    }
    get myPublicMethod() {
        return null;
    }
    get myPrivateMethod() {
        return null;
    }
    static get myPublicStaticMethod1() {
        return new publicClass();
    }
    static get myPrivateStaticMethod1() {
        return new publicClass();
    }
    get myPublicMethod1() {
        return new publicClass();
    }
    get myPrivateMethod1() {
        return new publicClass();
    }
}
class publicClassWithWithPrivateSetAccessorTypes {
    static set myPublicStaticMethod(param) {
    }
    static set myPrivateStaticMethod(param) {
    }
    set myPublicMethod(param) {
    }
    set myPrivateMethod(param) {
    }
}
exports.publicClassWithWithPrivateSetAccessorTypes = publicClassWithWithPrivateSetAccessorTypes;
class publicClassWithWithPublicSetAccessorTypes {
    static set myPublicStaticMethod(param) {
    }
    static set myPrivateStaticMethod(param) {
    }
    set myPublicMethod(param) {
    }
    set myPrivateMethod(param) {
    }
}
exports.publicClassWithWithPublicSetAccessorTypes = publicClassWithWithPublicSetAccessorTypes;
class privateClassWithWithPrivateSetAccessorTypes {
    static set myPublicStaticMethod(param) {
    }
    static set myPrivateStaticMethod(param) {
    }
    set myPublicMethod(param) {
    }
    set myPrivateMethod(param) {
    }
}
class privateClassWithWithPublicSetAccessorTypes {
    static set myPublicStaticMethod(param) {
    }
    static set myPrivateStaticMethod(param) {
    }
    set myPublicMethod(param) {
    }
    set myPrivateMethod(param) {
    }
}
class publicClassWithPrivateModuleGetAccessorTypes {
    static get myPublicStaticMethod() {
        return null;
    }
    get myPublicMethod() {
        return null;
    }
    static get myPublicStaticMethod1() {
        return new privateModule.publicClass();
    }
    get myPublicMethod1() {
        return new privateModule.publicClass();
    }
}
exports.publicClassWithPrivateModuleGetAccessorTypes = publicClassWithPrivateModuleGetAccessorTypes;
class publicClassWithPrivateModuleSetAccessorTypes {
    static set myPublicStaticMethod(param) {
    }
    set myPublicMethod(param) {
    }
}
exports.publicClassWithPrivateModuleSetAccessorTypes = publicClassWithPrivateModuleSetAccessorTypes;
class privateClassWithPrivateModuleGetAccessorTypes {
    static get myPublicStaticMethod() {
        return null;
    }
    get myPublicMethod() {
        return null;
    }
    static get myPublicStaticMethod1() {
        return new privateModule.publicClass();
    }
    get myPublicMethod1() {
        return new privateModule.publicClass();
    }
}
class privateClassWithPrivateModuleSetAccessorTypes {
    static set myPublicStaticMethod(param) {
    }
    set myPublicMethod(param) {
    }
}
var publicModule;
(function (publicModule) {
    class privateClass {
    }
    class publicClass {
    }
    publicModule.publicClass = publicClass;
    class publicClassWithWithPrivateGetAccessorTypes {
        static get myPublicStaticMethod() {
            return null;
        }
        static get myPrivateStaticMethod() {
            return null;
        }
        get myPublicMethod() {
            return null;
        }
        get myPrivateMethod() {
            return null;
        }
        static get myPublicStaticMethod1() {
            return new privateClass();
        }
        static get myPrivateStaticMethod1() {
            return new privateClass();
        }
        get myPublicMethod1() {
            return new privateClass();
        }
        get myPrivateMethod1() {
            return new privateClass();
        }
    }
    publicModule.publicClassWithWithPrivateGetAccessorTypes = publicClassWithWithPrivateGetAccessorTypes;
    class publicClassWithWithPublicGetAccessorTypes {
        static get myPublicStaticMethod() {
            return null;
        }
        static get myPrivateStaticMethod() {
            return null;
        }
        get myPublicMethod() {
            return null;
        }
        get myPrivateMethod() {
            return null;
        }
        static get myPublicStaticMethod1() {
            return new publicClass();
        }
        static get myPrivateStaticMethod1() {
            return new publicClass();
        }
        get myPublicMethod1() {
            return new publicClass();
        }
        get myPrivateMethod1() {
            return new publicClass();
        }
    }
    publicModule.publicClassWithWithPublicGetAccessorTypes = publicClassWithWithPublicGetAccessorTypes;
    class privateClassWithWithPrivateGetAccessorTypes {
        static get myPublicStaticMethod() {
            return null;
        }
        static get myPrivateStaticMethod() {
            return null;
        }
        get myPublicMethod() {
            return null;
        }
        get myPrivateMethod() {
            return null;
        }
        static get myPublicStaticMethod1() {
            return new privateClass();
        }
        static get myPrivateStaticMethod1() {
            return new privateClass();
        }
        get myPublicMethod1() {
            return new privateClass();
        }
        get myPrivateMethod1() {
            return new privateClass();
        }
    }
    class privateClassWithWithPublicGetAccessorTypes {
        static get myPublicStaticMethod() {
            return null;
        }
        static get myPrivateStaticMethod() {
            return null;
        }
        get myPublicMethod() {
            return null;
        }
        get myPrivateMethod() {
            return null;
        }
        static get myPublicStaticMethod1() {
            return new publicClass();
        }
        static get myPrivateStaticMethod1() {
            return new publicClass();
        }
        get myPublicMethod1() {
            return new publicClass();
        }
        get myPrivateMethod1() {
            return new publicClass();
        }
    }
    class publicClassWithWithPrivateSetAccessorTypes {
        static set myPublicStaticMethod(param) {
        }
        static set myPrivateStaticMethod(param) {
        }
        set myPublicMethod(param) {
        }
        set myPrivateMethod(param) {
        }
    }
    publicModule.publicClassWithWithPrivateSetAccessorTypes = publicClassWithWithPrivateSetAccessorTypes;
    class publicClassWithWithPublicSetAccessorTypes {
        static set myPublicStaticMethod(param) {
        }
        static set myPrivateStaticMethod(param) {
        }
        set myPublicMethod(param) {
        }
        set myPrivateMethod(param) {
        }
    }
    publicModule.publicClassWithWithPublicSetAccessorTypes = publicClassWithWithPublicSetAccessorTypes;
    class privateClassWithWithPrivateSetAccessorTypes {
        static set myPublicStaticMethod(param) {
        }
        static set myPrivateStaticMethod(param) {
        }
        set myPublicMethod(param) {
        }
        set myPrivateMethod(param) {
        }
    }
    class privateClassWithWithPublicSetAccessorTypes {
        static set myPublicStaticMethod(param) {
        }
        static set myPrivateStaticMethod(param) {
        }
        set myPublicMethod(param) {
        }
        set myPrivateMethod(param) {
        }
    }
    class publicClassWithPrivateModuleGetAccessorTypes {
        static get myPublicStaticMethod() {
            return null;
        }
        get myPublicMethod() {
            return null;
        }
        static get myPublicStaticMethod1() {
            return new privateModule.publicClass();
        }
        get myPublicMethod1() {
            return new privateModule.publicClass();
        }
    }
    publicModule.publicClassWithPrivateModuleGetAccessorTypes = publicClassWithPrivateModuleGetAccessorTypes;
    class publicClassWithPrivateModuleSetAccessorTypes {
        static set myPublicStaticMethod(param) {
        }
        set myPublicMethod(param) {
        }
    }
    publicModule.publicClassWithPrivateModuleSetAccessorTypes = publicClassWithPrivateModuleSetAccessorTypes;
    class privateClassWithPrivateModuleGetAccessorTypes {
        static get myPublicStaticMethod() {
            return null;
        }
        get myPublicMethod() {
            return null;
        }
        static get myPublicStaticMethod1() {
            return new privateModule.publicClass();
        }
        get myPublicMethod1() {
            return new privateModule.publicClass();
        }
    }
    class privateClassWithPrivateModuleSetAccessorTypes {
        static set myPublicStaticMethod(param) {
        }
        set myPublicMethod(param) {
        }
    }
})(publicModule || (exports.publicModule = publicModule = {}));
var privateModule;
(function (privateModule) {
    class privateClass {
    }
    class publicClass {
    }
    privateModule.publicClass = publicClass;
    class publicClassWithWithPrivateGetAccessorTypes {
        static get myPublicStaticMethod() {
            return null;
        }
        static get myPrivateStaticMethod() {
            return null;
        }
        get myPublicMethod() {
            return null;
        }
        get myPrivateMethod() {
            return null;
        }
        static get myPublicStaticMethod1() {
            return new privateClass();
        }
        static get myPrivateStaticMethod1() {
            return new privateClass();
        }
        get myPublicMethod1() {
            return new privateClass();
        }
        get myPrivateMethod1() {
            return new privateClass();
        }
    }
    privateModule.publicClassWithWithPrivateGetAccessorTypes = publicClassWithWithPrivateGetAccessorTypes;
    class publicClassWithWithPublicGetAccessorTypes {
        static get myPublicStaticMethod() {
            return null;
        }
        static get myPrivateStaticMethod() {
            return null;
        }
        get myPublicMethod() {
            return null;
        }
        get myPrivateMethod() {
            return null;
        }
        static get myPublicStaticMethod1() {
            return new publicClass();
        }
        static get myPrivateStaticMethod1() {
            return new publicClass();
        }
        get myPublicMethod1() {
            return new publicClass();
        }
        get myPrivateMethod1() {
            return new publicClass();
        }
    }
    privateModule.publicClassWithWithPublicGetAccessorTypes = publicClassWithWithPublicGetAccessorTypes;
    class privateClassWithWithPrivateGetAccessorTypes {
        static get myPublicStaticMethod() {
            return null;
        }
        static get myPrivateStaticMethod() {
            return null;
        }
        get myPublicMethod() {
            return null;
        }
        get myPrivateMethod() {
            return null;
        }
        static get myPublicStaticMethod1() {
            return new privateClass();
        }
        static get myPrivateStaticMethod1() {
            return new privateClass();
        }
        get myPublicMethod1() {
            return new privateClass();
        }
        get myPrivateMethod1() {
            return new privateClass();
        }
    }
    class privateClassWithWithPublicGetAccessorTypes {
        static get myPublicStaticMethod() {
            return null;
        }
        static get myPrivateStaticMethod() {
            return null;
        }
        get myPublicMethod() {
            return null;
        }
        get myPrivateMethod() {
            return null;
        }
        static get myPublicStaticMethod1() {
            return new publicClass();
        }
        static get myPrivateStaticMethod1() {
            return new publicClass();
        }
        get myPublicMethod1() {
            return new publicClass();
        }
        get myPrivateMethod1() {
            return new publicClass();
        }
    }
    class publicClassWithWithPrivateSetAccessorTypes {
        static set myPublicStaticMethod(param) {
        }
        static set myPrivateStaticMethod(param) {
        }
        set myPublicMethod(param) {
        }
        set myPrivateMethod(param) {
        }
    }
    privateModule.publicClassWithWithPrivateSetAccessorTypes = publicClassWithWithPrivateSetAccessorTypes;
    class publicClassWithWithPublicSetAccessorTypes {
        static set myPublicStaticMethod(param) {
        }
        static set myPrivateStaticMethod(param) {
        }
        set myPublicMethod(param) {
        }
        set myPrivateMethod(param) {
        }
    }
    privateModule.publicClassWithWithPublicSetAccessorTypes = publicClassWithWithPublicSetAccessorTypes;
    class privateClassWithWithPrivateSetAccessorTypes {
        static set myPublicStaticMethod(param) {
        }
        static set myPrivateStaticMethod(param) {
        }
        set myPublicMethod(param) {
        }
        set myPrivateMethod(param) {
        }
    }
    class privateClassWithWithPublicSetAccessorTypes {
        static set myPublicStaticMethod(param) {
        }
        static set myPrivateStaticMethod(param) {
        }
        set myPublicMethod(param) {
        }
        set myPrivateMethod(param) {
        }
    }
    class publicClassWithPrivateModuleGetAccessorTypes {
        static get myPublicStaticMethod() {
            return null;
        }
        get myPublicMethod() {
            return null;
        }
        static get myPublicStaticMethod1() {
            return new privateModule.publicClass();
        }
        get myPublicMethod1() {
            return new privateModule.publicClass();
        }
    }
    privateModule.publicClassWithPrivateModuleGetAccessorTypes = publicClassWithPrivateModuleGetAccessorTypes;
    class publicClassWithPrivateModuleSetAccessorTypes {
        static set myPublicStaticMethod(param) {
        }
        set myPublicMethod(param) {
        }
    }
    privateModule.publicClassWithPrivateModuleSetAccessorTypes = publicClassWithPrivateModuleSetAccessorTypes;
    class privateClassWithPrivateModuleGetAccessorTypes {
        static get myPublicStaticMethod() {
            return null;
        }
        get myPublicMethod() {
            return null;
        }
        static get myPublicStaticMethod1() {
            return new privateModule.publicClass();
        }
        get myPublicMethod1() {
            return new privateModule.publicClass();
        }
    }
    class privateClassWithPrivateModuleSetAccessorTypes {
        static set myPublicStaticMethod(param) {
        }
        set myPublicMethod(param) {
        }
    }
})(privateModule || (privateModule = {}));
//// [privacyAccessorDeclFile_GlobalFile.js]
class publicClassInGlobal {
}
class publicClassInGlobalWithPublicGetAccessorTypes {
    static get myPublicStaticMethod() {
        return null;
    }
    static get myPrivateStaticMethod() {
        return null;
    }
    get myPublicMethod() {
        return null;
    }
    get myPrivateMethod() {
        return null;
    }
    static get myPublicStaticMethod1() {
        return new publicClassInGlobal();
    }
    static get myPrivateStaticMethod1() {
        return new publicClassInGlobal();
    }
    get myPublicMethod1() {
        return new publicClassInGlobal();
    }
    get myPrivateMethod1() {
        return new publicClassInGlobal();
    }
}
class publicClassInGlobalWithWithPublicSetAccessorTypes {
    static set myPublicStaticMethod(param) {
    }
    static set myPrivateStaticMethod(param) {
    }
    set myPublicMethod(param) {
    }
    set myPrivateMethod(param) {
    }
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
        class publicClassWithWithPrivateGetAccessorTypes {
            static get myPublicStaticMethod() {
                return null;
            }
            static get myPrivateStaticMethod() {
                return null;
            }
            get myPublicMethod() {
                return null;
            }
            get myPrivateMethod() {
                return null;
            }
            static get myPublicStaticMethod1() {
                return new privateClass();
            }
            static get myPrivateStaticMethod1() {
                return new privateClass();
            }
            get myPublicMethod1() {
                return new privateClass();
            }
            get myPrivateMethod1() {
                return new privateClass();
            }
        }
        privateModule.publicClassWithWithPrivateGetAccessorTypes = publicClassWithWithPrivateGetAccessorTypes;
        class publicClassWithWithPublicGetAccessorTypes {
            static get myPublicStaticMethod() {
                return null;
            }
            static get myPrivateStaticMethod() {
                return null;
            }
            get myPublicMethod() {
                return null;
            }
            get myPrivateMethod() {
                return null;
            }
            static get myPublicStaticMethod1() {
                return new publicClass();
            }
            static get myPrivateStaticMethod1() {
                return new publicClass();
            }
            get myPublicMethod1() {
                return new publicClass();
            }
            get myPrivateMethod1() {
                return new publicClass();
            }
        }
        privateModule.publicClassWithWithPublicGetAccessorTypes = publicClassWithWithPublicGetAccessorTypes;
        class privateClassWithWithPrivateGetAccessorTypes {
            static get myPublicStaticMethod() {
                return null;
            }
            static get myPrivateStaticMethod() {
                return null;
            }
            get myPublicMethod() {
                return null;
            }
            get myPrivateMethod() {
                return null;
            }
            static get myPublicStaticMethod1() {
                return new privateClass();
            }
            static get myPrivateStaticMethod1() {
                return new privateClass();
            }
            get myPublicMethod1() {
                return new privateClass();
            }
            get myPrivateMethod1() {
                return new privateClass();
            }
        }
        class privateClassWithWithPublicGetAccessorTypes {
            static get myPublicStaticMethod() {
                return null;
            }
            static get myPrivateStaticMethod() {
                return null;
            }
            get myPublicMethod() {
                return null;
            }
            get myPrivateMethod() {
                return null;
            }
            static get myPublicStaticMethod1() {
                return new publicClass();
            }
            static get myPrivateStaticMethod1() {
                return new publicClass();
            }
            get myPublicMethod1() {
                return new publicClass();
            }
            get myPrivateMethod1() {
                return new publicClass();
            }
        }
        class publicClassWithWithPrivateSetAccessorTypes {
            static set myPublicStaticMethod(param) {
            }
            static set myPrivateStaticMethod(param) {
            }
            set myPublicMethod(param) {
            }
            set myPrivateMethod(param) {
            }
        }
        privateModule.publicClassWithWithPrivateSetAccessorTypes = publicClassWithWithPrivateSetAccessorTypes;
        class publicClassWithWithPublicSetAccessorTypes {
            static set myPublicStaticMethod(param) {
            }
            static set myPrivateStaticMethod(param) {
            }
            set myPublicMethod(param) {
            }
            set myPrivateMethod(param) {
            }
        }
        privateModule.publicClassWithWithPublicSetAccessorTypes = publicClassWithWithPublicSetAccessorTypes;
        class privateClassWithWithPrivateSetAccessorTypes {
            static set myPublicStaticMethod(param) {
            }
            static set myPrivateStaticMethod(param) {
            }
            set myPublicMethod(param) {
            }
            set myPrivateMethod(param) {
            }
        }
        class privateClassWithWithPublicSetAccessorTypes {
            static set myPublicStaticMethod(param) {
            }
            static set myPrivateStaticMethod(param) {
            }
            set myPublicMethod(param) {
            }
            set myPrivateMethod(param) {
            }
        }
        class publicClassWithPrivateModuleGetAccessorTypes {
            static get myPublicStaticMethod() {
                return null;
            }
            get myPublicMethod() {
                return null;
            }
            static get myPublicStaticMethod1() {
                return new privateModule.publicClass();
            }
            get myPublicMethod1() {
                return new privateModule.publicClass();
            }
        }
        privateModule.publicClassWithPrivateModuleGetAccessorTypes = publicClassWithPrivateModuleGetAccessorTypes;
        class publicClassWithPrivateModuleSetAccessorTypes {
            static set myPublicStaticMethod(param) {
            }
            set myPublicMethod(param) {
            }
        }
        privateModule.publicClassWithPrivateModuleSetAccessorTypes = publicClassWithPrivateModuleSetAccessorTypes;
        class privateClassWithPrivateModuleGetAccessorTypes {
            static get myPublicStaticMethod() {
                return null;
            }
            get myPublicMethod() {
                return null;
            }
            static get myPublicStaticMethod1() {
                return new privateModule.publicClass();
            }
            get myPublicMethod1() {
                return new privateModule.publicClass();
            }
        }
        class privateClassWithPrivateModuleSetAccessorTypes {
            static set myPublicStaticMethod(param) {
            }
            set myPublicMethod(param) {
            }
        }
    })(privateModule || (privateModule = {}));
    class publicClassWithWithPrivateGetAccessorTypes {
        static get myPublicStaticMethod() {
            return null;
        }
        static get myPrivateStaticMethod() {
            return null;
        }
        get myPublicMethod() {
            return null;
        }
        get myPrivateMethod() {
            return null;
        }
        static get myPublicStaticMethod1() {
            return new privateClass();
        }
        static get myPrivateStaticMethod1() {
            return new privateClass();
        }
        get myPublicMethod1() {
            return new privateClass();
        }
        get myPrivateMethod1() {
            return new privateClass();
        }
    }
    publicModuleInGlobal.publicClassWithWithPrivateGetAccessorTypes = publicClassWithWithPrivateGetAccessorTypes;
    class publicClassWithWithPublicGetAccessorTypes {
        static get myPublicStaticMethod() {
            return null;
        }
        static get myPrivateStaticMethod() {
            return null;
        }
        get myPublicMethod() {
            return null;
        }
        get myPrivateMethod() {
            return null;
        }
        static get myPublicStaticMethod1() {
            return new publicClass();
        }
        static get myPrivateStaticMethod1() {
            return new publicClass();
        }
        get myPublicMethod1() {
            return new publicClass();
        }
        get myPrivateMethod1() {
            return new publicClass();
        }
    }
    publicModuleInGlobal.publicClassWithWithPublicGetAccessorTypes = publicClassWithWithPublicGetAccessorTypes;
    class privateClassWithWithPrivateGetAccessorTypes {
        static get myPublicStaticMethod() {
            return null;
        }
        static get myPrivateStaticMethod() {
            return null;
        }
        get myPublicMethod() {
            return null;
        }
        get myPrivateMethod() {
            return null;
        }
        static get myPublicStaticMethod1() {
            return new privateClass();
        }
        static get myPrivateStaticMethod1() {
            return new privateClass();
        }
        get myPublicMethod1() {
            return new privateClass();
        }
        get myPrivateMethod1() {
            return new privateClass();
        }
    }
    class privateClassWithWithPublicGetAccessorTypes {
        static get myPublicStaticMethod() {
            return null;
        }
        static get myPrivateStaticMethod() {
            return null;
        }
        get myPublicMethod() {
            return null;
        }
        get myPrivateMethod() {
            return null;
        }
        static get myPublicStaticMethod1() {
            return new publicClass();
        }
        static get myPrivateStaticMethod1() {
            return new publicClass();
        }
        get myPublicMethod1() {
            return new publicClass();
        }
        get myPrivateMethod1() {
            return new publicClass();
        }
    }
    class publicClassWithWithPrivateSetAccessorTypes {
        static set myPublicStaticMethod(param) {
        }
        static set myPrivateStaticMethod(param) {
        }
        set myPublicMethod(param) {
        }
        set myPrivateMethod(param) {
        }
    }
    publicModuleInGlobal.publicClassWithWithPrivateSetAccessorTypes = publicClassWithWithPrivateSetAccessorTypes;
    class publicClassWithWithPublicSetAccessorTypes {
        static set myPublicStaticMethod(param) {
        }
        static set myPrivateStaticMethod(param) {
        }
        set myPublicMethod(param) {
        }
        set myPrivateMethod(param) {
        }
    }
    publicModuleInGlobal.publicClassWithWithPublicSetAccessorTypes = publicClassWithWithPublicSetAccessorTypes;
    class privateClassWithWithPrivateSetAccessorTypes {
        static set myPublicStaticMethod(param) {
        }
        static set myPrivateStaticMethod(param) {
        }
        set myPublicMethod(param) {
        }
        set myPrivateMethod(param) {
        }
    }
    class privateClassWithWithPublicSetAccessorTypes {
        static set myPublicStaticMethod(param) {
        }
        static set myPrivateStaticMethod(param) {
        }
        set myPublicMethod(param) {
        }
        set myPrivateMethod(param) {
        }
    }
    class publicClassWithPrivateModuleGetAccessorTypes {
        static get myPublicStaticMethod() {
            return null;
        }
        get myPublicMethod() {
            return null;
        }
        static get myPublicStaticMethod1() {
            return new privateModule.publicClass();
        }
        get myPublicMethod1() {
            return new privateModule.publicClass();
        }
    }
    publicModuleInGlobal.publicClassWithPrivateModuleGetAccessorTypes = publicClassWithPrivateModuleGetAccessorTypes;
    class publicClassWithPrivateModuleSetAccessorTypes {
        static set myPublicStaticMethod(param) {
        }
        set myPublicMethod(param) {
        }
    }
    publicModuleInGlobal.publicClassWithPrivateModuleSetAccessorTypes = publicClassWithPrivateModuleSetAccessorTypes;
    class privateClassWithPrivateModuleGetAccessorTypes {
        static get myPublicStaticMethod() {
            return null;
        }
        get myPublicMethod() {
            return null;
        }
        static get myPublicStaticMethod1() {
            return new privateModule.publicClass();
        }
        get myPublicMethod1() {
            return new privateModule.publicClass();
        }
    }
    class privateClassWithPrivateModuleSetAccessorTypes {
        static set myPublicStaticMethod(param) {
        }
        set myPublicMethod(param) {
        }
    }
})(publicModuleInGlobal || (publicModuleInGlobal = {}));
