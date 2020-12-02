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
var publicClassWithWithPrivateGetAccessorTypes = /** @class */ (function () {
    function publicClassWithWithPrivateGetAccessorTypes() {
    }
    var proto_1 = publicClassWithWithPrivateGetAccessorTypes.prototype;
    Object.defineProperty(publicClassWithWithPrivateGetAccessorTypes, "myPublicStaticMethod", {
        get: function () {
            return null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(publicClassWithWithPrivateGetAccessorTypes, "myPrivateStaticMethod", {
        get: function () {
            return null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(proto_1, "myPublicMethod", {
        get: function () {
            return null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(proto_1, "myPrivateMethod", {
        get: function () {
            return null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(publicClassWithWithPrivateGetAccessorTypes, "myPublicStaticMethod1", {
        get: function () {
            return new privateClass();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(publicClassWithWithPrivateGetAccessorTypes, "myPrivateStaticMethod1", {
        get: function () {
            return new privateClass();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(proto_1, "myPublicMethod1", {
        get: function () {
            return new privateClass();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(proto_1, "myPrivateMethod1", {
        get: function () {
            return new privateClass();
        },
        enumerable: false,
        configurable: true
    });
    return publicClassWithWithPrivateGetAccessorTypes;
}());
exports.publicClassWithWithPrivateGetAccessorTypes = publicClassWithWithPrivateGetAccessorTypes;
var publicClassWithWithPublicGetAccessorTypes = /** @class */ (function () {
    function publicClassWithWithPublicGetAccessorTypes() {
    }
    var proto_2 = publicClassWithWithPublicGetAccessorTypes.prototype;
    Object.defineProperty(publicClassWithWithPublicGetAccessorTypes, "myPublicStaticMethod", {
        get: function () {
            return null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(publicClassWithWithPublicGetAccessorTypes, "myPrivateStaticMethod", {
        get: function () {
            return null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(proto_2, "myPublicMethod", {
        get: function () {
            return null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(proto_2, "myPrivateMethod", {
        get: function () {
            return null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(publicClassWithWithPublicGetAccessorTypes, "myPublicStaticMethod1", {
        get: function () {
            return new publicClass();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(publicClassWithWithPublicGetAccessorTypes, "myPrivateStaticMethod1", {
        get: function () {
            return new publicClass();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(proto_2, "myPublicMethod1", {
        get: function () {
            return new publicClass();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(proto_2, "myPrivateMethod1", {
        get: function () {
            return new publicClass();
        },
        enumerable: false,
        configurable: true
    });
    return publicClassWithWithPublicGetAccessorTypes;
}());
exports.publicClassWithWithPublicGetAccessorTypes = publicClassWithWithPublicGetAccessorTypes;
var privateClassWithWithPrivateGetAccessorTypes = /** @class */ (function () {
    function privateClassWithWithPrivateGetAccessorTypes() {
    }
    var proto_3 = privateClassWithWithPrivateGetAccessorTypes.prototype;
    Object.defineProperty(privateClassWithWithPrivateGetAccessorTypes, "myPublicStaticMethod", {
        get: function () {
            return null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(privateClassWithWithPrivateGetAccessorTypes, "myPrivateStaticMethod", {
        get: function () {
            return null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(proto_3, "myPublicMethod", {
        get: function () {
            return null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(proto_3, "myPrivateMethod", {
        get: function () {
            return null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(privateClassWithWithPrivateGetAccessorTypes, "myPublicStaticMethod1", {
        get: function () {
            return new privateClass();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(privateClassWithWithPrivateGetAccessorTypes, "myPrivateStaticMethod1", {
        get: function () {
            return new privateClass();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(proto_3, "myPublicMethod1", {
        get: function () {
            return new privateClass();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(proto_3, "myPrivateMethod1", {
        get: function () {
            return new privateClass();
        },
        enumerable: false,
        configurable: true
    });
    return privateClassWithWithPrivateGetAccessorTypes;
}());
var privateClassWithWithPublicGetAccessorTypes = /** @class */ (function () {
    function privateClassWithWithPublicGetAccessorTypes() {
    }
    var proto_4 = privateClassWithWithPublicGetAccessorTypes.prototype;
    Object.defineProperty(privateClassWithWithPublicGetAccessorTypes, "myPublicStaticMethod", {
        get: function () {
            return null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(privateClassWithWithPublicGetAccessorTypes, "myPrivateStaticMethod", {
        get: function () {
            return null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(proto_4, "myPublicMethod", {
        get: function () {
            return null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(proto_4, "myPrivateMethod", {
        get: function () {
            return null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(privateClassWithWithPublicGetAccessorTypes, "myPublicStaticMethod1", {
        get: function () {
            return new publicClass();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(privateClassWithWithPublicGetAccessorTypes, "myPrivateStaticMethod1", {
        get: function () {
            return new publicClass();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(proto_4, "myPublicMethod1", {
        get: function () {
            return new publicClass();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(proto_4, "myPrivateMethod1", {
        get: function () {
            return new publicClass();
        },
        enumerable: false,
        configurable: true
    });
    return privateClassWithWithPublicGetAccessorTypes;
}());
var publicClassWithWithPrivateSetAccessorTypes = /** @class */ (function () {
    function publicClassWithWithPrivateSetAccessorTypes() {
    }
    var proto_5 = publicClassWithWithPrivateSetAccessorTypes.prototype;
    Object.defineProperty(publicClassWithWithPrivateSetAccessorTypes, "myPublicStaticMethod", {
        set: function (param) {
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(publicClassWithWithPrivateSetAccessorTypes, "myPrivateStaticMethod", {
        set: function (param) {
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(proto_5, "myPublicMethod", {
        set: function (param) {
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(proto_5, "myPrivateMethod", {
        set: function (param) {
        },
        enumerable: false,
        configurable: true
    });
    return publicClassWithWithPrivateSetAccessorTypes;
}());
exports.publicClassWithWithPrivateSetAccessorTypes = publicClassWithWithPrivateSetAccessorTypes;
var publicClassWithWithPublicSetAccessorTypes = /** @class */ (function () {
    function publicClassWithWithPublicSetAccessorTypes() {
    }
    var proto_6 = publicClassWithWithPublicSetAccessorTypes.prototype;
    Object.defineProperty(publicClassWithWithPublicSetAccessorTypes, "myPublicStaticMethod", {
        set: function (param) {
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(publicClassWithWithPublicSetAccessorTypes, "myPrivateStaticMethod", {
        set: function (param) {
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(proto_6, "myPublicMethod", {
        set: function (param) {
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(proto_6, "myPrivateMethod", {
        set: function (param) {
        },
        enumerable: false,
        configurable: true
    });
    return publicClassWithWithPublicSetAccessorTypes;
}());
exports.publicClassWithWithPublicSetAccessorTypes = publicClassWithWithPublicSetAccessorTypes;
var privateClassWithWithPrivateSetAccessorTypes = /** @class */ (function () {
    function privateClassWithWithPrivateSetAccessorTypes() {
    }
    var proto_7 = privateClassWithWithPrivateSetAccessorTypes.prototype;
    Object.defineProperty(privateClassWithWithPrivateSetAccessorTypes, "myPublicStaticMethod", {
        set: function (param) {
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(privateClassWithWithPrivateSetAccessorTypes, "myPrivateStaticMethod", {
        set: function (param) {
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(proto_7, "myPublicMethod", {
        set: function (param) {
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(proto_7, "myPrivateMethod", {
        set: function (param) {
        },
        enumerable: false,
        configurable: true
    });
    return privateClassWithWithPrivateSetAccessorTypes;
}());
var privateClassWithWithPublicSetAccessorTypes = /** @class */ (function () {
    function privateClassWithWithPublicSetAccessorTypes() {
    }
    var proto_8 = privateClassWithWithPublicSetAccessorTypes.prototype;
    Object.defineProperty(privateClassWithWithPublicSetAccessorTypes, "myPublicStaticMethod", {
        set: function (param) {
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(privateClassWithWithPublicSetAccessorTypes, "myPrivateStaticMethod", {
        set: function (param) {
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(proto_8, "myPublicMethod", {
        set: function (param) {
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(proto_8, "myPrivateMethod", {
        set: function (param) {
        },
        enumerable: false,
        configurable: true
    });
    return privateClassWithWithPublicSetAccessorTypes;
}());
var publicClassWithPrivateModuleGetAccessorTypes = /** @class */ (function () {
    function publicClassWithPrivateModuleGetAccessorTypes() {
    }
    var proto_9 = publicClassWithPrivateModuleGetAccessorTypes.prototype;
    Object.defineProperty(publicClassWithPrivateModuleGetAccessorTypes, "myPublicStaticMethod", {
        get: function () {
            return null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(proto_9, "myPublicMethod", {
        get: function () {
            return null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(publicClassWithPrivateModuleGetAccessorTypes, "myPublicStaticMethod1", {
        get: function () {
            return new privateModule.publicClass();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(proto_9, "myPublicMethod1", {
        get: function () {
            return new privateModule.publicClass();
        },
        enumerable: false,
        configurable: true
    });
    return publicClassWithPrivateModuleGetAccessorTypes;
}());
exports.publicClassWithPrivateModuleGetAccessorTypes = publicClassWithPrivateModuleGetAccessorTypes;
var publicClassWithPrivateModuleSetAccessorTypes = /** @class */ (function () {
    function publicClassWithPrivateModuleSetAccessorTypes() {
    }
    Object.defineProperty(publicClassWithPrivateModuleSetAccessorTypes, "myPublicStaticMethod", {
        set: function (param) {
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(publicClassWithPrivateModuleSetAccessorTypes.prototype, "myPublicMethod", {
        set: function (param) {
        },
        enumerable: false,
        configurable: true
    });
    return publicClassWithPrivateModuleSetAccessorTypes;
}());
exports.publicClassWithPrivateModuleSetAccessorTypes = publicClassWithPrivateModuleSetAccessorTypes;
var privateClassWithPrivateModuleGetAccessorTypes = /** @class */ (function () {
    function privateClassWithPrivateModuleGetAccessorTypes() {
    }
    var proto_10 = privateClassWithPrivateModuleGetAccessorTypes.prototype;
    Object.defineProperty(privateClassWithPrivateModuleGetAccessorTypes, "myPublicStaticMethod", {
        get: function () {
            return null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(proto_10, "myPublicMethod", {
        get: function () {
            return null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(privateClassWithPrivateModuleGetAccessorTypes, "myPublicStaticMethod1", {
        get: function () {
            return new privateModule.publicClass();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(proto_10, "myPublicMethod1", {
        get: function () {
            return new privateModule.publicClass();
        },
        enumerable: false,
        configurable: true
    });
    return privateClassWithPrivateModuleGetAccessorTypes;
}());
var privateClassWithPrivateModuleSetAccessorTypes = /** @class */ (function () {
    function privateClassWithPrivateModuleSetAccessorTypes() {
    }
    Object.defineProperty(privateClassWithPrivateModuleSetAccessorTypes, "myPublicStaticMethod", {
        set: function (param) {
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(privateClassWithPrivateModuleSetAccessorTypes.prototype, "myPublicMethod", {
        set: function (param) {
        },
        enumerable: false,
        configurable: true
    });
    return privateClassWithPrivateModuleSetAccessorTypes;
}());
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
    var publicClassWithWithPrivateGetAccessorTypes = /** @class */ (function () {
        function publicClassWithWithPrivateGetAccessorTypes() {
        }
        var proto_11 = publicClassWithWithPrivateGetAccessorTypes.prototype;
        Object.defineProperty(publicClassWithWithPrivateGetAccessorTypes, "myPublicStaticMethod", {
            get: function () {
                return null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(publicClassWithWithPrivateGetAccessorTypes, "myPrivateStaticMethod", {
            get: function () {
                return null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(proto_11, "myPublicMethod", {
            get: function () {
                return null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(proto_11, "myPrivateMethod", {
            get: function () {
                return null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(publicClassWithWithPrivateGetAccessorTypes, "myPublicStaticMethod1", {
            get: function () {
                return new privateClass();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(publicClassWithWithPrivateGetAccessorTypes, "myPrivateStaticMethod1", {
            get: function () {
                return new privateClass();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(proto_11, "myPublicMethod1", {
            get: function () {
                return new privateClass();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(proto_11, "myPrivateMethod1", {
            get: function () {
                return new privateClass();
            },
            enumerable: false,
            configurable: true
        });
        return publicClassWithWithPrivateGetAccessorTypes;
    }());
    publicModule.publicClassWithWithPrivateGetAccessorTypes = publicClassWithWithPrivateGetAccessorTypes;
    var publicClassWithWithPublicGetAccessorTypes = /** @class */ (function () {
        function publicClassWithWithPublicGetAccessorTypes() {
        }
        var proto_12 = publicClassWithWithPublicGetAccessorTypes.prototype;
        Object.defineProperty(publicClassWithWithPublicGetAccessorTypes, "myPublicStaticMethod", {
            get: function () {
                return null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(publicClassWithWithPublicGetAccessorTypes, "myPrivateStaticMethod", {
            get: function () {
                return null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(proto_12, "myPublicMethod", {
            get: function () {
                return null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(proto_12, "myPrivateMethod", {
            get: function () {
                return null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(publicClassWithWithPublicGetAccessorTypes, "myPublicStaticMethod1", {
            get: function () {
                return new publicClass();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(publicClassWithWithPublicGetAccessorTypes, "myPrivateStaticMethod1", {
            get: function () {
                return new publicClass();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(proto_12, "myPublicMethod1", {
            get: function () {
                return new publicClass();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(proto_12, "myPrivateMethod1", {
            get: function () {
                return new publicClass();
            },
            enumerable: false,
            configurable: true
        });
        return publicClassWithWithPublicGetAccessorTypes;
    }());
    publicModule.publicClassWithWithPublicGetAccessorTypes = publicClassWithWithPublicGetAccessorTypes;
    var privateClassWithWithPrivateGetAccessorTypes = /** @class */ (function () {
        function privateClassWithWithPrivateGetAccessorTypes() {
        }
        var proto_13 = privateClassWithWithPrivateGetAccessorTypes.prototype;
        Object.defineProperty(privateClassWithWithPrivateGetAccessorTypes, "myPublicStaticMethod", {
            get: function () {
                return null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(privateClassWithWithPrivateGetAccessorTypes, "myPrivateStaticMethod", {
            get: function () {
                return null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(proto_13, "myPublicMethod", {
            get: function () {
                return null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(proto_13, "myPrivateMethod", {
            get: function () {
                return null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(privateClassWithWithPrivateGetAccessorTypes, "myPublicStaticMethod1", {
            get: function () {
                return new privateClass();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(privateClassWithWithPrivateGetAccessorTypes, "myPrivateStaticMethod1", {
            get: function () {
                return new privateClass();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(proto_13, "myPublicMethod1", {
            get: function () {
                return new privateClass();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(proto_13, "myPrivateMethod1", {
            get: function () {
                return new privateClass();
            },
            enumerable: false,
            configurable: true
        });
        return privateClassWithWithPrivateGetAccessorTypes;
    }());
    var privateClassWithWithPublicGetAccessorTypes = /** @class */ (function () {
        function privateClassWithWithPublicGetAccessorTypes() {
        }
        var proto_14 = privateClassWithWithPublicGetAccessorTypes.prototype;
        Object.defineProperty(privateClassWithWithPublicGetAccessorTypes, "myPublicStaticMethod", {
            get: function () {
                return null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(privateClassWithWithPublicGetAccessorTypes, "myPrivateStaticMethod", {
            get: function () {
                return null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(proto_14, "myPublicMethod", {
            get: function () {
                return null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(proto_14, "myPrivateMethod", {
            get: function () {
                return null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(privateClassWithWithPublicGetAccessorTypes, "myPublicStaticMethod1", {
            get: function () {
                return new publicClass();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(privateClassWithWithPublicGetAccessorTypes, "myPrivateStaticMethod1", {
            get: function () {
                return new publicClass();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(proto_14, "myPublicMethod1", {
            get: function () {
                return new publicClass();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(proto_14, "myPrivateMethod1", {
            get: function () {
                return new publicClass();
            },
            enumerable: false,
            configurable: true
        });
        return privateClassWithWithPublicGetAccessorTypes;
    }());
    var publicClassWithWithPrivateSetAccessorTypes = /** @class */ (function () {
        function publicClassWithWithPrivateSetAccessorTypes() {
        }
        var proto_15 = publicClassWithWithPrivateSetAccessorTypes.prototype;
        Object.defineProperty(publicClassWithWithPrivateSetAccessorTypes, "myPublicStaticMethod", {
            set: function (param) {
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(publicClassWithWithPrivateSetAccessorTypes, "myPrivateStaticMethod", {
            set: function (param) {
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(proto_15, "myPublicMethod", {
            set: function (param) {
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(proto_15, "myPrivateMethod", {
            set: function (param) {
            },
            enumerable: false,
            configurable: true
        });
        return publicClassWithWithPrivateSetAccessorTypes;
    }());
    publicModule.publicClassWithWithPrivateSetAccessorTypes = publicClassWithWithPrivateSetAccessorTypes;
    var publicClassWithWithPublicSetAccessorTypes = /** @class */ (function () {
        function publicClassWithWithPublicSetAccessorTypes() {
        }
        var proto_16 = publicClassWithWithPublicSetAccessorTypes.prototype;
        Object.defineProperty(publicClassWithWithPublicSetAccessorTypes, "myPublicStaticMethod", {
            set: function (param) {
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(publicClassWithWithPublicSetAccessorTypes, "myPrivateStaticMethod", {
            set: function (param) {
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(proto_16, "myPublicMethod", {
            set: function (param) {
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(proto_16, "myPrivateMethod", {
            set: function (param) {
            },
            enumerable: false,
            configurable: true
        });
        return publicClassWithWithPublicSetAccessorTypes;
    }());
    publicModule.publicClassWithWithPublicSetAccessorTypes = publicClassWithWithPublicSetAccessorTypes;
    var privateClassWithWithPrivateSetAccessorTypes = /** @class */ (function () {
        function privateClassWithWithPrivateSetAccessorTypes() {
        }
        var proto_17 = privateClassWithWithPrivateSetAccessorTypes.prototype;
        Object.defineProperty(privateClassWithWithPrivateSetAccessorTypes, "myPublicStaticMethod", {
            set: function (param) {
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(privateClassWithWithPrivateSetAccessorTypes, "myPrivateStaticMethod", {
            set: function (param) {
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(proto_17, "myPublicMethod", {
            set: function (param) {
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(proto_17, "myPrivateMethod", {
            set: function (param) {
            },
            enumerable: false,
            configurable: true
        });
        return privateClassWithWithPrivateSetAccessorTypes;
    }());
    var privateClassWithWithPublicSetAccessorTypes = /** @class */ (function () {
        function privateClassWithWithPublicSetAccessorTypes() {
        }
        var proto_18 = privateClassWithWithPublicSetAccessorTypes.prototype;
        Object.defineProperty(privateClassWithWithPublicSetAccessorTypes, "myPublicStaticMethod", {
            set: function (param) {
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(privateClassWithWithPublicSetAccessorTypes, "myPrivateStaticMethod", {
            set: function (param) {
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(proto_18, "myPublicMethod", {
            set: function (param) {
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(proto_18, "myPrivateMethod", {
            set: function (param) {
            },
            enumerable: false,
            configurable: true
        });
        return privateClassWithWithPublicSetAccessorTypes;
    }());
    var publicClassWithPrivateModuleGetAccessorTypes = /** @class */ (function () {
        function publicClassWithPrivateModuleGetAccessorTypes() {
        }
        var proto_19 = publicClassWithPrivateModuleGetAccessorTypes.prototype;
        Object.defineProperty(publicClassWithPrivateModuleGetAccessorTypes, "myPublicStaticMethod", {
            get: function () {
                return null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(proto_19, "myPublicMethod", {
            get: function () {
                return null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(publicClassWithPrivateModuleGetAccessorTypes, "myPublicStaticMethod1", {
            get: function () {
                return new privateModule.publicClass();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(proto_19, "myPublicMethod1", {
            get: function () {
                return new privateModule.publicClass();
            },
            enumerable: false,
            configurable: true
        });
        return publicClassWithPrivateModuleGetAccessorTypes;
    }());
    publicModule.publicClassWithPrivateModuleGetAccessorTypes = publicClassWithPrivateModuleGetAccessorTypes;
    var publicClassWithPrivateModuleSetAccessorTypes = /** @class */ (function () {
        function publicClassWithPrivateModuleSetAccessorTypes() {
        }
        Object.defineProperty(publicClassWithPrivateModuleSetAccessorTypes, "myPublicStaticMethod", {
            set: function (param) {
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(publicClassWithPrivateModuleSetAccessorTypes.prototype, "myPublicMethod", {
            set: function (param) {
            },
            enumerable: false,
            configurable: true
        });
        return publicClassWithPrivateModuleSetAccessorTypes;
    }());
    publicModule.publicClassWithPrivateModuleSetAccessorTypes = publicClassWithPrivateModuleSetAccessorTypes;
    var privateClassWithPrivateModuleGetAccessorTypes = /** @class */ (function () {
        function privateClassWithPrivateModuleGetAccessorTypes() {
        }
        var proto_20 = privateClassWithPrivateModuleGetAccessorTypes.prototype;
        Object.defineProperty(privateClassWithPrivateModuleGetAccessorTypes, "myPublicStaticMethod", {
            get: function () {
                return null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(proto_20, "myPublicMethod", {
            get: function () {
                return null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(privateClassWithPrivateModuleGetAccessorTypes, "myPublicStaticMethod1", {
            get: function () {
                return new privateModule.publicClass();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(proto_20, "myPublicMethod1", {
            get: function () {
                return new privateModule.publicClass();
            },
            enumerable: false,
            configurable: true
        });
        return privateClassWithPrivateModuleGetAccessorTypes;
    }());
    var privateClassWithPrivateModuleSetAccessorTypes = /** @class */ (function () {
        function privateClassWithPrivateModuleSetAccessorTypes() {
        }
        Object.defineProperty(privateClassWithPrivateModuleSetAccessorTypes, "myPublicStaticMethod", {
            set: function (param) {
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(privateClassWithPrivateModuleSetAccessorTypes.prototype, "myPublicMethod", {
            set: function (param) {
            },
            enumerable: false,
            configurable: true
        });
        return privateClassWithPrivateModuleSetAccessorTypes;
    }());
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
    var publicClassWithWithPrivateGetAccessorTypes = /** @class */ (function () {
        function publicClassWithWithPrivateGetAccessorTypes() {
        }
        var proto_21 = publicClassWithWithPrivateGetAccessorTypes.prototype;
        Object.defineProperty(publicClassWithWithPrivateGetAccessorTypes, "myPublicStaticMethod", {
            get: function () {
                return null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(publicClassWithWithPrivateGetAccessorTypes, "myPrivateStaticMethod", {
            get: function () {
                return null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(proto_21, "myPublicMethod", {
            get: function () {
                return null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(proto_21, "myPrivateMethod", {
            get: function () {
                return null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(publicClassWithWithPrivateGetAccessorTypes, "myPublicStaticMethod1", {
            get: function () {
                return new privateClass();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(publicClassWithWithPrivateGetAccessorTypes, "myPrivateStaticMethod1", {
            get: function () {
                return new privateClass();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(proto_21, "myPublicMethod1", {
            get: function () {
                return new privateClass();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(proto_21, "myPrivateMethod1", {
            get: function () {
                return new privateClass();
            },
            enumerable: false,
            configurable: true
        });
        return publicClassWithWithPrivateGetAccessorTypes;
    }());
    privateModule.publicClassWithWithPrivateGetAccessorTypes = publicClassWithWithPrivateGetAccessorTypes;
    var publicClassWithWithPublicGetAccessorTypes = /** @class */ (function () {
        function publicClassWithWithPublicGetAccessorTypes() {
        }
        var proto_22 = publicClassWithWithPublicGetAccessorTypes.prototype;
        Object.defineProperty(publicClassWithWithPublicGetAccessorTypes, "myPublicStaticMethod", {
            get: function () {
                return null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(publicClassWithWithPublicGetAccessorTypes, "myPrivateStaticMethod", {
            get: function () {
                return null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(proto_22, "myPublicMethod", {
            get: function () {
                return null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(proto_22, "myPrivateMethod", {
            get: function () {
                return null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(publicClassWithWithPublicGetAccessorTypes, "myPublicStaticMethod1", {
            get: function () {
                return new publicClass();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(publicClassWithWithPublicGetAccessorTypes, "myPrivateStaticMethod1", {
            get: function () {
                return new publicClass();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(proto_22, "myPublicMethod1", {
            get: function () {
                return new publicClass();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(proto_22, "myPrivateMethod1", {
            get: function () {
                return new publicClass();
            },
            enumerable: false,
            configurable: true
        });
        return publicClassWithWithPublicGetAccessorTypes;
    }());
    privateModule.publicClassWithWithPublicGetAccessorTypes = publicClassWithWithPublicGetAccessorTypes;
    var privateClassWithWithPrivateGetAccessorTypes = /** @class */ (function () {
        function privateClassWithWithPrivateGetAccessorTypes() {
        }
        var proto_23 = privateClassWithWithPrivateGetAccessorTypes.prototype;
        Object.defineProperty(privateClassWithWithPrivateGetAccessorTypes, "myPublicStaticMethod", {
            get: function () {
                return null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(privateClassWithWithPrivateGetAccessorTypes, "myPrivateStaticMethod", {
            get: function () {
                return null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(proto_23, "myPublicMethod", {
            get: function () {
                return null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(proto_23, "myPrivateMethod", {
            get: function () {
                return null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(privateClassWithWithPrivateGetAccessorTypes, "myPublicStaticMethod1", {
            get: function () {
                return new privateClass();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(privateClassWithWithPrivateGetAccessorTypes, "myPrivateStaticMethod1", {
            get: function () {
                return new privateClass();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(proto_23, "myPublicMethod1", {
            get: function () {
                return new privateClass();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(proto_23, "myPrivateMethod1", {
            get: function () {
                return new privateClass();
            },
            enumerable: false,
            configurable: true
        });
        return privateClassWithWithPrivateGetAccessorTypes;
    }());
    var privateClassWithWithPublicGetAccessorTypes = /** @class */ (function () {
        function privateClassWithWithPublicGetAccessorTypes() {
        }
        var proto_24 = privateClassWithWithPublicGetAccessorTypes.prototype;
        Object.defineProperty(privateClassWithWithPublicGetAccessorTypes, "myPublicStaticMethod", {
            get: function () {
                return null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(privateClassWithWithPublicGetAccessorTypes, "myPrivateStaticMethod", {
            get: function () {
                return null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(proto_24, "myPublicMethod", {
            get: function () {
                return null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(proto_24, "myPrivateMethod", {
            get: function () {
                return null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(privateClassWithWithPublicGetAccessorTypes, "myPublicStaticMethod1", {
            get: function () {
                return new publicClass();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(privateClassWithWithPublicGetAccessorTypes, "myPrivateStaticMethod1", {
            get: function () {
                return new publicClass();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(proto_24, "myPublicMethod1", {
            get: function () {
                return new publicClass();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(proto_24, "myPrivateMethod1", {
            get: function () {
                return new publicClass();
            },
            enumerable: false,
            configurable: true
        });
        return privateClassWithWithPublicGetAccessorTypes;
    }());
    var publicClassWithWithPrivateSetAccessorTypes = /** @class */ (function () {
        function publicClassWithWithPrivateSetAccessorTypes() {
        }
        var proto_25 = publicClassWithWithPrivateSetAccessorTypes.prototype;
        Object.defineProperty(publicClassWithWithPrivateSetAccessorTypes, "myPublicStaticMethod", {
            set: function (param) {
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(publicClassWithWithPrivateSetAccessorTypes, "myPrivateStaticMethod", {
            set: function (param) {
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(proto_25, "myPublicMethod", {
            set: function (param) {
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(proto_25, "myPrivateMethod", {
            set: function (param) {
            },
            enumerable: false,
            configurable: true
        });
        return publicClassWithWithPrivateSetAccessorTypes;
    }());
    privateModule.publicClassWithWithPrivateSetAccessorTypes = publicClassWithWithPrivateSetAccessorTypes;
    var publicClassWithWithPublicSetAccessorTypes = /** @class */ (function () {
        function publicClassWithWithPublicSetAccessorTypes() {
        }
        var proto_26 = publicClassWithWithPublicSetAccessorTypes.prototype;
        Object.defineProperty(publicClassWithWithPublicSetAccessorTypes, "myPublicStaticMethod", {
            set: function (param) {
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(publicClassWithWithPublicSetAccessorTypes, "myPrivateStaticMethod", {
            set: function (param) {
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(proto_26, "myPublicMethod", {
            set: function (param) {
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(proto_26, "myPrivateMethod", {
            set: function (param) {
            },
            enumerable: false,
            configurable: true
        });
        return publicClassWithWithPublicSetAccessorTypes;
    }());
    privateModule.publicClassWithWithPublicSetAccessorTypes = publicClassWithWithPublicSetAccessorTypes;
    var privateClassWithWithPrivateSetAccessorTypes = /** @class */ (function () {
        function privateClassWithWithPrivateSetAccessorTypes() {
        }
        var proto_27 = privateClassWithWithPrivateSetAccessorTypes.prototype;
        Object.defineProperty(privateClassWithWithPrivateSetAccessorTypes, "myPublicStaticMethod", {
            set: function (param) {
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(privateClassWithWithPrivateSetAccessorTypes, "myPrivateStaticMethod", {
            set: function (param) {
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(proto_27, "myPublicMethod", {
            set: function (param) {
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(proto_27, "myPrivateMethod", {
            set: function (param) {
            },
            enumerable: false,
            configurable: true
        });
        return privateClassWithWithPrivateSetAccessorTypes;
    }());
    var privateClassWithWithPublicSetAccessorTypes = /** @class */ (function () {
        function privateClassWithWithPublicSetAccessorTypes() {
        }
        var proto_28 = privateClassWithWithPublicSetAccessorTypes.prototype;
        Object.defineProperty(privateClassWithWithPublicSetAccessorTypes, "myPublicStaticMethod", {
            set: function (param) {
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(privateClassWithWithPublicSetAccessorTypes, "myPrivateStaticMethod", {
            set: function (param) {
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(proto_28, "myPublicMethod", {
            set: function (param) {
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(proto_28, "myPrivateMethod", {
            set: function (param) {
            },
            enumerable: false,
            configurable: true
        });
        return privateClassWithWithPublicSetAccessorTypes;
    }());
    var publicClassWithPrivateModuleGetAccessorTypes = /** @class */ (function () {
        function publicClassWithPrivateModuleGetAccessorTypes() {
        }
        var proto_29 = publicClassWithPrivateModuleGetAccessorTypes.prototype;
        Object.defineProperty(publicClassWithPrivateModuleGetAccessorTypes, "myPublicStaticMethod", {
            get: function () {
                return null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(proto_29, "myPublicMethod", {
            get: function () {
                return null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(publicClassWithPrivateModuleGetAccessorTypes, "myPublicStaticMethod1", {
            get: function () {
                return new privateModule.publicClass();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(proto_29, "myPublicMethod1", {
            get: function () {
                return new privateModule.publicClass();
            },
            enumerable: false,
            configurable: true
        });
        return publicClassWithPrivateModuleGetAccessorTypes;
    }());
    privateModule.publicClassWithPrivateModuleGetAccessorTypes = publicClassWithPrivateModuleGetAccessorTypes;
    var publicClassWithPrivateModuleSetAccessorTypes = /** @class */ (function () {
        function publicClassWithPrivateModuleSetAccessorTypes() {
        }
        Object.defineProperty(publicClassWithPrivateModuleSetAccessorTypes, "myPublicStaticMethod", {
            set: function (param) {
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(publicClassWithPrivateModuleSetAccessorTypes.prototype, "myPublicMethod", {
            set: function (param) {
            },
            enumerable: false,
            configurable: true
        });
        return publicClassWithPrivateModuleSetAccessorTypes;
    }());
    privateModule.publicClassWithPrivateModuleSetAccessorTypes = publicClassWithPrivateModuleSetAccessorTypes;
    var privateClassWithPrivateModuleGetAccessorTypes = /** @class */ (function () {
        function privateClassWithPrivateModuleGetAccessorTypes() {
        }
        var proto_30 = privateClassWithPrivateModuleGetAccessorTypes.prototype;
        Object.defineProperty(privateClassWithPrivateModuleGetAccessorTypes, "myPublicStaticMethod", {
            get: function () {
                return null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(proto_30, "myPublicMethod", {
            get: function () {
                return null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(privateClassWithPrivateModuleGetAccessorTypes, "myPublicStaticMethod1", {
            get: function () {
                return new privateModule.publicClass();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(proto_30, "myPublicMethod1", {
            get: function () {
                return new privateModule.publicClass();
            },
            enumerable: false,
            configurable: true
        });
        return privateClassWithPrivateModuleGetAccessorTypes;
    }());
    var privateClassWithPrivateModuleSetAccessorTypes = /** @class */ (function () {
        function privateClassWithPrivateModuleSetAccessorTypes() {
        }
        Object.defineProperty(privateClassWithPrivateModuleSetAccessorTypes, "myPublicStaticMethod", {
            set: function (param) {
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(privateClassWithPrivateModuleSetAccessorTypes.prototype, "myPublicMethod", {
            set: function (param) {
            },
            enumerable: false,
            configurable: true
        });
        return privateClassWithPrivateModuleSetAccessorTypes;
    }());
})(privateModule || (privateModule = {}));
//// [privacyAccessorDeclFile_GlobalFile.js]
var publicClassInGlobal = /** @class */ (function () {
    function publicClassInGlobal() {
    }
    return publicClassInGlobal;
}());
var publicClassInGlobalWithPublicGetAccessorTypes = /** @class */ (function () {
    function publicClassInGlobalWithPublicGetAccessorTypes() {
    }
    var proto_1 = publicClassInGlobalWithPublicGetAccessorTypes.prototype;
    Object.defineProperty(publicClassInGlobalWithPublicGetAccessorTypes, "myPublicStaticMethod", {
        get: function () {
            return null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(publicClassInGlobalWithPublicGetAccessorTypes, "myPrivateStaticMethod", {
        get: function () {
            return null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(proto_1, "myPublicMethod", {
        get: function () {
            return null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(proto_1, "myPrivateMethod", {
        get: function () {
            return null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(publicClassInGlobalWithPublicGetAccessorTypes, "myPublicStaticMethod1", {
        get: function () {
            return new publicClassInGlobal();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(publicClassInGlobalWithPublicGetAccessorTypes, "myPrivateStaticMethod1", {
        get: function () {
            return new publicClassInGlobal();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(proto_1, "myPublicMethod1", {
        get: function () {
            return new publicClassInGlobal();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(proto_1, "myPrivateMethod1", {
        get: function () {
            return new publicClassInGlobal();
        },
        enumerable: false,
        configurable: true
    });
    return publicClassInGlobalWithPublicGetAccessorTypes;
}());
var publicClassInGlobalWithWithPublicSetAccessorTypes = /** @class */ (function () {
    function publicClassInGlobalWithWithPublicSetAccessorTypes() {
    }
    var proto_2 = publicClassInGlobalWithWithPublicSetAccessorTypes.prototype;
    Object.defineProperty(publicClassInGlobalWithWithPublicSetAccessorTypes, "myPublicStaticMethod", {
        set: function (param) {
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(publicClassInGlobalWithWithPublicSetAccessorTypes, "myPrivateStaticMethod", {
        set: function (param) {
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(proto_2, "myPublicMethod", {
        set: function (param) {
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(proto_2, "myPrivateMethod", {
        set: function (param) {
        },
        enumerable: false,
        configurable: true
    });
    return publicClassInGlobalWithWithPublicSetAccessorTypes;
}());
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
        var publicClassWithWithPrivateGetAccessorTypes = /** @class */ (function () {
            function publicClassWithWithPrivateGetAccessorTypes() {
            }
            var proto_3 = publicClassWithWithPrivateGetAccessorTypes.prototype;
            Object.defineProperty(publicClassWithWithPrivateGetAccessorTypes, "myPublicStaticMethod", {
                get: function () {
                    return null;
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(publicClassWithWithPrivateGetAccessorTypes, "myPrivateStaticMethod", {
                get: function () {
                    return null;
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(proto_3, "myPublicMethod", {
                get: function () {
                    return null;
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(proto_3, "myPrivateMethod", {
                get: function () {
                    return null;
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(publicClassWithWithPrivateGetAccessorTypes, "myPublicStaticMethod1", {
                get: function () {
                    return new privateClass();
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(publicClassWithWithPrivateGetAccessorTypes, "myPrivateStaticMethod1", {
                get: function () {
                    return new privateClass();
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(proto_3, "myPublicMethod1", {
                get: function () {
                    return new privateClass();
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(proto_3, "myPrivateMethod1", {
                get: function () {
                    return new privateClass();
                },
                enumerable: false,
                configurable: true
            });
            return publicClassWithWithPrivateGetAccessorTypes;
        }());
        privateModule.publicClassWithWithPrivateGetAccessorTypes = publicClassWithWithPrivateGetAccessorTypes;
        var publicClassWithWithPublicGetAccessorTypes = /** @class */ (function () {
            function publicClassWithWithPublicGetAccessorTypes() {
            }
            var proto_4 = publicClassWithWithPublicGetAccessorTypes.prototype;
            Object.defineProperty(publicClassWithWithPublicGetAccessorTypes, "myPublicStaticMethod", {
                get: function () {
                    return null;
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(publicClassWithWithPublicGetAccessorTypes, "myPrivateStaticMethod", {
                get: function () {
                    return null;
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(proto_4, "myPublicMethod", {
                get: function () {
                    return null;
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(proto_4, "myPrivateMethod", {
                get: function () {
                    return null;
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(publicClassWithWithPublicGetAccessorTypes, "myPublicStaticMethod1", {
                get: function () {
                    return new publicClass();
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(publicClassWithWithPublicGetAccessorTypes, "myPrivateStaticMethod1", {
                get: function () {
                    return new publicClass();
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(proto_4, "myPublicMethod1", {
                get: function () {
                    return new publicClass();
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(proto_4, "myPrivateMethod1", {
                get: function () {
                    return new publicClass();
                },
                enumerable: false,
                configurable: true
            });
            return publicClassWithWithPublicGetAccessorTypes;
        }());
        privateModule.publicClassWithWithPublicGetAccessorTypes = publicClassWithWithPublicGetAccessorTypes;
        var privateClassWithWithPrivateGetAccessorTypes = /** @class */ (function () {
            function privateClassWithWithPrivateGetAccessorTypes() {
            }
            var proto_5 = privateClassWithWithPrivateGetAccessorTypes.prototype;
            Object.defineProperty(privateClassWithWithPrivateGetAccessorTypes, "myPublicStaticMethod", {
                get: function () {
                    return null;
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(privateClassWithWithPrivateGetAccessorTypes, "myPrivateStaticMethod", {
                get: function () {
                    return null;
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(proto_5, "myPublicMethod", {
                get: function () {
                    return null;
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(proto_5, "myPrivateMethod", {
                get: function () {
                    return null;
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(privateClassWithWithPrivateGetAccessorTypes, "myPublicStaticMethod1", {
                get: function () {
                    return new privateClass();
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(privateClassWithWithPrivateGetAccessorTypes, "myPrivateStaticMethod1", {
                get: function () {
                    return new privateClass();
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(proto_5, "myPublicMethod1", {
                get: function () {
                    return new privateClass();
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(proto_5, "myPrivateMethod1", {
                get: function () {
                    return new privateClass();
                },
                enumerable: false,
                configurable: true
            });
            return privateClassWithWithPrivateGetAccessorTypes;
        }());
        var privateClassWithWithPublicGetAccessorTypes = /** @class */ (function () {
            function privateClassWithWithPublicGetAccessorTypes() {
            }
            var proto_6 = privateClassWithWithPublicGetAccessorTypes.prototype;
            Object.defineProperty(privateClassWithWithPublicGetAccessorTypes, "myPublicStaticMethod", {
                get: function () {
                    return null;
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(privateClassWithWithPublicGetAccessorTypes, "myPrivateStaticMethod", {
                get: function () {
                    return null;
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(proto_6, "myPublicMethod", {
                get: function () {
                    return null;
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(proto_6, "myPrivateMethod", {
                get: function () {
                    return null;
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(privateClassWithWithPublicGetAccessorTypes, "myPublicStaticMethod1", {
                get: function () {
                    return new publicClass();
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(privateClassWithWithPublicGetAccessorTypes, "myPrivateStaticMethod1", {
                get: function () {
                    return new publicClass();
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(proto_6, "myPublicMethod1", {
                get: function () {
                    return new publicClass();
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(proto_6, "myPrivateMethod1", {
                get: function () {
                    return new publicClass();
                },
                enumerable: false,
                configurable: true
            });
            return privateClassWithWithPublicGetAccessorTypes;
        }());
        var publicClassWithWithPrivateSetAccessorTypes = /** @class */ (function () {
            function publicClassWithWithPrivateSetAccessorTypes() {
            }
            var proto_7 = publicClassWithWithPrivateSetAccessorTypes.prototype;
            Object.defineProperty(publicClassWithWithPrivateSetAccessorTypes, "myPublicStaticMethod", {
                set: function (param) {
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(publicClassWithWithPrivateSetAccessorTypes, "myPrivateStaticMethod", {
                set: function (param) {
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(proto_7, "myPublicMethod", {
                set: function (param) {
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(proto_7, "myPrivateMethod", {
                set: function (param) {
                },
                enumerable: false,
                configurable: true
            });
            return publicClassWithWithPrivateSetAccessorTypes;
        }());
        privateModule.publicClassWithWithPrivateSetAccessorTypes = publicClassWithWithPrivateSetAccessorTypes;
        var publicClassWithWithPublicSetAccessorTypes = /** @class */ (function () {
            function publicClassWithWithPublicSetAccessorTypes() {
            }
            var proto_8 = publicClassWithWithPublicSetAccessorTypes.prototype;
            Object.defineProperty(publicClassWithWithPublicSetAccessorTypes, "myPublicStaticMethod", {
                set: function (param) {
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(publicClassWithWithPublicSetAccessorTypes, "myPrivateStaticMethod", {
                set: function (param) {
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(proto_8, "myPublicMethod", {
                set: function (param) {
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(proto_8, "myPrivateMethod", {
                set: function (param) {
                },
                enumerable: false,
                configurable: true
            });
            return publicClassWithWithPublicSetAccessorTypes;
        }());
        privateModule.publicClassWithWithPublicSetAccessorTypes = publicClassWithWithPublicSetAccessorTypes;
        var privateClassWithWithPrivateSetAccessorTypes = /** @class */ (function () {
            function privateClassWithWithPrivateSetAccessorTypes() {
            }
            var proto_9 = privateClassWithWithPrivateSetAccessorTypes.prototype;
            Object.defineProperty(privateClassWithWithPrivateSetAccessorTypes, "myPublicStaticMethod", {
                set: function (param) {
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(privateClassWithWithPrivateSetAccessorTypes, "myPrivateStaticMethod", {
                set: function (param) {
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(proto_9, "myPublicMethod", {
                set: function (param) {
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(proto_9, "myPrivateMethod", {
                set: function (param) {
                },
                enumerable: false,
                configurable: true
            });
            return privateClassWithWithPrivateSetAccessorTypes;
        }());
        var privateClassWithWithPublicSetAccessorTypes = /** @class */ (function () {
            function privateClassWithWithPublicSetAccessorTypes() {
            }
            var proto_10 = privateClassWithWithPublicSetAccessorTypes.prototype;
            Object.defineProperty(privateClassWithWithPublicSetAccessorTypes, "myPublicStaticMethod", {
                set: function (param) {
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(privateClassWithWithPublicSetAccessorTypes, "myPrivateStaticMethod", {
                set: function (param) {
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(proto_10, "myPublicMethod", {
                set: function (param) {
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(proto_10, "myPrivateMethod", {
                set: function (param) {
                },
                enumerable: false,
                configurable: true
            });
            return privateClassWithWithPublicSetAccessorTypes;
        }());
        var publicClassWithPrivateModuleGetAccessorTypes = /** @class */ (function () {
            function publicClassWithPrivateModuleGetAccessorTypes() {
            }
            var proto_11 = publicClassWithPrivateModuleGetAccessorTypes.prototype;
            Object.defineProperty(publicClassWithPrivateModuleGetAccessorTypes, "myPublicStaticMethod", {
                get: function () {
                    return null;
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(proto_11, "myPublicMethod", {
                get: function () {
                    return null;
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(publicClassWithPrivateModuleGetAccessorTypes, "myPublicStaticMethod1", {
                get: function () {
                    return new privateModule.publicClass();
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(proto_11, "myPublicMethod1", {
                get: function () {
                    return new privateModule.publicClass();
                },
                enumerable: false,
                configurable: true
            });
            return publicClassWithPrivateModuleGetAccessorTypes;
        }());
        privateModule.publicClassWithPrivateModuleGetAccessorTypes = publicClassWithPrivateModuleGetAccessorTypes;
        var publicClassWithPrivateModuleSetAccessorTypes = /** @class */ (function () {
            function publicClassWithPrivateModuleSetAccessorTypes() {
            }
            Object.defineProperty(publicClassWithPrivateModuleSetAccessorTypes, "myPublicStaticMethod", {
                set: function (param) {
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(publicClassWithPrivateModuleSetAccessorTypes.prototype, "myPublicMethod", {
                set: function (param) {
                },
                enumerable: false,
                configurable: true
            });
            return publicClassWithPrivateModuleSetAccessorTypes;
        }());
        privateModule.publicClassWithPrivateModuleSetAccessorTypes = publicClassWithPrivateModuleSetAccessorTypes;
        var privateClassWithPrivateModuleGetAccessorTypes = /** @class */ (function () {
            function privateClassWithPrivateModuleGetAccessorTypes() {
            }
            var proto_12 = privateClassWithPrivateModuleGetAccessorTypes.prototype;
            Object.defineProperty(privateClassWithPrivateModuleGetAccessorTypes, "myPublicStaticMethod", {
                get: function () {
                    return null;
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(proto_12, "myPublicMethod", {
                get: function () {
                    return null;
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(privateClassWithPrivateModuleGetAccessorTypes, "myPublicStaticMethod1", {
                get: function () {
                    return new privateModule.publicClass();
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(proto_12, "myPublicMethod1", {
                get: function () {
                    return new privateModule.publicClass();
                },
                enumerable: false,
                configurable: true
            });
            return privateClassWithPrivateModuleGetAccessorTypes;
        }());
        var privateClassWithPrivateModuleSetAccessorTypes = /** @class */ (function () {
            function privateClassWithPrivateModuleSetAccessorTypes() {
            }
            Object.defineProperty(privateClassWithPrivateModuleSetAccessorTypes, "myPublicStaticMethod", {
                set: function (param) {
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(privateClassWithPrivateModuleSetAccessorTypes.prototype, "myPublicMethod", {
                set: function (param) {
                },
                enumerable: false,
                configurable: true
            });
            return privateClassWithPrivateModuleSetAccessorTypes;
        }());
    })(privateModule || (privateModule = {}));
    var publicClassWithWithPrivateGetAccessorTypes = /** @class */ (function () {
        function publicClassWithWithPrivateGetAccessorTypes() {
        }
        var proto_13 = publicClassWithWithPrivateGetAccessorTypes.prototype;
        Object.defineProperty(publicClassWithWithPrivateGetAccessorTypes, "myPublicStaticMethod", {
            get: function () {
                return null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(publicClassWithWithPrivateGetAccessorTypes, "myPrivateStaticMethod", {
            get: function () {
                return null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(proto_13, "myPublicMethod", {
            get: function () {
                return null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(proto_13, "myPrivateMethod", {
            get: function () {
                return null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(publicClassWithWithPrivateGetAccessorTypes, "myPublicStaticMethod1", {
            get: function () {
                return new privateClass();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(publicClassWithWithPrivateGetAccessorTypes, "myPrivateStaticMethod1", {
            get: function () {
                return new privateClass();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(proto_13, "myPublicMethod1", {
            get: function () {
                return new privateClass();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(proto_13, "myPrivateMethod1", {
            get: function () {
                return new privateClass();
            },
            enumerable: false,
            configurable: true
        });
        return publicClassWithWithPrivateGetAccessorTypes;
    }());
    publicModuleInGlobal.publicClassWithWithPrivateGetAccessorTypes = publicClassWithWithPrivateGetAccessorTypes;
    var publicClassWithWithPublicGetAccessorTypes = /** @class */ (function () {
        function publicClassWithWithPublicGetAccessorTypes() {
        }
        var proto_14 = publicClassWithWithPublicGetAccessorTypes.prototype;
        Object.defineProperty(publicClassWithWithPublicGetAccessorTypes, "myPublicStaticMethod", {
            get: function () {
                return null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(publicClassWithWithPublicGetAccessorTypes, "myPrivateStaticMethod", {
            get: function () {
                return null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(proto_14, "myPublicMethod", {
            get: function () {
                return null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(proto_14, "myPrivateMethod", {
            get: function () {
                return null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(publicClassWithWithPublicGetAccessorTypes, "myPublicStaticMethod1", {
            get: function () {
                return new publicClass();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(publicClassWithWithPublicGetAccessorTypes, "myPrivateStaticMethod1", {
            get: function () {
                return new publicClass();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(proto_14, "myPublicMethod1", {
            get: function () {
                return new publicClass();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(proto_14, "myPrivateMethod1", {
            get: function () {
                return new publicClass();
            },
            enumerable: false,
            configurable: true
        });
        return publicClassWithWithPublicGetAccessorTypes;
    }());
    publicModuleInGlobal.publicClassWithWithPublicGetAccessorTypes = publicClassWithWithPublicGetAccessorTypes;
    var privateClassWithWithPrivateGetAccessorTypes = /** @class */ (function () {
        function privateClassWithWithPrivateGetAccessorTypes() {
        }
        var proto_15 = privateClassWithWithPrivateGetAccessorTypes.prototype;
        Object.defineProperty(privateClassWithWithPrivateGetAccessorTypes, "myPublicStaticMethod", {
            get: function () {
                return null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(privateClassWithWithPrivateGetAccessorTypes, "myPrivateStaticMethod", {
            get: function () {
                return null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(proto_15, "myPublicMethod", {
            get: function () {
                return null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(proto_15, "myPrivateMethod", {
            get: function () {
                return null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(privateClassWithWithPrivateGetAccessorTypes, "myPublicStaticMethod1", {
            get: function () {
                return new privateClass();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(privateClassWithWithPrivateGetAccessorTypes, "myPrivateStaticMethod1", {
            get: function () {
                return new privateClass();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(proto_15, "myPublicMethod1", {
            get: function () {
                return new privateClass();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(proto_15, "myPrivateMethod1", {
            get: function () {
                return new privateClass();
            },
            enumerable: false,
            configurable: true
        });
        return privateClassWithWithPrivateGetAccessorTypes;
    }());
    var privateClassWithWithPublicGetAccessorTypes = /** @class */ (function () {
        function privateClassWithWithPublicGetAccessorTypes() {
        }
        var proto_16 = privateClassWithWithPublicGetAccessorTypes.prototype;
        Object.defineProperty(privateClassWithWithPublicGetAccessorTypes, "myPublicStaticMethod", {
            get: function () {
                return null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(privateClassWithWithPublicGetAccessorTypes, "myPrivateStaticMethod", {
            get: function () {
                return null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(proto_16, "myPublicMethod", {
            get: function () {
                return null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(proto_16, "myPrivateMethod", {
            get: function () {
                return null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(privateClassWithWithPublicGetAccessorTypes, "myPublicStaticMethod1", {
            get: function () {
                return new publicClass();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(privateClassWithWithPublicGetAccessorTypes, "myPrivateStaticMethod1", {
            get: function () {
                return new publicClass();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(proto_16, "myPublicMethod1", {
            get: function () {
                return new publicClass();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(proto_16, "myPrivateMethod1", {
            get: function () {
                return new publicClass();
            },
            enumerable: false,
            configurable: true
        });
        return privateClassWithWithPublicGetAccessorTypes;
    }());
    var publicClassWithWithPrivateSetAccessorTypes = /** @class */ (function () {
        function publicClassWithWithPrivateSetAccessorTypes() {
        }
        var proto_17 = publicClassWithWithPrivateSetAccessorTypes.prototype;
        Object.defineProperty(publicClassWithWithPrivateSetAccessorTypes, "myPublicStaticMethod", {
            set: function (param) {
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(publicClassWithWithPrivateSetAccessorTypes, "myPrivateStaticMethod", {
            set: function (param) {
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(proto_17, "myPublicMethod", {
            set: function (param) {
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(proto_17, "myPrivateMethod", {
            set: function (param) {
            },
            enumerable: false,
            configurable: true
        });
        return publicClassWithWithPrivateSetAccessorTypes;
    }());
    publicModuleInGlobal.publicClassWithWithPrivateSetAccessorTypes = publicClassWithWithPrivateSetAccessorTypes;
    var publicClassWithWithPublicSetAccessorTypes = /** @class */ (function () {
        function publicClassWithWithPublicSetAccessorTypes() {
        }
        var proto_18 = publicClassWithWithPublicSetAccessorTypes.prototype;
        Object.defineProperty(publicClassWithWithPublicSetAccessorTypes, "myPublicStaticMethod", {
            set: function (param) {
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(publicClassWithWithPublicSetAccessorTypes, "myPrivateStaticMethod", {
            set: function (param) {
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(proto_18, "myPublicMethod", {
            set: function (param) {
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(proto_18, "myPrivateMethod", {
            set: function (param) {
            },
            enumerable: false,
            configurable: true
        });
        return publicClassWithWithPublicSetAccessorTypes;
    }());
    publicModuleInGlobal.publicClassWithWithPublicSetAccessorTypes = publicClassWithWithPublicSetAccessorTypes;
    var privateClassWithWithPrivateSetAccessorTypes = /** @class */ (function () {
        function privateClassWithWithPrivateSetAccessorTypes() {
        }
        var proto_19 = privateClassWithWithPrivateSetAccessorTypes.prototype;
        Object.defineProperty(privateClassWithWithPrivateSetAccessorTypes, "myPublicStaticMethod", {
            set: function (param) {
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(privateClassWithWithPrivateSetAccessorTypes, "myPrivateStaticMethod", {
            set: function (param) {
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(proto_19, "myPublicMethod", {
            set: function (param) {
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(proto_19, "myPrivateMethod", {
            set: function (param) {
            },
            enumerable: false,
            configurable: true
        });
        return privateClassWithWithPrivateSetAccessorTypes;
    }());
    var privateClassWithWithPublicSetAccessorTypes = /** @class */ (function () {
        function privateClassWithWithPublicSetAccessorTypes() {
        }
        var proto_20 = privateClassWithWithPublicSetAccessorTypes.prototype;
        Object.defineProperty(privateClassWithWithPublicSetAccessorTypes, "myPublicStaticMethod", {
            set: function (param) {
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(privateClassWithWithPublicSetAccessorTypes, "myPrivateStaticMethod", {
            set: function (param) {
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(proto_20, "myPublicMethod", {
            set: function (param) {
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(proto_20, "myPrivateMethod", {
            set: function (param) {
            },
            enumerable: false,
            configurable: true
        });
        return privateClassWithWithPublicSetAccessorTypes;
    }());
    var publicClassWithPrivateModuleGetAccessorTypes = /** @class */ (function () {
        function publicClassWithPrivateModuleGetAccessorTypes() {
        }
        var proto_21 = publicClassWithPrivateModuleGetAccessorTypes.prototype;
        Object.defineProperty(publicClassWithPrivateModuleGetAccessorTypes, "myPublicStaticMethod", {
            get: function () {
                return null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(proto_21, "myPublicMethod", {
            get: function () {
                return null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(publicClassWithPrivateModuleGetAccessorTypes, "myPublicStaticMethod1", {
            get: function () {
                return new privateModule.publicClass();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(proto_21, "myPublicMethod1", {
            get: function () {
                return new privateModule.publicClass();
            },
            enumerable: false,
            configurable: true
        });
        return publicClassWithPrivateModuleGetAccessorTypes;
    }());
    publicModuleInGlobal.publicClassWithPrivateModuleGetAccessorTypes = publicClassWithPrivateModuleGetAccessorTypes;
    var publicClassWithPrivateModuleSetAccessorTypes = /** @class */ (function () {
        function publicClassWithPrivateModuleSetAccessorTypes() {
        }
        Object.defineProperty(publicClassWithPrivateModuleSetAccessorTypes, "myPublicStaticMethod", {
            set: function (param) {
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(publicClassWithPrivateModuleSetAccessorTypes.prototype, "myPublicMethod", {
            set: function (param) {
            },
            enumerable: false,
            configurable: true
        });
        return publicClassWithPrivateModuleSetAccessorTypes;
    }());
    publicModuleInGlobal.publicClassWithPrivateModuleSetAccessorTypes = publicClassWithPrivateModuleSetAccessorTypes;
    var privateClassWithPrivateModuleGetAccessorTypes = /** @class */ (function () {
        function privateClassWithPrivateModuleGetAccessorTypes() {
        }
        var proto_22 = privateClassWithPrivateModuleGetAccessorTypes.prototype;
        Object.defineProperty(privateClassWithPrivateModuleGetAccessorTypes, "myPublicStaticMethod", {
            get: function () {
                return null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(proto_22, "myPublicMethod", {
            get: function () {
                return null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(privateClassWithPrivateModuleGetAccessorTypes, "myPublicStaticMethod1", {
            get: function () {
                return new privateModule.publicClass();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(proto_22, "myPublicMethod1", {
            get: function () {
                return new privateModule.publicClass();
            },
            enumerable: false,
            configurable: true
        });
        return privateClassWithPrivateModuleGetAccessorTypes;
    }());
    var privateClassWithPrivateModuleSetAccessorTypes = /** @class */ (function () {
        function privateClassWithPrivateModuleSetAccessorTypes() {
        }
        Object.defineProperty(privateClassWithPrivateModuleSetAccessorTypes, "myPublicStaticMethod", {
            set: function (param) {
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(privateClassWithPrivateModuleSetAccessorTypes.prototype, "myPublicMethod", {
            set: function (param) {
            },
            enumerable: false,
            configurable: true
        });
        return privateClassWithPrivateModuleSetAccessorTypes;
    }());
})(publicModuleInGlobal || (publicModuleInGlobal = {}));


//// [privacyAccessorDeclFile_externalModule.d.ts]
declare class privateClass {
}
export declare class publicClass {
}
export declare class publicClassWithWithPrivateGetAccessorTypes {
    static get myPublicStaticMethod(): privateClass;
    private static get myPrivateStaticMethod();
    get myPublicMethod(): privateClass;
    private get myPrivateMethod();
    static get myPublicStaticMethod1(): privateClass;
    private static get myPrivateStaticMethod1();
    get myPublicMethod1(): privateClass;
    private get myPrivateMethod1();
}
export declare class publicClassWithWithPublicGetAccessorTypes {
    static get myPublicStaticMethod(): publicClass;
    private static get myPrivateStaticMethod();
    get myPublicMethod(): publicClass;
    private get myPrivateMethod();
    static get myPublicStaticMethod1(): publicClass;
    private static get myPrivateStaticMethod1();
    get myPublicMethod1(): publicClass;
    private get myPrivateMethod1();
}
export declare class publicClassWithWithPrivateSetAccessorTypes {
    static set myPublicStaticMethod(param: privateClass);
    private static set myPrivateStaticMethod(value);
    set myPublicMethod(param: privateClass);
    private set myPrivateMethod(value);
}
export declare class publicClassWithWithPublicSetAccessorTypes {
    static set myPublicStaticMethod(param: publicClass);
    private static set myPrivateStaticMethod(value);
    set myPublicMethod(param: publicClass);
    private set myPrivateMethod(value);
}
export declare class publicClassWithPrivateModuleGetAccessorTypes {
    static get myPublicStaticMethod(): privateModule.publicClass;
    get myPublicMethod(): privateModule.publicClass;
    static get myPublicStaticMethod1(): privateModule.publicClass;
    get myPublicMethod1(): privateModule.publicClass;
}
export declare class publicClassWithPrivateModuleSetAccessorTypes {
    static set myPublicStaticMethod(param: privateModule.publicClass);
    set myPublicMethod(param: privateModule.publicClass);
}
export declare module publicModule {
    class privateClass {
    }
    export class publicClass {
    }
    export class publicClassWithWithPrivateGetAccessorTypes {
        static get myPublicStaticMethod(): privateClass;
        private static get myPrivateStaticMethod();
        get myPublicMethod(): privateClass;
        private get myPrivateMethod();
        static get myPublicStaticMethod1(): privateClass;
        private static get myPrivateStaticMethod1();
        get myPublicMethod1(): privateClass;
        private get myPrivateMethod1();
    }
    export class publicClassWithWithPublicGetAccessorTypes {
        static get myPublicStaticMethod(): publicClass;
        private static get myPrivateStaticMethod();
        get myPublicMethod(): publicClass;
        private get myPrivateMethod();
        static get myPublicStaticMethod1(): publicClass;
        private static get myPrivateStaticMethod1();
        get myPublicMethod1(): publicClass;
        private get myPrivateMethod1();
    }
    export class publicClassWithWithPrivateSetAccessorTypes {
        static set myPublicStaticMethod(param: privateClass);
        private static set myPrivateStaticMethod(value);
        set myPublicMethod(param: privateClass);
        private set myPrivateMethod(value);
    }
    export class publicClassWithWithPublicSetAccessorTypes {
        static set myPublicStaticMethod(param: publicClass);
        private static set myPrivateStaticMethod(value);
        set myPublicMethod(param: publicClass);
        private set myPrivateMethod(value);
    }
    export class publicClassWithPrivateModuleGetAccessorTypes {
        static get myPublicStaticMethod(): privateModule.publicClass;
        get myPublicMethod(): privateModule.publicClass;
        static get myPublicStaticMethod1(): privateModule.publicClass;
        get myPublicMethod1(): privateModule.publicClass;
    }
    export class publicClassWithPrivateModuleSetAccessorTypes {
        static set myPublicStaticMethod(param: privateModule.publicClass);
        set myPublicMethod(param: privateModule.publicClass);
    }
    export {};
}
declare module privateModule {
    class privateClass {
    }
    export class publicClass {
    }
    export class publicClassWithWithPrivateGetAccessorTypes {
        static get myPublicStaticMethod(): privateClass;
        private static get myPrivateStaticMethod();
        get myPublicMethod(): privateClass;
        private get myPrivateMethod();
        static get myPublicStaticMethod1(): privateClass;
        private static get myPrivateStaticMethod1();
        get myPublicMethod1(): privateClass;
        private get myPrivateMethod1();
    }
    export class publicClassWithWithPublicGetAccessorTypes {
        static get myPublicStaticMethod(): publicClass;
        private static get myPrivateStaticMethod();
        get myPublicMethod(): publicClass;
        private get myPrivateMethod();
        static get myPublicStaticMethod1(): publicClass;
        private static get myPrivateStaticMethod1();
        get myPublicMethod1(): publicClass;
        private get myPrivateMethod1();
    }
    export class publicClassWithWithPrivateSetAccessorTypes {
        static set myPublicStaticMethod(param: privateClass);
        private static set myPrivateStaticMethod(value);
        set myPublicMethod(param: privateClass);
        private set myPrivateMethod(value);
    }
    export class publicClassWithWithPublicSetAccessorTypes {
        static set myPublicStaticMethod(param: publicClass);
        private static set myPrivateStaticMethod(value);
        set myPublicMethod(param: publicClass);
        private set myPrivateMethod(value);
    }
    export class publicClassWithPrivateModuleGetAccessorTypes {
        static get myPublicStaticMethod(): privateModule.publicClass;
        get myPublicMethod(): privateModule.publicClass;
        static get myPublicStaticMethod1(): publicClass;
        get myPublicMethod1(): publicClass;
    }
    export class publicClassWithPrivateModuleSetAccessorTypes {
        static set myPublicStaticMethod(param: privateModule.publicClass);
        set myPublicMethod(param: privateModule.publicClass);
    }
    export {};
}
export {};
//// [privacyAccessorDeclFile_GlobalFile.d.ts]
declare class publicClassInGlobal {
}
declare class publicClassInGlobalWithPublicGetAccessorTypes {
    static get myPublicStaticMethod(): publicClassInGlobal;
    private static get myPrivateStaticMethod();
    get myPublicMethod(): publicClassInGlobal;
    private get myPrivateMethod();
    static get myPublicStaticMethod1(): publicClassInGlobal;
    private static get myPrivateStaticMethod1();
    get myPublicMethod1(): publicClassInGlobal;
    private get myPrivateMethod1();
}
declare class publicClassInGlobalWithWithPublicSetAccessorTypes {
    static set myPublicStaticMethod(param: publicClassInGlobal);
    private static set myPrivateStaticMethod(value);
    set myPublicMethod(param: publicClassInGlobal);
    private set myPrivateMethod(value);
}
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
        export class publicClassWithWithPrivateGetAccessorTypes {
            static get myPublicStaticMethod(): privateClass;
            private static get myPrivateStaticMethod();
            get myPublicMethod(): privateClass;
            private get myPrivateMethod();
            static get myPublicStaticMethod1(): privateClass;
            private static get myPrivateStaticMethod1();
            get myPublicMethod1(): privateClass;
            private get myPrivateMethod1();
        }
        export class publicClassWithWithPublicGetAccessorTypes {
            static get myPublicStaticMethod(): publicClass;
            private static get myPrivateStaticMethod();
            get myPublicMethod(): publicClass;
            private get myPrivateMethod();
            static get myPublicStaticMethod1(): publicClass;
            private static get myPrivateStaticMethod1();
            get myPublicMethod1(): publicClass;
            private get myPrivateMethod1();
        }
        export class publicClassWithWithPrivateSetAccessorTypes {
            static set myPublicStaticMethod(param: privateClass);
            private static set myPrivateStaticMethod(value);
            set myPublicMethod(param: privateClass);
            private set myPrivateMethod(value);
        }
        export class publicClassWithWithPublicSetAccessorTypes {
            static set myPublicStaticMethod(param: publicClass);
            private static set myPrivateStaticMethod(value);
            set myPublicMethod(param: publicClass);
            private set myPrivateMethod(value);
        }
        export class publicClassWithPrivateModuleGetAccessorTypes {
            static get myPublicStaticMethod(): privateModule.publicClass;
            get myPublicMethod(): privateModule.publicClass;
            static get myPublicStaticMethod1(): publicClass;
            get myPublicMethod1(): publicClass;
        }
        export class publicClassWithPrivateModuleSetAccessorTypes {
            static set myPublicStaticMethod(param: privateModule.publicClass);
            set myPublicMethod(param: privateModule.publicClass);
        }
        export {};
    }
    export class publicClassWithWithPrivateGetAccessorTypes {
        static get myPublicStaticMethod(): privateClass;
        private static get myPrivateStaticMethod();
        get myPublicMethod(): privateClass;
        private get myPrivateMethod();
        static get myPublicStaticMethod1(): privateClass;
        private static get myPrivateStaticMethod1();
        get myPublicMethod1(): privateClass;
        private get myPrivateMethod1();
    }
    export class publicClassWithWithPublicGetAccessorTypes {
        static get myPublicStaticMethod(): publicClass;
        private static get myPrivateStaticMethod();
        get myPublicMethod(): publicClass;
        private get myPrivateMethod();
        static get myPublicStaticMethod1(): publicClass;
        private static get myPrivateStaticMethod1();
        get myPublicMethod1(): publicClass;
        private get myPrivateMethod1();
    }
    export class publicClassWithWithPrivateSetAccessorTypes {
        static set myPublicStaticMethod(param: privateClass);
        private static set myPrivateStaticMethod(value);
        set myPublicMethod(param: privateClass);
        private set myPrivateMethod(value);
    }
    export class publicClassWithWithPublicSetAccessorTypes {
        static set myPublicStaticMethod(param: publicClass);
        private static set myPrivateStaticMethod(value);
        set myPublicMethod(param: publicClass);
        private set myPrivateMethod(value);
    }
    export class publicClassWithPrivateModuleGetAccessorTypes {
        static get myPublicStaticMethod(): privateModule.publicClass;
        get myPublicMethod(): privateModule.publicClass;
        static get myPublicStaticMethod1(): privateModule.publicClass;
        get myPublicMethod1(): privateModule.publicClass;
    }
    export class publicClassWithPrivateModuleSetAccessorTypes {
        static set myPublicStaticMethod(param: privateModule.publicClass);
        set myPublicMethod(param: privateModule.publicClass);
    }
    export {};
}
