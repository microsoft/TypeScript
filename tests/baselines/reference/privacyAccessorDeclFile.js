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
    Object.defineProperty(publicClassWithWithPrivateGetAccessorTypes.prototype, "myPublicMethod", {
        get: function () {
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(publicClassWithWithPrivateGetAccessorTypes.prototype, "myPrivateMethod", {
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
    Object.defineProperty(publicClassWithWithPrivateGetAccessorTypes.prototype, "myPublicMethod1", {
        get: function () {
            return new privateClass();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(publicClassWithWithPrivateGetAccessorTypes.prototype, "myPrivateMethod1", {
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
    Object.defineProperty(publicClassWithWithPublicGetAccessorTypes.prototype, "myPublicMethod", {
        get: function () {
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(publicClassWithWithPublicGetAccessorTypes.prototype, "myPrivateMethod", {
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
    Object.defineProperty(publicClassWithWithPublicGetAccessorTypes.prototype, "myPublicMethod1", {
        get: function () {
            return new publicClass();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(publicClassWithWithPublicGetAccessorTypes.prototype, "myPrivateMethod1", {
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
    Object.defineProperty(privateClassWithWithPrivateGetAccessorTypes.prototype, "myPublicMethod", {
        get: function () {
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(privateClassWithWithPrivateGetAccessorTypes.prototype, "myPrivateMethod", {
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
    Object.defineProperty(privateClassWithWithPrivateGetAccessorTypes.prototype, "myPublicMethod1", {
        get: function () {
            return new privateClass();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(privateClassWithWithPrivateGetAccessorTypes.prototype, "myPrivateMethod1", {
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
    Object.defineProperty(privateClassWithWithPublicGetAccessorTypes.prototype, "myPublicMethod", {
        get: function () {
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(privateClassWithWithPublicGetAccessorTypes.prototype, "myPrivateMethod", {
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
    Object.defineProperty(privateClassWithWithPublicGetAccessorTypes.prototype, "myPublicMethod1", {
        get: function () {
            return new publicClass();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(privateClassWithWithPublicGetAccessorTypes.prototype, "myPrivateMethod1", {
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
    Object.defineProperty(publicClassWithWithPrivateSetAccessorTypes.prototype, "myPublicMethod", {
        set: function (param) {
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(publicClassWithWithPrivateSetAccessorTypes.prototype, "myPrivateMethod", {
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
    Object.defineProperty(publicClassWithWithPublicSetAccessorTypes.prototype, "myPublicMethod", {
        set: function (param) {
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(publicClassWithWithPublicSetAccessorTypes.prototype, "myPrivateMethod", {
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
    Object.defineProperty(privateClassWithWithPrivateSetAccessorTypes.prototype, "myPublicMethod", {
        set: function (param) {
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(privateClassWithWithPrivateSetAccessorTypes.prototype, "myPrivateMethod", {
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
    Object.defineProperty(privateClassWithWithPublicSetAccessorTypes.prototype, "myPublicMethod", {
        set: function (param) {
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(privateClassWithWithPublicSetAccessorTypes.prototype, "myPrivateMethod", {
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
    Object.defineProperty(publicClassWithPrivateModuleGetAccessorTypes.prototype, "myPublicMethod", {
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
    Object.defineProperty(publicClassWithPrivateModuleGetAccessorTypes.prototype, "myPublicMethod1", {
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
    Object.defineProperty(publicClassWithPrivateModuleSetAccessorTypes.prototype, "myPublicMethod", {
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
    Object.defineProperty(privateClassWithPrivateModuleGetAccessorTypes.prototype, "myPublicMethod", {
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
    Object.defineProperty(privateClassWithPrivateModuleGetAccessorTypes.prototype, "myPublicMethod1", {
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
    Object.defineProperty(privateClassWithPrivateModuleSetAccessorTypes.prototype, "myPublicMethod", {
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
        Object.defineProperty(publicClassWithWithPrivateGetAccessorTypes.prototype, "myPublicMethod", {
            get: function () {
                return null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(publicClassWithWithPrivateGetAccessorTypes.prototype, "myPrivateMethod", {
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
        Object.defineProperty(publicClassWithWithPrivateGetAccessorTypes.prototype, "myPublicMethod1", {
            get: function () {
                return new privateClass();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(publicClassWithWithPrivateGetAccessorTypes.prototype, "myPrivateMethod1", {
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
        Object.defineProperty(publicClassWithWithPublicGetAccessorTypes.prototype, "myPublicMethod", {
            get: function () {
                return null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(publicClassWithWithPublicGetAccessorTypes.prototype, "myPrivateMethod", {
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
        Object.defineProperty(publicClassWithWithPublicGetAccessorTypes.prototype, "myPublicMethod1", {
            get: function () {
                return new publicClass();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(publicClassWithWithPublicGetAccessorTypes.prototype, "myPrivateMethod1", {
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
        Object.defineProperty(privateClassWithWithPrivateGetAccessorTypes.prototype, "myPublicMethod", {
            get: function () {
                return null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(privateClassWithWithPrivateGetAccessorTypes.prototype, "myPrivateMethod", {
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
        Object.defineProperty(privateClassWithWithPrivateGetAccessorTypes.prototype, "myPublicMethod1", {
            get: function () {
                return new privateClass();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(privateClassWithWithPrivateGetAccessorTypes.prototype, "myPrivateMethod1", {
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
        Object.defineProperty(privateClassWithWithPublicGetAccessorTypes.prototype, "myPublicMethod", {
            get: function () {
                return null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(privateClassWithWithPublicGetAccessorTypes.prototype, "myPrivateMethod", {
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
        Object.defineProperty(privateClassWithWithPublicGetAccessorTypes.prototype, "myPublicMethod1", {
            get: function () {
                return new publicClass();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(privateClassWithWithPublicGetAccessorTypes.prototype, "myPrivateMethod1", {
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
        Object.defineProperty(publicClassWithWithPrivateSetAccessorTypes.prototype, "myPublicMethod", {
            set: function (param) {
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(publicClassWithWithPrivateSetAccessorTypes.prototype, "myPrivateMethod", {
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
        Object.defineProperty(publicClassWithWithPublicSetAccessorTypes.prototype, "myPublicMethod", {
            set: function (param) {
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(publicClassWithWithPublicSetAccessorTypes.prototype, "myPrivateMethod", {
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
        Object.defineProperty(privateClassWithWithPrivateSetAccessorTypes.prototype, "myPublicMethod", {
            set: function (param) {
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(privateClassWithWithPrivateSetAccessorTypes.prototype, "myPrivateMethod", {
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
        Object.defineProperty(privateClassWithWithPublicSetAccessorTypes.prototype, "myPublicMethod", {
            set: function (param) {
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(privateClassWithWithPublicSetAccessorTypes.prototype, "myPrivateMethod", {
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
        Object.defineProperty(publicClassWithPrivateModuleGetAccessorTypes.prototype, "myPublicMethod", {
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
        Object.defineProperty(publicClassWithPrivateModuleGetAccessorTypes.prototype, "myPublicMethod1", {
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
        Object.defineProperty(publicClassWithPrivateModuleSetAccessorTypes.prototype, "myPublicMethod", {
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
        Object.defineProperty(privateClassWithPrivateModuleGetAccessorTypes.prototype, "myPublicMethod", {
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
        Object.defineProperty(privateClassWithPrivateModuleGetAccessorTypes.prototype, "myPublicMethod1", {
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
        Object.defineProperty(privateClassWithPrivateModuleSetAccessorTypes.prototype, "myPublicMethod", {
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
        Object.defineProperty(publicClassWithWithPrivateGetAccessorTypes.prototype, "myPublicMethod", {
            get: function () {
                return null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(publicClassWithWithPrivateGetAccessorTypes.prototype, "myPrivateMethod", {
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
        Object.defineProperty(publicClassWithWithPrivateGetAccessorTypes.prototype, "myPublicMethod1", {
            get: function () {
                return new privateClass();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(publicClassWithWithPrivateGetAccessorTypes.prototype, "myPrivateMethod1", {
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
        Object.defineProperty(publicClassWithWithPublicGetAccessorTypes.prototype, "myPublicMethod", {
            get: function () {
                return null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(publicClassWithWithPublicGetAccessorTypes.prototype, "myPrivateMethod", {
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
        Object.defineProperty(publicClassWithWithPublicGetAccessorTypes.prototype, "myPublicMethod1", {
            get: function () {
                return new publicClass();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(publicClassWithWithPublicGetAccessorTypes.prototype, "myPrivateMethod1", {
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
        Object.defineProperty(privateClassWithWithPrivateGetAccessorTypes.prototype, "myPublicMethod", {
            get: function () {
                return null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(privateClassWithWithPrivateGetAccessorTypes.prototype, "myPrivateMethod", {
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
        Object.defineProperty(privateClassWithWithPrivateGetAccessorTypes.prototype, "myPublicMethod1", {
            get: function () {
                return new privateClass();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(privateClassWithWithPrivateGetAccessorTypes.prototype, "myPrivateMethod1", {
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
        Object.defineProperty(privateClassWithWithPublicGetAccessorTypes.prototype, "myPublicMethod", {
            get: function () {
                return null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(privateClassWithWithPublicGetAccessorTypes.prototype, "myPrivateMethod", {
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
        Object.defineProperty(privateClassWithWithPublicGetAccessorTypes.prototype, "myPublicMethod1", {
            get: function () {
                return new publicClass();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(privateClassWithWithPublicGetAccessorTypes.prototype, "myPrivateMethod1", {
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
        Object.defineProperty(publicClassWithWithPrivateSetAccessorTypes.prototype, "myPublicMethod", {
            set: function (param) {
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(publicClassWithWithPrivateSetAccessorTypes.prototype, "myPrivateMethod", {
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
        Object.defineProperty(publicClassWithWithPublicSetAccessorTypes.prototype, "myPublicMethod", {
            set: function (param) {
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(publicClassWithWithPublicSetAccessorTypes.prototype, "myPrivateMethod", {
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
        Object.defineProperty(privateClassWithWithPrivateSetAccessorTypes.prototype, "myPublicMethod", {
            set: function (param) {
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(privateClassWithWithPrivateSetAccessorTypes.prototype, "myPrivateMethod", {
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
        Object.defineProperty(privateClassWithWithPublicSetAccessorTypes.prototype, "myPublicMethod", {
            set: function (param) {
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(privateClassWithWithPublicSetAccessorTypes.prototype, "myPrivateMethod", {
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
        Object.defineProperty(publicClassWithPrivateModuleGetAccessorTypes.prototype, "myPublicMethod", {
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
        Object.defineProperty(publicClassWithPrivateModuleGetAccessorTypes.prototype, "myPublicMethod1", {
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
        Object.defineProperty(publicClassWithPrivateModuleSetAccessorTypes.prototype, "myPublicMethod", {
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
        Object.defineProperty(privateClassWithPrivateModuleGetAccessorTypes.prototype, "myPublicMethod", {
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
        Object.defineProperty(privateClassWithPrivateModuleGetAccessorTypes.prototype, "myPublicMethod1", {
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
        Object.defineProperty(privateClassWithPrivateModuleSetAccessorTypes.prototype, "myPublicMethod", {
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
    Object.defineProperty(publicClassInGlobalWithPublicGetAccessorTypes.prototype, "myPublicMethod", {
        get: function () {
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(publicClassInGlobalWithPublicGetAccessorTypes.prototype, "myPrivateMethod", {
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
    Object.defineProperty(publicClassInGlobalWithPublicGetAccessorTypes.prototype, "myPublicMethod1", {
        get: function () {
            return new publicClassInGlobal();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(publicClassInGlobalWithPublicGetAccessorTypes.prototype, "myPrivateMethod1", {
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
    Object.defineProperty(publicClassInGlobalWithWithPublicSetAccessorTypes.prototype, "myPublicMethod", {
        set: function (param) {
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(publicClassInGlobalWithWithPublicSetAccessorTypes.prototype, "myPrivateMethod", {
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
            Object.defineProperty(publicClassWithWithPrivateGetAccessorTypes.prototype, "myPublicMethod", {
                get: function () {
                    return null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(publicClassWithWithPrivateGetAccessorTypes.prototype, "myPrivateMethod", {
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
            Object.defineProperty(publicClassWithWithPrivateGetAccessorTypes.prototype, "myPublicMethod1", {
                get: function () {
                    return new privateClass();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(publicClassWithWithPrivateGetAccessorTypes.prototype, "myPrivateMethod1", {
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
            Object.defineProperty(publicClassWithWithPublicGetAccessorTypes.prototype, "myPublicMethod", {
                get: function () {
                    return null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(publicClassWithWithPublicGetAccessorTypes.prototype, "myPrivateMethod", {
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
            Object.defineProperty(publicClassWithWithPublicGetAccessorTypes.prototype, "myPublicMethod1", {
                get: function () {
                    return new publicClass();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(publicClassWithWithPublicGetAccessorTypes.prototype, "myPrivateMethod1", {
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
            Object.defineProperty(privateClassWithWithPrivateGetAccessorTypes.prototype, "myPublicMethod", {
                get: function () {
                    return null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(privateClassWithWithPrivateGetAccessorTypes.prototype, "myPrivateMethod", {
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
            Object.defineProperty(privateClassWithWithPrivateGetAccessorTypes.prototype, "myPublicMethod1", {
                get: function () {
                    return new privateClass();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(privateClassWithWithPrivateGetAccessorTypes.prototype, "myPrivateMethod1", {
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
            Object.defineProperty(privateClassWithWithPublicGetAccessorTypes.prototype, "myPublicMethod", {
                get: function () {
                    return null;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(privateClassWithWithPublicGetAccessorTypes.prototype, "myPrivateMethod", {
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
            Object.defineProperty(privateClassWithWithPublicGetAccessorTypes.prototype, "myPublicMethod1", {
                get: function () {
                    return new publicClass();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(privateClassWithWithPublicGetAccessorTypes.prototype, "myPrivateMethod1", {
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
            Object.defineProperty(publicClassWithWithPrivateSetAccessorTypes.prototype, "myPublicMethod", {
                set: function (param) {
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(publicClassWithWithPrivateSetAccessorTypes.prototype, "myPrivateMethod", {
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
            Object.defineProperty(publicClassWithWithPublicSetAccessorTypes.prototype, "myPublicMethod", {
                set: function (param) {
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(publicClassWithWithPublicSetAccessorTypes.prototype, "myPrivateMethod", {
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
            Object.defineProperty(privateClassWithWithPrivateSetAccessorTypes.prototype, "myPublicMethod", {
                set: function (param) {
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(privateClassWithWithPrivateSetAccessorTypes.prototype, "myPrivateMethod", {
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
            Object.defineProperty(privateClassWithWithPublicSetAccessorTypes.prototype, "myPublicMethod", {
                set: function (param) {
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(privateClassWithWithPublicSetAccessorTypes.prototype, "myPrivateMethod", {
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
            Object.defineProperty(publicClassWithPrivateModuleGetAccessorTypes.prototype, "myPublicMethod", {
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
            Object.defineProperty(publicClassWithPrivateModuleGetAccessorTypes.prototype, "myPublicMethod1", {
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
            Object.defineProperty(publicClassWithPrivateModuleSetAccessorTypes.prototype, "myPublicMethod", {
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
            Object.defineProperty(privateClassWithPrivateModuleGetAccessorTypes.prototype, "myPublicMethod", {
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
            Object.defineProperty(privateClassWithPrivateModuleGetAccessorTypes.prototype, "myPublicMethod1", {
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
            Object.defineProperty(privateClassWithPrivateModuleSetAccessorTypes.prototype, "myPublicMethod", {
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
        Object.defineProperty(publicClassWithWithPrivateGetAccessorTypes.prototype, "myPublicMethod", {
            get: function () {
                return null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(publicClassWithWithPrivateGetAccessorTypes.prototype, "myPrivateMethod", {
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
        Object.defineProperty(publicClassWithWithPrivateGetAccessorTypes.prototype, "myPublicMethod1", {
            get: function () {
                return new privateClass();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(publicClassWithWithPrivateGetAccessorTypes.prototype, "myPrivateMethod1", {
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
        Object.defineProperty(publicClassWithWithPublicGetAccessorTypes.prototype, "myPublicMethod", {
            get: function () {
                return null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(publicClassWithWithPublicGetAccessorTypes.prototype, "myPrivateMethod", {
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
        Object.defineProperty(publicClassWithWithPublicGetAccessorTypes.prototype, "myPublicMethod1", {
            get: function () {
                return new publicClass();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(publicClassWithWithPublicGetAccessorTypes.prototype, "myPrivateMethod1", {
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
        Object.defineProperty(privateClassWithWithPrivateGetAccessorTypes.prototype, "myPublicMethod", {
            get: function () {
                return null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(privateClassWithWithPrivateGetAccessorTypes.prototype, "myPrivateMethod", {
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
        Object.defineProperty(privateClassWithWithPrivateGetAccessorTypes.prototype, "myPublicMethod1", {
            get: function () {
                return new privateClass();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(privateClassWithWithPrivateGetAccessorTypes.prototype, "myPrivateMethod1", {
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
        Object.defineProperty(privateClassWithWithPublicGetAccessorTypes.prototype, "myPublicMethod", {
            get: function () {
                return null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(privateClassWithWithPublicGetAccessorTypes.prototype, "myPrivateMethod", {
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
        Object.defineProperty(privateClassWithWithPublicGetAccessorTypes.prototype, "myPublicMethod1", {
            get: function () {
                return new publicClass();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(privateClassWithWithPublicGetAccessorTypes.prototype, "myPrivateMethod1", {
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
        Object.defineProperty(publicClassWithWithPrivateSetAccessorTypes.prototype, "myPublicMethod", {
            set: function (param) {
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(publicClassWithWithPrivateSetAccessorTypes.prototype, "myPrivateMethod", {
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
        Object.defineProperty(publicClassWithWithPublicSetAccessorTypes.prototype, "myPublicMethod", {
            set: function (param) {
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(publicClassWithWithPublicSetAccessorTypes.prototype, "myPrivateMethod", {
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
        Object.defineProperty(privateClassWithWithPrivateSetAccessorTypes.prototype, "myPublicMethod", {
            set: function (param) {
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(privateClassWithWithPrivateSetAccessorTypes.prototype, "myPrivateMethod", {
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
        Object.defineProperty(privateClassWithWithPublicSetAccessorTypes.prototype, "myPublicMethod", {
            set: function (param) {
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(privateClassWithWithPublicSetAccessorTypes.prototype, "myPrivateMethod", {
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
        Object.defineProperty(publicClassWithPrivateModuleGetAccessorTypes.prototype, "myPublicMethod", {
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
        Object.defineProperty(publicClassWithPrivateModuleGetAccessorTypes.prototype, "myPublicMethod1", {
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
        Object.defineProperty(publicClassWithPrivateModuleSetAccessorTypes.prototype, "myPublicMethod", {
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
        Object.defineProperty(privateClassWithPrivateModuleGetAccessorTypes.prototype, "myPublicMethod", {
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
        Object.defineProperty(privateClassWithPrivateModuleGetAccessorTypes.prototype, "myPublicMethod1", {
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
        Object.defineProperty(privateClassWithPrivateModuleSetAccessorTypes.prototype, "myPublicMethod", {
            set: function (param) {
            },
            enumerable: true,
            configurable: true
        });
        return privateClassWithPrivateModuleSetAccessorTypes;
    }());
})(publicModuleInGlobal || (publicModuleInGlobal = {}));
