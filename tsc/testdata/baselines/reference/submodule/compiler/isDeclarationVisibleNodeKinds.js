//// [tests/cases/compiler/isDeclarationVisibleNodeKinds.ts] ////

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
var schema;
(function (schema_1) {
    function createValidator1(schema) {
        return undefined;
    }
    schema_1.createValidator1 = createValidator1;
})(schema || (schema = {}));
(function (schema_1) {
    function createValidator2(schema) {
        return undefined;
    }
    schema_1.createValidator2 = createValidator2;
})(schema || (schema = {}));
(function (schema_1) {
    function createValidator3(schema) {
        return undefined;
    }
    schema_1.createValidator3 = createValidator3;
})(schema || (schema = {}));
(function (schema_1) {
    function createValidator4(schema) {
        return undefined;
    }
    schema_1.createValidator4 = createValidator4;
})(schema || (schema = {}));
(function (schema_1) {
    function createValidator5(schema) {
        return undefined;
    }
    schema_1.createValidator5 = createValidator5;
})(schema || (schema = {}));
(function (schema_1) {
    function createValidator6(schema) {
        return undefined;
    }
    schema_1.createValidator6 = createValidator6;
})(schema || (schema = {}));
(function (schema_1) {
    function createValidator7(schema) {
        return undefined;
    }
    schema_1.createValidator7 = createValidator7;
})(schema || (schema = {}));
(function (schema_1) {
    function createValidator8(schema) {
        return undefined;
    }
    schema_1.createValidator8 = createValidator8;
})(schema || (schema = {}));
(function (schema) {
    class T {
        get createValidator9() {
            return undefined;
        }
        set createValidator10(v) {
        }
    }
    schema.T = T;
})(schema || (schema = {}));
