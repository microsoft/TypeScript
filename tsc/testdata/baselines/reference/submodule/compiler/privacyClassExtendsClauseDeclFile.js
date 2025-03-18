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
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicClassExtendingFromPrivateModuleClass = exports.publicClassExtendingPrivateClass = exports.publicClassExtendingPublicClass = exports.publicClass = exports.publicModule = void 0;
var publicModule;
(function (publicModule) {
    class publicClassInPublicModule {
        f1() {
        }
    }
    publicModule.publicClassInPublicModule = publicClassInPublicModule;
    class privateClassInPublicModule {
    }
    class privateClassExtendingPublicClassInModule extends publicClassInPublicModule {
    }
    class privateClassExtendingPrivateClassInModule extends privateClassInPublicModule {
    }
    class publicClassExtendingPublicClassInModule extends publicClassInPublicModule {
    }
    publicModule.publicClassExtendingPublicClassInModule = publicClassExtendingPublicClassInModule;
    class publicClassExtendingPrivateClassInModule extends privateClassInPublicModule {
    }
    publicModule.publicClassExtendingPrivateClassInModule = publicClassExtendingPrivateClassInModule;
    class privateClassExtendingFromPrivateModuleClass extends privateModule.publicClassInPrivateModule {
    }
    class publicClassExtendingFromPrivateModuleClass extends privateModule.publicClassInPrivateModule {
    }
    publicModule.publicClassExtendingFromPrivateModuleClass = publicClassExtendingFromPrivateModuleClass;
})(publicModule || (exports.publicModule = publicModule = {}));
var privateModule;
(function (privateModule) {
    class publicClassInPrivateModule {
        f1() {
        }
    }
    privateModule.publicClassInPrivateModule = publicClassInPrivateModule;
    class privateClassInPrivateModule {
    }
    class privateClassExtendingPublicClassInModule extends publicClassInPrivateModule {
    }
    class privateClassExtendingPrivateClassInModule extends privateClassInPrivateModule {
    }
    class publicClassExtendingPublicClassInModule extends publicClassInPrivateModule {
    }
    privateModule.publicClassExtendingPublicClassInModule = publicClassExtendingPublicClassInModule;
    class publicClassExtendingPrivateClassInModule extends privateClassInPrivateModule {
    }
    privateModule.publicClassExtendingPrivateClassInModule = publicClassExtendingPrivateClassInModule;
    class privateClassExtendingFromPrivateModuleClass extends privateModule.publicClassInPrivateModule {
    }
    class publicClassExtendingFromPrivateModuleClass extends privateModule.publicClassInPrivateModule {
    }
    privateModule.publicClassExtendingFromPrivateModuleClass = publicClassExtendingFromPrivateModuleClass;
})(privateModule || (privateModule = {}));
class publicClass {
    f1() {
    }
}
exports.publicClass = publicClass;
class privateClass {
}
class privateClassExtendingPublicClass extends publicClass {
}
class privateClassExtendingPrivateClassInModule extends privateClass {
}
class publicClassExtendingPublicClass extends publicClass {
}
exports.publicClassExtendingPublicClass = publicClassExtendingPublicClass;
class publicClassExtendingPrivateClass extends privateClass {
}
exports.publicClassExtendingPrivateClass = publicClassExtendingPrivateClass;
class privateClassExtendingFromPrivateModuleClass extends privateModule.publicClassInPrivateModule {
}
class publicClassExtendingFromPrivateModuleClass extends privateModule.publicClassInPrivateModule {
}
exports.publicClassExtendingFromPrivateModuleClass = publicClassExtendingFromPrivateModuleClass;
//// [privacyClassExtendsClauseDeclFile_GlobalFile.js]
var publicModuleInGlobal;
(function (publicModuleInGlobal) {
    class publicClassInPublicModule {
        f1() {
        }
    }
    publicModuleInGlobal.publicClassInPublicModule = publicClassInPublicModule;
    class privateClassInPublicModule {
    }
    class privateClassExtendingPublicClassInModule extends publicClassInPublicModule {
    }
    class privateClassExtendingPrivateClassInModule extends privateClassInPublicModule {
    }
    class publicClassExtendingPublicClassInModule extends publicClassInPublicModule {
    }
    publicModuleInGlobal.publicClassExtendingPublicClassInModule = publicClassExtendingPublicClassInModule;
    class publicClassExtendingPrivateClassInModule extends privateClassInPublicModule {
    }
    publicModuleInGlobal.publicClassExtendingPrivateClassInModule = publicClassExtendingPrivateClassInModule;
})(publicModuleInGlobal || (publicModuleInGlobal = {}));
class publicClassInGlobal {
}
class publicClassExtendingPublicClassInGlobal extends publicClassInGlobal {
}
