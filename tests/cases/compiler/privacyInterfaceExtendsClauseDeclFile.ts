// @module: commonjs
// @declaration: true

// @Filename: privacyInterfaceExtendsClauseDeclFile_externalModule.ts
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

// @Filename: privacyInterfaceExtendsClauseDeclFile_GlobalFile.ts
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
