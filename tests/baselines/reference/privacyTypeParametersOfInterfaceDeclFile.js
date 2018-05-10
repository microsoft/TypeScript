//// [privacyTypeParametersOfInterfaceDeclFile.ts]
class privateClass {
}

export class publicClass {
}

class privateClassT<T> {
}

export class publicClassT<T> {
}

export interface publicInterfaceWithPrivateTypeParameters<T extends privateClass> { // Error
    myMethod(val: T): T;
    myMethod0(): publicClassT<T>;
    myMethod1(): privateClassT<privateClass>; 
    myMethod2(): privateClassT<publicClass>;
    myMethod3(): publicClassT<privateClass>;
    myMethod4(): publicClassT<publicClass>; 
}

export interface publicInterfaceWithPublicTypeParameters<T extends publicClass> {
    myMethod(val: T): T;
    myMethod0(): publicClassT<T>
    myMethod1(): privateClassT<privateClass>;
    myMethod2(): privateClassT<publicClass>;
    myMethod3(): publicClassT<privateClass>;
    myMethod4(): publicClassT<publicClass>;
}

interface privateInterfaceWithPrivateTypeParameters<T extends privateClass> {
    myMethod(val: T): T;
    myMethod0(): publicClassT<T>;
    myMethod1(): privateClassT<privateClass>;
    myMethod2(): privateClassT<publicClass>;
    myMethod3(): publicClassT<privateClass>;
    myMethod4(): publicClassT<publicClass>;
}

interface privateInterfaceWithPublicTypeParameters<T extends publicClass> {
    myMethod(val: T): T;
    myMethod0(): publicClassT<T>;
    myMethod1(): privateClassT<privateClass>;
    myMethod2(): privateClassT<publicClass>;
    myMethod3(): publicClassT<privateClass>;
    myMethod4(): publicClassT<publicClass>;
}

export interface publicInterfaceWithPublicTypeParametersWithoutExtends<T> {
    myMethod(val: T): T;
    myMethod0(): publicClassT<T>;
}

interface privateInterfaceWithPublicTypeParametersWithoutExtends<T> {
    myMethod(val: T): T;
    myMethod0(): publicClassT<T>;
}


export interface publicInterfaceWithPrivateModuleTypeParameterConstraints<T extends privateModule.publicClassInPrivateModule> { // Error
}

interface privateInterfaceWithPrivateModuleTypeParameterConstraints<T extends privateModule.publicClassInPrivateModule> { // Error
}

export module publicModule {
    class privateClassInPublicModule {
    }

    export class publicClassInPublicModule {
    }

    class privateClassInPublicModuleT<T> {
    }

    export class publicClassInPublicModuleT<T> {
    }

    export interface publicInterfaceWithPrivateTypeParameters<T extends privateClassInPublicModule> { // Error
        myMethod(val: T): T;
        myMethod0(): publicClassInPublicModuleT<T>;
        myMethod1(): privateClassInPublicModuleT<privateClassInPublicModule>;
        myMethod2(): privateClassInPublicModuleT<publicClassInPublicModule>;
        myMethod3(): publicClassInPublicModuleT<privateClassInPublicModule>;
        myMethod4(): publicClassInPublicModuleT<publicClassInPublicModule>;
    }

    export interface publicInterfaceWithPublicTypeParameters<T extends publicClassInPublicModule> {
        myMethod(val: T): T;
        myMethod0(): publicClassInPublicModuleT<T>
        myMethod1(): privateClassInPublicModuleT<privateClassInPublicModule>;
        myMethod2(): privateClassInPublicModuleT<publicClassInPublicModule>;
        myMethod3(): publicClassInPublicModuleT<privateClassInPublicModule>;
        myMethod4(): publicClassInPublicModuleT<publicClassInPublicModule>;
    }

    interface privateInterfaceWithPrivateTypeParameters<T extends privateClassInPublicModule> {
        myMethod(val: T): T;
        myMethod0(): publicClassInPublicModuleT<T>;
        myMethod1(): privateClassInPublicModuleT<privateClassInPublicModule>;
        myMethod2(): privateClassInPublicModuleT<publicClassInPublicModule>;
        myMethod3(): publicClassInPublicModuleT<privateClassInPublicModule>;
        myMethod4(): publicClassInPublicModuleT<publicClassInPublicModule>;
    }

    interface privateInterfaceWithPublicTypeParameters<T extends publicClassInPublicModule> {
        myMethod(val: T): T;
        myMethod0(): publicClassInPublicModuleT<T>;
        myMethod1(): privateClassInPublicModuleT<privateClassInPublicModule>;
        myMethod2(): privateClassInPublicModuleT<publicClassInPublicModule>;
        myMethod3(): publicClassInPublicModuleT<privateClassInPublicModule>;
        myMethod4(): publicClassInPublicModuleT<publicClassInPublicModule>;
    }

    export interface publicInterfaceWithPublicTypeParametersWithoutExtends<T> {
        myMethod(val: T): T;
        myMethod0(): publicClassInPublicModuleT<T>;
    }

    interface privateInterfaceWithPublicTypeParametersWithoutExtends<T> {
        myMethod(val: T): T;
        myMethod0(): publicClassInPublicModuleT<T>;
    }

    export interface publicInterfaceWithPrivateModuleTypeParameterConstraints<T extends privateModule.publicClassInPrivateModule> { // Error
    }

    interface privateInterfaceWithPrivateModuleTypeParameterConstraints<T extends privateModule.publicClassInPrivateModule> { // Error
    }
}

module privateModule {
    class privateClassInPrivateModule {
    }

    export class publicClassInPrivateModule {
    }

    class privateClassInPrivateModuleT<T> {
    }

    export class publicClassInPrivateModuleT<T> {
    }

    export interface publicInterfaceWithPrivateTypeParameters<T extends privateClassInPrivateModule> {
        myMethod(val: T): T;
        myMethod0(): publicClassInPrivateModuleT<T>;
        myMethod1(): privateClassInPrivateModuleT<privateClassInPrivateModule>;
        myMethod2(): privateClassInPrivateModuleT<publicClassInPrivateModule>;
        myMethod3(): publicClassInPrivateModuleT<privateClassInPrivateModule>;
        myMethod4(): publicClassInPrivateModuleT<publicClassInPrivateModule>;
    }

    export interface publicInterfaceWithPublicTypeParameters<T extends publicClassInPrivateModule> {
        myMethod(val: T): T;
        myMethod0(): publicClassInPrivateModuleT<T>
        myMethod1(): privateClassInPrivateModuleT<privateClassInPrivateModule>;
        myMethod2(): privateClassInPrivateModuleT<publicClassInPrivateModule>;
        myMethod3(): publicClassInPrivateModuleT<privateClassInPrivateModule>;
        myMethod4(): publicClassInPrivateModuleT<publicClassInPrivateModule>;
    }

    interface privateInterfaceWithPrivateTypeParameters<T extends privateClassInPrivateModule> {
        myMethod(val: T): T;
        myMethod0(): publicClassInPrivateModuleT<T>;
        myMethod1(): privateClassInPrivateModuleT<privateClassInPrivateModule>;
        myMethod2(): privateClassInPrivateModuleT<publicClassInPrivateModule>;
        myMethod3(): publicClassInPrivateModuleT<privateClassInPrivateModule>;
        myMethod4(): publicClassInPrivateModuleT<publicClassInPrivateModule>;
    }

    interface privateInterfaceWithPublicTypeParameters<T extends publicClassInPrivateModule> {
        myMethod(val: T): T;
        myMethod0(): publicClassInPrivateModuleT<T>;
        myMethod1(): privateClassInPrivateModuleT<privateClassInPrivateModule>;
        myMethod2(): privateClassInPrivateModuleT<publicClassInPrivateModule>;
        myMethod3(): publicClassInPrivateModuleT<privateClassInPrivateModule>;
        myMethod4(): publicClassInPrivateModuleT<publicClassInPrivateModule>;
    }

    export interface publicInterfaceWithPublicTypeParametersWithoutExtends<T> {
        myMethod(val: T): T;
        myMethod0(): publicClassInPrivateModuleT<T>;
    }

    interface privateInterfaceWithPublicTypeParametersWithoutExtends<T> {
        myMethod(val: T): T;
        myMethod0(): publicClassInPrivateModuleT<T>;
    }
}

//// [privacyTypeParametersOfInterfaceDeclFile.js]
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
var privateClassT = /** @class */ (function () {
    function privateClassT() {
    }
    return privateClassT;
}());
var publicClassT = /** @class */ (function () {
    function publicClassT() {
    }
    return publicClassT;
}());
exports.publicClassT = publicClassT;
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
    var privateClassInPublicModuleT = /** @class */ (function () {
        function privateClassInPublicModuleT() {
        }
        return privateClassInPublicModuleT;
    }());
    var publicClassInPublicModuleT = /** @class */ (function () {
        function publicClassInPublicModuleT() {
        }
        return publicClassInPublicModuleT;
    }());
    publicModule.publicClassInPublicModuleT = publicClassInPublicModuleT;
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
    var privateClassInPrivateModuleT = /** @class */ (function () {
        function privateClassInPrivateModuleT() {
        }
        return privateClassInPrivateModuleT;
    }());
    var publicClassInPrivateModuleT = /** @class */ (function () {
        function publicClassInPrivateModuleT() {
        }
        return publicClassInPrivateModuleT;
    }());
    privateModule.publicClassInPrivateModuleT = publicClassInPrivateModuleT;
})(privateModule || (privateModule = {}));


//// [privacyTypeParametersOfInterfaceDeclFile.d.ts]
class privateClass {
}
export declare class publicClass {
}
class privateClassT<T> {
}
export declare class publicClassT<T> {
}
export interface publicInterfaceWithPrivateTypeParameters<T extends privateClass> {
    myMethod(val: T): T;
    myMethod0(): publicClassT<T>;
    myMethod1(): privateClassT<privateClass>;
    myMethod2(): privateClassT<publicClass>;
    myMethod3(): publicClassT<privateClass>;
    myMethod4(): publicClassT<publicClass>;
}
export interface publicInterfaceWithPublicTypeParameters<T extends publicClass> {
    myMethod(val: T): T;
    myMethod0(): publicClassT<T>;
    myMethod1(): privateClassT<privateClass>;
    myMethod2(): privateClassT<publicClass>;
    myMethod3(): publicClassT<privateClass>;
    myMethod4(): publicClassT<publicClass>;
}
export interface publicInterfaceWithPublicTypeParametersWithoutExtends<T> {
    myMethod(val: T): T;
    myMethod0(): publicClassT<T>;
}
export interface publicInterfaceWithPrivateModuleTypeParameterConstraints<T extends privateModule.publicClassInPrivateModule> {
}
export declare module publicModule {
    class privateClassInPublicModule {
    }
    class publicClassInPublicModule {
    }
    class privateClassInPublicModuleT<T> {
    }
    class publicClassInPublicModuleT<T> {
    }
    interface publicInterfaceWithPrivateTypeParameters<T extends privateClassInPublicModule> {
        myMethod(val: T): T;
        myMethod0(): publicClassInPublicModuleT<T>;
        myMethod1(): privateClassInPublicModuleT<privateClassInPublicModule>;
        myMethod2(): privateClassInPublicModuleT<publicClassInPublicModule>;
        myMethod3(): publicClassInPublicModuleT<privateClassInPublicModule>;
        myMethod4(): publicClassInPublicModuleT<publicClassInPublicModule>;
    }
    interface publicInterfaceWithPublicTypeParameters<T extends publicClassInPublicModule> {
        myMethod(val: T): T;
        myMethod0(): publicClassInPublicModuleT<T>;
        myMethod1(): privateClassInPublicModuleT<privateClassInPublicModule>;
        myMethod2(): privateClassInPublicModuleT<publicClassInPublicModule>;
        myMethod3(): publicClassInPublicModuleT<privateClassInPublicModule>;
        myMethod4(): publicClassInPublicModuleT<publicClassInPublicModule>;
    }
    interface publicInterfaceWithPublicTypeParametersWithoutExtends<T> {
        myMethod(val: T): T;
        myMethod0(): publicClassInPublicModuleT<T>;
    }
    interface publicInterfaceWithPrivateModuleTypeParameterConstraints<T extends privateModule.publicClassInPrivateModule> {
    }
}
declare module privateModule {
    class privateClassInPrivateModule {
    }
    class publicClassInPrivateModule {
    }
    class privateClassInPrivateModuleT<T> {
    }
    class publicClassInPrivateModuleT<T> {
    }
    interface publicInterfaceWithPrivateTypeParameters<T extends privateClassInPrivateModule> {
        myMethod(val: T): T;
        myMethod0(): publicClassInPrivateModuleT<T>;
        myMethod1(): privateClassInPrivateModuleT<privateClassInPrivateModule>;
        myMethod2(): privateClassInPrivateModuleT<publicClassInPrivateModule>;
        myMethod3(): publicClassInPrivateModuleT<privateClassInPrivateModule>;
        myMethod4(): publicClassInPrivateModuleT<publicClassInPrivateModule>;
    }
    interface publicInterfaceWithPublicTypeParameters<T extends publicClassInPrivateModule> {
        myMethod(val: T): T;
        myMethod0(): publicClassInPrivateModuleT<T>;
        myMethod1(): privateClassInPrivateModuleT<privateClassInPrivateModule>;
        myMethod2(): privateClassInPrivateModuleT<publicClassInPrivateModule>;
        myMethod3(): publicClassInPrivateModuleT<privateClassInPrivateModule>;
        myMethod4(): publicClassInPrivateModuleT<publicClassInPrivateModule>;
    }
    interface publicInterfaceWithPublicTypeParametersWithoutExtends<T> {
        myMethod(val: T): T;
        myMethod0(): publicClassInPrivateModuleT<T>;
    }
}
export {};


//// [DtsFileErrors]


tests/cases/compiler/privacyTypeParametersOfInterfaceDeclFile.d.ts(1,1): error TS1046: A 'declare' modifier is required for a top level declaration in a .d.ts file.


==== tests/cases/compiler/privacyTypeParametersOfInterfaceDeclFile.d.ts (1 errors) ====
    class privateClass {
    ~~~~~
!!! error TS1046: A 'declare' modifier is required for a top level declaration in a .d.ts file.
    }
    export declare class publicClass {
    }
    class privateClassT<T> {
    }
    export declare class publicClassT<T> {
    }
    export interface publicInterfaceWithPrivateTypeParameters<T extends privateClass> {
        myMethod(val: T): T;
        myMethod0(): publicClassT<T>;
        myMethod1(): privateClassT<privateClass>;
        myMethod2(): privateClassT<publicClass>;
        myMethod3(): publicClassT<privateClass>;
        myMethod4(): publicClassT<publicClass>;
    }
    export interface publicInterfaceWithPublicTypeParameters<T extends publicClass> {
        myMethod(val: T): T;
        myMethod0(): publicClassT<T>;
        myMethod1(): privateClassT<privateClass>;
        myMethod2(): privateClassT<publicClass>;
        myMethod3(): publicClassT<privateClass>;
        myMethod4(): publicClassT<publicClass>;
    }
    export interface publicInterfaceWithPublicTypeParametersWithoutExtends<T> {
        myMethod(val: T): T;
        myMethod0(): publicClassT<T>;
    }
    export interface publicInterfaceWithPrivateModuleTypeParameterConstraints<T extends privateModule.publicClassInPrivateModule> {
    }
    export declare module publicModule {
        class privateClassInPublicModule {
        }
        class publicClassInPublicModule {
        }
        class privateClassInPublicModuleT<T> {
        }
        class publicClassInPublicModuleT<T> {
        }
        interface publicInterfaceWithPrivateTypeParameters<T extends privateClassInPublicModule> {
            myMethod(val: T): T;
            myMethod0(): publicClassInPublicModuleT<T>;
            myMethod1(): privateClassInPublicModuleT<privateClassInPublicModule>;
            myMethod2(): privateClassInPublicModuleT<publicClassInPublicModule>;
            myMethod3(): publicClassInPublicModuleT<privateClassInPublicModule>;
            myMethod4(): publicClassInPublicModuleT<publicClassInPublicModule>;
        }
        interface publicInterfaceWithPublicTypeParameters<T extends publicClassInPublicModule> {
            myMethod(val: T): T;
            myMethod0(): publicClassInPublicModuleT<T>;
            myMethod1(): privateClassInPublicModuleT<privateClassInPublicModule>;
            myMethod2(): privateClassInPublicModuleT<publicClassInPublicModule>;
            myMethod3(): publicClassInPublicModuleT<privateClassInPublicModule>;
            myMethod4(): publicClassInPublicModuleT<publicClassInPublicModule>;
        }
        interface publicInterfaceWithPublicTypeParametersWithoutExtends<T> {
            myMethod(val: T): T;
            myMethod0(): publicClassInPublicModuleT<T>;
        }
        interface publicInterfaceWithPrivateModuleTypeParameterConstraints<T extends privateModule.publicClassInPrivateModule> {
        }
    }
    declare module privateModule {
        class privateClassInPrivateModule {
        }
        class publicClassInPrivateModule {
        }
        class privateClassInPrivateModuleT<T> {
        }
        class publicClassInPrivateModuleT<T> {
        }
        interface publicInterfaceWithPrivateTypeParameters<T extends privateClassInPrivateModule> {
            myMethod(val: T): T;
            myMethod0(): publicClassInPrivateModuleT<T>;
            myMethod1(): privateClassInPrivateModuleT<privateClassInPrivateModule>;
            myMethod2(): privateClassInPrivateModuleT<publicClassInPrivateModule>;
            myMethod3(): publicClassInPrivateModuleT<privateClassInPrivateModule>;
            myMethod4(): publicClassInPrivateModuleT<publicClassInPrivateModule>;
        }
        interface publicInterfaceWithPublicTypeParameters<T extends publicClassInPrivateModule> {
            myMethod(val: T): T;
            myMethod0(): publicClassInPrivateModuleT<T>;
            myMethod1(): privateClassInPrivateModuleT<privateClassInPrivateModule>;
            myMethod2(): privateClassInPrivateModuleT<publicClassInPrivateModule>;
            myMethod3(): publicClassInPrivateModuleT<privateClassInPrivateModule>;
            myMethod4(): publicClassInPrivateModuleT<publicClassInPrivateModule>;
        }
        interface publicInterfaceWithPublicTypeParametersWithoutExtends<T> {
            myMethod(val: T): T;
            myMethod0(): publicClassInPrivateModuleT<T>;
        }
    }
    export {};
    