//// [tests/cases/compiler/privacyClassExtendsClauseDeclFile.ts] ////

//// [privacyClassExtendsClauseDeclFile_externalModule.ts]
export module publicModule {
    export class publicClassInPublicModule {
        private f1() {
        }
    }

    class privateClassInPublicModule {
    }

    class privateClassExtendingPublicClassInModule extends publicClassInPublicModule {
    }
    class privateClassExtendingPrivateClassInModule extends privateClassInPublicModule {
    }
    export class publicClassExtendingPublicClassInModule extends publicClassInPublicModule {
    }
    export class publicClassExtendingPrivateClassInModule extends privateClassInPublicModule { // Should error
    }

    class privateClassExtendingFromPrivateModuleClass extends privateModule.publicClassInPrivateModule {
    }
    export class publicClassExtendingFromPrivateModuleClass extends privateModule.publicClassInPrivateModule { // Should error
    }
}

module privateModule {
    export class publicClassInPrivateModule {
        private f1() {
        }
    }

    class privateClassInPrivateModule {
    }

    class privateClassExtendingPublicClassInModule extends publicClassInPrivateModule {
    }
    class privateClassExtendingPrivateClassInModule extends privateClassInPrivateModule {
    }
    export class publicClassExtendingPublicClassInModule extends publicClassInPrivateModule {
    }
    export class publicClassExtendingPrivateClassInModule extends privateClassInPrivateModule { 
    }

    class privateClassExtendingFromPrivateModuleClass extends privateModule.publicClassInPrivateModule {
    }
    export class publicClassExtendingFromPrivateModuleClass extends privateModule.publicClassInPrivateModule {
    }
}

export class publicClass {
    private f1() {
    }
}

class privateClass {
}

class privateClassExtendingPublicClass extends publicClass {
}
class privateClassExtendingPrivateClassInModule extends privateClass {
}
export class publicClassExtendingPublicClass extends publicClass {
}
export class publicClassExtendingPrivateClass extends privateClass { // Should error
}

class privateClassExtendingFromPrivateModuleClass extends privateModule.publicClassInPrivateModule {
}
export class publicClassExtendingFromPrivateModuleClass extends privateModule.publicClassInPrivateModule { // Should error
}

//// [privacyClassExtendsClauseDeclFile_GlobalFile.ts]
module publicModuleInGlobal {
    export class publicClassInPublicModule {
        private f1() {
        }
    }

    class privateClassInPublicModule {
    }

    class privateClassExtendingPublicClassInModule extends publicClassInPublicModule {
    }
    class privateClassExtendingPrivateClassInModule extends privateClassInPublicModule {
    }
    export class publicClassExtendingPublicClassInModule extends publicClassInPublicModule {
    }
    export class publicClassExtendingPrivateClassInModule extends privateClassInPublicModule { // Should error
    }
}
class publicClassInGlobal {
}
class publicClassExtendingPublicClassInGlobal extends publicClassInGlobal {
}


//// [privacyClassExtendsClauseDeclFile_externalModule.js]
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.publicClassExtendingFromPrivateModuleClass = exports.publicClassExtendingPrivateClass = exports.publicClassExtendingPublicClass = exports.publicClass = exports.publicModule = void 0;
var publicModule;
(function (publicModule) {
    var publicClassInPublicModule = /** @class */ (function () {
        function publicClassInPublicModule() {
        }
        publicClassInPublicModule.prototype.f1 = function () {
        };
        return publicClassInPublicModule;
    }());
    publicModule.publicClassInPublicModule = publicClassInPublicModule;
    var privateClassInPublicModule = /** @class */ (function () {
        function privateClassInPublicModule() {
        }
        return privateClassInPublicModule;
    }());
    var privateClassExtendingPublicClassInModule = /** @class */ (function (_super) {
        __extends(privateClassExtendingPublicClassInModule, _super);
        function privateClassExtendingPublicClassInModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return privateClassExtendingPublicClassInModule;
    }(publicClassInPublicModule));
    var privateClassExtendingPrivateClassInModule = /** @class */ (function (_super) {
        __extends(privateClassExtendingPrivateClassInModule, _super);
        function privateClassExtendingPrivateClassInModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return privateClassExtendingPrivateClassInModule;
    }(privateClassInPublicModule));
    var publicClassExtendingPublicClassInModule = /** @class */ (function (_super) {
        __extends(publicClassExtendingPublicClassInModule, _super);
        function publicClassExtendingPublicClassInModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return publicClassExtendingPublicClassInModule;
    }(publicClassInPublicModule));
    publicModule.publicClassExtendingPublicClassInModule = publicClassExtendingPublicClassInModule;
    var publicClassExtendingPrivateClassInModule = /** @class */ (function (_super) {
        __extends(publicClassExtendingPrivateClassInModule, _super);
        function publicClassExtendingPrivateClassInModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return publicClassExtendingPrivateClassInModule;
    }(privateClassInPublicModule));
    publicModule.publicClassExtendingPrivateClassInModule = publicClassExtendingPrivateClassInModule;
    var privateClassExtendingFromPrivateModuleClass = /** @class */ (function (_super) {
        __extends(privateClassExtendingFromPrivateModuleClass, _super);
        function privateClassExtendingFromPrivateModuleClass() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return privateClassExtendingFromPrivateModuleClass;
    }(privateModule.publicClassInPrivateModule));
    var publicClassExtendingFromPrivateModuleClass = /** @class */ (function (_super) {
        __extends(publicClassExtendingFromPrivateModuleClass, _super);
        function publicClassExtendingFromPrivateModuleClass() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return publicClassExtendingFromPrivateModuleClass;
    }(privateModule.publicClassInPrivateModule));
    publicModule.publicClassExtendingFromPrivateModuleClass = publicClassExtendingFromPrivateModuleClass;
})(publicModule = exports.publicModule || (exports.publicModule = {}));
var privateModule;
(function (privateModule) {
    var publicClassInPrivateModule = /** @class */ (function () {
        function publicClassInPrivateModule() {
        }
        publicClassInPrivateModule.prototype.f1 = function () {
        };
        return publicClassInPrivateModule;
    }());
    privateModule.publicClassInPrivateModule = publicClassInPrivateModule;
    var privateClassInPrivateModule = /** @class */ (function () {
        function privateClassInPrivateModule() {
        }
        return privateClassInPrivateModule;
    }());
    var privateClassExtendingPublicClassInModule = /** @class */ (function (_super) {
        __extends(privateClassExtendingPublicClassInModule, _super);
        function privateClassExtendingPublicClassInModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return privateClassExtendingPublicClassInModule;
    }(publicClassInPrivateModule));
    var privateClassExtendingPrivateClassInModule = /** @class */ (function (_super) {
        __extends(privateClassExtendingPrivateClassInModule, _super);
        function privateClassExtendingPrivateClassInModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return privateClassExtendingPrivateClassInModule;
    }(privateClassInPrivateModule));
    var publicClassExtendingPublicClassInModule = /** @class */ (function (_super) {
        __extends(publicClassExtendingPublicClassInModule, _super);
        function publicClassExtendingPublicClassInModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return publicClassExtendingPublicClassInModule;
    }(publicClassInPrivateModule));
    privateModule.publicClassExtendingPublicClassInModule = publicClassExtendingPublicClassInModule;
    var publicClassExtendingPrivateClassInModule = /** @class */ (function (_super) {
        __extends(publicClassExtendingPrivateClassInModule, _super);
        function publicClassExtendingPrivateClassInModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return publicClassExtendingPrivateClassInModule;
    }(privateClassInPrivateModule));
    privateModule.publicClassExtendingPrivateClassInModule = publicClassExtendingPrivateClassInModule;
    var privateClassExtendingFromPrivateModuleClass = /** @class */ (function (_super) {
        __extends(privateClassExtendingFromPrivateModuleClass, _super);
        function privateClassExtendingFromPrivateModuleClass() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return privateClassExtendingFromPrivateModuleClass;
    }(privateModule.publicClassInPrivateModule));
    var publicClassExtendingFromPrivateModuleClass = /** @class */ (function (_super) {
        __extends(publicClassExtendingFromPrivateModuleClass, _super);
        function publicClassExtendingFromPrivateModuleClass() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return publicClassExtendingFromPrivateModuleClass;
    }(privateModule.publicClassInPrivateModule));
    privateModule.publicClassExtendingFromPrivateModuleClass = publicClassExtendingFromPrivateModuleClass;
})(privateModule || (privateModule = {}));
var publicClass = /** @class */ (function () {
    function publicClass() {
    }
    publicClass.prototype.f1 = function () {
    };
    return publicClass;
}());
exports.publicClass = publicClass;
var privateClass = /** @class */ (function () {
    function privateClass() {
    }
    return privateClass;
}());
var privateClassExtendingPublicClass = /** @class */ (function (_super) {
    __extends(privateClassExtendingPublicClass, _super);
    function privateClassExtendingPublicClass() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return privateClassExtendingPublicClass;
}(publicClass));
var privateClassExtendingPrivateClassInModule = /** @class */ (function (_super) {
    __extends(privateClassExtendingPrivateClassInModule, _super);
    function privateClassExtendingPrivateClassInModule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return privateClassExtendingPrivateClassInModule;
}(privateClass));
var publicClassExtendingPublicClass = /** @class */ (function (_super) {
    __extends(publicClassExtendingPublicClass, _super);
    function publicClassExtendingPublicClass() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return publicClassExtendingPublicClass;
}(publicClass));
exports.publicClassExtendingPublicClass = publicClassExtendingPublicClass;
var publicClassExtendingPrivateClass = /** @class */ (function (_super) {
    __extends(publicClassExtendingPrivateClass, _super);
    function publicClassExtendingPrivateClass() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return publicClassExtendingPrivateClass;
}(privateClass));
exports.publicClassExtendingPrivateClass = publicClassExtendingPrivateClass;
var privateClassExtendingFromPrivateModuleClass = /** @class */ (function (_super) {
    __extends(privateClassExtendingFromPrivateModuleClass, _super);
    function privateClassExtendingFromPrivateModuleClass() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return privateClassExtendingFromPrivateModuleClass;
}(privateModule.publicClassInPrivateModule));
var publicClassExtendingFromPrivateModuleClass = /** @class */ (function (_super) {
    __extends(publicClassExtendingFromPrivateModuleClass, _super);
    function publicClassExtendingFromPrivateModuleClass() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return publicClassExtendingFromPrivateModuleClass;
}(privateModule.publicClassInPrivateModule));
exports.publicClassExtendingFromPrivateModuleClass = publicClassExtendingFromPrivateModuleClass;
//// [privacyClassExtendsClauseDeclFile_GlobalFile.js]
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var publicModuleInGlobal;
(function (publicModuleInGlobal) {
    var publicClassInPublicModule = /** @class */ (function () {
        function publicClassInPublicModule() {
        }
        publicClassInPublicModule.prototype.f1 = function () {
        };
        return publicClassInPublicModule;
    }());
    publicModuleInGlobal.publicClassInPublicModule = publicClassInPublicModule;
    var privateClassInPublicModule = /** @class */ (function () {
        function privateClassInPublicModule() {
        }
        return privateClassInPublicModule;
    }());
    var privateClassExtendingPublicClassInModule = /** @class */ (function (_super) {
        __extends(privateClassExtendingPublicClassInModule, _super);
        function privateClassExtendingPublicClassInModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return privateClassExtendingPublicClassInModule;
    }(publicClassInPublicModule));
    var privateClassExtendingPrivateClassInModule = /** @class */ (function (_super) {
        __extends(privateClassExtendingPrivateClassInModule, _super);
        function privateClassExtendingPrivateClassInModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return privateClassExtendingPrivateClassInModule;
    }(privateClassInPublicModule));
    var publicClassExtendingPublicClassInModule = /** @class */ (function (_super) {
        __extends(publicClassExtendingPublicClassInModule, _super);
        function publicClassExtendingPublicClassInModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return publicClassExtendingPublicClassInModule;
    }(publicClassInPublicModule));
    publicModuleInGlobal.publicClassExtendingPublicClassInModule = publicClassExtendingPublicClassInModule;
    var publicClassExtendingPrivateClassInModule = /** @class */ (function (_super) {
        __extends(publicClassExtendingPrivateClassInModule, _super);
        function publicClassExtendingPrivateClassInModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return publicClassExtendingPrivateClassInModule;
    }(privateClassInPublicModule));
    publicModuleInGlobal.publicClassExtendingPrivateClassInModule = publicClassExtendingPrivateClassInModule;
})(publicModuleInGlobal || (publicModuleInGlobal = {}));
var publicClassInGlobal = /** @class */ (function () {
    function publicClassInGlobal() {
    }
    return publicClassInGlobal;
}());
var publicClassExtendingPublicClassInGlobal = /** @class */ (function (_super) {
    __extends(publicClassExtendingPublicClassInGlobal, _super);
    function publicClassExtendingPublicClassInGlobal() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return publicClassExtendingPublicClassInGlobal;
}(publicClassInGlobal));


//// [privacyClassExtendsClauseDeclFile_externalModule.d.ts]
export declare module publicModule {
    export class publicClassInPublicModule {
        private f1;
    }
    class privateClassInPublicModule {
    }
    export class publicClassExtendingPublicClassInModule extends publicClassInPublicModule {
    }
    export class publicClassExtendingPrivateClassInModule extends privateClassInPublicModule {
    }
    export class publicClassExtendingFromPrivateModuleClass extends privateModule.publicClassInPrivateModule {
    }
    export {};
}
declare module privateModule {
    export class publicClassInPrivateModule {
        private f1;
    }
    class privateClassInPrivateModule {
    }
    export class publicClassExtendingPublicClassInModule extends publicClassInPrivateModule {
    }
    export class publicClassExtendingPrivateClassInModule extends privateClassInPrivateModule {
    }
    export class publicClassExtendingFromPrivateModuleClass extends privateModule.publicClassInPrivateModule {
    }
    export {};
}
export declare class publicClass {
    private f1;
}
declare class privateClass {
}
export declare class publicClassExtendingPublicClass extends publicClass {
}
export declare class publicClassExtendingPrivateClass extends privateClass {
}
export declare class publicClassExtendingFromPrivateModuleClass extends privateModule.publicClassInPrivateModule {
}
export {};
//// [privacyClassExtendsClauseDeclFile_GlobalFile.d.ts]
declare module publicModuleInGlobal {
    export class publicClassInPublicModule {
        private f1;
    }
    class privateClassInPublicModule {
    }
    export class publicClassExtendingPublicClassInModule extends publicClassInPublicModule {
    }
    export class publicClassExtendingPrivateClassInModule extends privateClassInPublicModule {
    }
    export {};
}
declare class publicClassInGlobal {
}
declare class publicClassExtendingPublicClassInGlobal extends publicClassInGlobal {
}
