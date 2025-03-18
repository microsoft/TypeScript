//// [tests/cases/compiler/privacyTypeParametersOfClassDeclFile.ts] ////

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicModule = exports.publicClassWithTypeParametersFromPrivateModule = exports.publicClassWithPublicTypeParametersWithoutExtends = exports.publicClassWithPublicTypeParameters = exports.publicClassWithPrivateTypeParameters = exports.publicClass = void 0;
class privateClass {
}
class publicClass {
}
exports.publicClass = publicClass;
class publicClassWithPrivateTypeParameters {
    myMethod(val) {
        return val;
    }
}
exports.publicClassWithPrivateTypeParameters = publicClassWithPrivateTypeParameters;
class publicClassWithPublicTypeParameters {
    myMethod(val) {
        return val;
    }
}
exports.publicClassWithPublicTypeParameters = publicClassWithPublicTypeParameters;
class privateClassWithPrivateTypeParameters {
    myMethod(val) {
        return val;
    }
}
class privateClassWithPublicTypeParameters {
    myMethod(val) {
        return val;
    }
}
class publicClassWithPublicTypeParametersWithoutExtends {
    myMethod(val) {
        return val;
    }
}
exports.publicClassWithPublicTypeParametersWithoutExtends = publicClassWithPublicTypeParametersWithoutExtends;
class privateClassWithPublicTypeParametersWithoutExtends {
    myMethod(val) {
        return val;
    }
}
class publicClassWithTypeParametersFromPrivateModule {
    myMethod(val) {
        return val;
    }
}
exports.publicClassWithTypeParametersFromPrivateModule = publicClassWithTypeParametersFromPrivateModule;
class privateClassWithTypeParametersFromPrivateModule {
    myMethod(val) {
        return val;
    }
}
var publicModule;
(function (publicModule) {
    class privateClassInPublicModule {
    }
    class publicClassInPublicModule {
    }
    publicModule.publicClassInPublicModule = publicClassInPublicModule;
    class publicClassWithPrivateTypeParameters {
        myMethod(val) {
            return val;
        }
    }
    publicModule.publicClassWithPrivateTypeParameters = publicClassWithPrivateTypeParameters;
    class publicClassWithPublicTypeParameters {
        myMethod(val) {
            return val;
        }
    }
    publicModule.publicClassWithPublicTypeParameters = publicClassWithPublicTypeParameters;
    class privateClassWithPrivateTypeParameters {
        myMethod(val) {
            return val;
        }
    }
    class privateClassWithPublicTypeParameters {
        myMethod(val) {
            return val;
        }
    }
    class publicClassWithPublicTypeParametersWithoutExtends {
        myMethod(val) {
            return val;
        }
    }
    publicModule.publicClassWithPublicTypeParametersWithoutExtends = publicClassWithPublicTypeParametersWithoutExtends;
    class privateClassWithPublicTypeParametersWithoutExtends {
        myMethod(val) {
            return val;
        }
    }
    class publicClassWithTypeParametersFromPrivateModule {
        myMethod(val) {
            return val;
        }
    }
    publicModule.publicClassWithTypeParametersFromPrivateModule = publicClassWithTypeParametersFromPrivateModule;
    class privateClassWithTypeParametersFromPrivateModule {
        myMethod(val) {
            return val;
        }
    }
})(publicModule || (exports.publicModule = publicModule = {}));
var privateModule;
(function (privateModule) {
    class privateClassInPrivateModule {
    }
    class publicClassInPrivateModule {
    }
    privateModule.publicClassInPrivateModule = publicClassInPrivateModule;
    class publicClassWithPrivateTypeParameters {
        myMethod(val) {
            return val;
        }
    }
    privateModule.publicClassWithPrivateTypeParameters = publicClassWithPrivateTypeParameters;
    class publicClassWithPublicTypeParameters {
        myMethod(val) {
            return val;
        }
    }
    privateModule.publicClassWithPublicTypeParameters = publicClassWithPublicTypeParameters;
    class privateClassWithPrivateTypeParameters {
        myMethod(val) {
            return val;
        }
    }
    class privateClassWithPublicTypeParameters {
        myMethod(val) {
            return val;
        }
    }
    class publicClassWithPublicTypeParametersWithoutExtends {
        myMethod(val) {
            return val;
        }
    }
    privateModule.publicClassWithPublicTypeParametersWithoutExtends = publicClassWithPublicTypeParametersWithoutExtends;
    class privateClassWithPublicTypeParametersWithoutExtends {
        myMethod(val) {
            return val;
        }
    }
})(privateModule || (privateModule = {}));
