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
    var proto_1 = publicClassWithPrivateTypeParameters.prototype;
    proto_1.myMethod = function (val) {
        return val;
    };
    return publicClassWithPrivateTypeParameters;
}());
exports.publicClassWithPrivateTypeParameters = publicClassWithPrivateTypeParameters;
var publicClassWithPublicTypeParameters = (function () {
    function publicClassWithPublicTypeParameters() {
    }
    var proto_2 = publicClassWithPublicTypeParameters.prototype;
    proto_2.myMethod = function (val) {
        return val;
    };
    return publicClassWithPublicTypeParameters;
}());
exports.publicClassWithPublicTypeParameters = publicClassWithPublicTypeParameters;
var privateClassWithPrivateTypeParameters = (function () {
    function privateClassWithPrivateTypeParameters() {
    }
    var proto_3 = privateClassWithPrivateTypeParameters.prototype;
    proto_3.myMethod = function (val) {
        return val;
    };
    return privateClassWithPrivateTypeParameters;
}());
var privateClassWithPublicTypeParameters = (function () {
    function privateClassWithPublicTypeParameters() {
    }
    var proto_4 = privateClassWithPublicTypeParameters.prototype;
    proto_4.myMethod = function (val) {
        return val;
    };
    return privateClassWithPublicTypeParameters;
}());
var publicClassWithPublicTypeParametersWithoutExtends = (function () {
    function publicClassWithPublicTypeParametersWithoutExtends() {
    }
    var proto_5 = publicClassWithPublicTypeParametersWithoutExtends.prototype;
    proto_5.myMethod = function (val) {
        return val;
    };
    return publicClassWithPublicTypeParametersWithoutExtends;
}());
exports.publicClassWithPublicTypeParametersWithoutExtends = publicClassWithPublicTypeParametersWithoutExtends;
var privateClassWithPublicTypeParametersWithoutExtends = (function () {
    function privateClassWithPublicTypeParametersWithoutExtends() {
    }
    var proto_6 = privateClassWithPublicTypeParametersWithoutExtends.prototype;
    proto_6.myMethod = function (val) {
        return val;
    };
    return privateClassWithPublicTypeParametersWithoutExtends;
}());
var publicClassWithTypeParametersFromPrivateModule = (function () {
    function publicClassWithTypeParametersFromPrivateModule() {
    }
    var proto_7 = publicClassWithTypeParametersFromPrivateModule.prototype;
    proto_7.myMethod = function (val) {
        return val;
    };
    return publicClassWithTypeParametersFromPrivateModule;
}());
exports.publicClassWithTypeParametersFromPrivateModule = publicClassWithTypeParametersFromPrivateModule;
var privateClassWithTypeParametersFromPrivateModule = (function () {
    function privateClassWithTypeParametersFromPrivateModule() {
    }
    var proto_8 = privateClassWithTypeParametersFromPrivateModule.prototype;
    proto_8.myMethod = function (val) {
        return val;
    };
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
        var proto_9 = publicClassWithPrivateTypeParameters.prototype;
        proto_9.myMethod = function (val) {
            return val;
        };
        return publicClassWithPrivateTypeParameters;
    }());
    publicModule.publicClassWithPrivateTypeParameters = publicClassWithPrivateTypeParameters;
    var publicClassWithPublicTypeParameters = (function () {
        function publicClassWithPublicTypeParameters() {
        }
        var proto_10 = publicClassWithPublicTypeParameters.prototype;
        proto_10.myMethod = function (val) {
            return val;
        };
        return publicClassWithPublicTypeParameters;
    }());
    publicModule.publicClassWithPublicTypeParameters = publicClassWithPublicTypeParameters;
    var privateClassWithPrivateTypeParameters = (function () {
        function privateClassWithPrivateTypeParameters() {
        }
        var proto_11 = privateClassWithPrivateTypeParameters.prototype;
        proto_11.myMethod = function (val) {
            return val;
        };
        return privateClassWithPrivateTypeParameters;
    }());
    var privateClassWithPublicTypeParameters = (function () {
        function privateClassWithPublicTypeParameters() {
        }
        var proto_12 = privateClassWithPublicTypeParameters.prototype;
        proto_12.myMethod = function (val) {
            return val;
        };
        return privateClassWithPublicTypeParameters;
    }());
    var publicClassWithPublicTypeParametersWithoutExtends = (function () {
        function publicClassWithPublicTypeParametersWithoutExtends() {
        }
        var proto_13 = publicClassWithPublicTypeParametersWithoutExtends.prototype;
        proto_13.myMethod = function (val) {
            return val;
        };
        return publicClassWithPublicTypeParametersWithoutExtends;
    }());
    publicModule.publicClassWithPublicTypeParametersWithoutExtends = publicClassWithPublicTypeParametersWithoutExtends;
    var privateClassWithPublicTypeParametersWithoutExtends = (function () {
        function privateClassWithPublicTypeParametersWithoutExtends() {
        }
        var proto_14 = privateClassWithPublicTypeParametersWithoutExtends.prototype;
        proto_14.myMethod = function (val) {
            return val;
        };
        return privateClassWithPublicTypeParametersWithoutExtends;
    }());
    var publicClassWithTypeParametersFromPrivateModule = (function () {
        function publicClassWithTypeParametersFromPrivateModule() {
        }
        var proto_15 = publicClassWithTypeParametersFromPrivateModule.prototype;
        proto_15.myMethod = function (val) {
            return val;
        };
        return publicClassWithTypeParametersFromPrivateModule;
    }());
    publicModule.publicClassWithTypeParametersFromPrivateModule = publicClassWithTypeParametersFromPrivateModule;
    var privateClassWithTypeParametersFromPrivateModule = (function () {
        function privateClassWithTypeParametersFromPrivateModule() {
        }
        var proto_16 = privateClassWithTypeParametersFromPrivateModule.prototype;
        proto_16.myMethod = function (val) {
            return val;
        };
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
        var proto_17 = publicClassWithPrivateTypeParameters.prototype;
        proto_17.myMethod = function (val) {
            return val;
        };
        return publicClassWithPrivateTypeParameters;
    }());
    privateModule.publicClassWithPrivateTypeParameters = publicClassWithPrivateTypeParameters;
    var publicClassWithPublicTypeParameters = (function () {
        function publicClassWithPublicTypeParameters() {
        }
        var proto_18 = publicClassWithPublicTypeParameters.prototype;
        proto_18.myMethod = function (val) {
            return val;
        };
        return publicClassWithPublicTypeParameters;
    }());
    privateModule.publicClassWithPublicTypeParameters = publicClassWithPublicTypeParameters;
    var privateClassWithPrivateTypeParameters = (function () {
        function privateClassWithPrivateTypeParameters() {
        }
        var proto_19 = privateClassWithPrivateTypeParameters.prototype;
        proto_19.myMethod = function (val) {
            return val;
        };
        return privateClassWithPrivateTypeParameters;
    }());
    var privateClassWithPublicTypeParameters = (function () {
        function privateClassWithPublicTypeParameters() {
        }
        var proto_20 = privateClassWithPublicTypeParameters.prototype;
        proto_20.myMethod = function (val) {
            return val;
        };
        return privateClassWithPublicTypeParameters;
    }());
    var publicClassWithPublicTypeParametersWithoutExtends = (function () {
        function publicClassWithPublicTypeParametersWithoutExtends() {
        }
        var proto_21 = publicClassWithPublicTypeParametersWithoutExtends.prototype;
        proto_21.myMethod = function (val) {
            return val;
        };
        return publicClassWithPublicTypeParametersWithoutExtends;
    }());
    privateModule.publicClassWithPublicTypeParametersWithoutExtends = publicClassWithPublicTypeParametersWithoutExtends;
    var privateClassWithPublicTypeParametersWithoutExtends = (function () {
        function privateClassWithPublicTypeParametersWithoutExtends() {
        }
        var proto_22 = privateClassWithPublicTypeParametersWithoutExtends.prototype;
        proto_22.myMethod = function (val) {
            return val;
        };
        return privateClassWithPublicTypeParametersWithoutExtends;
    }());
})(privateModule || (privateModule = {}));
