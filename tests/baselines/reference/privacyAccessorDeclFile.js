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
var publicClassWithWithPrivateGetAccessorTypes = (function () {
    function publicClassWithWithPrivateGetAccessorTypes() {
    }
    Object.defineProperty(publicClassWithWithPrivateGetAccessorTypes, "myPublicStaticMethod", {
        get: function () {
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(publicClassWithWithPrivateGetAccessorTypes, "myPrivateStaticMethod", {
        get: function () {
            return null;
        },
        enumerable: true,
        configurable: true
    });
    var proto_1 = publicClassWithWithPrivateGetAccessorTypes.prototype;
    Object.defineProperty(proto_1, "myPublicMethod", {
        get: function () {
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(proto_1, "myPrivateMethod", {
        get: function () {
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(publicClassWithWithPrivateGetAccessorTypes, "myPublicStaticMethod1", {
        get: function () {
            return new privateClass();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(publicClassWithWithPrivateGetAccessorTypes, "myPrivateStaticMethod1", {
        get: function () {
            return new privateClass();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(proto_1, "myPublicMethod1", {
        get: function () {
            return new privateClass();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(proto_1, "myPrivateMethod1", {
        get: function () {
            return new privateClass();
        },
        enumerable: true,
        configurable: true
    });
    return publicClassWithWithPrivateGetAccessorTypes;
}());
exports.publicClassWithWithPrivateGetAccessorTypes = publicClassWithWithPrivateGetAccessorTypes;
var publicClassWithWithPublicGetAccessorTypes = (function () {
    function publicClassWithWithPublicGetAccessorTypes() {
    }
    Object.defineProperty(publicClassWithWithPublicGetAccessorTypes, "myPublicStaticMethod", {
        get: function () {
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(publicClassWithWithPublicGetAccessorTypes, "myPrivateStaticMethod", {
        get: function () {
            return null;
        },
        enumerable: true,
        configurable: true
    });
    var proto_2 = publicClassWithWithPublicGetAccessorTypes.prototype;
    Object.defineProperty(proto_2, "myPublicMethod", {
        get: function () {
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(proto_2, "myPrivateMethod", {
        get: function () {
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(publicClassWithWithPublicGetAccessorTypes, "myPublicStaticMethod1", {
        get: function () {
            return new publicClass();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(publicClassWithWithPublicGetAccessorTypes, "myPrivateStaticMethod1", {
        get: function () {
            return new publicClass();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(proto_2, "myPublicMethod1", {
        get: function () {
            return new publicClass();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(proto_2, "myPrivateMethod1", {
        get: function () {
            return new publicClass();
        },
        enumerable: true,
        configurable: true
    });
    return publicClassWithWithPublicGetAccessorTypes;
}());
exports.publicClassWithWithPublicGetAccessorTypes = publicClassWithWithPublicGetAccessorTypes;
var privateClassWithWithPrivateGetAccessorTypes = (function () {
    function privateClassWithWithPrivateGetAccessorTypes() {
    }
    Object.defineProperty(privateClassWithWithPrivateGetAccessorTypes, "myPublicStaticMethod", {
        get: function () {
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(privateClassWithWithPrivateGetAccessorTypes, "myPrivateStaticMethod", {
        get: function () {
            return null;
        },
        enumerable: true,
        configurable: true
    });
    var proto_3 = privateClassWithWithPrivateGetAccessorTypes.prototype;
    Object.defineProperty(proto_3, "myPublicMethod", {
        get: function () {
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(proto_3, "myPrivateMethod", {
        get: function () {
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(privateClassWithWithPrivateGetAccessorTypes, "myPublicStaticMethod1", {
        get: function () {
            return new privateClass();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(privateClassWithWithPrivateGetAccessorTypes, "myPrivateStaticMethod1", {
        get: function () {
            return new privateClass();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(proto_3, "myPublicMethod1", {
        get: function () {
            return new privateClass();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(proto_3, "myPrivateMethod1", {
        get: function () {
            return new privateClass();
        },
        enumerable: true,
        configurable: true
    });
    return privateClassWithWithPrivateGetAccessorTypes;
}());
var privateClassWithWithPublicGetAccessorTypes = (function () {
    function privateClassWithWithPublicGetAccessorTypes() {
    }
    Object.defineProperty(privateClassWithWithPublicGetAccessorTypes, "myPublicStaticMethod", {
        get: function () {
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(privateClassWithWithPublicGetAccessorTypes, "myPrivateStaticMethod", {
        get: function () {
            return null;
        },
        enumerable: true,
        configurable: true
    });
    var proto_4 = privateClassWithWithPublicGetAccessorTypes.prototype;
    Object.defineProperty(proto_4, "myPublicMethod", {
        get: function () {
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(proto_4, "myPrivateMethod", {
        get: function () {
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(privateClassWithWithPublicGetAccessorTypes, "myPublicStaticMethod1", {
        get: function () {
            return new publicClass();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(privateClassWithWithPublicGetAccessorTypes, "myPrivateStaticMethod1", {
        get: function () {
            return new publicClass();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(proto_4, "myPublicMethod1", {
        get: function () {
            return new publicClass();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(proto_4, "myPrivateMethod1", {
        get: function () {
            return new publicClass();
        },
        enumerable: true,
        configurable: true
    });
    return privateClassWithWithPublicGetAccessorTypes;
}());
var publicClassWithWithPrivateSetAccessorTypes = (function () {
    function publicClassWithWithPrivateSetAccessorTypes() {
    }
    Object.defineProperty(publicClassWithWithPrivateSetAccessorTypes, "myPublicStaticMethod", {
        set: function (param) {
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(publicClassWithWithPrivateSetAccessorTypes, "myPrivateStaticMethod", {
        set: function (param) {
        },
        enumerable: true,
        configurable: true
    });
    var proto_5 = publicClassWithWithPrivateSetAccessorTypes.prototype;
    Object.defineProperty(proto_5, "myPublicMethod", {
        set: function (param) {
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(proto_5, "myPrivateMethod", {
        set: function (param) {
        },
        enumerable: true,
        configurable: true
    });
    return publicClassWithWithPrivateSetAccessorTypes;
}());
exports.publicClassWithWithPrivateSetAccessorTypes = publicClassWithWithPrivateSetAccessorTypes;
var publicClassWithWithPublicSetAccessorTypes = (function () {
    function publicClassWithWithPublicSetAccessorTypes() {
    }
    Object.defineProperty(publicClassWithWithPublicSetAccessorTypes, "myPublicStaticMethod", {
        set: function (param) {
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(publicClassWithWithPublicSetAccessorTypes, "myPrivateStaticMethod", {
        set: function (param) {
        },
        enumerable: true,
        configurable: true
    });
    var proto_6 = publicClassWithWithPublicSetAccessorTypes.prototype;
    Object.defineProperty(proto_6, "myPublicMethod", {
        set: function (param) {
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(proto_6, "myPrivateMethod", {
        set: function (param) {
        },
        enumerable: true,
        configurable: true
    });
    return publicClassWithWithPublicSetAccessorTypes;
}());
exports.publicClassWithWithPublicSetAccessorTypes = publicClassWithWithPublicSetAccessorTypes;
var privateClassWithWithPrivateSetAccessorTypes = (function () {
    function privateClassWithWithPrivateSetAccessorTypes() {
    }
    Object.defineProperty(privateClassWithWithPrivateSetAccessorTypes, "myPublicStaticMethod", {
        set: function (param) {
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(privateClassWithWithPrivateSetAccessorTypes, "myPrivateStaticMethod", {
        set: function (param) {
        },
        enumerable: true,
        configurable: true
    });
    var proto_7 = privateClassWithWithPrivateSetAccessorTypes.prototype;
    Object.defineProperty(proto_7, "myPublicMethod", {
        set: function (param) {
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(proto_7, "myPrivateMethod", {
        set: function (param) {
        },
        enumerable: true,
        configurable: true
    });
    return privateClassWithWithPrivateSetAccessorTypes;
}());
var privateClassWithWithPublicSetAccessorTypes = (function () {
    function privateClassWithWithPublicSetAccessorTypes() {
    }
    Object.defineProperty(privateClassWithWithPublicSetAccessorTypes, "myPublicStaticMethod", {
        set: function (param) {
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(privateClassWithWithPublicSetAccessorTypes, "myPrivateStaticMethod", {
        set: function (param) {
        },
        enumerable: true,
        configurable: true
    });
    var proto_8 = privateClassWithWithPublicSetAccessorTypes.prototype;
    Object.defineProperty(proto_8, "myPublicMethod", {
        set: function (param) {
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(proto_8, "myPrivateMethod", {
        set: function (param) {
        },
        enumerable: true,
        configurable: true
    });
    return privateClassWithWithPublicSetAccessorTypes;
}());
var publicClassWithPrivateModuleGetAccessorTypes = (function () {
    function publicClassWithPrivateModuleGetAccessorTypes() {
    }
    Object.defineProperty(publicClassWithPrivateModuleGetAccessorTypes, "myPublicStaticMethod", {
        get: function () {
            return null;
        },
        enumerable: true,
        configurable: true
    });
    var proto_9 = publicClassWithPrivateModuleGetAccessorTypes.prototype;
    Object.defineProperty(proto_9, "myPublicMethod", {
        get: function () {
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(publicClassWithPrivateModuleGetAccessorTypes, "myPublicStaticMethod1", {
        get: function () {
            return new privateModule.publicClass();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(proto_9, "myPublicMethod1", {
        get: function () {
            return new privateModule.publicClass();
        },
        enumerable: true,
        configurable: true
    });
    return publicClassWithPrivateModuleGetAccessorTypes;
}());
exports.publicClassWithPrivateModuleGetAccessorTypes = publicClassWithPrivateModuleGetAccessorTypes;
var publicClassWithPrivateModuleSetAccessorTypes = (function () {
    function publicClassWithPrivateModuleSetAccessorTypes() {
    }
    Object.defineProperty(publicClassWithPrivateModuleSetAccessorTypes, "myPublicStaticMethod", {
        set: function (param) {
        },
        enumerable: true,
        configurable: true
    });
    var proto_10 = publicClassWithPrivateModuleSetAccessorTypes.prototype;
    Object.defineProperty(proto_10, "myPublicMethod", {
        set: function (param) {
        },
        enumerable: true,
        configurable: true
    });
    return publicClassWithPrivateModuleSetAccessorTypes;
}());
exports.publicClassWithPrivateModuleSetAccessorTypes = publicClassWithPrivateModuleSetAccessorTypes;
var privateClassWithPrivateModuleGetAccessorTypes = (function () {
    function privateClassWithPrivateModuleGetAccessorTypes() {
    }
    Object.defineProperty(privateClassWithPrivateModuleGetAccessorTypes, "myPublicStaticMethod", {
        get: function () {
            return null;
        },
        enumerable: true,
        configurable: true
    });
    var proto_11 = privateClassWithPrivateModuleGetAccessorTypes.prototype;
    Object.defineProperty(proto_11, "myPublicMethod", {
        get: function () {
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(privateClassWithPrivateModuleGetAccessorTypes, "myPublicStaticMethod1", {
        get: function () {
            return new privateModule.publicClass();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(proto_11, "myPublicMethod1", {
        get: function () {
            return new privateModule.publicClass();
        },
        enumerable: true,
        configurable: true
    });
    return privateClassWithPrivateModuleGetAccessorTypes;
}());
var privateClassWithPrivateModuleSetAccessorTypes = (function () {
    function privateClassWithPrivateModuleSetAccessorTypes() {
    }
    Object.defineProperty(privateClassWithPrivateModuleSetAccessorTypes, "myPublicStaticMethod", {
        set: function (param) {
        },
        enumerable: true,
        configurable: true
    });
    var proto_12 = privateClassWithPrivateModuleSetAccessorTypes.prototype;
    Object.defineProperty(proto_12, "myPublicMethod", {
        set: function (param) {
        },
        enumerable: true,
        configurable: true
    });
    return privateClassWithPrivateModuleSetAccessorTypes;
}());
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
    var publicClassWithWithPrivateGetAccessorTypes = (function () {
        function publicClassWithWithPrivateGetAccessorTypes() {
        }
        Object.defineProperty(publicClassWithWithPrivateGetAccessorTypes, "myPublicStaticMethod", {
            get: function () {
                return null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(publicClassWithWithPrivateGetAccessorTypes, "myPrivateStaticMethod", {
            get: function () {
                return null;
            },
            enumerable: true,
            configurable: true
        });
        var proto_13 = publicClassWithWithPrivateGetAccessorTypes.prototype;
        Object.defineProperty(proto_13, "myPublicMethod", {
            get: function () {
                return null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(proto_13, "myPrivateMethod", {
            get: function () {
                return null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(publicClassWithWithPrivateGetAccessorTypes, "myPublicStaticMethod1", {
            get: function () {
                return new privateClass();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(publicClassWithWithPrivateGetAccessorTypes, "myPrivateStaticMethod1", {
            get: function () {
                return new privateClass();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(proto_13, "myPublicMethod1", {
            get: function () {
                return new privateClass();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(proto_13, "myPrivateMethod1", {
            get: function () {
                return new privateClass();
            },
            enumerable: true,
            configurable: true
        });
        return publicClassWithWithPrivateGetAccessorTypes;
    }());
    publicModule.publicClassWithWithPrivateGetAccessorTypes = publicClassWithWithPrivateGetAccessorTypes;
    var publicClassWithWithPublicGetAccessorTypes = (function () {
        function publicClassWithWithPublicGetAccessorTypes() {
        }
        Object.defineProperty(publicClassWithWithPublicGetAccessorTypes, "myPublicStaticMethod", {
            get: function () {
                return null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(publicClassWithWithPublicGetAccessorTypes, "myPrivateStaticMethod", {
            get: function () {
                return null;
            },
            enumerable: true,
            configurable: true
        });
        var proto_14 = publicClassWithWithPublicGetAccessorTypes.prototype;
        Object.defineProperty(proto_14, "myPublicMethod", {
            get: function () {
                return null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(proto_14, "myPrivateMethod", {
            get: function () {
                return null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(publicClassWithWithPublicGetAccessorTypes, "myPublicStaticMethod1", {
            get: function () {
                return new publicClass();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(publicClassWithWithPublicGetAccessorTypes, "myPrivateStaticMethod1", {
            get: function () {
                return new publicClass();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(proto_14, "myPublicMethod1", {
            get: function () {
                return new publicClass();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(proto_14, "myPrivateMethod1", {
            get: function () {
                return new publicClass();
            },
            enumerable: true,
            configurable: true
        });
        return publicClassWithWithPublicGetAccessorTypes;
    }());
    publicModule.publicClassWithWithPublicGetAccessorTypes = publicClassWithWithPublicGetAccessorTypes;
    var privateClassWithWithPrivateGetAccessorTypes = (function () {
        function privateClassWithWithPrivateGetAccessorTypes() {
        }
        Object.defineProperty(privateClassWithWithPrivateGetAccessorTypes, "myPublicStaticMethod", {
            get: function () {
                return null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(privateClassWithWithPrivateGetAccessorTypes, "myPrivateStaticMethod", {
            get: function () {
                return null;
            },
            enumerable: true,
            configurable: true
        });
        var proto_15 = privateClassWithWithPrivateGetAccessorTypes.prototype;
        Object.defineProperty(proto_15, "myPublicMethod", {
            get: function () {
                return null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(proto_15, "myPrivateMethod", {
            get: function () {
                return null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(privateClassWithWithPrivateGetAccessorTypes, "myPublicStaticMethod1", {
            get: function () {
                return new privateClass();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(privateClassWithWithPrivateGetAccessorTypes, "myPrivateStaticMethod1", {
            get: function () {
                return new privateClass();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(proto_15, "myPublicMethod1", {
            get: function () {
                return new privateClass();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(proto_15, "myPrivateMethod1", {
            get: function () {
                return new privateClass();
            },
            enumerable: true,
            configurable: true
        });
        return privateClassWithWithPrivateGetAccessorTypes;
    }());
    var privateClassWithWithPublicGetAccessorTypes = (function () {
        function privateClassWithWithPublicGetAccessorTypes() {
        }
        Object.defineProperty(privateClassWithWithPublicGetAccessorTypes, "myPublicStaticMethod", {
            get: function () {
                return null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(privateClassWithWithPublicGetAccessorTypes, "myPrivateStaticMethod", {
            get: function () {
                return null;
            },
            enumerable: true,
            configurable: true
        });
        var proto_16 = privateClassWithWithPublicGetAccessorTypes.prototype;
        Object.defineProperty(proto_16, "myPublicMethod", {
            get: function () {
                return null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(proto_16, "myPrivateMethod", {
            get: function () {
                return null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(privateClassWithWithPublicGetAccessorTypes, "myPublicStaticMethod1", {
            get: function () {
                return new publicClass();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(privateClassWithWithPublicGetAccessorTypes, "myPrivateStaticMethod1", {
            get: function () {
                return new publicClass();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(proto_16, "myPublicMethod1", {
            get: function () {
                return new publicClass();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(proto_16, "myPrivateMethod1", {
            get: function () {
                return new publicClass();
            },
            enumerable: true,
            configurable: true
        });
        return privateClassWithWithPublicGetAccessorTypes;
    }());
    var publicClassWithWithPrivateSetAccessorTypes = (function () {
        function publicClassWithWithPrivateSetAccessorTypes() {
        }
        Object.defineProperty(publicClassWithWithPrivateSetAccessorTypes, "myPublicStaticMethod", {
            set: function (param) {
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(publicClassWithWithPrivateSetAccessorTypes, "myPrivateStaticMethod", {
            set: function (param) {
            },
            enumerable: true,
            configurable: true
        });
        var proto_17 = publicClassWithWithPrivateSetAccessorTypes.prototype;
        Object.defineProperty(proto_17, "myPublicMethod", {
            set: function (param) {
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(proto_17, "myPrivateMethod", {
            set: function (param) {
            },
            enumerable: true,
            configurable: true
        });
        return publicClassWithWithPrivateSetAccessorTypes;
    }());
    publicModule.publicClassWithWithPrivateSetAccessorTypes = publicClassWithWithPrivateSetAccessorTypes;
    var publicClassWithWithPublicSetAccessorTypes = (function () {
        function publicClassWithWithPublicSetAccessorTypes() {
        }
        Object.defineProperty(publicClassWithWithPublicSetAccessorTypes, "myPublicStaticMethod", {
            set: function (param) {
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(publicClassWithWithPublicSetAccessorTypes, "myPrivateStaticMethod", {
            set: function (param) {
            },
            enumerable: true,
            configurable: true
        });
        var proto_18 = publicClassWithWithPublicSetAccessorTypes.prototype;
        Object.defineProperty(proto_18, "myPublicMethod", {
            set: function (param) {
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(proto_18, "myPrivateMethod", {
            set: function (param) {
            },
            enumerable: true,
            configurable: true
        });
        return publicClassWithWithPublicSetAccessorTypes;
    }());
    publicModule.publicClassWithWithPublicSetAccessorTypes = publicClassWithWithPublicSetAccessorTypes;
    var privateClassWithWithPrivateSetAccessorTypes = (function () {
        function privateClassWithWithPrivateSetAccessorTypes() {
        }
        Object.defineProperty(privateClassWithWithPrivateSetAccessorTypes, "myPublicStaticMethod", {
            set: function (param) {
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(privateClassWithWithPrivateSetAccessorTypes, "myPrivateStaticMethod", {
            set: function (param) {
            },
            enumerable: true,
            configurable: true
        });
        var proto_19 = privateClassWithWithPrivateSetAccessorTypes.prototype;
        Object.defineProperty(proto_19, "myPublicMethod", {
            set: function (param) {
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(proto_19, "myPrivateMethod", {
            set: function (param) {
            },
            enumerable: true,
            configurable: true
        });
        return privateClassWithWithPrivateSetAccessorTypes;
    }());
    var privateClassWithWithPublicSetAccessorTypes = (function () {
        function privateClassWithWithPublicSetAccessorTypes() {
        }
        Object.defineProperty(privateClassWithWithPublicSetAccessorTypes, "myPublicStaticMethod", {
            set: function (param) {
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(privateClassWithWithPublicSetAccessorTypes, "myPrivateStaticMethod", {
            set: function (param) {
            },
            enumerable: true,
            configurable: true
        });
        var proto_20 = privateClassWithWithPublicSetAccessorTypes.prototype;
        Object.defineProperty(proto_20, "myPublicMethod", {
            set: function (param) {
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(proto_20, "myPrivateMethod", {
            set: function (param) {
            },
            enumerable: true,
            configurable: true
        });
        return privateClassWithWithPublicSetAccessorTypes;
    }());
    var publicClassWithPrivateModuleGetAccessorTypes = (function () {
        function publicClassWithPrivateModuleGetAccessorTypes() {
        }
        Object.defineProperty(publicClassWithPrivateModuleGetAccessorTypes, "myPublicStaticMethod", {
            get: function () {
                return null;
            },
            enumerable: true,
            configurable: true
        });
        var proto_21 = publicClassWithPrivateModuleGetAccessorTypes.prototype;
        Object.defineProperty(proto_21, "myPublicMethod", {
            get: function () {
                return null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(publicClassWithPrivateModuleGetAccessorTypes, "myPublicStaticMethod1", {
            get: function () {
                return new privateModule.publicClass();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(proto_21, "myPublicMethod1", {
            get: function () {
                return new privateModule.publicClass();
            },
            enumerable: true,
            configurable: true
        });
        return publicClassWithPrivateModuleGetAccessorTypes;
    }());
    publicModule.publicClassWithPrivateModuleGetAccessorTypes = publicClassWithPrivateModuleGetAccessorTypes;
    var publicClassWithPrivateModuleSetAccessorTypes = (function () {
        function publicClassWithPrivateModuleSetAccessorTypes() {
        }
        Object.defineProperty(publicClassWithPrivateModuleSetAccessorTypes, "myPublicStaticMethod", {
            set: function (param) {
            },
            enumerable: true,
            configurable: true
        });
        var proto_22 = publicClassWithPrivateModuleSetAccessorTypes.prototype;
        Object.defineProperty(proto_22, "myPublicMethod", {
            set: function (param) {
            },
            enumerable: true,
            configurable: true
        });
        return publicClassWithPrivateModuleSetAccessorTypes;
    }());
    publicModule.publicClassWithPrivateModuleSetAccessorTypes = publicClassWithPrivateModuleSetAccessorTypes;
    var privateClassWithPrivateModuleGetAccessorTypes = (function () {
        function privateClassWithPrivateModuleGetAccessorTypes() {
        }
        Object.defineProperty(privateClassWithPrivateModuleGetAccessorTypes, "myPublicStaticMethod", {
            get: function () {
                return null;
            },
            enumerable: true,
            configurable: true
        });
        var proto_23 = privateClassWithPrivateModuleGetAccessorTypes.prototype;
        Object.defineProperty(proto_23, "myPublicMethod", {
            get: function () {
                return null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(privateClassWithPrivateModuleGetAccessorTypes, "myPublicStaticMethod1", {
            get: function () {
                return new privateModule.publicClass();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(proto_23, "myPublicMethod1", {
            get: function () {
                return new privateModule.publicClass();
            },
            enumerable: true,
            configurable: true
        });
        return privateClassWithPrivateModuleGetAccessorTypes;
    }());
    var privateClassWithPrivateModuleSetAccessorTypes = (function () {
        function privateClassWithPrivateModuleSetAccessorTypes() {
        }
        Object.defineProperty(privateClassWithPrivateModuleSetAccessorTypes, "myPublicStaticMethod", {
            set: function (param) {
            },
            enumerable: true,
            configurable: true
        });
        var proto_24 = privateClassWithPrivateModuleSetAccessorTypes.prototype;
        Object.defineProperty(proto_24, "myPublicMethod", {
            set: function (param) {
            },
            enumerable: true,
            configurable: true
        });
        return privateClassWithPrivateModuleSetAccessorTypes;
    }());
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
    var publicClassWithWithPrivateGetAccessorTypes = (function () {
        function publicClassWithWithPrivateGetAccessorTypes() {
        }
        Object.defineProperty(publicClassWithWithPrivateGetAccessorTypes, "myPublicStaticMethod", {
            get: function () {
                return null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(publicClassWithWithPrivateGetAccessorTypes, "myPrivateStaticMethod", {
            get: function () {
                return null;
            },
            enumerable: true,
            configurable: true
        });
        var proto_25 = publicClassWithWithPrivateGetAccessorTypes.prototype;
        Object.defineProperty(proto_25, "myPublicMethod", {
            get: function () {
                return null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(proto_25, "myPrivateMethod", {
            get: function () {
                return null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(publicClassWithWithPrivateGetAccessorTypes, "myPublicStaticMethod1", {
            get: function () {
                return new privateClass();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(publicClassWithWithPrivateGetAccessorTypes, "myPrivateStaticMethod1", {
            get: function () {
                return new privateClass();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(proto_25, "myPublicMethod1", {
            get: function () {
                return new privateClass();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(proto_25, "myPrivateMethod1", {
            get: function () {
                return new privateClass();
            },
            enumerable: true,
            configurable: true
        });
        return publicClassWithWithPrivateGetAccessorTypes;
    }());
    privateModule.publicClassWithWithPrivateGetAccessorTypes = publicClassWithWithPrivateGetAccessorTypes;
    var publicClassWithWithPublicGetAccessorTypes = (function () {
        function publicClassWithWithPublicGetAccessorTypes() {
        }
        Object.defineProperty(publicClassWithWithPublicGetAccessorTypes, "myPublicStaticMethod", {
            get: function () {
                return null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(publicClassWithWithPublicGetAccessorTypes, "myPrivateStaticMethod", {
            get: function () {
                return null;
            },
            enumerable: true,
            configurable: true
        });
        var proto_26 = publicClassWithWithPublicGetAccessorTypes.prototype;
        Object.defineProperty(proto_26, "myPublicMethod", {
            get: function () {
                return null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(proto_26, "myPrivateMethod", {
            get: function () {
                return null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(publicClassWithWithPublicGetAccessorTypes, "myPublicStaticMethod1", {
            get: function () {
                return new publicClass();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(publicClassWithWithPublicGetAccessorTypes, "myPrivateStaticMethod1", {
            get: function () {
                return new publicClass();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(proto_26, "myPublicMethod1", {
            get: function () {
                return new publicClass();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(proto_26, "myPrivateMethod1", {
            get: function () {
                return new publicClass();
            },
            enumerable: true,
            configurable: true
        });
        return publicClassWithWithPublicGetAccessorTypes;
    }());
    privateModule.publicClassWithWithPublicGetAccessorTypes = publicClassWithWithPublicGetAccessorTypes;
    var privateClassWithWithPrivateGetAccessorTypes = (function () {
        function privateClassWithWithPrivateGetAccessorTypes() {
        }
        Object.defineProperty(privateClassWithWithPrivateGetAccessorTypes, "myPublicStaticMethod", {
            get: function () {
                return null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(privateClassWithWithPrivateGetAccessorTypes, "myPrivateStaticMethod", {
            get: function () {
                return null;
            },
            enumerable: true,
            configurable: true
        });
        var proto_27 = privateClassWithWithPrivateGetAccessorTypes.prototype;
        Object.defineProperty(proto_27, "myPublicMethod", {
            get: function () {
                return null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(proto_27, "myPrivateMethod", {
            get: function () {
                return null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(privateClassWithWithPrivateGetAccessorTypes, "myPublicStaticMethod1", {
            get: function () {
                return new privateClass();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(privateClassWithWithPrivateGetAccessorTypes, "myPrivateStaticMethod1", {
            get: function () {
                return new privateClass();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(proto_27, "myPublicMethod1", {
            get: function () {
                return new privateClass();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(proto_27, "myPrivateMethod1", {
            get: function () {
                return new privateClass();
            },
            enumerable: true,
            configurable: true
        });
        return privateClassWithWithPrivateGetAccessorTypes;
    }());
    var privateClassWithWithPublicGetAccessorTypes = (function () {
        function privateClassWithWithPublicGetAccessorTypes() {
        }
        Object.defineProperty(privateClassWithWithPublicGetAccessorTypes, "myPublicStaticMethod", {
            get: function () {
                return null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(privateClassWithWithPublicGetAccessorTypes, "myPrivateStaticMethod", {
            get: function () {
                return null;
            },
            enumerable: true,
            configurable: true
        });
        var proto_28 = privateClassWithWithPublicGetAccessorTypes.prototype;
        Object.defineProperty(proto_28, "myPublicMethod", {
            get: function () {
                return null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(proto_28, "myPrivateMethod", {
            get: function () {
                return null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(privateClassWithWithPublicGetAccessorTypes, "myPublicStaticMethod1", {
            get: function () {
                return new publicClass();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(privateClassWithWithPublicGetAccessorTypes, "myPrivateStaticMethod1", {
            get: function () {
                return new publicClass();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(proto_28, "myPublicMethod1", {
            get: function () {
                return new publicClass();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(proto_28, "myPrivateMethod1", {
            get: function () {
                return new publicClass();
            },
            enumerable: true,
            configurable: true
        });
        return privateClassWithWithPublicGetAccessorTypes;
    }());
    var publicClassWithWithPrivateSetAccessorTypes = (function () {
        function publicClassWithWithPrivateSetAccessorTypes() {
        }
        Object.defineProperty(publicClassWithWithPrivateSetAccessorTypes, "myPublicStaticMethod", {
            set: function (param) {
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(publicClassWithWithPrivateSetAccessorTypes, "myPrivateStaticMethod", {
            set: function (param) {
            },
            enumerable: true,
            configurable: true
        });
        var proto_29 = publicClassWithWithPrivateSetAccessorTypes.prototype;
        Object.defineProperty(proto_29, "myPublicMethod", {
            set: function (param) {
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(proto_29, "myPrivateMethod", {
            set: function (param) {
            },
            enumerable: true,
            configurable: true
        });
        return publicClassWithWithPrivateSetAccessorTypes;
    }());
    privateModule.publicClassWithWithPrivateSetAccessorTypes = publicClassWithWithPrivateSetAccessorTypes;
    var publicClassWithWithPublicSetAccessorTypes = (function () {
        function publicClassWithWithPublicSetAccessorTypes() {
        }
        Object.defineProperty(publicClassWithWithPublicSetAccessorTypes, "myPublicStaticMethod", {
            set: function (param) {
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(publicClassWithWithPublicSetAccessorTypes, "myPrivateStaticMethod", {
            set: function (param) {
            },
            enumerable: true,
            configurable: true
        });
        var proto_30 = publicClassWithWithPublicSetAccessorTypes.prototype;
        Object.defineProperty(proto_30, "myPublicMethod", {
            set: function (param) {
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(proto_30, "myPrivateMethod", {
            set: function (param) {
            },
            enumerable: true,
            configurable: true
        });
        return publicClassWithWithPublicSetAccessorTypes;
    }());
    privateModule.publicClassWithWithPublicSetAccessorTypes = publicClassWithWithPublicSetAccessorTypes;
    var privateClassWithWithPrivateSetAccessorTypes = (function () {
        function privateClassWithWithPrivateSetAccessorTypes() {
        }
        Object.defineProperty(privateClassWithWithPrivateSetAccessorTypes, "myPublicStaticMethod", {
            set: function (param) {
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(privateClassWithWithPrivateSetAccessorTypes, "myPrivateStaticMethod", {
            set: function (param) {
            },
            enumerable: true,
            configurable: true
        });
        var proto_31 = privateClassWithWithPrivateSetAccessorTypes.prototype;
        Object.defineProperty(proto_31, "myPublicMethod", {
            set: function (param) {
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(proto_31, "myPrivateMethod", {
            set: function (param) {
            },
            enumerable: true,
            configurable: true
        });
        return privateClassWithWithPrivateSetAccessorTypes;
    }());
    var privateClassWithWithPublicSetAccessorTypes = (function () {
        function privateClassWithWithPublicSetAccessorTypes() {
        }
        Object.defineProperty(privateClassWithWithPublicSetAccessorTypes, "myPublicStaticMethod", {
            set: function (param) {
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(privateClassWithWithPublicSetAccessorTypes, "myPrivateStaticMethod", {
            set: function (param) {
            },
            enumerable: true,
            configurable: true
        });
        var proto_32 = privateClassWithWithPublicSetAccessorTypes.prototype;
        Object.defineProperty(proto_32, "myPublicMethod", {
            set: function (param) {
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(proto_32, "myPrivateMethod", {
            set: function (param) {
            },
            enumerable: true,
            configurable: true
        });
        return privateClassWithWithPublicSetAccessorTypes;
    }());
    var publicClassWithPrivateModuleGetAccessorTypes = (function () {
        function publicClassWithPrivateModuleGetAccessorTypes() {
        }
        Object.defineProperty(publicClassWithPrivateModuleGetAccessorTypes, "myPublicStaticMethod", {
            get: function () {
                return null;
            },
            enumerable: true,
            configurable: true
        });
        var proto_33 = publicClassWithPrivateModuleGetAccessorTypes.prototype;
        Object.defineProperty(proto_33, "myPublicMethod", {
            get: function () {
                return null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(publicClassWithPrivateModuleGetAccessorTypes, "myPublicStaticMethod1", {
            get: function () {
                return new privateModule.publicClass();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(proto_33, "myPublicMethod1", {
            get: function () {
                return new privateModule.publicClass();
            },
            enumerable: true,
            configurable: true
        });
        return publicClassWithPrivateModuleGetAccessorTypes;
    }());
    privateModule.publicClassWithPrivateModuleGetAccessorTypes = publicClassWithPrivateModuleGetAccessorTypes;
    var publicClassWithPrivateModuleSetAccessorTypes = (function () {
        function publicClassWithPrivateModuleSetAccessorTypes() {
        }
        Object.defineProperty(publicClassWithPrivateModuleSetAccessorTypes, "myPublicStaticMethod", {
            set: function (param) {
            },
            enumerable: true,
            configurable: true
        });
        var proto_34 = publicClassWithPrivateModuleSetAccessorTypes.prototype;
        Object.defineProperty(proto_34, "myPublicMethod", {
            set: function (param) {
            },
            enumerable: true,
            configurable: true
        });
        return publicClassWithPrivateModuleSetAccessorTypes;
    }());
    privateModule.publicClassWithPrivateModuleSetAccessorTypes = publicClassWithPrivateModuleSetAccessorTypes;
    var privateClassWithPrivateModuleGetAccessorTypes = (function () {
        function privateClassWithPrivateModuleGetAccessorTypes() {
        }
        Object.defineProperty(privateClassWithPrivateModuleGetAccessorTypes, "myPublicStaticMethod", {
            get: function () {
                return null;
            },
            enumerable: true,
            configurable: true
        });
        var proto_35 = privateClassWithPrivateModuleGetAccessorTypes.prototype;
        Object.defineProperty(proto_35, "myPublicMethod", {
            get: function () {
                return null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(privateClassWithPrivateModuleGetAccessorTypes, "myPublicStaticMethod1", {
            get: function () {
                return new privateModule.publicClass();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(proto_35, "myPublicMethod1", {
            get: function () {
                return new privateModule.publicClass();
            },
            enumerable: true,
            configurable: true
        });
        return privateClassWithPrivateModuleGetAccessorTypes;
    }());
    var privateClassWithPrivateModuleSetAccessorTypes = (function () {
        function privateClassWithPrivateModuleSetAccessorTypes() {
        }
        Object.defineProperty(privateClassWithPrivateModuleSetAccessorTypes, "myPublicStaticMethod", {
            set: function (param) {
            },
            enumerable: true,
            configurable: true
        });
        var proto_36 = privateClassWithPrivateModuleSetAccessorTypes.prototype;
        Object.defineProperty(proto_36, "myPublicMethod", {
            set: function (param) {
            },
            enumerable: true,
            configurable: true
        });
        return privateClassWithPrivateModuleSetAccessorTypes;
    }());
})(privateModule || (privateModule = {}));
//// [privacyAccessorDeclFile_GlobalFile.js]
var publicClassInGlobal = (function () {
    function publicClassInGlobal() {
    }
    return publicClassInGlobal;
}());
var publicClassInGlobalWithPublicGetAccessorTypes = (function () {
    function publicClassInGlobalWithPublicGetAccessorTypes() {
    }
    Object.defineProperty(publicClassInGlobalWithPublicGetAccessorTypes, "myPublicStaticMethod", {
        get: function () {
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(publicClassInGlobalWithPublicGetAccessorTypes, "myPrivateStaticMethod", {
        get: function () {
            return null;
        },
        enumerable: true,
        configurable: true
    });
    var proto_1 = publicClassInGlobalWithPublicGetAccessorTypes.prototype;
    Object.defineProperty(proto_1, "myPublicMethod", {
        get: function () {
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(proto_1, "myPrivateMethod", {
        get: function () {
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(publicClassInGlobalWithPublicGetAccessorTypes, "myPublicStaticMethod1", {
        get: function () {
            return new publicClassInGlobal();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(publicClassInGlobalWithPublicGetAccessorTypes, "myPrivateStaticMethod1", {
        get: function () {
            return new publicClassInGlobal();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(proto_1, "myPublicMethod1", {
        get: function () {
            return new publicClassInGlobal();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(proto_1, "myPrivateMethod1", {
        get: function () {
            return new publicClassInGlobal();
        },
        enumerable: true,
        configurable: true
    });
    return publicClassInGlobalWithPublicGetAccessorTypes;
}());
var publicClassInGlobalWithWithPublicSetAccessorTypes = (function () {
    function publicClassInGlobalWithWithPublicSetAccessorTypes() {
    }
    Object.defineProperty(publicClassInGlobalWithWithPublicSetAccessorTypes, "myPublicStaticMethod", {
        set: function (param) {
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(publicClassInGlobalWithWithPublicSetAccessorTypes, "myPrivateStaticMethod", {
        set: function (param) {
        },
        enumerable: true,
        configurable: true
    });
    var proto_2 = publicClassInGlobalWithWithPublicSetAccessorTypes.prototype;
    Object.defineProperty(proto_2, "myPublicMethod", {
        set: function (param) {
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(proto_2, "myPrivateMethod", {
        set: function (param) {
        },
        enumerable: true,
        configurable: true
    });
    return publicClassInGlobalWithWithPublicSetAccessorTypes;
}());
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
        var publicClassWithWithPrivateGetAccessorTypes = (function () {
            function publicClassWithWithPrivateGetAccessorTypes() {
            }
            Object.defineProperty(publicClassWithWithPrivateGetAccessorTypes, "myPublicStaticMethod", {
                get: function () {
                    return null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(publicClassWithWithPrivateGetAccessorTypes, "myPrivateStaticMethod", {
                get: function () {
                    return null;
                },
                enumerable: true,
                configurable: true
            });
            var proto_3 = publicClassWithWithPrivateGetAccessorTypes.prototype;
            Object.defineProperty(proto_3, "myPublicMethod", {
                get: function () {
                    return null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(proto_3, "myPrivateMethod", {
                get: function () {
                    return null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(publicClassWithWithPrivateGetAccessorTypes, "myPublicStaticMethod1", {
                get: function () {
                    return new privateClass();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(publicClassWithWithPrivateGetAccessorTypes, "myPrivateStaticMethod1", {
                get: function () {
                    return new privateClass();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(proto_3, "myPublicMethod1", {
                get: function () {
                    return new privateClass();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(proto_3, "myPrivateMethod1", {
                get: function () {
                    return new privateClass();
                },
                enumerable: true,
                configurable: true
            });
            return publicClassWithWithPrivateGetAccessorTypes;
        }());
        privateModule.publicClassWithWithPrivateGetAccessorTypes = publicClassWithWithPrivateGetAccessorTypes;
        var publicClassWithWithPublicGetAccessorTypes = (function () {
            function publicClassWithWithPublicGetAccessorTypes() {
            }
            Object.defineProperty(publicClassWithWithPublicGetAccessorTypes, "myPublicStaticMethod", {
                get: function () {
                    return null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(publicClassWithWithPublicGetAccessorTypes, "myPrivateStaticMethod", {
                get: function () {
                    return null;
                },
                enumerable: true,
                configurable: true
            });
            var proto_4 = publicClassWithWithPublicGetAccessorTypes.prototype;
            Object.defineProperty(proto_4, "myPublicMethod", {
                get: function () {
                    return null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(proto_4, "myPrivateMethod", {
                get: function () {
                    return null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(publicClassWithWithPublicGetAccessorTypes, "myPublicStaticMethod1", {
                get: function () {
                    return new publicClass();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(publicClassWithWithPublicGetAccessorTypes, "myPrivateStaticMethod1", {
                get: function () {
                    return new publicClass();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(proto_4, "myPublicMethod1", {
                get: function () {
                    return new publicClass();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(proto_4, "myPrivateMethod1", {
                get: function () {
                    return new publicClass();
                },
                enumerable: true,
                configurable: true
            });
            return publicClassWithWithPublicGetAccessorTypes;
        }());
        privateModule.publicClassWithWithPublicGetAccessorTypes = publicClassWithWithPublicGetAccessorTypes;
        var privateClassWithWithPrivateGetAccessorTypes = (function () {
            function privateClassWithWithPrivateGetAccessorTypes() {
            }
            Object.defineProperty(privateClassWithWithPrivateGetAccessorTypes, "myPublicStaticMethod", {
                get: function () {
                    return null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(privateClassWithWithPrivateGetAccessorTypes, "myPrivateStaticMethod", {
                get: function () {
                    return null;
                },
                enumerable: true,
                configurable: true
            });
            var proto_5 = privateClassWithWithPrivateGetAccessorTypes.prototype;
            Object.defineProperty(proto_5, "myPublicMethod", {
                get: function () {
                    return null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(proto_5, "myPrivateMethod", {
                get: function () {
                    return null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(privateClassWithWithPrivateGetAccessorTypes, "myPublicStaticMethod1", {
                get: function () {
                    return new privateClass();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(privateClassWithWithPrivateGetAccessorTypes, "myPrivateStaticMethod1", {
                get: function () {
                    return new privateClass();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(proto_5, "myPublicMethod1", {
                get: function () {
                    return new privateClass();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(proto_5, "myPrivateMethod1", {
                get: function () {
                    return new privateClass();
                },
                enumerable: true,
                configurable: true
            });
            return privateClassWithWithPrivateGetAccessorTypes;
        }());
        var privateClassWithWithPublicGetAccessorTypes = (function () {
            function privateClassWithWithPublicGetAccessorTypes() {
            }
            Object.defineProperty(privateClassWithWithPublicGetAccessorTypes, "myPublicStaticMethod", {
                get: function () {
                    return null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(privateClassWithWithPublicGetAccessorTypes, "myPrivateStaticMethod", {
                get: function () {
                    return null;
                },
                enumerable: true,
                configurable: true
            });
            var proto_6 = privateClassWithWithPublicGetAccessorTypes.prototype;
            Object.defineProperty(proto_6, "myPublicMethod", {
                get: function () {
                    return null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(proto_6, "myPrivateMethod", {
                get: function () {
                    return null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(privateClassWithWithPublicGetAccessorTypes, "myPublicStaticMethod1", {
                get: function () {
                    return new publicClass();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(privateClassWithWithPublicGetAccessorTypes, "myPrivateStaticMethod1", {
                get: function () {
                    return new publicClass();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(proto_6, "myPublicMethod1", {
                get: function () {
                    return new publicClass();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(proto_6, "myPrivateMethod1", {
                get: function () {
                    return new publicClass();
                },
                enumerable: true,
                configurable: true
            });
            return privateClassWithWithPublicGetAccessorTypes;
        }());
        var publicClassWithWithPrivateSetAccessorTypes = (function () {
            function publicClassWithWithPrivateSetAccessorTypes() {
            }
            Object.defineProperty(publicClassWithWithPrivateSetAccessorTypes, "myPublicStaticMethod", {
                set: function (param) {
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(publicClassWithWithPrivateSetAccessorTypes, "myPrivateStaticMethod", {
                set: function (param) {
                },
                enumerable: true,
                configurable: true
            });
            var proto_7 = publicClassWithWithPrivateSetAccessorTypes.prototype;
            Object.defineProperty(proto_7, "myPublicMethod", {
                set: function (param) {
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(proto_7, "myPrivateMethod", {
                set: function (param) {
                },
                enumerable: true,
                configurable: true
            });
            return publicClassWithWithPrivateSetAccessorTypes;
        }());
        privateModule.publicClassWithWithPrivateSetAccessorTypes = publicClassWithWithPrivateSetAccessorTypes;
        var publicClassWithWithPublicSetAccessorTypes = (function () {
            function publicClassWithWithPublicSetAccessorTypes() {
            }
            Object.defineProperty(publicClassWithWithPublicSetAccessorTypes, "myPublicStaticMethod", {
                set: function (param) {
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(publicClassWithWithPublicSetAccessorTypes, "myPrivateStaticMethod", {
                set: function (param) {
                },
                enumerable: true,
                configurable: true
            });
            var proto_8 = publicClassWithWithPublicSetAccessorTypes.prototype;
            Object.defineProperty(proto_8, "myPublicMethod", {
                set: function (param) {
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(proto_8, "myPrivateMethod", {
                set: function (param) {
                },
                enumerable: true,
                configurable: true
            });
            return publicClassWithWithPublicSetAccessorTypes;
        }());
        privateModule.publicClassWithWithPublicSetAccessorTypes = publicClassWithWithPublicSetAccessorTypes;
        var privateClassWithWithPrivateSetAccessorTypes = (function () {
            function privateClassWithWithPrivateSetAccessorTypes() {
            }
            Object.defineProperty(privateClassWithWithPrivateSetAccessorTypes, "myPublicStaticMethod", {
                set: function (param) {
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(privateClassWithWithPrivateSetAccessorTypes, "myPrivateStaticMethod", {
                set: function (param) {
                },
                enumerable: true,
                configurable: true
            });
            var proto_9 = privateClassWithWithPrivateSetAccessorTypes.prototype;
            Object.defineProperty(proto_9, "myPublicMethod", {
                set: function (param) {
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(proto_9, "myPrivateMethod", {
                set: function (param) {
                },
                enumerable: true,
                configurable: true
            });
            return privateClassWithWithPrivateSetAccessorTypes;
        }());
        var privateClassWithWithPublicSetAccessorTypes = (function () {
            function privateClassWithWithPublicSetAccessorTypes() {
            }
            Object.defineProperty(privateClassWithWithPublicSetAccessorTypes, "myPublicStaticMethod", {
                set: function (param) {
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(privateClassWithWithPublicSetAccessorTypes, "myPrivateStaticMethod", {
                set: function (param) {
                },
                enumerable: true,
                configurable: true
            });
            var proto_10 = privateClassWithWithPublicSetAccessorTypes.prototype;
            Object.defineProperty(proto_10, "myPublicMethod", {
                set: function (param) {
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(proto_10, "myPrivateMethod", {
                set: function (param) {
                },
                enumerable: true,
                configurable: true
            });
            return privateClassWithWithPublicSetAccessorTypes;
        }());
        var publicClassWithPrivateModuleGetAccessorTypes = (function () {
            function publicClassWithPrivateModuleGetAccessorTypes() {
            }
            Object.defineProperty(publicClassWithPrivateModuleGetAccessorTypes, "myPublicStaticMethod", {
                get: function () {
                    return null;
                },
                enumerable: true,
                configurable: true
            });
            var proto_11 = publicClassWithPrivateModuleGetAccessorTypes.prototype;
            Object.defineProperty(proto_11, "myPublicMethod", {
                get: function () {
                    return null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(publicClassWithPrivateModuleGetAccessorTypes, "myPublicStaticMethod1", {
                get: function () {
                    return new privateModule.publicClass();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(proto_11, "myPublicMethod1", {
                get: function () {
                    return new privateModule.publicClass();
                },
                enumerable: true,
                configurable: true
            });
            return publicClassWithPrivateModuleGetAccessorTypes;
        }());
        privateModule.publicClassWithPrivateModuleGetAccessorTypes = publicClassWithPrivateModuleGetAccessorTypes;
        var publicClassWithPrivateModuleSetAccessorTypes = (function () {
            function publicClassWithPrivateModuleSetAccessorTypes() {
            }
            Object.defineProperty(publicClassWithPrivateModuleSetAccessorTypes, "myPublicStaticMethod", {
                set: function (param) {
                },
                enumerable: true,
                configurable: true
            });
            var proto_12 = publicClassWithPrivateModuleSetAccessorTypes.prototype;
            Object.defineProperty(proto_12, "myPublicMethod", {
                set: function (param) {
                },
                enumerable: true,
                configurable: true
            });
            return publicClassWithPrivateModuleSetAccessorTypes;
        }());
        privateModule.publicClassWithPrivateModuleSetAccessorTypes = publicClassWithPrivateModuleSetAccessorTypes;
        var privateClassWithPrivateModuleGetAccessorTypes = (function () {
            function privateClassWithPrivateModuleGetAccessorTypes() {
            }
            Object.defineProperty(privateClassWithPrivateModuleGetAccessorTypes, "myPublicStaticMethod", {
                get: function () {
                    return null;
                },
                enumerable: true,
                configurable: true
            });
            var proto_13 = privateClassWithPrivateModuleGetAccessorTypes.prototype;
            Object.defineProperty(proto_13, "myPublicMethod", {
                get: function () {
                    return null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(privateClassWithPrivateModuleGetAccessorTypes, "myPublicStaticMethod1", {
                get: function () {
                    return new privateModule.publicClass();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(proto_13, "myPublicMethod1", {
                get: function () {
                    return new privateModule.publicClass();
                },
                enumerable: true,
                configurable: true
            });
            return privateClassWithPrivateModuleGetAccessorTypes;
        }());
        var privateClassWithPrivateModuleSetAccessorTypes = (function () {
            function privateClassWithPrivateModuleSetAccessorTypes() {
            }
            Object.defineProperty(privateClassWithPrivateModuleSetAccessorTypes, "myPublicStaticMethod", {
                set: function (param) {
                },
                enumerable: true,
                configurable: true
            });
            var proto_14 = privateClassWithPrivateModuleSetAccessorTypes.prototype;
            Object.defineProperty(proto_14, "myPublicMethod", {
                set: function (param) {
                },
                enumerable: true,
                configurable: true
            });
            return privateClassWithPrivateModuleSetAccessorTypes;
        }());
    })(privateModule || (privateModule = {}));
    var publicClassWithWithPrivateGetAccessorTypes = (function () {
        function publicClassWithWithPrivateGetAccessorTypes() {
        }
        Object.defineProperty(publicClassWithWithPrivateGetAccessorTypes, "myPublicStaticMethod", {
            get: function () {
                return null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(publicClassWithWithPrivateGetAccessorTypes, "myPrivateStaticMethod", {
            get: function () {
                return null;
            },
            enumerable: true,
            configurable: true
        });
        var proto_15 = publicClassWithWithPrivateGetAccessorTypes.prototype;
        Object.defineProperty(proto_15, "myPublicMethod", {
            get: function () {
                return null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(proto_15, "myPrivateMethod", {
            get: function () {
                return null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(publicClassWithWithPrivateGetAccessorTypes, "myPublicStaticMethod1", {
            get: function () {
                return new privateClass();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(publicClassWithWithPrivateGetAccessorTypes, "myPrivateStaticMethod1", {
            get: function () {
                return new privateClass();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(proto_15, "myPublicMethod1", {
            get: function () {
                return new privateClass();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(proto_15, "myPrivateMethod1", {
            get: function () {
                return new privateClass();
            },
            enumerable: true,
            configurable: true
        });
        return publicClassWithWithPrivateGetAccessorTypes;
    }());
    publicModuleInGlobal.publicClassWithWithPrivateGetAccessorTypes = publicClassWithWithPrivateGetAccessorTypes;
    var publicClassWithWithPublicGetAccessorTypes = (function () {
        function publicClassWithWithPublicGetAccessorTypes() {
        }
        Object.defineProperty(publicClassWithWithPublicGetAccessorTypes, "myPublicStaticMethod", {
            get: function () {
                return null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(publicClassWithWithPublicGetAccessorTypes, "myPrivateStaticMethod", {
            get: function () {
                return null;
            },
            enumerable: true,
            configurable: true
        });
        var proto_16 = publicClassWithWithPublicGetAccessorTypes.prototype;
        Object.defineProperty(proto_16, "myPublicMethod", {
            get: function () {
                return null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(proto_16, "myPrivateMethod", {
            get: function () {
                return null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(publicClassWithWithPublicGetAccessorTypes, "myPublicStaticMethod1", {
            get: function () {
                return new publicClass();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(publicClassWithWithPublicGetAccessorTypes, "myPrivateStaticMethod1", {
            get: function () {
                return new publicClass();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(proto_16, "myPublicMethod1", {
            get: function () {
                return new publicClass();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(proto_16, "myPrivateMethod1", {
            get: function () {
                return new publicClass();
            },
            enumerable: true,
            configurable: true
        });
        return publicClassWithWithPublicGetAccessorTypes;
    }());
    publicModuleInGlobal.publicClassWithWithPublicGetAccessorTypes = publicClassWithWithPublicGetAccessorTypes;
    var privateClassWithWithPrivateGetAccessorTypes = (function () {
        function privateClassWithWithPrivateGetAccessorTypes() {
        }
        Object.defineProperty(privateClassWithWithPrivateGetAccessorTypes, "myPublicStaticMethod", {
            get: function () {
                return null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(privateClassWithWithPrivateGetAccessorTypes, "myPrivateStaticMethod", {
            get: function () {
                return null;
            },
            enumerable: true,
            configurable: true
        });
        var proto_17 = privateClassWithWithPrivateGetAccessorTypes.prototype;
        Object.defineProperty(proto_17, "myPublicMethod", {
            get: function () {
                return null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(proto_17, "myPrivateMethod", {
            get: function () {
                return null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(privateClassWithWithPrivateGetAccessorTypes, "myPublicStaticMethod1", {
            get: function () {
                return new privateClass();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(privateClassWithWithPrivateGetAccessorTypes, "myPrivateStaticMethod1", {
            get: function () {
                return new privateClass();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(proto_17, "myPublicMethod1", {
            get: function () {
                return new privateClass();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(proto_17, "myPrivateMethod1", {
            get: function () {
                return new privateClass();
            },
            enumerable: true,
            configurable: true
        });
        return privateClassWithWithPrivateGetAccessorTypes;
    }());
    var privateClassWithWithPublicGetAccessorTypes = (function () {
        function privateClassWithWithPublicGetAccessorTypes() {
        }
        Object.defineProperty(privateClassWithWithPublicGetAccessorTypes, "myPublicStaticMethod", {
            get: function () {
                return null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(privateClassWithWithPublicGetAccessorTypes, "myPrivateStaticMethod", {
            get: function () {
                return null;
            },
            enumerable: true,
            configurable: true
        });
        var proto_18 = privateClassWithWithPublicGetAccessorTypes.prototype;
        Object.defineProperty(proto_18, "myPublicMethod", {
            get: function () {
                return null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(proto_18, "myPrivateMethod", {
            get: function () {
                return null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(privateClassWithWithPublicGetAccessorTypes, "myPublicStaticMethod1", {
            get: function () {
                return new publicClass();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(privateClassWithWithPublicGetAccessorTypes, "myPrivateStaticMethod1", {
            get: function () {
                return new publicClass();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(proto_18, "myPublicMethod1", {
            get: function () {
                return new publicClass();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(proto_18, "myPrivateMethod1", {
            get: function () {
                return new publicClass();
            },
            enumerable: true,
            configurable: true
        });
        return privateClassWithWithPublicGetAccessorTypes;
    }());
    var publicClassWithWithPrivateSetAccessorTypes = (function () {
        function publicClassWithWithPrivateSetAccessorTypes() {
        }
        Object.defineProperty(publicClassWithWithPrivateSetAccessorTypes, "myPublicStaticMethod", {
            set: function (param) {
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(publicClassWithWithPrivateSetAccessorTypes, "myPrivateStaticMethod", {
            set: function (param) {
            },
            enumerable: true,
            configurable: true
        });
        var proto_19 = publicClassWithWithPrivateSetAccessorTypes.prototype;
        Object.defineProperty(proto_19, "myPublicMethod", {
            set: function (param) {
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(proto_19, "myPrivateMethod", {
            set: function (param) {
            },
            enumerable: true,
            configurable: true
        });
        return publicClassWithWithPrivateSetAccessorTypes;
    }());
    publicModuleInGlobal.publicClassWithWithPrivateSetAccessorTypes = publicClassWithWithPrivateSetAccessorTypes;
    var publicClassWithWithPublicSetAccessorTypes = (function () {
        function publicClassWithWithPublicSetAccessorTypes() {
        }
        Object.defineProperty(publicClassWithWithPublicSetAccessorTypes, "myPublicStaticMethod", {
            set: function (param) {
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(publicClassWithWithPublicSetAccessorTypes, "myPrivateStaticMethod", {
            set: function (param) {
            },
            enumerable: true,
            configurable: true
        });
        var proto_20 = publicClassWithWithPublicSetAccessorTypes.prototype;
        Object.defineProperty(proto_20, "myPublicMethod", {
            set: function (param) {
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(proto_20, "myPrivateMethod", {
            set: function (param) {
            },
            enumerable: true,
            configurable: true
        });
        return publicClassWithWithPublicSetAccessorTypes;
    }());
    publicModuleInGlobal.publicClassWithWithPublicSetAccessorTypes = publicClassWithWithPublicSetAccessorTypes;
    var privateClassWithWithPrivateSetAccessorTypes = (function () {
        function privateClassWithWithPrivateSetAccessorTypes() {
        }
        Object.defineProperty(privateClassWithWithPrivateSetAccessorTypes, "myPublicStaticMethod", {
            set: function (param) {
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(privateClassWithWithPrivateSetAccessorTypes, "myPrivateStaticMethod", {
            set: function (param) {
            },
            enumerable: true,
            configurable: true
        });
        var proto_21 = privateClassWithWithPrivateSetAccessorTypes.prototype;
        Object.defineProperty(proto_21, "myPublicMethod", {
            set: function (param) {
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(proto_21, "myPrivateMethod", {
            set: function (param) {
            },
            enumerable: true,
            configurable: true
        });
        return privateClassWithWithPrivateSetAccessorTypes;
    }());
    var privateClassWithWithPublicSetAccessorTypes = (function () {
        function privateClassWithWithPublicSetAccessorTypes() {
        }
        Object.defineProperty(privateClassWithWithPublicSetAccessorTypes, "myPublicStaticMethod", {
            set: function (param) {
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(privateClassWithWithPublicSetAccessorTypes, "myPrivateStaticMethod", {
            set: function (param) {
            },
            enumerable: true,
            configurable: true
        });
        var proto_22 = privateClassWithWithPublicSetAccessorTypes.prototype;
        Object.defineProperty(proto_22, "myPublicMethod", {
            set: function (param) {
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(proto_22, "myPrivateMethod", {
            set: function (param) {
            },
            enumerable: true,
            configurable: true
        });
        return privateClassWithWithPublicSetAccessorTypes;
    }());
    var publicClassWithPrivateModuleGetAccessorTypes = (function () {
        function publicClassWithPrivateModuleGetAccessorTypes() {
        }
        Object.defineProperty(publicClassWithPrivateModuleGetAccessorTypes, "myPublicStaticMethod", {
            get: function () {
                return null;
            },
            enumerable: true,
            configurable: true
        });
        var proto_23 = publicClassWithPrivateModuleGetAccessorTypes.prototype;
        Object.defineProperty(proto_23, "myPublicMethod", {
            get: function () {
                return null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(publicClassWithPrivateModuleGetAccessorTypes, "myPublicStaticMethod1", {
            get: function () {
                return new privateModule.publicClass();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(proto_23, "myPublicMethod1", {
            get: function () {
                return new privateModule.publicClass();
            },
            enumerable: true,
            configurable: true
        });
        return publicClassWithPrivateModuleGetAccessorTypes;
    }());
    publicModuleInGlobal.publicClassWithPrivateModuleGetAccessorTypes = publicClassWithPrivateModuleGetAccessorTypes;
    var publicClassWithPrivateModuleSetAccessorTypes = (function () {
        function publicClassWithPrivateModuleSetAccessorTypes() {
        }
        Object.defineProperty(publicClassWithPrivateModuleSetAccessorTypes, "myPublicStaticMethod", {
            set: function (param) {
            },
            enumerable: true,
            configurable: true
        });
        var proto_24 = publicClassWithPrivateModuleSetAccessorTypes.prototype;
        Object.defineProperty(proto_24, "myPublicMethod", {
            set: function (param) {
            },
            enumerable: true,
            configurable: true
        });
        return publicClassWithPrivateModuleSetAccessorTypes;
    }());
    publicModuleInGlobal.publicClassWithPrivateModuleSetAccessorTypes = publicClassWithPrivateModuleSetAccessorTypes;
    var privateClassWithPrivateModuleGetAccessorTypes = (function () {
        function privateClassWithPrivateModuleGetAccessorTypes() {
        }
        Object.defineProperty(privateClassWithPrivateModuleGetAccessorTypes, "myPublicStaticMethod", {
            get: function () {
                return null;
            },
            enumerable: true,
            configurable: true
        });
        var proto_25 = privateClassWithPrivateModuleGetAccessorTypes.prototype;
        Object.defineProperty(proto_25, "myPublicMethod", {
            get: function () {
                return null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(privateClassWithPrivateModuleGetAccessorTypes, "myPublicStaticMethod1", {
            get: function () {
                return new privateModule.publicClass();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(proto_25, "myPublicMethod1", {
            get: function () {
                return new privateModule.publicClass();
            },
            enumerable: true,
            configurable: true
        });
        return privateClassWithPrivateModuleGetAccessorTypes;
    }());
    var privateClassWithPrivateModuleSetAccessorTypes = (function () {
        function privateClassWithPrivateModuleSetAccessorTypes() {
        }
        Object.defineProperty(privateClassWithPrivateModuleSetAccessorTypes, "myPublicStaticMethod", {
            set: function (param) {
            },
            enumerable: true,
            configurable: true
        });
        var proto_26 = privateClassWithPrivateModuleSetAccessorTypes.prototype;
        Object.defineProperty(proto_26, "myPublicMethod", {
            set: function (param) {
            },
            enumerable: true,
            configurable: true
        });
        return privateClassWithPrivateModuleSetAccessorTypes;
    }());
})(publicModuleInGlobal || (publicModuleInGlobal = {}));
