// @module: commonjs
// @declaration: true

// @Filename:privacyVarDeclFile_externalModule.ts
class privateClass {
}

export class publicClass {
}

export interface publicInterfaceWithPrivatePropertyTypes {
    myProperty: privateClass;  // Error
}

export interface publicInterfaceWithPublicPropertyTypes {
    myProperty: publicClass;
}

interface privateInterfaceWithPrivatePropertyTypes {
    myProperty: privateClass;
}

interface privateInterfaceWithPublicPropertyTypes {
    myProperty: publicClass;
}

export class publicClassWithWithPrivatePropertyTypes {
    static myPublicStaticProperty: privateClass; // Error
    private static myPrivateStaticProperty: privateClass;
    myPublicProperty: privateClass; // Error
    private myPrivateProperty: privateClass;
}

export class publicClassWithWithPublicPropertyTypes {
    static myPublicStaticProperty: publicClass;
    private static myPrivateStaticProperty: publicClass;
    myPublicProperty: publicClass;
    private myPrivateProperty: publicClass;
}

class privateClassWithWithPrivatePropertyTypes {
    static myPublicStaticProperty: privateClass;
    private static myPrivateStaticProperty: privateClass;
    myPublicProperty: privateClass;
    private myPrivateProperty: privateClass;
}

class privateClassWithWithPublicPropertyTypes {
    static myPublicStaticProperty: publicClass;
    private static myPrivateStaticProperty: publicClass;
    myPublicProperty: publicClass;
    private myPrivateProperty: publicClass;
}

export var publicVarWithPrivatePropertyTypes: privateClass; // Error
export var publicVarWithPublicPropertyTypes: publicClass;
var privateVarWithPrivatePropertyTypes: privateClass;
var privateVarWithPublicPropertyTypes: publicClass;

export declare var publicAmbientVarWithPrivatePropertyTypes: privateClass; // Error
export declare var publicAmbientVarWithPublicPropertyTypes: publicClass;
declare var privateAmbientVarWithPrivatePropertyTypes: privateClass;
declare var privateAmbientVarWithPublicPropertyTypes: publicClass;

export interface publicInterfaceWithPrivateModulePropertyTypes {
    myProperty: privateModule.publicClass; // Error
}
export class publicClassWithPrivateModulePropertyTypes {
    static myPublicStaticProperty: privateModule.publicClass; // Error
    myPublicProperty: privateModule.publicClass; // Error
}
export var publicVarWithPrivateModulePropertyTypes: privateModule.publicClass; // Error
export declare var publicAmbientVarWithPrivateModulePropertyTypes: privateModule.publicClass; // Error

interface privateInterfaceWithPrivateModulePropertyTypes {
    myProperty: privateModule.publicClass;
}
class privateClassWithPrivateModulePropertyTypes {
    static myPublicStaticProperty: privateModule.publicClass;
    myPublicProperty: privateModule.publicClass;
}
var privateVarWithPrivateModulePropertyTypes: privateModule.publicClass;
declare var privateAmbientVarWithPrivateModulePropertyTypes: privateModule.publicClass;

export module publicModule {
    class privateClass {
    }

    export class publicClass {
    }

    export interface publicInterfaceWithPrivatePropertyTypes {
        myProperty: privateClass;  // Error
    }

    export interface publicInterfaceWithPublicPropertyTypes {
        myProperty: publicClass;
    }

    interface privateInterfaceWithPrivatePropertyTypes {
        myProperty: privateClass;
    }

    interface privateInterfaceWithPublicPropertyTypes {
        myProperty: publicClass;
    }

    export class publicClassWithWithPrivatePropertyTypes {
        static myPublicStaticProperty: privateClass; // Error
        private static myPrivateStaticProperty: privateClass;
        myPublicProperty: privateClass; // Error
        private myPrivateProperty: privateClass;
    }

    export class publicClassWithWithPublicPropertyTypes {
        static myPublicStaticProperty: publicClass;
        private static myPrivateStaticProperty: publicClass;
        myPublicProperty: publicClass;
        private myPrivateProperty: publicClass;
    }

    class privateClassWithWithPrivatePropertyTypes {
        static myPublicStaticProperty: privateClass;
        private static myPrivateStaticProperty: privateClass;
        myPublicProperty: privateClass;
        private myPrivateProperty: privateClass;
    }

    class privateClassWithWithPublicPropertyTypes {
        static myPublicStaticProperty: publicClass;
        private static myPrivateStaticProperty: publicClass;
        myPublicProperty: publicClass;
        private myPrivateProperty: publicClass;
    }

    export var publicVarWithPrivatePropertyTypes: privateClass; // Error
    export var publicVarWithPublicPropertyTypes: publicClass;
    var privateVarWithPrivatePropertyTypes: privateClass;
    var privateVarWithPublicPropertyTypes: publicClass;

    export declare var publicAmbientVarWithPrivatePropertyTypes: privateClass; // Error
    export declare var publicAmbientVarWithPublicPropertyTypes: publicClass;
    declare var privateAmbientVarWithPrivatePropertyTypes: privateClass;
    declare var privateAmbientVarWithPublicPropertyTypes: publicClass;

    export interface publicInterfaceWithPrivateModulePropertyTypes {
        myProperty: privateModule.publicClass; // Error
    }
    export class publicClassWithPrivateModulePropertyTypes {
        static myPublicStaticProperty: privateModule.publicClass; // Error
        myPublicProperty: privateModule.publicClass; // Error
    }
    export var publicVarWithPrivateModulePropertyTypes: privateModule.publicClass; // Error
    export declare var publicAmbientVarWithPrivateModulePropertyTypes: privateModule.publicClass; // Error

    interface privateInterfaceWithPrivateModulePropertyTypes {
        myProperty: privateModule.publicClass;
    }
    class privateClassWithPrivateModulePropertyTypes {
        static myPublicStaticProperty: privateModule.publicClass;
        myPublicProperty: privateModule.publicClass;
    }
    var privateVarWithPrivateModulePropertyTypes: privateModule.publicClass;
    declare var privateAmbientVarWithPrivateModulePropertyTypes: privateModule.publicClass;
}

module privateModule {
    class privateClass {
    }

    export class publicClass {
    }

    export interface publicInterfaceWithPrivatePropertyTypes {
        myProperty: privateClass;  
    }

    export interface publicInterfaceWithPublicPropertyTypes {
        myProperty: publicClass;
    }

    interface privateInterfaceWithPrivatePropertyTypes {
        myProperty: privateClass;
    }

    interface privateInterfaceWithPublicPropertyTypes {
        myProperty: publicClass;
    }

    export class publicClassWithWithPrivatePropertyTypes {
        static myPublicStaticProperty: privateClass; 
        private static myPrivateStaticProperty: privateClass;
        myPublicProperty: privateClass; 
        private myPrivateProperty: privateClass;
    }

    export class publicClassWithWithPublicPropertyTypes {
        static myPublicStaticProperty: publicClass;
        private static myPrivateStaticProperty: publicClass;
        myPublicProperty: publicClass;
        private myPrivateProperty: publicClass;
    }

    class privateClassWithWithPrivatePropertyTypes {
        static myPublicStaticProperty: privateClass;
        private static myPrivateStaticProperty: privateClass;
        myPublicProperty: privateClass;
        private myPrivateProperty: privateClass;
    }

    class privateClassWithWithPublicPropertyTypes {
        static myPublicStaticProperty: publicClass;
        private static myPrivateStaticProperty: publicClass;
        myPublicProperty: publicClass;
        private myPrivateProperty: publicClass;
    }

    export var publicVarWithPrivatePropertyTypes: privateClass; 
    export var publicVarWithPublicPropertyTypes: publicClass;
    var privateVarWithPrivatePropertyTypes: privateClass;
    var privateVarWithPublicPropertyTypes: publicClass;

    export declare var publicAmbientVarWithPrivatePropertyTypes: privateClass; 
    export declare var publicAmbientVarWithPublicPropertyTypes: publicClass;
    declare var privateAmbientVarWithPrivatePropertyTypes: privateClass;
    declare var privateAmbientVarWithPublicPropertyTypes: publicClass;

    export interface publicInterfaceWithPrivateModulePropertyTypes {
        myProperty: privateModule.publicClass; 
    }
    export class publicClassWithPrivateModulePropertyTypes {
        static myPublicStaticProperty: privateModule.publicClass; 
        myPublicProperty: privateModule.publicClass; 
    }
    export var publicVarWithPrivateModulePropertyTypes: privateModule.publicClass; 
    export declare var publicAmbientVarWithPrivateModulePropertyTypes: privateModule.publicClass;

    interface privateInterfaceWithPrivateModulePropertyTypes {
        myProperty: privateModule.publicClass;
    }
    class privateClassWithPrivateModulePropertyTypes {
        static myPublicStaticProperty: privateModule.publicClass;
        myPublicProperty: privateModule.publicClass;
    }
    var privateVarWithPrivateModulePropertyTypes: privateModule.publicClass;
    declare var privateAmbientVarWithPrivateModulePropertyTypes: privateModule.publicClass;
}

// @Filename: privacyVarDeclFile_GlobalFile.ts
class publicClassInGlobal {
}
interface publicInterfaceWithPublicPropertyTypesInGlobal {
    myProperty: publicClassInGlobal;
}
class publicClassWithWithPublicPropertyTypesInGlobal {
    static myPublicStaticProperty: publicClassInGlobal;
    private static myPrivateStaticProperty: publicClassInGlobal;
    myPublicProperty: publicClassInGlobal;
    private myPrivateProperty: publicClassInGlobal;
}
var publicVarWithPublicPropertyTypesInGlobal: publicClassInGlobal;
declare var publicAmbientVarWithPublicPropertyTypesInGlobal: publicClassInGlobal;

module publicModuleInGlobal {
    class privateClass {
    }

    export class publicClass {
    }

    module privateModule {
        class privateClass {
        }

        export class publicClass {
        }

        export interface publicInterfaceWithPrivatePropertyTypes {
            myProperty: privateClass;
        }

        export interface publicInterfaceWithPublicPropertyTypes {
            myProperty: publicClass;
        }

        interface privateInterfaceWithPrivatePropertyTypes {
            myProperty: privateClass;
        }

        interface privateInterfaceWithPublicPropertyTypes {
            myProperty: publicClass;
        }

        export class publicClassWithWithPrivatePropertyTypes {
            static myPublicStaticProperty: privateClass;
            private static myPrivateStaticProperty: privateClass;
            myPublicProperty: privateClass;
            private myPrivateProperty: privateClass;
        }

        export class publicClassWithWithPublicPropertyTypes {
            static myPublicStaticProperty: publicClass;
            private static myPrivateStaticProperty: publicClass;
            myPublicProperty: publicClass;
            private myPrivateProperty: publicClass;
        }

        class privateClassWithWithPrivatePropertyTypes {
            static myPublicStaticProperty: privateClass;
            private static myPrivateStaticProperty: privateClass;
            myPublicProperty: privateClass;
            private myPrivateProperty: privateClass;
        }

        class privateClassWithWithPublicPropertyTypes {
            static myPublicStaticProperty: publicClass;
            private static myPrivateStaticProperty: publicClass;
            myPublicProperty: publicClass;
            private myPrivateProperty: publicClass;
        }

        export var publicVarWithPrivatePropertyTypes: privateClass;
        export var publicVarWithPublicPropertyTypes: publicClass;
        var privateVarWithPrivatePropertyTypes: privateClass;
        var privateVarWithPublicPropertyTypes: publicClass;

        export declare var publicAmbientVarWithPrivatePropertyTypes: privateClass;
        export declare var publicAmbientVarWithPublicPropertyTypes: publicClass;
        declare var privateAmbientVarWithPrivatePropertyTypes: privateClass;
        declare var privateAmbientVarWithPublicPropertyTypes: publicClass;

        export interface publicInterfaceWithPrivateModulePropertyTypes {
            myProperty: privateModule.publicClass;
        }
        export class publicClassWithPrivateModulePropertyTypes {
            static myPublicStaticProperty: privateModule.publicClass;
            myPublicProperty: privateModule.publicClass;
        }
        export var publicVarWithPrivateModulePropertyTypes: privateModule.publicClass;
        export declare var publicAmbientVarWithPrivateModulePropertyTypes: privateModule.publicClass;

        interface privateInterfaceWithPrivateModulePropertyTypes {
            myProperty: privateModule.publicClass;
        }
        class privateClassWithPrivateModulePropertyTypes {
            static myPublicStaticProperty: privateModule.publicClass;
            myPublicProperty: privateModule.publicClass;
        }
        var privateVarWithPrivateModulePropertyTypes: privateModule.publicClass;
        declare var privateAmbientVarWithPrivateModulePropertyTypes: privateModule.publicClass;
    }

    export interface publicInterfaceWithPrivatePropertyTypes {
        myProperty: privateClass;  // Error
    }

    export interface publicInterfaceWithPublicPropertyTypes {
        myProperty: publicClass;
    }

    interface privateInterfaceWithPrivatePropertyTypes {
        myProperty: privateClass;
    }

    interface privateInterfaceWithPublicPropertyTypes {
        myProperty: publicClass;
    }

    export class publicClassWithWithPrivatePropertyTypes {
        static myPublicStaticProperty: privateClass; // Error
        private static myPrivateStaticProperty: privateClass;
        myPublicProperty: privateClass; // Error
        private myPrivateProperty: privateClass;
    }

    export class publicClassWithWithPublicPropertyTypes {
        static myPublicStaticProperty: publicClass;
        private static myPrivateStaticProperty: publicClass;
        myPublicProperty: publicClass;
        private myPrivateProperty: publicClass;
    }

    class privateClassWithWithPrivatePropertyTypes {
        static myPublicStaticProperty: privateClass;
        private static myPrivateStaticProperty: privateClass;
        myPublicProperty: privateClass;
        private myPrivateProperty: privateClass;
    }

    class privateClassWithWithPublicPropertyTypes {
        static myPublicStaticProperty: publicClass;
        private static myPrivateStaticProperty: publicClass;
        myPublicProperty: publicClass;
        private myPrivateProperty: publicClass;
    }

    export var publicVarWithPrivatePropertyTypes: privateClass; // Error
    export var publicVarWithPublicPropertyTypes: publicClass;
    var privateVarWithPrivatePropertyTypes: privateClass;
    var privateVarWithPublicPropertyTypes: publicClass;

    export declare var publicAmbientVarWithPrivatePropertyTypes: privateClass; // Error
    export declare var publicAmbientVarWithPublicPropertyTypes: publicClass;
    declare var privateAmbientVarWithPrivatePropertyTypes: privateClass;
    declare var privateAmbientVarWithPublicPropertyTypes: publicClass;

    export interface publicInterfaceWithPrivateModulePropertyTypes {
        myProperty: privateModule.publicClass; // Error
    }
    export class publicClassWithPrivateModulePropertyTypes {
        static myPublicStaticProperty: privateModule.publicClass; // Error
        myPublicProperty: privateModule.publicClass; // Error
    }
    export var publicVarWithPrivateModulePropertyTypes: privateModule.publicClass; // Error
    export declare var publicAmbientVarWithPrivateModulePropertyTypes: privateModule.publicClass; // Error

    interface privateInterfaceWithPrivateModulePropertyTypes {
        myProperty: privateModule.publicClass;
    }
    class privateClassWithPrivateModulePropertyTypes {
        static myPublicStaticProperty: privateModule.publicClass;
        myPublicProperty: privateModule.publicClass;
    }
    var privateVarWithPrivateModulePropertyTypes: privateModule.publicClass;
    declare var privateAmbientVarWithPrivateModulePropertyTypes: privateModule.publicClass;
}