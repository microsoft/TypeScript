//// [privacyTypeParametersOfClassDeclFile.ts]
class privateClass {
}

export class publicClass {
}

export class publicClassWithPrivateTypeParameters<T extends privateClass> { // Error
    myMethod(val: T): T {
        return val;
    }
}

export class publicClassWithPublicTypeParameters<T extends publicClass> {
    myMethod(val: T): T {
        return val;
    }
}

class privateClassWithPrivateTypeParameters<T extends privateClass> {
    myMethod(val: T): T {
        return val;
    }
}

class privateClassWithPublicTypeParameters<T extends publicClass> {
    myMethod(val: T): T { 
        return val;
    }
}

export class publicClassWithPublicTypeParametersWithoutExtends<T> {
    myMethod(val: T): T { 
        return val;
    }
}

class privateClassWithPublicTypeParametersWithoutExtends<T> {
    myMethod(val: T): T { 
        return val;
    }
}

export class publicClassWithTypeParametersFromPrivateModule<T extends privateModule.publicClassInPrivateModule> { // Error
    myMethod(val: T): T {
        return val;
    }
}

class privateClassWithTypeParametersFromPrivateModule<T extends privateModule.publicClassInPrivateModule> {
    myMethod(val: T): T {
        return val;
    }
}

export module publicModule {
    class privateClassInPublicModule {
    }

    export class publicClassInPublicModule {
    }

    export class publicClassWithPrivateTypeParameters<T extends privateClassInPublicModule> { // Error
        myMethod(val: T): T {
            return val;
        }
    }

    export class publicClassWithPublicTypeParameters<T extends publicClassInPublicModule> {
        myMethod(val: T): T {
            return val;
        }
    }

    class privateClassWithPrivateTypeParameters<T extends privateClassInPublicModule> {
        myMethod(val: T): T {
            return val;
        }
    }

    class privateClassWithPublicTypeParameters<T extends publicClassInPublicModule> {
        myMethod(val: T): T {
            return val;
        }
    }

    export class publicClassWithPublicTypeParametersWithoutExtends<T> {
        myMethod(val: T): T {
            return val;
        }
    }

    class privateClassWithPublicTypeParametersWithoutExtends<T> {
        myMethod(val: T): T {
            return val;
        }
    }

    export class publicClassWithTypeParametersFromPrivateModule<T extends privateModule.publicClassInPrivateModule> { // Error
        myMethod(val: T): T {
            return val;
        }
    }

    class privateClassWithTypeParametersFromPrivateModule<T extends privateModule.publicClassInPrivateModule> {
        myMethod(val: T): T {
            return val;
        }
    }
}

module privateModule {
    class privateClassInPrivateModule {
    }

    export class publicClassInPrivateModule {
    }

    export class publicClassWithPrivateTypeParameters<T extends privateClassInPrivateModule> {
        myMethod(val: T): T {
            return val;
        }
    }

    export class publicClassWithPublicTypeParameters<T extends publicClassInPrivateModule> {
        myMethod(val: T): T {
            return val;
        }
    }

    class privateClassWithPrivateTypeParameters<T extends privateClassInPrivateModule> {
        myMethod(val: T): T {
            return val;
        }
    }

    class privateClassWithPublicTypeParameters<T extends publicClassInPrivateModule> {
        myMethod(val: T): T {
            return val;
        }
    }

    export class publicClassWithPublicTypeParametersWithoutExtends<T> {
        myMethod(val: T): T {
            return val;
        }
    }

    class privateClassWithPublicTypeParametersWithoutExtends<T> {
        myMethod(val: T): T {
            return val;
        }
    }
}


//// [privacyTypeParametersOfClassDeclFile.js]
"use strict";
exports.__esModule = true;
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
var publicClassWithPrivateTypeParameters = /** @class */ (function () {
    function publicClassWithPrivateTypeParameters() {
    }
    publicClassWithPrivateTypeParameters.prototype.myMethod = function (val) {
        return val;
    };
    return publicClassWithPrivateTypeParameters;
}());
exports.publicClassWithPrivateTypeParameters = publicClassWithPrivateTypeParameters;
var publicClassWithPublicTypeParameters = /** @class */ (function () {
    function publicClassWithPublicTypeParameters() {
    }
    publicClassWithPublicTypeParameters.prototype.myMethod = function (val) {
        return val;
    };
    return publicClassWithPublicTypeParameters;
}());
exports.publicClassWithPublicTypeParameters = publicClassWithPublicTypeParameters;
var privateClassWithPrivateTypeParameters = /** @class */ (function () {
    function privateClassWithPrivateTypeParameters() {
    }
    privateClassWithPrivateTypeParameters.prototype.myMethod = function (val) {
        return val;
    };
    return privateClassWithPrivateTypeParameters;
}());
var privateClassWithPublicTypeParameters = /** @class */ (function () {
    function privateClassWithPublicTypeParameters() {
    }
    privateClassWithPublicTypeParameters.prototype.myMethod = function (val) {
        return val;
    };
    return privateClassWithPublicTypeParameters;
}());
var publicClassWithPublicTypeParametersWithoutExtends = /** @class */ (function () {
    function publicClassWithPublicTypeParametersWithoutExtends() {
    }
    publicClassWithPublicTypeParametersWithoutExtends.prototype.myMethod = function (val) {
        return val;
    };
    return publicClassWithPublicTypeParametersWithoutExtends;
}());
exports.publicClassWithPublicTypeParametersWithoutExtends = publicClassWithPublicTypeParametersWithoutExtends;
var privateClassWithPublicTypeParametersWithoutExtends = /** @class */ (function () {
    function privateClassWithPublicTypeParametersWithoutExtends() {
    }
    privateClassWithPublicTypeParametersWithoutExtends.prototype.myMethod = function (val) {
        return val;
    };
    return privateClassWithPublicTypeParametersWithoutExtends;
}());
var publicClassWithTypeParametersFromPrivateModule = /** @class */ (function () {
    function publicClassWithTypeParametersFromPrivateModule() {
    }
    publicClassWithTypeParametersFromPrivateModule.prototype.myMethod = function (val) {
        return val;
    };
    return publicClassWithTypeParametersFromPrivateModule;
}());
exports.publicClassWithTypeParametersFromPrivateModule = publicClassWithTypeParametersFromPrivateModule;
var privateClassWithTypeParametersFromPrivateModule = /** @class */ (function () {
    function privateClassWithTypeParametersFromPrivateModule() {
    }
    privateClassWithTypeParametersFromPrivateModule.prototype.myMethod = function (val) {
        return val;
    };
    return privateClassWithTypeParametersFromPrivateModule;
}());
var publicModule;
(function (publicModule) {
    var privateClassInPublicModule = /** @class */ (function () {
        function privateClassInPublicModule() {
        }
        return privateClassInPublicModule;
    }());
    var publicClassInPublicModule = /** @class */ (function () {
        function publicClassInPublicModule() {
        }
        return publicClassInPublicModule;
    }());
    publicModule.publicClassInPublicModule = publicClassInPublicModule;
    var publicClassWithPrivateTypeParameters = /** @class */ (function () {
        function publicClassWithPrivateTypeParameters() {
        }
        publicClassWithPrivateTypeParameters.prototype.myMethod = function (val) {
            return val;
        };
        return publicClassWithPrivateTypeParameters;
    }());
    publicModule.publicClassWithPrivateTypeParameters = publicClassWithPrivateTypeParameters;
    var publicClassWithPublicTypeParameters = /** @class */ (function () {
        function publicClassWithPublicTypeParameters() {
        }
        publicClassWithPublicTypeParameters.prototype.myMethod = function (val) {
            return val;
        };
        return publicClassWithPublicTypeParameters;
    }());
    publicModule.publicClassWithPublicTypeParameters = publicClassWithPublicTypeParameters;
    var privateClassWithPrivateTypeParameters = /** @class */ (function () {
        function privateClassWithPrivateTypeParameters() {
        }
        privateClassWithPrivateTypeParameters.prototype.myMethod = function (val) {
            return val;
        };
        return privateClassWithPrivateTypeParameters;
    }());
    var privateClassWithPublicTypeParameters = /** @class */ (function () {
        function privateClassWithPublicTypeParameters() {
        }
        privateClassWithPublicTypeParameters.prototype.myMethod = function (val) {
            return val;
        };
        return privateClassWithPublicTypeParameters;
    }());
    var publicClassWithPublicTypeParametersWithoutExtends = /** @class */ (function () {
        function publicClassWithPublicTypeParametersWithoutExtends() {
        }
        publicClassWithPublicTypeParametersWithoutExtends.prototype.myMethod = function (val) {
            return val;
        };
        return publicClassWithPublicTypeParametersWithoutExtends;
    }());
    publicModule.publicClassWithPublicTypeParametersWithoutExtends = publicClassWithPublicTypeParametersWithoutExtends;
    var privateClassWithPublicTypeParametersWithoutExtends = /** @class */ (function () {
        function privateClassWithPublicTypeParametersWithoutExtends() {
        }
        privateClassWithPublicTypeParametersWithoutExtends.prototype.myMethod = function (val) {
            return val;
        };
        return privateClassWithPublicTypeParametersWithoutExtends;
    }());
    var publicClassWithTypeParametersFromPrivateModule = /** @class */ (function () {
        function publicClassWithTypeParametersFromPrivateModule() {
        }
        publicClassWithTypeParametersFromPrivateModule.prototype.myMethod = function (val) {
            return val;
        };
        return publicClassWithTypeParametersFromPrivateModule;
    }());
    publicModule.publicClassWithTypeParametersFromPrivateModule = publicClassWithTypeParametersFromPrivateModule;
    var privateClassWithTypeParametersFromPrivateModule = /** @class */ (function () {
        function privateClassWithTypeParametersFromPrivateModule() {
        }
        privateClassWithTypeParametersFromPrivateModule.prototype.myMethod = function (val) {
            return val;
        };
        return privateClassWithTypeParametersFromPrivateModule;
    }());
})(publicModule = exports.publicModule || (exports.publicModule = {}));
var privateModule;
(function (privateModule) {
    var privateClassInPrivateModule = /** @class */ (function () {
        function privateClassInPrivateModule() {
        }
        return privateClassInPrivateModule;
    }());
    var publicClassInPrivateModule = /** @class */ (function () {
        function publicClassInPrivateModule() {
        }
        return publicClassInPrivateModule;
    }());
    privateModule.publicClassInPrivateModule = publicClassInPrivateModule;
    var publicClassWithPrivateTypeParameters = /** @class */ (function () {
        function publicClassWithPrivateTypeParameters() {
        }
        publicClassWithPrivateTypeParameters.prototype.myMethod = function (val) {
            return val;
        };
        return publicClassWithPrivateTypeParameters;
    }());
    privateModule.publicClassWithPrivateTypeParameters = publicClassWithPrivateTypeParameters;
    var publicClassWithPublicTypeParameters = /** @class */ (function () {
        function publicClassWithPublicTypeParameters() {
        }
        publicClassWithPublicTypeParameters.prototype.myMethod = function (val) {
            return val;
        };
        return publicClassWithPublicTypeParameters;
    }());
    privateModule.publicClassWithPublicTypeParameters = publicClassWithPublicTypeParameters;
    var privateClassWithPrivateTypeParameters = /** @class */ (function () {
        function privateClassWithPrivateTypeParameters() {
        }
        privateClassWithPrivateTypeParameters.prototype.myMethod = function (val) {
            return val;
        };
        return privateClassWithPrivateTypeParameters;
    }());
    var privateClassWithPublicTypeParameters = /** @class */ (function () {
        function privateClassWithPublicTypeParameters() {
        }
        privateClassWithPublicTypeParameters.prototype.myMethod = function (val) {
            return val;
        };
        return privateClassWithPublicTypeParameters;
    }());
    var publicClassWithPublicTypeParametersWithoutExtends = /** @class */ (function () {
        function publicClassWithPublicTypeParametersWithoutExtends() {
        }
        publicClassWithPublicTypeParametersWithoutExtends.prototype.myMethod = function (val) {
            return val;
        };
        return publicClassWithPublicTypeParametersWithoutExtends;
    }());
    privateModule.publicClassWithPublicTypeParametersWithoutExtends = publicClassWithPublicTypeParametersWithoutExtends;
    var privateClassWithPublicTypeParametersWithoutExtends = /** @class */ (function () {
        function privateClassWithPublicTypeParametersWithoutExtends() {
        }
        privateClassWithPublicTypeParametersWithoutExtends.prototype.myMethod = function (val) {
            return val;
        };
        return privateClassWithPublicTypeParametersWithoutExtends;
    }());
})(privateModule || (privateModule = {}));


//// [privacyTypeParametersOfClassDeclFile.d.ts]
class privateClass {
}
export declare class publicClass {
}
export declare class publicClassWithPrivateTypeParameters<T extends privateClass> {
    myMethod(val: T): T;
}
export declare class publicClassWithPublicTypeParameters<T extends publicClass> {
    myMethod(val: T): T;
}
export declare class publicClassWithPublicTypeParametersWithoutExtends<T> {
    myMethod(val: T): T;
}
export declare class publicClassWithTypeParametersFromPrivateModule<T extends privateModule.publicClassInPrivateModule> {
    myMethod(val: T): T;
}
export declare module publicModule {
    class privateClassInPublicModule {
    }
    class publicClassInPublicModule {
    }
    class publicClassWithPrivateTypeParameters<T extends privateClassInPublicModule> {
        myMethod(val: T): T;
    }
    class publicClassWithPublicTypeParameters<T extends publicClassInPublicModule> {
        myMethod(val: T): T;
    }
    class publicClassWithPublicTypeParametersWithoutExtends<T> {
        myMethod(val: T): T;
    }
    class publicClassWithTypeParametersFromPrivateModule<T extends privateModule.publicClassInPrivateModule> {
        myMethod(val: T): T;
    }
}
declare module privateModule {
    class privateClassInPrivateModule {
    }
    class publicClassInPrivateModule {
    }
    class publicClassWithPrivateTypeParameters<T extends privateClassInPrivateModule> {
        myMethod(val: T): T;
    }
    class publicClassWithPublicTypeParameters<T extends publicClassInPrivateModule> {
        myMethod(val: T): T;
    }
    class publicClassWithPublicTypeParametersWithoutExtends<T> {
        myMethod(val: T): T;
    }
}
export {};


//// [DtsFileErrors]


tests/cases/compiler/privacyTypeParametersOfClassDeclFile.d.ts(1,1): error TS1046: A 'declare' modifier is required for a top level declaration in a .d.ts file.


==== tests/cases/compiler/privacyTypeParametersOfClassDeclFile.d.ts (1 errors) ====
    class privateClass {
    ~~~~~
!!! error TS1046: A 'declare' modifier is required for a top level declaration in a .d.ts file.
    }
    export declare class publicClass {
    }
    export declare class publicClassWithPrivateTypeParameters<T extends privateClass> {
        myMethod(val: T): T;
    }
    export declare class publicClassWithPublicTypeParameters<T extends publicClass> {
        myMethod(val: T): T;
    }
    export declare class publicClassWithPublicTypeParametersWithoutExtends<T> {
        myMethod(val: T): T;
    }
    export declare class publicClassWithTypeParametersFromPrivateModule<T extends privateModule.publicClassInPrivateModule> {
        myMethod(val: T): T;
    }
    export declare module publicModule {
        class privateClassInPublicModule {
        }
        class publicClassInPublicModule {
        }
        class publicClassWithPrivateTypeParameters<T extends privateClassInPublicModule> {
            myMethod(val: T): T;
        }
        class publicClassWithPublicTypeParameters<T extends publicClassInPublicModule> {
            myMethod(val: T): T;
        }
        class publicClassWithPublicTypeParametersWithoutExtends<T> {
            myMethod(val: T): T;
        }
        class publicClassWithTypeParametersFromPrivateModule<T extends privateModule.publicClassInPrivateModule> {
            myMethod(val: T): T;
        }
    }
    declare module privateModule {
        class privateClassInPrivateModule {
        }
        class publicClassInPrivateModule {
        }
        class publicClassWithPrivateTypeParameters<T extends privateClassInPrivateModule> {
            myMethod(val: T): T;
        }
        class publicClassWithPublicTypeParameters<T extends publicClassInPrivateModule> {
            myMethod(val: T): T;
        }
        class publicClassWithPublicTypeParametersWithoutExtends<T> {
            myMethod(val: T): T;
        }
    }
    export {};
    