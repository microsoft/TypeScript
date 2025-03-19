//// [tests/cases/compiler/privacyTypeParametersOfClass.ts] ////

//// [privacyTypeParametersOfClass.ts]
class privateClass {
}

export class publicClass {
}

// TypeParameter_0_of_exported_class_1_has_or_is_using_private_type_2
export class publicClassWithPrivateTypeParameters<T extends privateClass> {
    myMethod(val: T): T { // Error
        return val;
    }
}

export class publicClassWithPublicTypeParameters<T extends publicClass> {
    myMethod(val: T): T { // No Error
        return val;
    }
}

class privateClassWithPrivateTypeParameters<T extends privateClass> {
    myMethod(val: T): T { // No Error
        return val;
    }
}

class privateClassWithPublicTypeParameters<T extends publicClass> {
    myMethod(val: T): T { // No Error
        return val;
    }
}

export class publicClassWithPublicTypeParametersWithoutExtends<T> {
    myMethod(val: T): T { // No Error
        return val;
    }
}

class privateClassWithPublicTypeParametersWithoutExtends<T> {
    myMethod(val: T): T { // No Error
        return val;
    }
}


//// [privacyTypeParametersOfClass.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicClassWithPublicTypeParametersWithoutExtends = exports.publicClassWithPublicTypeParameters = exports.publicClassWithPrivateTypeParameters = exports.publicClass = void 0;
class privateClass {
}
class publicClass {
}
exports.publicClass = publicClass;
// TypeParameter_0_of_exported_class_1_has_or_is_using_private_type_2
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
