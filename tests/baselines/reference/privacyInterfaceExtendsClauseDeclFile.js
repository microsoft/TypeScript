//// [tests/cases/compiler/privacyInterfaceExtendsClauseDeclFile.ts] ////

//// [privacyInterfaceExtendsClauseDeclFile_externalModule.ts]
export module publicModule {
    export interface publicInterfaceInPublicModule {
    }

    interface privateInterfaceInPublicModule {
    }

    interface privateInterfaceImplementingPublicInterfaceInModule extends publicInterfaceInPublicModule {
    }
    interface privateInterfaceImplementingPrivateInterfaceInModule extends privateInterfaceInPublicModule {
    }
    export interface publicInterfaceImplementingPublicInterfaceInModule extends publicInterfaceInPublicModule {
    }
    export interface publicInterfaceImplementingPrivateInterfaceInModule extends privateInterfaceInPublicModule { // Should error
    }

    interface privateInterfaceImplementingFromPrivateModuleInterface extends privateModule.publicInterfaceInPrivateModule {
    }
    export interface publicInterfaceImplementingFromPrivateModuleInterface extends privateModule.publicInterfaceInPrivateModule { // Should error
    }

    export interface publicInterfaceImplementingPrivateAndPublicInterface extends privateInterfaceInPublicModule, publicInterfaceInPublicModule { // Should error
    }
}

module privateModule {
    export interface publicInterfaceInPrivateModule {

    }

    interface privateInterfaceInPrivateModule {
    }

    interface privateInterfaceImplementingPublicInterfaceInModule extends publicInterfaceInPrivateModule {
    }
    interface privateInterfaceImplementingPrivateInterfaceInModule extends privateInterfaceInPrivateModule {
    }
    export interface publicInterfaceImplementingPublicInterfaceInModule extends publicInterfaceInPrivateModule {
    }
    export interface publicInterfaceImplementingPrivateInterfaceInModule extends privateInterfaceInPrivateModule {
    }

    interface privateInterfaceImplementingFromPrivateModuleInterface extends privateModule.publicInterfaceInPrivateModule {
    }
    export interface publicInterfaceImplementingFromPrivateModuleInterface extends privateModule.publicInterfaceInPrivateModule {
    }
}

export interface publicInterface {

}

interface privateInterface {
}

interface privateInterfaceImplementingPublicInterface extends publicInterface {
}
interface privateInterfaceImplementingPrivateInterfaceInModule extends privateInterface {
}
export interface publicInterfaceImplementingPublicInterface extends publicInterface {
}
export interface publicInterfaceImplementingPrivateInterface extends privateInterface { // Should error
}

interface privateInterfaceImplementingFromPrivateModuleInterface extends privateModule.publicInterfaceInPrivateModule {
}
export interface publicInterfaceImplementingFromPrivateModuleInterface extends privateModule.publicInterfaceInPrivateModule { // Should error
}

//// [privacyInterfaceExtendsClauseDeclFile_GlobalFile.ts]
module publicModuleInGlobal {
    export interface publicInterfaceInPublicModule {
    }

    interface privateInterfaceInPublicModule {
    }

    interface privateInterfaceImplementingPublicInterfaceInModule extends publicInterfaceInPublicModule {
    }
    interface privateInterfaceImplementingPrivateInterfaceInModule extends privateInterfaceInPublicModule {
    }
    export interface publicInterfaceImplementingPublicInterfaceInModule extends publicInterfaceInPublicModule {
    }
    export interface publicInterfaceImplementingPrivateInterfaceInModule extends privateInterfaceInPublicModule { // Should error
    }
}
interface publicInterfaceInGlobal {
}
interface publicInterfaceImplementingPublicInterfaceInGlobal extends publicInterfaceInGlobal {
}


//// [privacyInterfaceExtendsClauseDeclFile_externalModule.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [privacyInterfaceExtendsClauseDeclFile_GlobalFile.js]


//// [privacyInterfaceExtendsClauseDeclFile_externalModule.d.ts]
export declare namespace publicModule {
    export interface publicInterfaceInPublicModule {
    }
    interface privateInterfaceInPublicModule {
    }
    export interface publicInterfaceImplementingPublicInterfaceInModule extends publicInterfaceInPublicModule {
    }
    export interface publicInterfaceImplementingPrivateInterfaceInModule extends privateInterfaceInPublicModule {
    }
    export interface publicInterfaceImplementingFromPrivateModuleInterface extends privateModule.publicInterfaceInPrivateModule {
    }
    export interface publicInterfaceImplementingPrivateAndPublicInterface extends privateInterfaceInPublicModule, publicInterfaceInPublicModule {
    }
    export {};
}
declare namespace privateModule {
    export interface publicInterfaceInPrivateModule {
    }
    interface privateInterfaceInPrivateModule {
    }
    export interface publicInterfaceImplementingPublicInterfaceInModule extends publicInterfaceInPrivateModule {
    }
    export interface publicInterfaceImplementingPrivateInterfaceInModule extends privateInterfaceInPrivateModule {
    }
    export interface publicInterfaceImplementingFromPrivateModuleInterface extends privateModule.publicInterfaceInPrivateModule {
    }
    export {};
}
export interface publicInterface {
}
interface privateInterface {
}
export interface publicInterfaceImplementingPublicInterface extends publicInterface {
}
export interface publicInterfaceImplementingPrivateInterface extends privateInterface {
}
export interface publicInterfaceImplementingFromPrivateModuleInterface extends privateModule.publicInterfaceInPrivateModule {
}
export {};
//// [privacyInterfaceExtendsClauseDeclFile_GlobalFile.d.ts]
declare namespace publicModuleInGlobal {
    export interface publicInterfaceInPublicModule {
    }
    interface privateInterfaceInPublicModule {
    }
    export interface publicInterfaceImplementingPublicInterfaceInModule extends publicInterfaceInPublicModule {
    }
    export interface publicInterfaceImplementingPrivateInterfaceInModule extends privateInterfaceInPublicModule {
    }
    export {};
}
interface publicInterfaceInGlobal {
}
interface publicInterfaceImplementingPublicInterfaceInGlobal extends publicInterfaceInGlobal {
}
