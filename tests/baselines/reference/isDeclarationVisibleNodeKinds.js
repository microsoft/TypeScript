//// [isDeclarationVisibleNodeKinds.ts]

// Function types
module schema {
    export function createValidator1(schema: any): <T>(data: T) => T {
        return undefined;
    }
}

// Constructor types
module schema {
    export function createValidator2(schema: any): new <T>(data: T) => T {
        return undefined;
    }
}

// union types
module schema {
     export function createValidator3(schema: any): number | { new <T>(data: T): T; }  {
        return undefined;
    }
}

// Array types
module schema {
     export function createValidator4(schema: any): { new <T>(data: T): T; }[] {
        return undefined;
    }
}


// TypeLiterals
module schema {
    export function createValidator5(schema: any): { new <T>(data: T): T } {
        return undefined;
    }
}

// Tuple types
module schema {
    export function createValidator6(schema: any): [ new <T>(data: T) => T, number] {
        return undefined;
    }
}

// Paren Types
module schema {
    export function createValidator7(schema: any): (new <T>(data: T)=>T )[] {
        return undefined;
    }
}

// Type reference
module schema {
    export function createValidator8(schema: any): Array<{ <T>(data: T) : T}> {
        return undefined;
    }
}


module schema {
    export class T {
        get createValidator9(): <T>(data: T) => T {
            return undefined;
        }
        
        set createValidator10(v: <T>(data: T) => T) {
        }
    }
}

//// [isDeclarationVisibleNodeKinds.js]
// Function types
var schema;
(function (_schema) {
    function createValidator1(schema) {
        return undefined;
    }
    _schema.createValidator1 = createValidator1;
})(schema || (schema = {}));
// Constructor types
var schema;
(function (_schema_1) {
    function createValidator2(schema) {
        return undefined;
    }
    _schema_1.createValidator2 = createValidator2;
})(schema || (schema = {}));
// union types
var schema;
(function (_schema_2) {
    function createValidator3(schema) {
        return undefined;
    }
    _schema_2.createValidator3 = createValidator3;
})(schema || (schema = {}));
// Array types
var schema;
(function (_schema_3) {
    function createValidator4(schema) {
        return undefined;
    }
    _schema_3.createValidator4 = createValidator4;
})(schema || (schema = {}));
// TypeLiterals
var schema;
(function (_schema_4) {
    function createValidator5(schema) {
        return undefined;
    }
    _schema_4.createValidator5 = createValidator5;
})(schema || (schema = {}));
// Tuple types
var schema;
(function (_schema_5) {
    function createValidator6(schema) {
        return undefined;
    }
    _schema_5.createValidator6 = createValidator6;
})(schema || (schema = {}));
// Paren Types
var schema;
(function (_schema_6) {
    function createValidator7(schema) {
        return undefined;
    }
    _schema_6.createValidator7 = createValidator7;
})(schema || (schema = {}));
// Type reference
var schema;
(function (_schema_7) {
    function createValidator8(schema) {
        return undefined;
    }
    _schema_7.createValidator8 = createValidator8;
})(schema || (schema = {}));
var schema;
(function (schema) {
    var T = (function () {
        function T() {
        }
        Object.defineProperty(T.prototype, "createValidator9", {
            get: function () {
                return undefined;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(T.prototype, "createValidator10", {
            set: function (v) {
            },
            enumerable: true,
            configurable: true
        });
        return T;
    })();
    schema.T = T;
})(schema || (schema = {}));


//// [isDeclarationVisibleNodeKinds.d.ts]
declare module schema {
    function createValidator1(schema: any): <T>(data: T) => T;
}
declare module schema {
    function createValidator2(schema: any): new <T>(data: T) => T;
}
declare module schema {
    function createValidator3(schema: any): number | {
        new <T>(data: T): T;
    };
}
declare module schema {
    function createValidator4(schema: any): {
        new <T>(data: T): T;
    }[];
}
declare module schema {
    function createValidator5(schema: any): {
        new <T>(data: T): T;
    };
}
declare module schema {
    function createValidator6(schema: any): [new <T>(data: T) => T, number];
}
declare module schema {
    function createValidator7(schema: any): (new <T>(data: T) => T)[];
}
declare module schema {
    function createValidator8(schema: any): Array<{
        <T>(data: T): T;
    }>;
}
declare module schema {
    class T {
        createValidator9: <T>(data: T) => T;
        createValidator10: <T>(data: T) => T;
    }
}
