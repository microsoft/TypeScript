//// [tests/cases/compiler/privacyClassImplementsClauseDeclFile.ts] ////

//// [privacyClassImplementsClauseDeclFile_externalModule.ts]
export module publicModule {
    export interface publicInterfaceInPublicModule {
    }

    interface privateInterfaceInPublicModule {
    }

    class privateClassImplementingPublicInterfaceInModule implements publicInterfaceInPublicModule {
    }
    class privateClassImplementingPrivateInterfaceInModule implements privateInterfaceInPublicModule {
    }
    export class publicClassImplementingPublicInterfaceInModule implements publicInterfaceInPublicModule {
    }
    export class publicClassImplementingPrivateInterfaceInModule implements privateInterfaceInPublicModule { // Should error
    }

    class privateClassImplementingFromPrivateModuleInterface implements privateModule.publicInterfaceInPrivateModule {
    }
    export class publicClassImplementingFromPrivateModuleInterface implements privateModule.publicInterfaceInPrivateModule { // Should error
    }

    export class publicClassImplementingPrivateAndPublicInterface implements privateInterfaceInPublicModule, publicInterfaceInPublicModule { // Should error
    }
}

module privateModule {
    export interface publicInterfaceInPrivateModule {

    }

    interface privateInterfaceInPrivateModule {
    }

    class privateClassImplementingPublicInterfaceInModule implements publicInterfaceInPrivateModule {
    }
    class privateClassImplementingPrivateInterfaceInModule implements privateInterfaceInPrivateModule {
    }
    export class publicClassImplementingPublicInterfaceInModule implements publicInterfaceInPrivateModule {
    }
    export class publicClassImplementingPrivateInterfaceInModule implements privateInterfaceInPrivateModule { 
    }

    class privateClassImplementingFromPrivateModuleInterface implements privateModule.publicInterfaceInPrivateModule {
    }
    export class publicClassImplementingFromPrivateModuleInterface implements privateModule.publicInterfaceInPrivateModule {
    }
}

export interface publicInterface {

}

interface privateInterface {
}

class privateClassImplementingPublicInterface implements publicInterface {
}
class privateClassImplementingPrivateInterfaceInModule implements privateInterface {
}
export class publicClassImplementingPublicInterface implements publicInterface {
}
export class publicClassImplementingPrivateInterface implements privateInterface { // Should error
}

class privateClassImplementingFromPrivateModuleInterface implements privateModule.publicInterfaceInPrivateModule {
}
export class publicClassImplementingFromPrivateModuleInterface implements privateModule.publicInterfaceInPrivateModule { // Should error
}

//// [privacyClassImplementsClauseDeclFile_GlobalFile.ts]
module publicModuleInGlobal {
    export interface publicInterfaceInPublicModule {
    }

    interface privateInterfaceInPublicModule {
    }

    class privateClassImplementingPublicInterfaceInModule implements publicInterfaceInPublicModule {
    }
    class privateClassImplementingPrivateInterfaceInModule implements privateInterfaceInPublicModule {
    }
    export class publicClassImplementingPublicInterfaceInModule implements publicInterfaceInPublicModule {
    }
    export class publicClassImplementingPrivateInterfaceInModule implements privateInterfaceInPublicModule { // Should error
    }
}
interface publicInterfaceInGlobal {
}
class publicClassImplementingPublicInterfaceInGlobal implements publicInterfaceInGlobal {
}


//// [privacyClassImplementsClauseDeclFile_externalModule.js]
"use strict";
exports.__esModule = true;
var publicModule;
(function (publicModule) {
    var privateClassImplementingPublicInterfaceInModule = (function () {
        function privateClassImplementingPublicInterfaceInModule() {
        }
        return privateClassImplementingPublicInterfaceInModule;
    }());
    var privateClassImplementingPrivateInterfaceInModule = (function () {
        function privateClassImplementingPrivateInterfaceInModule() {
        }
        return privateClassImplementingPrivateInterfaceInModule;
    }());
    var publicClassImplementingPublicInterfaceInModule = (function () {
        function publicClassImplementingPublicInterfaceInModule() {
        }
        return publicClassImplementingPublicInterfaceInModule;
    }());
    publicModule.publicClassImplementingPublicInterfaceInModule = publicClassImplementingPublicInterfaceInModule;
    var publicClassImplementingPrivateInterfaceInModule = (function () {
        function publicClassImplementingPrivateInterfaceInModule() {
        }
        return publicClassImplementingPrivateInterfaceInModule;
    }());
    publicModule.publicClassImplementingPrivateInterfaceInModule = publicClassImplementingPrivateInterfaceInModule;
    var privateClassImplementingFromPrivateModuleInterface = (function () {
        function privateClassImplementingFromPrivateModuleInterface() {
        }
        return privateClassImplementingFromPrivateModuleInterface;
    }());
    var publicClassImplementingFromPrivateModuleInterface = (function () {
        function publicClassImplementingFromPrivateModuleInterface() {
        }
        return publicClassImplementingFromPrivateModuleInterface;
    }());
    publicModule.publicClassImplementingFromPrivateModuleInterface = publicClassImplementingFromPrivateModuleInterface;
    var publicClassImplementingPrivateAndPublicInterface = (function () {
        function publicClassImplementingPrivateAndPublicInterface() {
        }
        return publicClassImplementingPrivateAndPublicInterface;
    }());
    publicModule.publicClassImplementingPrivateAndPublicInterface = publicClassImplementingPrivateAndPublicInterface;
})(publicModule = exports.publicModule || (exports.publicModule = {}));
var privateModule;
(function (privateModule) {
    var privateClassImplementingPublicInterfaceInModule = (function () {
        function privateClassImplementingPublicInterfaceInModule() {
        }
        return privateClassImplementingPublicInterfaceInModule;
    }());
    var privateClassImplementingPrivateInterfaceInModule = (function () {
        function privateClassImplementingPrivateInterfaceInModule() {
        }
        return privateClassImplementingPrivateInterfaceInModule;
    }());
    var publicClassImplementingPublicInterfaceInModule = (function () {
        function publicClassImplementingPublicInterfaceInModule() {
        }
        return publicClassImplementingPublicInterfaceInModule;
    }());
    privateModule.publicClassImplementingPublicInterfaceInModule = publicClassImplementingPublicInterfaceInModule;
    var publicClassImplementingPrivateInterfaceInModule = (function () {
        function publicClassImplementingPrivateInterfaceInModule() {
        }
        return publicClassImplementingPrivateInterfaceInModule;
    }());
    privateModule.publicClassImplementingPrivateInterfaceInModule = publicClassImplementingPrivateInterfaceInModule;
    var privateClassImplementingFromPrivateModuleInterface = (function () {
        function privateClassImplementingFromPrivateModuleInterface() {
        }
        return privateClassImplementingFromPrivateModuleInterface;
    }());
    var publicClassImplementingFromPrivateModuleInterface = (function () {
        function publicClassImplementingFromPrivateModuleInterface() {
        }
        return publicClassImplementingFromPrivateModuleInterface;
    }());
    privateModule.publicClassImplementingFromPrivateModuleInterface = publicClassImplementingFromPrivateModuleInterface;
})(privateModule || (privateModule = {}));
var privateClassImplementingPublicInterface = (function () {
    function privateClassImplementingPublicInterface() {
    }
    return privateClassImplementingPublicInterface;
}());
var privateClassImplementingPrivateInterfaceInModule = (function () {
    function privateClassImplementingPrivateInterfaceInModule() {
    }
    return privateClassImplementingPrivateInterfaceInModule;
}());
var publicClassImplementingPublicInterface = (function () {
    function publicClassImplementingPublicInterface() {
    }
    return publicClassImplementingPublicInterface;
}());
exports.publicClassImplementingPublicInterface = publicClassImplementingPublicInterface;
var publicClassImplementingPrivateInterface = (function () {
    function publicClassImplementingPrivateInterface() {
    }
    return publicClassImplementingPrivateInterface;
}());
exports.publicClassImplementingPrivateInterface = publicClassImplementingPrivateInterface;
var privateClassImplementingFromPrivateModuleInterface = (function () {
    function privateClassImplementingFromPrivateModuleInterface() {
    }
    return privateClassImplementingFromPrivateModuleInterface;
}());
var publicClassImplementingFromPrivateModuleInterface = (function () {
    function publicClassImplementingFromPrivateModuleInterface() {
    }
    return publicClassImplementingFromPrivateModuleInterface;
}());
exports.publicClassImplementingFromPrivateModuleInterface = publicClassImplementingFromPrivateModuleInterface;
//// [privacyClassImplementsClauseDeclFile_GlobalFile.js]
var publicModuleInGlobal;
(function (publicModuleInGlobal) {
    var privateClassImplementingPublicInterfaceInModule = (function () {
        function privateClassImplementingPublicInterfaceInModule() {
        }
        return privateClassImplementingPublicInterfaceInModule;
    }());
    var privateClassImplementingPrivateInterfaceInModule = (function () {
        function privateClassImplementingPrivateInterfaceInModule() {
        }
        return privateClassImplementingPrivateInterfaceInModule;
    }());
    var publicClassImplementingPublicInterfaceInModule = (function () {
        function publicClassImplementingPublicInterfaceInModule() {
        }
        return publicClassImplementingPublicInterfaceInModule;
    }());
    publicModuleInGlobal.publicClassImplementingPublicInterfaceInModule = publicClassImplementingPublicInterfaceInModule;
    var publicClassImplementingPrivateInterfaceInModule = (function () {
        function publicClassImplementingPrivateInterfaceInModule() {
        }
        return publicClassImplementingPrivateInterfaceInModule;
    }());
    publicModuleInGlobal.publicClassImplementingPrivateInterfaceInModule = publicClassImplementingPrivateInterfaceInModule;
})(publicModuleInGlobal || (publicModuleInGlobal = {}));
var publicClassImplementingPublicInterfaceInGlobal = (function () {
    function publicClassImplementingPublicInterfaceInGlobal() {
    }
    return publicClassImplementingPublicInterfaceInGlobal;
}());
