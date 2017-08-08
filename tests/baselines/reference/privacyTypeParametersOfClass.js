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
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true
        });
    }) : (function(proto, name) {
        proto[name].name = name;
    });
    return function (proto, keys) {
        for (var i = keys.length - 1; i >= 0; i--) {
            name(proto, keys[i])
        }
    };
})();
exports.__esModule = true;
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
// TypeParameter_0_of_exported_class_1_has_or_is_using_private_type_2
var publicClassWithPrivateTypeParameters = (function () {
    function publicClassWithPrivateTypeParameters() {
    }
    publicClassWithPrivateTypeParameters.prototype.myMethod = function (val) {
        return val;
    };
    __names(publicClassWithPrivateTypeParameters.prototype, ["myMethod"]);
    return publicClassWithPrivateTypeParameters;
}());
exports.publicClassWithPrivateTypeParameters = publicClassWithPrivateTypeParameters;
var publicClassWithPublicTypeParameters = (function () {
    function publicClassWithPublicTypeParameters() {
    }
    publicClassWithPublicTypeParameters.prototype.myMethod = function (val) {
        return val;
    };
    __names(publicClassWithPublicTypeParameters.prototype, ["myMethod"]);
    return publicClassWithPublicTypeParameters;
}());
exports.publicClassWithPublicTypeParameters = publicClassWithPublicTypeParameters;
var privateClassWithPrivateTypeParameters = (function () {
    function privateClassWithPrivateTypeParameters() {
    }
    privateClassWithPrivateTypeParameters.prototype.myMethod = function (val) {
        return val;
    };
    __names(privateClassWithPrivateTypeParameters.prototype, ["myMethod"]);
    return privateClassWithPrivateTypeParameters;
}());
var privateClassWithPublicTypeParameters = (function () {
    function privateClassWithPublicTypeParameters() {
    }
    privateClassWithPublicTypeParameters.prototype.myMethod = function (val) {
        return val;
    };
    __names(privateClassWithPublicTypeParameters.prototype, ["myMethod"]);
    return privateClassWithPublicTypeParameters;
}());
var publicClassWithPublicTypeParametersWithoutExtends = (function () {
    function publicClassWithPublicTypeParametersWithoutExtends() {
    }
    publicClassWithPublicTypeParametersWithoutExtends.prototype.myMethod = function (val) {
        return val;
    };
    __names(publicClassWithPublicTypeParametersWithoutExtends.prototype, ["myMethod"]);
    return publicClassWithPublicTypeParametersWithoutExtends;
}());
exports.publicClassWithPublicTypeParametersWithoutExtends = publicClassWithPublicTypeParametersWithoutExtends;
var privateClassWithPublicTypeParametersWithoutExtends = (function () {
    function privateClassWithPublicTypeParametersWithoutExtends() {
    }
    privateClassWithPublicTypeParametersWithoutExtends.prototype.myMethod = function (val) {
        return val;
    };
    __names(privateClassWithPublicTypeParametersWithoutExtends.prototype, ["myMethod"]);
    return privateClassWithPublicTypeParametersWithoutExtends;
}());
