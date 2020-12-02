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
    var publicClassWithWithPrivateGetAccessorTypes_prototype = publicClassWithWithPrivateGetAccessorTypes.prototype;
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
    Object.defineProperty(publicClassWithWithPrivateGetAccessorTypes_prototype, "myPublicMethod", {
        get: function () {
            return null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(publicClassWithWithPrivateGetAccessorTypes_prototype, "myPrivateMethod", {
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
    Object.defineProperty(publicClassWithWithPrivateGetAccessorTypes_prototype, "myPublicMethod1", {
        get: function () {
            return new privateClass();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(publicClassWithWithPrivateGetAccessorTypes_prototype, "myPrivateMethod1", {
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
    var publicClassWithWithPublicGetAccessorTypes_prototype = publicClassWithWithPublicGetAccessorTypes.prototype;
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
    Object.defineProperty(publicClassWithWithPublicGetAccessorTypes_prototype, "myPublicMethod", {
        get: function () {
            return null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(publicClassWithWithPublicGetAccessorTypes_prototype, "myPrivateMethod", {
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
    Object.defineProperty(publicClassWithWithPublicGetAccessorTypes_prototype, "myPublicMethod1", {
        get: function () {
            return new publicClass();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(publicClassWithWithPublicGetAccessorTypes_prototype, "myPrivateMethod1", {
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
    var privateClassWithWithPrivateGetAccessorTypes_prototype = privateClassWithWithPrivateGetAccessorTypes.prototype;
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
    Object.defineProperty(privateClassWithWithPrivateGetAccessorTypes_prototype, "myPublicMethod", {
        get: function () {
            return null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(privateClassWithWithPrivateGetAccessorTypes_prototype, "myPrivateMethod", {
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
    Object.defineProperty(privateClassWithWithPrivateGetAccessorTypes_prototype, "myPublicMethod1", {
        get: function () {
            return new privateClass();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(privateClassWithWithPrivateGetAccessorTypes_prototype, "myPrivateMethod1", {
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
    var privateClassWithWithPublicGetAccessorTypes_prototype = privateClassWithWithPublicGetAccessorTypes.prototype;
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
    Object.defineProperty(privateClassWithWithPublicGetAccessorTypes_prototype, "myPublicMethod", {
        get: function () {
            return null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(privateClassWithWithPublicGetAccessorTypes_prototype, "myPrivateMethod", {
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
    Object.defineProperty(privateClassWithWithPublicGetAccessorTypes_prototype, "myPublicMethod1", {
        get: function () {
            return new publicClass();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(privateClassWithWithPublicGetAccessorTypes_prototype, "myPrivateMethod1", {
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
    var publicClassWithWithPrivateSetAccessorTypes_prototype = publicClassWithWithPrivateSetAccessorTypes.prototype;
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
    Object.defineProperty(publicClassWithWithPrivateSetAccessorTypes_prototype, "myPublicMethod", {
        set: function (param) {
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(publicClassWithWithPrivateSetAccessorTypes_prototype, "myPrivateMethod", {
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
    var publicClassWithWithPublicSetAccessorTypes_prototype = publicClassWithWithPublicSetAccessorTypes.prototype;
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
    Object.defineProperty(publicClassWithWithPublicSetAccessorTypes_prototype, "myPublicMethod", {
        set: function (param) {
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(publicClassWithWithPublicSetAccessorTypes_prototype, "myPrivateMethod", {
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
    var privateClassWithWithPrivateSetAccessorTypes_prototype = privateClassWithWithPrivateSetAccessorTypes.prototype;
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
    Object.defineProperty(privateClassWithWithPrivateSetAccessorTypes_prototype, "myPublicMethod", {
        set: function (param) {
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(privateClassWithWithPrivateSetAccessorTypes_prototype, "myPrivateMethod", {
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
    var privateClassWithWithPublicSetAccessorTypes_prototype = privateClassWithWithPublicSetAccessorTypes.prototype;
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
    Object.defineProperty(privateClassWithWithPublicSetAccessorTypes_prototype, "myPublicMethod", {
        set: function (param) {
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(privateClassWithWithPublicSetAccessorTypes_prototype, "myPrivateMethod", {
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
    var publicClassWithPrivateModuleGetAccessorTypes_prototype = publicClassWithPrivateModuleGetAccessorTypes.prototype;
    Object.defineProperty(publicClassWithPrivateModuleGetAccessorTypes, "myPublicStaticMethod", {
        get: function () {
            return null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(publicClassWithPrivateModuleGetAccessorTypes_prototype, "myPublicMethod", {
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
    Object.defineProperty(publicClassWithPrivateModuleGetAccessorTypes_prototype, "myPublicMethod1", {
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
    var privateClassWithPrivateModuleGetAccessorTypes_prototype = privateClassWithPrivateModuleGetAccessorTypes.prototype;
    Object.defineProperty(privateClassWithPrivateModuleGetAccessorTypes, "myPublicStaticMethod", {
        get: function () {
            return null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(privateClassWithPrivateModuleGetAccessorTypes_prototype, "myPublicMethod", {
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
    Object.defineProperty(privateClassWithPrivateModuleGetAccessorTypes_prototype, "myPublicMethod1", {
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
        var publicClassWithWithPrivateGetAccessorTypes_prototype_1 = publicClassWithWithPrivateGetAccessorTypes.prototype;
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
        Object.defineProperty(publicClassWithWithPrivateGetAccessorTypes_prototype_1, "myPublicMethod", {
            get: function () {
                return null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(publicClassWithWithPrivateGetAccessorTypes_prototype_1, "myPrivateMethod", {
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
        Object.defineProperty(publicClassWithWithPrivateGetAccessorTypes_prototype_1, "myPublicMethod1", {
            get: function () {
                return new privateClass();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(publicClassWithWithPrivateGetAccessorTypes_prototype_1, "myPrivateMethod1", {
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
        var publicClassWithWithPublicGetAccessorTypes_prototype_1 = publicClassWithWithPublicGetAccessorTypes.prototype;
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
        Object.defineProperty(publicClassWithWithPublicGetAccessorTypes_prototype_1, "myPublicMethod", {
            get: function () {
                return null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(publicClassWithWithPublicGetAccessorTypes_prototype_1, "myPrivateMethod", {
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
        Object.defineProperty(publicClassWithWithPublicGetAccessorTypes_prototype_1, "myPublicMethod1", {
            get: function () {
                return new publicClass();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(publicClassWithWithPublicGetAccessorTypes_prototype_1, "myPrivateMethod1", {
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
        var privateClassWithWithPrivateGetAccessorTypes_prototype_1 = privateClassWithWithPrivateGetAccessorTypes.prototype;
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
        Object.defineProperty(privateClassWithWithPrivateGetAccessorTypes_prototype_1, "myPublicMethod", {
            get: function () {
                return null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(privateClassWithWithPrivateGetAccessorTypes_prototype_1, "myPrivateMethod", {
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
        Object.defineProperty(privateClassWithWithPrivateGetAccessorTypes_prototype_1, "myPublicMethod1", {
            get: function () {
                return new privateClass();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(privateClassWithWithPrivateGetAccessorTypes_prototype_1, "myPrivateMethod1", {
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
        var privateClassWithWithPublicGetAccessorTypes_prototype_1 = privateClassWithWithPublicGetAccessorTypes.prototype;
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
        Object.defineProperty(privateClassWithWithPublicGetAccessorTypes_prototype_1, "myPublicMethod", {
            get: function () {
                return null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(privateClassWithWithPublicGetAccessorTypes_prototype_1, "myPrivateMethod", {
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
        Object.defineProperty(privateClassWithWithPublicGetAccessorTypes_prototype_1, "myPublicMethod1", {
            get: function () {
                return new publicClass();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(privateClassWithWithPublicGetAccessorTypes_prototype_1, "myPrivateMethod1", {
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
        var publicClassWithWithPrivateSetAccessorTypes_prototype_1 = publicClassWithWithPrivateSetAccessorTypes.prototype;
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
        Object.defineProperty(publicClassWithWithPrivateSetAccessorTypes_prototype_1, "myPublicMethod", {
            set: function (param) {
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(publicClassWithWithPrivateSetAccessorTypes_prototype_1, "myPrivateMethod", {
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
        var publicClassWithWithPublicSetAccessorTypes_prototype_1 = publicClassWithWithPublicSetAccessorTypes.prototype;
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
        Object.defineProperty(publicClassWithWithPublicSetAccessorTypes_prototype_1, "myPublicMethod", {
            set: function (param) {
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(publicClassWithWithPublicSetAccessorTypes_prototype_1, "myPrivateMethod", {
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
        var privateClassWithWithPrivateSetAccessorTypes_prototype_1 = privateClassWithWithPrivateSetAccessorTypes.prototype;
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
        Object.defineProperty(privateClassWithWithPrivateSetAccessorTypes_prototype_1, "myPublicMethod", {
            set: function (param) {
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(privateClassWithWithPrivateSetAccessorTypes_prototype_1, "myPrivateMethod", {
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
        var privateClassWithWithPublicSetAccessorTypes_prototype_1 = privateClassWithWithPublicSetAccessorTypes.prototype;
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
        Object.defineProperty(privateClassWithWithPublicSetAccessorTypes_prototype_1, "myPublicMethod", {
            set: function (param) {
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(privateClassWithWithPublicSetAccessorTypes_prototype_1, "myPrivateMethod", {
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
        var publicClassWithPrivateModuleGetAccessorTypes_prototype_1 = publicClassWithPrivateModuleGetAccessorTypes.prototype;
        Object.defineProperty(publicClassWithPrivateModuleGetAccessorTypes, "myPublicStaticMethod", {
            get: function () {
                return null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(publicClassWithPrivateModuleGetAccessorTypes_prototype_1, "myPublicMethod", {
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
        Object.defineProperty(publicClassWithPrivateModuleGetAccessorTypes_prototype_1, "myPublicMethod1", {
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
        var privateClassWithPrivateModuleGetAccessorTypes_prototype_1 = privateClassWithPrivateModuleGetAccessorTypes.prototype;
        Object.defineProperty(privateClassWithPrivateModuleGetAccessorTypes, "myPublicStaticMethod", {
            get: function () {
                return null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(privateClassWithPrivateModuleGetAccessorTypes_prototype_1, "myPublicMethod", {
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
        Object.defineProperty(privateClassWithPrivateModuleGetAccessorTypes_prototype_1, "myPublicMethod1", {
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
        var publicClassWithWithPrivateGetAccessorTypes_prototype_2 = publicClassWithWithPrivateGetAccessorTypes.prototype;
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
        Object.defineProperty(publicClassWithWithPrivateGetAccessorTypes_prototype_2, "myPublicMethod", {
            get: function () {
                return null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(publicClassWithWithPrivateGetAccessorTypes_prototype_2, "myPrivateMethod", {
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
        Object.defineProperty(publicClassWithWithPrivateGetAccessorTypes_prototype_2, "myPublicMethod1", {
            get: function () {
                return new privateClass();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(publicClassWithWithPrivateGetAccessorTypes_prototype_2, "myPrivateMethod1", {
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
        var publicClassWithWithPublicGetAccessorTypes_prototype_2 = publicClassWithWithPublicGetAccessorTypes.prototype;
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
        Object.defineProperty(publicClassWithWithPublicGetAccessorTypes_prototype_2, "myPublicMethod", {
            get: function () {
                return null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(publicClassWithWithPublicGetAccessorTypes_prototype_2, "myPrivateMethod", {
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
        Object.defineProperty(publicClassWithWithPublicGetAccessorTypes_prototype_2, "myPublicMethod1", {
            get: function () {
                return new publicClass();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(publicClassWithWithPublicGetAccessorTypes_prototype_2, "myPrivateMethod1", {
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
        var privateClassWithWithPrivateGetAccessorTypes_prototype_2 = privateClassWithWithPrivateGetAccessorTypes.prototype;
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
        Object.defineProperty(privateClassWithWithPrivateGetAccessorTypes_prototype_2, "myPublicMethod", {
            get: function () {
                return null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(privateClassWithWithPrivateGetAccessorTypes_prototype_2, "myPrivateMethod", {
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
        Object.defineProperty(privateClassWithWithPrivateGetAccessorTypes_prototype_2, "myPublicMethod1", {
            get: function () {
                return new privateClass();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(privateClassWithWithPrivateGetAccessorTypes_prototype_2, "myPrivateMethod1", {
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
        var privateClassWithWithPublicGetAccessorTypes_prototype_2 = privateClassWithWithPublicGetAccessorTypes.prototype;
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
        Object.defineProperty(privateClassWithWithPublicGetAccessorTypes_prototype_2, "myPublicMethod", {
            get: function () {
                return null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(privateClassWithWithPublicGetAccessorTypes_prototype_2, "myPrivateMethod", {
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
        Object.defineProperty(privateClassWithWithPublicGetAccessorTypes_prototype_2, "myPublicMethod1", {
            get: function () {
                return new publicClass();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(privateClassWithWithPublicGetAccessorTypes_prototype_2, "myPrivateMethod1", {
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
        var publicClassWithWithPrivateSetAccessorTypes_prototype_2 = publicClassWithWithPrivateSetAccessorTypes.prototype;
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
        Object.defineProperty(publicClassWithWithPrivateSetAccessorTypes_prototype_2, "myPublicMethod", {
            set: function (param) {
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(publicClassWithWithPrivateSetAccessorTypes_prototype_2, "myPrivateMethod", {
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
        var publicClassWithWithPublicSetAccessorTypes_prototype_2 = publicClassWithWithPublicSetAccessorTypes.prototype;
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
        Object.defineProperty(publicClassWithWithPublicSetAccessorTypes_prototype_2, "myPublicMethod", {
            set: function (param) {
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(publicClassWithWithPublicSetAccessorTypes_prototype_2, "myPrivateMethod", {
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
        var privateClassWithWithPrivateSetAccessorTypes_prototype_2 = privateClassWithWithPrivateSetAccessorTypes.prototype;
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
        Object.defineProperty(privateClassWithWithPrivateSetAccessorTypes_prototype_2, "myPublicMethod", {
            set: function (param) {
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(privateClassWithWithPrivateSetAccessorTypes_prototype_2, "myPrivateMethod", {
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
        var privateClassWithWithPublicSetAccessorTypes_prototype_2 = privateClassWithWithPublicSetAccessorTypes.prototype;
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
        Object.defineProperty(privateClassWithWithPublicSetAccessorTypes_prototype_2, "myPublicMethod", {
            set: function (param) {
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(privateClassWithWithPublicSetAccessorTypes_prototype_2, "myPrivateMethod", {
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
        var publicClassWithPrivateModuleGetAccessorTypes_prototype_2 = publicClassWithPrivateModuleGetAccessorTypes.prototype;
        Object.defineProperty(publicClassWithPrivateModuleGetAccessorTypes, "myPublicStaticMethod", {
            get: function () {
                return null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(publicClassWithPrivateModuleGetAccessorTypes_prototype_2, "myPublicMethod", {
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
        Object.defineProperty(publicClassWithPrivateModuleGetAccessorTypes_prototype_2, "myPublicMethod1", {
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
        var privateClassWithPrivateModuleGetAccessorTypes_prototype_2 = privateClassWithPrivateModuleGetAccessorTypes.prototype;
        Object.defineProperty(privateClassWithPrivateModuleGetAccessorTypes, "myPublicStaticMethod", {
            get: function () {
                return null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(privateClassWithPrivateModuleGetAccessorTypes_prototype_2, "myPublicMethod", {
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
        Object.defineProperty(privateClassWithPrivateModuleGetAccessorTypes_prototype_2, "myPublicMethod1", {
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
    var publicClassInGlobalWithPublicGetAccessorTypes_prototype = publicClassInGlobalWithPublicGetAccessorTypes.prototype;
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
    Object.defineProperty(publicClassInGlobalWithPublicGetAccessorTypes_prototype, "myPublicMethod", {
        get: function () {
            return null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(publicClassInGlobalWithPublicGetAccessorTypes_prototype, "myPrivateMethod", {
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
    Object.defineProperty(publicClassInGlobalWithPublicGetAccessorTypes_prototype, "myPublicMethod1", {
        get: function () {
            return new publicClassInGlobal();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(publicClassInGlobalWithPublicGetAccessorTypes_prototype, "myPrivateMethod1", {
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
    var publicClassInGlobalWithWithPublicSetAccessorTypes_prototype = publicClassInGlobalWithWithPublicSetAccessorTypes.prototype;
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
    Object.defineProperty(publicClassInGlobalWithWithPublicSetAccessorTypes_prototype, "myPublicMethod", {
        set: function (param) {
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(publicClassInGlobalWithWithPublicSetAccessorTypes_prototype, "myPrivateMethod", {
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
            var publicClassWithWithPrivateGetAccessorTypes_prototype = publicClassWithWithPrivateGetAccessorTypes.prototype;
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
            Object.defineProperty(publicClassWithWithPrivateGetAccessorTypes_prototype, "myPublicMethod", {
                get: function () {
                    return null;
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(publicClassWithWithPrivateGetAccessorTypes_prototype, "myPrivateMethod", {
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
            Object.defineProperty(publicClassWithWithPrivateGetAccessorTypes_prototype, "myPublicMethod1", {
                get: function () {
                    return new privateClass();
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(publicClassWithWithPrivateGetAccessorTypes_prototype, "myPrivateMethod1", {
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
            var publicClassWithWithPublicGetAccessorTypes_prototype = publicClassWithWithPublicGetAccessorTypes.prototype;
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
            Object.defineProperty(publicClassWithWithPublicGetAccessorTypes_prototype, "myPublicMethod", {
                get: function () {
                    return null;
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(publicClassWithWithPublicGetAccessorTypes_prototype, "myPrivateMethod", {
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
            Object.defineProperty(publicClassWithWithPublicGetAccessorTypes_prototype, "myPublicMethod1", {
                get: function () {
                    return new publicClass();
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(publicClassWithWithPublicGetAccessorTypes_prototype, "myPrivateMethod1", {
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
            var privateClassWithWithPrivateGetAccessorTypes_prototype = privateClassWithWithPrivateGetAccessorTypes.prototype;
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
            Object.defineProperty(privateClassWithWithPrivateGetAccessorTypes_prototype, "myPublicMethod", {
                get: function () {
                    return null;
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(privateClassWithWithPrivateGetAccessorTypes_prototype, "myPrivateMethod", {
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
            Object.defineProperty(privateClassWithWithPrivateGetAccessorTypes_prototype, "myPublicMethod1", {
                get: function () {
                    return new privateClass();
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(privateClassWithWithPrivateGetAccessorTypes_prototype, "myPrivateMethod1", {
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
            var privateClassWithWithPublicGetAccessorTypes_prototype = privateClassWithWithPublicGetAccessorTypes.prototype;
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
            Object.defineProperty(privateClassWithWithPublicGetAccessorTypes_prototype, "myPublicMethod", {
                get: function () {
                    return null;
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(privateClassWithWithPublicGetAccessorTypes_prototype, "myPrivateMethod", {
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
            Object.defineProperty(privateClassWithWithPublicGetAccessorTypes_prototype, "myPublicMethod1", {
                get: function () {
                    return new publicClass();
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(privateClassWithWithPublicGetAccessorTypes_prototype, "myPrivateMethod1", {
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
            var publicClassWithWithPrivateSetAccessorTypes_prototype = publicClassWithWithPrivateSetAccessorTypes.prototype;
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
            Object.defineProperty(publicClassWithWithPrivateSetAccessorTypes_prototype, "myPublicMethod", {
                set: function (param) {
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(publicClassWithWithPrivateSetAccessorTypes_prototype, "myPrivateMethod", {
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
            var publicClassWithWithPublicSetAccessorTypes_prototype = publicClassWithWithPublicSetAccessorTypes.prototype;
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
            Object.defineProperty(publicClassWithWithPublicSetAccessorTypes_prototype, "myPublicMethod", {
                set: function (param) {
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(publicClassWithWithPublicSetAccessorTypes_prototype, "myPrivateMethod", {
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
            var privateClassWithWithPrivateSetAccessorTypes_prototype = privateClassWithWithPrivateSetAccessorTypes.prototype;
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
            Object.defineProperty(privateClassWithWithPrivateSetAccessorTypes_prototype, "myPublicMethod", {
                set: function (param) {
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(privateClassWithWithPrivateSetAccessorTypes_prototype, "myPrivateMethod", {
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
            var privateClassWithWithPublicSetAccessorTypes_prototype = privateClassWithWithPublicSetAccessorTypes.prototype;
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
            Object.defineProperty(privateClassWithWithPublicSetAccessorTypes_prototype, "myPublicMethod", {
                set: function (param) {
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(privateClassWithWithPublicSetAccessorTypes_prototype, "myPrivateMethod", {
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
            var publicClassWithPrivateModuleGetAccessorTypes_prototype = publicClassWithPrivateModuleGetAccessorTypes.prototype;
            Object.defineProperty(publicClassWithPrivateModuleGetAccessorTypes, "myPublicStaticMethod", {
                get: function () {
                    return null;
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(publicClassWithPrivateModuleGetAccessorTypes_prototype, "myPublicMethod", {
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
            Object.defineProperty(publicClassWithPrivateModuleGetAccessorTypes_prototype, "myPublicMethod1", {
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
            var privateClassWithPrivateModuleGetAccessorTypes_prototype = privateClassWithPrivateModuleGetAccessorTypes.prototype;
            Object.defineProperty(privateClassWithPrivateModuleGetAccessorTypes, "myPublicStaticMethod", {
                get: function () {
                    return null;
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(privateClassWithPrivateModuleGetAccessorTypes_prototype, "myPublicMethod", {
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
            Object.defineProperty(privateClassWithPrivateModuleGetAccessorTypes_prototype, "myPublicMethod1", {
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
        var publicClassWithWithPrivateGetAccessorTypes_prototype_1 = publicClassWithWithPrivateGetAccessorTypes.prototype;
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
        Object.defineProperty(publicClassWithWithPrivateGetAccessorTypes_prototype_1, "myPublicMethod", {
            get: function () {
                return null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(publicClassWithWithPrivateGetAccessorTypes_prototype_1, "myPrivateMethod", {
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
        Object.defineProperty(publicClassWithWithPrivateGetAccessorTypes_prototype_1, "myPublicMethod1", {
            get: function () {
                return new privateClass();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(publicClassWithWithPrivateGetAccessorTypes_prototype_1, "myPrivateMethod1", {
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
        var publicClassWithWithPublicGetAccessorTypes_prototype_1 = publicClassWithWithPublicGetAccessorTypes.prototype;
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
        Object.defineProperty(publicClassWithWithPublicGetAccessorTypes_prototype_1, "myPublicMethod", {
            get: function () {
                return null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(publicClassWithWithPublicGetAccessorTypes_prototype_1, "myPrivateMethod", {
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
        Object.defineProperty(publicClassWithWithPublicGetAccessorTypes_prototype_1, "myPublicMethod1", {
            get: function () {
                return new publicClass();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(publicClassWithWithPublicGetAccessorTypes_prototype_1, "myPrivateMethod1", {
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
        var privateClassWithWithPrivateGetAccessorTypes_prototype_1 = privateClassWithWithPrivateGetAccessorTypes.prototype;
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
        Object.defineProperty(privateClassWithWithPrivateGetAccessorTypes_prototype_1, "myPublicMethod", {
            get: function () {
                return null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(privateClassWithWithPrivateGetAccessorTypes_prototype_1, "myPrivateMethod", {
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
        Object.defineProperty(privateClassWithWithPrivateGetAccessorTypes_prototype_1, "myPublicMethod1", {
            get: function () {
                return new privateClass();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(privateClassWithWithPrivateGetAccessorTypes_prototype_1, "myPrivateMethod1", {
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
        var privateClassWithWithPublicGetAccessorTypes_prototype_1 = privateClassWithWithPublicGetAccessorTypes.prototype;
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
        Object.defineProperty(privateClassWithWithPublicGetAccessorTypes_prototype_1, "myPublicMethod", {
            get: function () {
                return null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(privateClassWithWithPublicGetAccessorTypes_prototype_1, "myPrivateMethod", {
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
        Object.defineProperty(privateClassWithWithPublicGetAccessorTypes_prototype_1, "myPublicMethod1", {
            get: function () {
                return new publicClass();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(privateClassWithWithPublicGetAccessorTypes_prototype_1, "myPrivateMethod1", {
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
        var publicClassWithWithPrivateSetAccessorTypes_prototype_1 = publicClassWithWithPrivateSetAccessorTypes.prototype;
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
        Object.defineProperty(publicClassWithWithPrivateSetAccessorTypes_prototype_1, "myPublicMethod", {
            set: function (param) {
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(publicClassWithWithPrivateSetAccessorTypes_prototype_1, "myPrivateMethod", {
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
        var publicClassWithWithPublicSetAccessorTypes_prototype_1 = publicClassWithWithPublicSetAccessorTypes.prototype;
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
        Object.defineProperty(publicClassWithWithPublicSetAccessorTypes_prototype_1, "myPublicMethod", {
            set: function (param) {
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(publicClassWithWithPublicSetAccessorTypes_prototype_1, "myPrivateMethod", {
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
        var privateClassWithWithPrivateSetAccessorTypes_prototype_1 = privateClassWithWithPrivateSetAccessorTypes.prototype;
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
        Object.defineProperty(privateClassWithWithPrivateSetAccessorTypes_prototype_1, "myPublicMethod", {
            set: function (param) {
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(privateClassWithWithPrivateSetAccessorTypes_prototype_1, "myPrivateMethod", {
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
        var privateClassWithWithPublicSetAccessorTypes_prototype_1 = privateClassWithWithPublicSetAccessorTypes.prototype;
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
        Object.defineProperty(privateClassWithWithPublicSetAccessorTypes_prototype_1, "myPublicMethod", {
            set: function (param) {
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(privateClassWithWithPublicSetAccessorTypes_prototype_1, "myPrivateMethod", {
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
        var publicClassWithPrivateModuleGetAccessorTypes_prototype_1 = publicClassWithPrivateModuleGetAccessorTypes.prototype;
        Object.defineProperty(publicClassWithPrivateModuleGetAccessorTypes, "myPublicStaticMethod", {
            get: function () {
                return null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(publicClassWithPrivateModuleGetAccessorTypes_prototype_1, "myPublicMethod", {
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
        Object.defineProperty(publicClassWithPrivateModuleGetAccessorTypes_prototype_1, "myPublicMethod1", {
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
        var privateClassWithPrivateModuleGetAccessorTypes_prototype_1 = privateClassWithPrivateModuleGetAccessorTypes.prototype;
        Object.defineProperty(privateClassWithPrivateModuleGetAccessorTypes, "myPublicStaticMethod", {
            get: function () {
                return null;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(privateClassWithPrivateModuleGetAccessorTypes_prototype_1, "myPublicMethod", {
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
        Object.defineProperty(privateClassWithPrivateModuleGetAccessorTypes_prototype_1, "myPublicMethod1", {
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
