// @module: commonjs
// @declaration: true

// @Filename: privacyClassExtendsClauseDeclFile_externalModule.ts
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

// @Filename: privacyClassExtendsClauseDeclFile_GlobalFile.ts
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
