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
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true, writable: false, enumerable: false
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
var publicClassWithTypeParametersFromPrivateModule = (function () {
    function publicClassWithTypeParametersFromPrivateModule() {
    }
    publicClassWithTypeParametersFromPrivateModule.prototype.myMethod = function (val) {
        return val;
    };
    __names(publicClassWithTypeParametersFromPrivateModule.prototype, ["myMethod"]);
    return publicClassWithTypeParametersFromPrivateModule;
}());
exports.publicClassWithTypeParametersFromPrivateModule = publicClassWithTypeParametersFromPrivateModule;
var privateClassWithTypeParametersFromPrivateModule = (function () {
    function privateClassWithTypeParametersFromPrivateModule() {
    }
    privateClassWithTypeParametersFromPrivateModule.prototype.myMethod = function (val) {
        return val;
    };
    __names(privateClassWithTypeParametersFromPrivateModule.prototype, ["myMethod"]);
    return privateClassWithTypeParametersFromPrivateModule;
}());
var publicModule;
(function (publicModule) {
    var privateClassInPublicModule = (function () {
        function privateClassInPublicModule() {
        }
        return privateClassInPublicModule;
    }());
    var publicClassInPublicModule = (function () {
        function publicClassInPublicModule() {
        }
        return publicClassInPublicModule;
    }());
    publicModule.publicClassInPublicModule = publicClassInPublicModule;
    var publicClassWithPrivateTypeParameters = (function () {
        function publicClassWithPrivateTypeParameters() {
        }
        publicClassWithPrivateTypeParameters.prototype.myMethod = function (val) {
            return val;
        };
        __names(publicClassWithPrivateTypeParameters.prototype, ["myMethod"]);
        return publicClassWithPrivateTypeParameters;
    }());
    publicModule.publicClassWithPrivateTypeParameters = publicClassWithPrivateTypeParameters;
    var publicClassWithPublicTypeParameters = (function () {
        function publicClassWithPublicTypeParameters() {
        }
        publicClassWithPublicTypeParameters.prototype.myMethod = function (val) {
            return val;
        };
        __names(publicClassWithPublicTypeParameters.prototype, ["myMethod"]);
        return publicClassWithPublicTypeParameters;
    }());
    publicModule.publicClassWithPublicTypeParameters = publicClassWithPublicTypeParameters;
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
    publicModule.publicClassWithPublicTypeParametersWithoutExtends = publicClassWithPublicTypeParametersWithoutExtends;
    var privateClassWithPublicTypeParametersWithoutExtends = (function () {
        function privateClassWithPublicTypeParametersWithoutExtends() {
        }
        privateClassWithPublicTypeParametersWithoutExtends.prototype.myMethod = function (val) {
            return val;
        };
        __names(privateClassWithPublicTypeParametersWithoutExtends.prototype, ["myMethod"]);
        return privateClassWithPublicTypeParametersWithoutExtends;
    }());
    var publicClassWithTypeParametersFromPrivateModule = (function () {
        function publicClassWithTypeParametersFromPrivateModule() {
        }
        publicClassWithTypeParametersFromPrivateModule.prototype.myMethod = function (val) {
            return val;
        };
        __names(publicClassWithTypeParametersFromPrivateModule.prototype, ["myMethod"]);
        return publicClassWithTypeParametersFromPrivateModule;
    }());
    publicModule.publicClassWithTypeParametersFromPrivateModule = publicClassWithTypeParametersFromPrivateModule;
    var privateClassWithTypeParametersFromPrivateModule = (function () {
        function privateClassWithTypeParametersFromPrivateModule() {
        }
        privateClassWithTypeParametersFromPrivateModule.prototype.myMethod = function (val) {
            return val;
        };
        __names(privateClassWithTypeParametersFromPrivateModule.prototype, ["myMethod"]);
        return privateClassWithTypeParametersFromPrivateModule;
    }());
})(publicModule = exports.publicModule || (exports.publicModule = {}));
var privateModule;
(function (privateModule) {
    var privateClassInPrivateModule = (function () {
        function privateClassInPrivateModule() {
        }
        return privateClassInPrivateModule;
    }());
    var publicClassInPrivateModule = (function () {
        function publicClassInPrivateModule() {
        }
        return publicClassInPrivateModule;
    }());
    privateModule.publicClassInPrivateModule = publicClassInPrivateModule;
    var publicClassWithPrivateTypeParameters = (function () {
        function publicClassWithPrivateTypeParameters() {
        }
        publicClassWithPrivateTypeParameters.prototype.myMethod = function (val) {
            return val;
        };
        __names(publicClassWithPrivateTypeParameters.prototype, ["myMethod"]);
        return publicClassWithPrivateTypeParameters;
    }());
    privateModule.publicClassWithPrivateTypeParameters = publicClassWithPrivateTypeParameters;
    var publicClassWithPublicTypeParameters = (function () {
        function publicClassWithPublicTypeParameters() {
        }
        publicClassWithPublicTypeParameters.prototype.myMethod = function (val) {
            return val;
        };
        __names(publicClassWithPublicTypeParameters.prototype, ["myMethod"]);
        return publicClassWithPublicTypeParameters;
    }());
    privateModule.publicClassWithPublicTypeParameters = publicClassWithPublicTypeParameters;
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
    privateModule.publicClassWithPublicTypeParametersWithoutExtends = publicClassWithPublicTypeParametersWithoutExtends;
    var privateClassWithPublicTypeParametersWithoutExtends = (function () {
        function privateClassWithPublicTypeParametersWithoutExtends() {
        }
        privateClassWithPublicTypeParametersWithoutExtends.prototype.myMethod = function (val) {
            return val;
        };
        __names(privateClassWithPublicTypeParametersWithoutExtends.prototype, ["myMethod"]);
        return privateClassWithPublicTypeParametersWithoutExtends;
    }());
})(privateModule || (privateModule = {}));
