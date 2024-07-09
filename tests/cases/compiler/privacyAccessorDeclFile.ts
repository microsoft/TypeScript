// @target: ES5
// @module: commonjs
// @declaration: true

// @Filename:privacyAccessorDeclFile_externalModule.ts
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

// @Filename: privacyAccessorDeclFile_GlobalFile.ts
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