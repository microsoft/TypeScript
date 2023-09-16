//// [tests/cases/compiler/privacyVarDeclFile.ts] ////

//// [privacyVarDeclFile_externalModule.ts]
class privateClass {
}

export class publicClass {
}

export interface publicInterfaceWithPrivatePropertyTypes {
    myProperty: privateClass;  // Error
}

export interface publicInterfaceWithPublicPropertyTypes {
    myProperty: publicClass;
}

interface privateInterfaceWithPrivatePropertyTypes {
    myProperty: privateClass;
}

interface privateInterfaceWithPublicPropertyTypes {
    myProperty: publicClass;
}

export class publicClassWithWithPrivatePropertyTypes {
    static myPublicStaticProperty: privateClass; // Error
    private static myPrivateStaticProperty: privateClass;
    myPublicProperty: privateClass; // Error
    private myPrivateProperty: privateClass;
}

export class publicClassWithWithPublicPropertyTypes {
    static myPublicStaticProperty: publicClass;
    private static myPrivateStaticProperty: publicClass;
    myPublicProperty: publicClass;
    private myPrivateProperty: publicClass;
}

class privateClassWithWithPrivatePropertyTypes {
    static myPublicStaticProperty: privateClass;
    private static myPrivateStaticProperty: privateClass;
    myPublicProperty: privateClass;
    private myPrivateProperty: privateClass;
}

class privateClassWithWithPublicPropertyTypes {
    static myPublicStaticProperty: publicClass;
    private static myPrivateStaticProperty: publicClass;
    myPublicProperty: publicClass;
    private myPrivateProperty: publicClass;
}

export var publicVarWithPrivatePropertyTypes: privateClass; // Error
export var publicVarWithPublicPropertyTypes: publicClass;
var privateVarWithPrivatePropertyTypes: privateClass;
var privateVarWithPublicPropertyTypes: publicClass;

export declare var publicAmbientVarWithPrivatePropertyTypes: privateClass; // Error
export declare var publicAmbientVarWithPublicPropertyTypes: publicClass;
declare var privateAmbientVarWithPrivatePropertyTypes: privateClass;
declare var privateAmbientVarWithPublicPropertyTypes: publicClass;

export interface publicInterfaceWithPrivateModulePropertyTypes {
    myProperty: privateModule.publicClass; // Error
}
export class publicClassWithPrivateModulePropertyTypes {
    static myPublicStaticProperty: privateModule.publicClass; // Error
    myPublicProperty: privateModule.publicClass; // Error
}
export var publicVarWithPrivateModulePropertyTypes: privateModule.publicClass; // Error
export declare var publicAmbientVarWithPrivateModulePropertyTypes: privateModule.publicClass; // Error

interface privateInterfaceWithPrivateModulePropertyTypes {
    myProperty: privateModule.publicClass;
}
class privateClassWithPrivateModulePropertyTypes {
    static myPublicStaticProperty: privateModule.publicClass;
    myPublicProperty: privateModule.publicClass;
}
var privateVarWithPrivateModulePropertyTypes: privateModule.publicClass;
declare var privateAmbientVarWithPrivateModulePropertyTypes: privateModule.publicClass;

export module publicModule {
    class privateClass {
    }

    export class publicClass {
    }

    export interface publicInterfaceWithPrivatePropertyTypes {
        myProperty: privateClass;  // Error
    }

    export interface publicInterfaceWithPublicPropertyTypes {
        myProperty: publicClass;
    }

    interface privateInterfaceWithPrivatePropertyTypes {
        myProperty: privateClass;
    }

    interface privateInterfaceWithPublicPropertyTypes {
        myProperty: publicClass;
    }

    export class publicClassWithWithPrivatePropertyTypes {
        static myPublicStaticProperty: privateClass; // Error
        private static myPrivateStaticProperty: privateClass;
        myPublicProperty: privateClass; // Error
        private myPrivateProperty: privateClass;
    }

    export class publicClassWithWithPublicPropertyTypes {
        static myPublicStaticProperty: publicClass;
        private static myPrivateStaticProperty: publicClass;
        myPublicProperty: publicClass;
        private myPrivateProperty: publicClass;
    }

    class privateClassWithWithPrivatePropertyTypes {
        static myPublicStaticProperty: privateClass;
        private static myPrivateStaticProperty: privateClass;
        myPublicProperty: privateClass;
        private myPrivateProperty: privateClass;
    }

    class privateClassWithWithPublicPropertyTypes {
        static myPublicStaticProperty: publicClass;
        private static myPrivateStaticProperty: publicClass;
        myPublicProperty: publicClass;
        private myPrivateProperty: publicClass;
    }

    export var publicVarWithPrivatePropertyTypes: privateClass; // Error
    export var publicVarWithPublicPropertyTypes: publicClass;
    var privateVarWithPrivatePropertyTypes: privateClass;
    var privateVarWithPublicPropertyTypes: publicClass;

    export declare var publicAmbientVarWithPrivatePropertyTypes: privateClass; // Error
    export declare var publicAmbientVarWithPublicPropertyTypes: publicClass;
    declare var privateAmbientVarWithPrivatePropertyTypes: privateClass;
    declare var privateAmbientVarWithPublicPropertyTypes: publicClass;

    export interface publicInterfaceWithPrivateModulePropertyTypes {
        myProperty: privateModule.publicClass; // Error
    }
    export class publicClassWithPrivateModulePropertyTypes {
        static myPublicStaticProperty: privateModule.publicClass; // Error
        myPublicProperty: privateModule.publicClass; // Error
    }
    export var publicVarWithPrivateModulePropertyTypes: privateModule.publicClass; // Error
    export declare var publicAmbientVarWithPrivateModulePropertyTypes: privateModule.publicClass; // Error

    interface privateInterfaceWithPrivateModulePropertyTypes {
        myProperty: privateModule.publicClass;
    }
    class privateClassWithPrivateModulePropertyTypes {
        static myPublicStaticProperty: privateModule.publicClass;
        myPublicProperty: privateModule.publicClass;
    }
    var privateVarWithPrivateModulePropertyTypes: privateModule.publicClass;
    declare var privateAmbientVarWithPrivateModulePropertyTypes: privateModule.publicClass;
}

module privateModule {
    class privateClass {
    }

    export class publicClass {
    }

    export interface publicInterfaceWithPrivatePropertyTypes {
        myProperty: privateClass;  
    }

    export interface publicInterfaceWithPublicPropertyTypes {
        myProperty: publicClass;
    }

    interface privateInterfaceWithPrivatePropertyTypes {
        myProperty: privateClass;
    }

    interface privateInterfaceWithPublicPropertyTypes {
        myProperty: publicClass;
    }

    export class publicClassWithWithPrivatePropertyTypes {
        static myPublicStaticProperty: privateClass; 
        private static myPrivateStaticProperty: privateClass;
        myPublicProperty: privateClass; 
        private myPrivateProperty: privateClass;
    }

    export class publicClassWithWithPublicPropertyTypes {
        static myPublicStaticProperty: publicClass;
        private static myPrivateStaticProperty: publicClass;
        myPublicProperty: publicClass;
        private myPrivateProperty: publicClass;
    }

    class privateClassWithWithPrivatePropertyTypes {
        static myPublicStaticProperty: privateClass;
        private static myPrivateStaticProperty: privateClass;
        myPublicProperty: privateClass;
        private myPrivateProperty: privateClass;
    }

    class privateClassWithWithPublicPropertyTypes {
        static myPublicStaticProperty: publicClass;
        private static myPrivateStaticProperty: publicClass;
        myPublicProperty: publicClass;
        private myPrivateProperty: publicClass;
    }

    export var publicVarWithPrivatePropertyTypes: privateClass; 
    export var publicVarWithPublicPropertyTypes: publicClass;
    var privateVarWithPrivatePropertyTypes: privateClass;
    var privateVarWithPublicPropertyTypes: publicClass;

    export declare var publicAmbientVarWithPrivatePropertyTypes: privateClass; 
    export declare var publicAmbientVarWithPublicPropertyTypes: publicClass;
    declare var privateAmbientVarWithPrivatePropertyTypes: privateClass;
    declare var privateAmbientVarWithPublicPropertyTypes: publicClass;

    export interface publicInterfaceWithPrivateModulePropertyTypes {
        myProperty: privateModule.publicClass; 
    }
    export class publicClassWithPrivateModulePropertyTypes {
        static myPublicStaticProperty: privateModule.publicClass; 
        myPublicProperty: privateModule.publicClass; 
    }
    export var publicVarWithPrivateModulePropertyTypes: privateModule.publicClass; 
    export declare var publicAmbientVarWithPrivateModulePropertyTypes: privateModule.publicClass;

    interface privateInterfaceWithPrivateModulePropertyTypes {
        myProperty: privateModule.publicClass;
    }
    class privateClassWithPrivateModulePropertyTypes {
        static myPublicStaticProperty: privateModule.publicClass;
        myPublicProperty: privateModule.publicClass;
    }
    var privateVarWithPrivateModulePropertyTypes: privateModule.publicClass;
    declare var privateAmbientVarWithPrivateModulePropertyTypes: privateModule.publicClass;
}

//// [privacyVarDeclFile_GlobalFile.ts]
class publicClassInGlobal {
}
interface publicInterfaceWithPublicPropertyTypesInGlobal {
    myProperty: publicClassInGlobal;
}
class publicClassWithWithPublicPropertyTypesInGlobal {
    static myPublicStaticProperty: publicClassInGlobal;
    private static myPrivateStaticProperty: publicClassInGlobal;
    myPublicProperty: publicClassInGlobal;
    private myPrivateProperty: publicClassInGlobal;
}
var publicVarWithPublicPropertyTypesInGlobal: publicClassInGlobal;
declare var publicAmbientVarWithPublicPropertyTypesInGlobal: publicClassInGlobal;

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

        export interface publicInterfaceWithPrivatePropertyTypes {
            myProperty: privateClass;
        }

        export interface publicInterfaceWithPublicPropertyTypes {
            myProperty: publicClass;
        }

        interface privateInterfaceWithPrivatePropertyTypes {
            myProperty: privateClass;
        }

        interface privateInterfaceWithPublicPropertyTypes {
            myProperty: publicClass;
        }

        export class publicClassWithWithPrivatePropertyTypes {
            static myPublicStaticProperty: privateClass;
            private static myPrivateStaticProperty: privateClass;
            myPublicProperty: privateClass;
            private myPrivateProperty: privateClass;
        }

        export class publicClassWithWithPublicPropertyTypes {
            static myPublicStaticProperty: publicClass;
            private static myPrivateStaticProperty: publicClass;
            myPublicProperty: publicClass;
            private myPrivateProperty: publicClass;
        }

        class privateClassWithWithPrivatePropertyTypes {
            static myPublicStaticProperty: privateClass;
            private static myPrivateStaticProperty: privateClass;
            myPublicProperty: privateClass;
            private myPrivateProperty: privateClass;
        }

        class privateClassWithWithPublicPropertyTypes {
            static myPublicStaticProperty: publicClass;
            private static myPrivateStaticProperty: publicClass;
            myPublicProperty: publicClass;
            private myPrivateProperty: publicClass;
        }

        export var publicVarWithPrivatePropertyTypes: privateClass;
        export var publicVarWithPublicPropertyTypes: publicClass;
        var privateVarWithPrivatePropertyTypes: privateClass;
        var privateVarWithPublicPropertyTypes: publicClass;

        export declare var publicAmbientVarWithPrivatePropertyTypes: privateClass;
        export declare var publicAmbientVarWithPublicPropertyTypes: publicClass;
        declare var privateAmbientVarWithPrivatePropertyTypes: privateClass;
        declare var privateAmbientVarWithPublicPropertyTypes: publicClass;

        export interface publicInterfaceWithPrivateModulePropertyTypes {
            myProperty: privateModule.publicClass;
        }
        export class publicClassWithPrivateModulePropertyTypes {
            static myPublicStaticProperty: privateModule.publicClass;
            myPublicProperty: privateModule.publicClass;
        }
        export var publicVarWithPrivateModulePropertyTypes: privateModule.publicClass;
        export declare var publicAmbientVarWithPrivateModulePropertyTypes: privateModule.publicClass;

        interface privateInterfaceWithPrivateModulePropertyTypes {
            myProperty: privateModule.publicClass;
        }
        class privateClassWithPrivateModulePropertyTypes {
            static myPublicStaticProperty: privateModule.publicClass;
            myPublicProperty: privateModule.publicClass;
        }
        var privateVarWithPrivateModulePropertyTypes: privateModule.publicClass;
        declare var privateAmbientVarWithPrivateModulePropertyTypes: privateModule.publicClass;
    }

    export interface publicInterfaceWithPrivatePropertyTypes {
        myProperty: privateClass;  // Error
    }

    export interface publicInterfaceWithPublicPropertyTypes {
        myProperty: publicClass;
    }

    interface privateInterfaceWithPrivatePropertyTypes {
        myProperty: privateClass;
    }

    interface privateInterfaceWithPublicPropertyTypes {
        myProperty: publicClass;
    }

    export class publicClassWithWithPrivatePropertyTypes {
        static myPublicStaticProperty: privateClass; // Error
        private static myPrivateStaticProperty: privateClass;
        myPublicProperty: privateClass; // Error
        private myPrivateProperty: privateClass;
    }

    export class publicClassWithWithPublicPropertyTypes {
        static myPublicStaticProperty: publicClass;
        private static myPrivateStaticProperty: publicClass;
        myPublicProperty: publicClass;
        private myPrivateProperty: publicClass;
    }

    class privateClassWithWithPrivatePropertyTypes {
        static myPublicStaticProperty: privateClass;
        private static myPrivateStaticProperty: privateClass;
        myPublicProperty: privateClass;
        private myPrivateProperty: privateClass;
    }

    class privateClassWithWithPublicPropertyTypes {
        static myPublicStaticProperty: publicClass;
        private static myPrivateStaticProperty: publicClass;
        myPublicProperty: publicClass;
        private myPrivateProperty: publicClass;
    }

    export var publicVarWithPrivatePropertyTypes: privateClass; // Error
    export var publicVarWithPublicPropertyTypes: publicClass;
    var privateVarWithPrivatePropertyTypes: privateClass;
    var privateVarWithPublicPropertyTypes: publicClass;

    export declare var publicAmbientVarWithPrivatePropertyTypes: privateClass; // Error
    export declare var publicAmbientVarWithPublicPropertyTypes: publicClass;
    declare var privateAmbientVarWithPrivatePropertyTypes: privateClass;
    declare var privateAmbientVarWithPublicPropertyTypes: publicClass;

    export interface publicInterfaceWithPrivateModulePropertyTypes {
        myProperty: privateModule.publicClass; // Error
    }
    export class publicClassWithPrivateModulePropertyTypes {
        static myPublicStaticProperty: privateModule.publicClass; // Error
        myPublicProperty: privateModule.publicClass; // Error
    }
    export var publicVarWithPrivateModulePropertyTypes: privateModule.publicClass; // Error
    export declare var publicAmbientVarWithPrivateModulePropertyTypes: privateModule.publicClass; // Error

    interface privateInterfaceWithPrivateModulePropertyTypes {
        myProperty: privateModule.publicClass;
    }
    class privateClassWithPrivateModulePropertyTypes {
        static myPublicStaticProperty: privateModule.publicClass;
        myPublicProperty: privateModule.publicClass;
    }
    var privateVarWithPrivateModulePropertyTypes: privateModule.publicClass;
    declare var privateAmbientVarWithPrivateModulePropertyTypes: privateModule.publicClass;
}

//// [privacyVarDeclFile_externalModule.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicModule = exports.publicVarWithPrivateModulePropertyTypes = exports.publicClassWithPrivateModulePropertyTypes = exports.publicVarWithPublicPropertyTypes = exports.publicVarWithPrivatePropertyTypes = exports.publicClassWithWithPublicPropertyTypes = exports.publicClassWithWithPrivatePropertyTypes = exports.publicClass = void 0;
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
var publicClassWithWithPrivatePropertyTypes = /** @class */ (function () {
    function publicClassWithWithPrivatePropertyTypes() {
    }
    return publicClassWithWithPrivatePropertyTypes;
}());
exports.publicClassWithWithPrivatePropertyTypes = publicClassWithWithPrivatePropertyTypes;
var publicClassWithWithPublicPropertyTypes = /** @class */ (function () {
    function publicClassWithWithPublicPropertyTypes() {
    }
    return publicClassWithWithPublicPropertyTypes;
}());
exports.publicClassWithWithPublicPropertyTypes = publicClassWithWithPublicPropertyTypes;
var privateClassWithWithPrivatePropertyTypes = /** @class */ (function () {
    function privateClassWithWithPrivatePropertyTypes() {
    }
    return privateClassWithWithPrivatePropertyTypes;
}());
var privateClassWithWithPublicPropertyTypes = /** @class */ (function () {
    function privateClassWithWithPublicPropertyTypes() {
    }
    return privateClassWithWithPublicPropertyTypes;
}());
var privateVarWithPrivatePropertyTypes;
var privateVarWithPublicPropertyTypes;
var publicClassWithPrivateModulePropertyTypes = /** @class */ (function () {
    function publicClassWithPrivateModulePropertyTypes() {
    }
    return publicClassWithPrivateModulePropertyTypes;
}());
exports.publicClassWithPrivateModulePropertyTypes = publicClassWithPrivateModulePropertyTypes;
var privateClassWithPrivateModulePropertyTypes = /** @class */ (function () {
    function privateClassWithPrivateModulePropertyTypes() {
    }
    return privateClassWithPrivateModulePropertyTypes;
}());
var privateVarWithPrivateModulePropertyTypes;
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
    var publicClassWithWithPrivatePropertyTypes = /** @class */ (function () {
        function publicClassWithWithPrivatePropertyTypes() {
        }
        return publicClassWithWithPrivatePropertyTypes;
    }());
    publicModule.publicClassWithWithPrivatePropertyTypes = publicClassWithWithPrivatePropertyTypes;
    var publicClassWithWithPublicPropertyTypes = /** @class */ (function () {
        function publicClassWithWithPublicPropertyTypes() {
        }
        return publicClassWithWithPublicPropertyTypes;
    }());
    publicModule.publicClassWithWithPublicPropertyTypes = publicClassWithWithPublicPropertyTypes;
    var privateClassWithWithPrivatePropertyTypes = /** @class */ (function () {
        function privateClassWithWithPrivatePropertyTypes() {
        }
        return privateClassWithWithPrivatePropertyTypes;
    }());
    var privateClassWithWithPublicPropertyTypes = /** @class */ (function () {
        function privateClassWithWithPublicPropertyTypes() {
        }
        return privateClassWithWithPublicPropertyTypes;
    }());
    var privateVarWithPrivatePropertyTypes;
    var privateVarWithPublicPropertyTypes;
    var publicClassWithPrivateModulePropertyTypes = /** @class */ (function () {
        function publicClassWithPrivateModulePropertyTypes() {
        }
        return publicClassWithPrivateModulePropertyTypes;
    }());
    publicModule.publicClassWithPrivateModulePropertyTypes = publicClassWithPrivateModulePropertyTypes;
    var privateClassWithPrivateModulePropertyTypes = /** @class */ (function () {
        function privateClassWithPrivateModulePropertyTypes() {
        }
        return privateClassWithPrivateModulePropertyTypes;
    }());
    var privateVarWithPrivateModulePropertyTypes;
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
    var publicClassWithWithPrivatePropertyTypes = /** @class */ (function () {
        function publicClassWithWithPrivatePropertyTypes() {
        }
        return publicClassWithWithPrivatePropertyTypes;
    }());
    privateModule.publicClassWithWithPrivatePropertyTypes = publicClassWithWithPrivatePropertyTypes;
    var publicClassWithWithPublicPropertyTypes = /** @class */ (function () {
        function publicClassWithWithPublicPropertyTypes() {
        }
        return publicClassWithWithPublicPropertyTypes;
    }());
    privateModule.publicClassWithWithPublicPropertyTypes = publicClassWithWithPublicPropertyTypes;
    var privateClassWithWithPrivatePropertyTypes = /** @class */ (function () {
        function privateClassWithWithPrivatePropertyTypes() {
        }
        return privateClassWithWithPrivatePropertyTypes;
    }());
    var privateClassWithWithPublicPropertyTypes = /** @class */ (function () {
        function privateClassWithWithPublicPropertyTypes() {
        }
        return privateClassWithWithPublicPropertyTypes;
    }());
    var privateVarWithPrivatePropertyTypes;
    var privateVarWithPublicPropertyTypes;
    var publicClassWithPrivateModulePropertyTypes = /** @class */ (function () {
        function publicClassWithPrivateModulePropertyTypes() {
        }
        return publicClassWithPrivateModulePropertyTypes;
    }());
    privateModule.publicClassWithPrivateModulePropertyTypes = publicClassWithPrivateModulePropertyTypes;
    var privateClassWithPrivateModulePropertyTypes = /** @class */ (function () {
        function privateClassWithPrivateModulePropertyTypes() {
        }
        return privateClassWithPrivateModulePropertyTypes;
    }());
    var privateVarWithPrivateModulePropertyTypes;
})(privateModule || (privateModule = {}));
//// [privacyVarDeclFile_GlobalFile.js]
var publicClassInGlobal = /** @class */ (function () {
    function publicClassInGlobal() {
    }
    return publicClassInGlobal;
}());
var publicClassWithWithPublicPropertyTypesInGlobal = /** @class */ (function () {
    function publicClassWithWithPublicPropertyTypesInGlobal() {
    }
    return publicClassWithWithPublicPropertyTypesInGlobal;
}());
var publicVarWithPublicPropertyTypesInGlobal;
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
        var publicClassWithWithPrivatePropertyTypes = /** @class */ (function () {
            function publicClassWithWithPrivatePropertyTypes() {
            }
            return publicClassWithWithPrivatePropertyTypes;
        }());
        privateModule.publicClassWithWithPrivatePropertyTypes = publicClassWithWithPrivatePropertyTypes;
        var publicClassWithWithPublicPropertyTypes = /** @class */ (function () {
            function publicClassWithWithPublicPropertyTypes() {
            }
            return publicClassWithWithPublicPropertyTypes;
        }());
        privateModule.publicClassWithWithPublicPropertyTypes = publicClassWithWithPublicPropertyTypes;
        var privateClassWithWithPrivatePropertyTypes = /** @class */ (function () {
            function privateClassWithWithPrivatePropertyTypes() {
            }
            return privateClassWithWithPrivatePropertyTypes;
        }());
        var privateClassWithWithPublicPropertyTypes = /** @class */ (function () {
            function privateClassWithWithPublicPropertyTypes() {
            }
            return privateClassWithWithPublicPropertyTypes;
        }());
        var privateVarWithPrivatePropertyTypes;
        var privateVarWithPublicPropertyTypes;
        var publicClassWithPrivateModulePropertyTypes = /** @class */ (function () {
            function publicClassWithPrivateModulePropertyTypes() {
            }
            return publicClassWithPrivateModulePropertyTypes;
        }());
        privateModule.publicClassWithPrivateModulePropertyTypes = publicClassWithPrivateModulePropertyTypes;
        var privateClassWithPrivateModulePropertyTypes = /** @class */ (function () {
            function privateClassWithPrivateModulePropertyTypes() {
            }
            return privateClassWithPrivateModulePropertyTypes;
        }());
        var privateVarWithPrivateModulePropertyTypes;
    })(privateModule || (privateModule = {}));
    var publicClassWithWithPrivatePropertyTypes = /** @class */ (function () {
        function publicClassWithWithPrivatePropertyTypes() {
        }
        return publicClassWithWithPrivatePropertyTypes;
    }());
    publicModuleInGlobal.publicClassWithWithPrivatePropertyTypes = publicClassWithWithPrivatePropertyTypes;
    var publicClassWithWithPublicPropertyTypes = /** @class */ (function () {
        function publicClassWithWithPublicPropertyTypes() {
        }
        return publicClassWithWithPublicPropertyTypes;
    }());
    publicModuleInGlobal.publicClassWithWithPublicPropertyTypes = publicClassWithWithPublicPropertyTypes;
    var privateClassWithWithPrivatePropertyTypes = /** @class */ (function () {
        function privateClassWithWithPrivatePropertyTypes() {
        }
        return privateClassWithWithPrivatePropertyTypes;
    }());
    var privateClassWithWithPublicPropertyTypes = /** @class */ (function () {
        function privateClassWithWithPublicPropertyTypes() {
        }
        return privateClassWithWithPublicPropertyTypes;
    }());
    var privateVarWithPrivatePropertyTypes;
    var privateVarWithPublicPropertyTypes;
    var publicClassWithPrivateModulePropertyTypes = /** @class */ (function () {
        function publicClassWithPrivateModulePropertyTypes() {
        }
        return publicClassWithPrivateModulePropertyTypes;
    }());
    publicModuleInGlobal.publicClassWithPrivateModulePropertyTypes = publicClassWithPrivateModulePropertyTypes;
    var privateClassWithPrivateModulePropertyTypes = /** @class */ (function () {
        function privateClassWithPrivateModulePropertyTypes() {
        }
        return privateClassWithPrivateModulePropertyTypes;
    }());
    var privateVarWithPrivateModulePropertyTypes;
})(publicModuleInGlobal || (publicModuleInGlobal = {}));


//// [privacyVarDeclFile_externalModule.d.ts]
declare class privateClass {
}
export declare class publicClass {
}
export interface publicInterfaceWithPrivatePropertyTypes {
    myProperty: privateClass;
}
export interface publicInterfaceWithPublicPropertyTypes {
    myProperty: publicClass;
}
export declare class publicClassWithWithPrivatePropertyTypes {
    static myPublicStaticProperty: privateClass;
    private static myPrivateStaticProperty;
    myPublicProperty: privateClass;
    private myPrivateProperty;
}
export declare class publicClassWithWithPublicPropertyTypes {
    static myPublicStaticProperty: publicClass;
    private static myPrivateStaticProperty;
    myPublicProperty: publicClass;
    private myPrivateProperty;
}
export declare var publicVarWithPrivatePropertyTypes: privateClass;
export declare var publicVarWithPublicPropertyTypes: publicClass;
export declare var publicAmbientVarWithPrivatePropertyTypes: privateClass;
export declare var publicAmbientVarWithPublicPropertyTypes: publicClass;
export interface publicInterfaceWithPrivateModulePropertyTypes {
    myProperty: privateModule.publicClass;
}
export declare class publicClassWithPrivateModulePropertyTypes {
    static myPublicStaticProperty: privateModule.publicClass;
    myPublicProperty: privateModule.publicClass;
}
export declare var publicVarWithPrivateModulePropertyTypes: privateModule.publicClass;
export declare var publicAmbientVarWithPrivateModulePropertyTypes: privateModule.publicClass;
export declare namespace publicModule {
    class privateClass {
    }
    export class publicClass {
    }
    export interface publicInterfaceWithPrivatePropertyTypes {
        myProperty: privateClass;
    }
    export interface publicInterfaceWithPublicPropertyTypes {
        myProperty: publicClass;
    }
    export class publicClassWithWithPrivatePropertyTypes {
        static myPublicStaticProperty: privateClass;
        private static myPrivateStaticProperty;
        myPublicProperty: privateClass;
        private myPrivateProperty;
    }
    export class publicClassWithWithPublicPropertyTypes {
        static myPublicStaticProperty: publicClass;
        private static myPrivateStaticProperty;
        myPublicProperty: publicClass;
        private myPrivateProperty;
    }
    export var publicVarWithPrivatePropertyTypes: privateClass;
    export var publicVarWithPublicPropertyTypes: publicClass;
    export var publicAmbientVarWithPrivatePropertyTypes: privateClass;
    export var publicAmbientVarWithPublicPropertyTypes: publicClass;
    export interface publicInterfaceWithPrivateModulePropertyTypes {
        myProperty: privateModule.publicClass;
    }
    export class publicClassWithPrivateModulePropertyTypes {
        static myPublicStaticProperty: privateModule.publicClass;
        myPublicProperty: privateModule.publicClass;
    }
    export var publicVarWithPrivateModulePropertyTypes: privateModule.publicClass;
    export var publicAmbientVarWithPrivateModulePropertyTypes: privateModule.publicClass;
    export {};
}
declare namespace privateModule {
    class privateClass {
    }
    export class publicClass {
    }
    export interface publicInterfaceWithPrivatePropertyTypes {
        myProperty: privateClass;
    }
    export interface publicInterfaceWithPublicPropertyTypes {
        myProperty: publicClass;
    }
    export class publicClassWithWithPrivatePropertyTypes {
        static myPublicStaticProperty: privateClass;
        private static myPrivateStaticProperty;
        myPublicProperty: privateClass;
        private myPrivateProperty;
    }
    export class publicClassWithWithPublicPropertyTypes {
        static myPublicStaticProperty: publicClass;
        private static myPrivateStaticProperty;
        myPublicProperty: publicClass;
        private myPrivateProperty;
    }
    export var publicVarWithPrivatePropertyTypes: privateClass;
    export var publicVarWithPublicPropertyTypes: publicClass;
    export var publicAmbientVarWithPrivatePropertyTypes: privateClass;
    export var publicAmbientVarWithPublicPropertyTypes: publicClass;
    export interface publicInterfaceWithPrivateModulePropertyTypes {
        myProperty: privateModule.publicClass;
    }
    export class publicClassWithPrivateModulePropertyTypes {
        static myPublicStaticProperty: privateModule.publicClass;
        myPublicProperty: privateModule.publicClass;
    }
    export var publicVarWithPrivateModulePropertyTypes: privateModule.publicClass;
    export var publicAmbientVarWithPrivateModulePropertyTypes: privateModule.publicClass;
    export {};
}
export {};
//// [privacyVarDeclFile_GlobalFile.d.ts]
declare class publicClassInGlobal {
}
interface publicInterfaceWithPublicPropertyTypesInGlobal {
    myProperty: publicClassInGlobal;
}
declare class publicClassWithWithPublicPropertyTypesInGlobal {
    static myPublicStaticProperty: publicClassInGlobal;
    private static myPrivateStaticProperty;
    myPublicProperty: publicClassInGlobal;
    private myPrivateProperty;
}
declare var publicVarWithPublicPropertyTypesInGlobal: publicClassInGlobal;
declare var publicAmbientVarWithPublicPropertyTypesInGlobal: publicClassInGlobal;
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
        export interface publicInterfaceWithPrivatePropertyTypes {
            myProperty: privateClass;
        }
        export interface publicInterfaceWithPublicPropertyTypes {
            myProperty: publicClass;
        }
        export class publicClassWithWithPrivatePropertyTypes {
            static myPublicStaticProperty: privateClass;
            private static myPrivateStaticProperty;
            myPublicProperty: privateClass;
            private myPrivateProperty;
        }
        export class publicClassWithWithPublicPropertyTypes {
            static myPublicStaticProperty: publicClass;
            private static myPrivateStaticProperty;
            myPublicProperty: publicClass;
            private myPrivateProperty;
        }
        export var publicVarWithPrivatePropertyTypes: privateClass;
        export var publicVarWithPublicPropertyTypes: publicClass;
        export var publicAmbientVarWithPrivatePropertyTypes: privateClass;
        export var publicAmbientVarWithPublicPropertyTypes: publicClass;
        export interface publicInterfaceWithPrivateModulePropertyTypes {
            myProperty: privateModule.publicClass;
        }
        export class publicClassWithPrivateModulePropertyTypes {
            static myPublicStaticProperty: privateModule.publicClass;
            myPublicProperty: privateModule.publicClass;
        }
        export var publicVarWithPrivateModulePropertyTypes: privateModule.publicClass;
        export var publicAmbientVarWithPrivateModulePropertyTypes: privateModule.publicClass;
        export {};
    }
    export interface publicInterfaceWithPrivatePropertyTypes {
        myProperty: privateClass;
    }
    export interface publicInterfaceWithPublicPropertyTypes {
        myProperty: publicClass;
    }
    export class publicClassWithWithPrivatePropertyTypes {
        static myPublicStaticProperty: privateClass;
        private static myPrivateStaticProperty;
        myPublicProperty: privateClass;
        private myPrivateProperty;
    }
    export class publicClassWithWithPublicPropertyTypes {
        static myPublicStaticProperty: publicClass;
        private static myPrivateStaticProperty;
        myPublicProperty: publicClass;
        private myPrivateProperty;
    }
    export var publicVarWithPrivatePropertyTypes: privateClass;
    export var publicVarWithPublicPropertyTypes: publicClass;
    export var publicAmbientVarWithPrivatePropertyTypes: privateClass;
    export var publicAmbientVarWithPublicPropertyTypes: publicClass;
    export interface publicInterfaceWithPrivateModulePropertyTypes {
        myProperty: privateModule.publicClass;
    }
    export class publicClassWithPrivateModulePropertyTypes {
        static myPublicStaticProperty: privateModule.publicClass;
        myPublicProperty: privateModule.publicClass;
    }
    export var publicVarWithPrivateModulePropertyTypes: privateModule.publicClass;
    export var publicAmbientVarWithPrivateModulePropertyTypes: privateModule.publicClass;
    export {};
}
