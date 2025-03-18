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
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicClassImplementingFromPrivateModuleInterface = exports.publicClassImplementingPrivateInterface = exports.publicClassImplementingPublicInterface = exports.publicModule = void 0;
var publicModule;
(function (publicModule) {
    class privateClassImplementingPublicInterfaceInModule {
    }
    class privateClassImplementingPrivateInterfaceInModule {
    }
    class publicClassImplementingPublicInterfaceInModule {
    }
    publicModule.publicClassImplementingPublicInterfaceInModule = publicClassImplementingPublicInterfaceInModule;
    class publicClassImplementingPrivateInterfaceInModule {
    }
    publicModule.publicClassImplementingPrivateInterfaceInModule = publicClassImplementingPrivateInterfaceInModule;
    class privateClassImplementingFromPrivateModuleInterface {
    }
    class publicClassImplementingFromPrivateModuleInterface {
    }
    publicModule.publicClassImplementingFromPrivateModuleInterface = publicClassImplementingFromPrivateModuleInterface;
    class publicClassImplementingPrivateAndPublicInterface {
    }
    publicModule.publicClassImplementingPrivateAndPublicInterface = publicClassImplementingPrivateAndPublicInterface;
})(publicModule || (exports.publicModule = publicModule = {}));
var privateModule;
(function (privateModule) {
    class privateClassImplementingPublicInterfaceInModule {
    }
    class privateClassImplementingPrivateInterfaceInModule {
    }
    class publicClassImplementingPublicInterfaceInModule {
    }
    privateModule.publicClassImplementingPublicInterfaceInModule = publicClassImplementingPublicInterfaceInModule;
    class publicClassImplementingPrivateInterfaceInModule {
    }
    privateModule.publicClassImplementingPrivateInterfaceInModule = publicClassImplementingPrivateInterfaceInModule;
    class privateClassImplementingFromPrivateModuleInterface {
    }
    class publicClassImplementingFromPrivateModuleInterface {
    }
    privateModule.publicClassImplementingFromPrivateModuleInterface = publicClassImplementingFromPrivateModuleInterface;
})(privateModule || (privateModule = {}));
class privateClassImplementingPublicInterface {
}
class privateClassImplementingPrivateInterfaceInModule {
}
class publicClassImplementingPublicInterface {
}
exports.publicClassImplementingPublicInterface = publicClassImplementingPublicInterface;
class publicClassImplementingPrivateInterface {
}
exports.publicClassImplementingPrivateInterface = publicClassImplementingPrivateInterface;
class privateClassImplementingFromPrivateModuleInterface {
}
class publicClassImplementingFromPrivateModuleInterface {
}
exports.publicClassImplementingFromPrivateModuleInterface = publicClassImplementingFromPrivateModuleInterface;
//// [privacyClassImplementsClauseDeclFile_GlobalFile.js]
var publicModuleInGlobal;
(function (publicModuleInGlobal) {
    class privateClassImplementingPublicInterfaceInModule {
    }
    class privateClassImplementingPrivateInterfaceInModule {
    }
    class publicClassImplementingPublicInterfaceInModule {
    }
    publicModuleInGlobal.publicClassImplementingPublicInterfaceInModule = publicClassImplementingPublicInterfaceInModule;
    class publicClassImplementingPrivateInterfaceInModule {
    }
    publicModuleInGlobal.publicClassImplementingPrivateInterfaceInModule = publicClassImplementingPrivateInterfaceInModule;
})(publicModuleInGlobal || (publicModuleInGlobal = {}));
class publicClassImplementingPublicInterfaceInGlobal {
}
