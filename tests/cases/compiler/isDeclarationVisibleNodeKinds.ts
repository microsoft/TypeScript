// @declaration: true
// @target: es5

// Function types
namespace schema {
    export function createValidator1(schema: any): <T>(data: T) => T {
        return undefined;
    }
}

// Constructor types
namespace schema {
    export function createValidator2(schema: any): new <T>(data: T) => T {
        return undefined;
    }
}

// union types
namespace schema {
     export function createValidator3(schema: any): number | { new <T>(data: T): T; }  {
        return undefined;
    }
}

// Array types
namespace schema {
     export function createValidator4(schema: any): { new <T>(data: T): T; }[] {
        return undefined;
    }
}


// TypeLiterals
namespace schema {
    export function createValidator5(schema: any): { new <T>(data: T): T } {
        return undefined;
    }
}

// Tuple types
namespace schema {
    export function createValidator6(schema: any): [ new <T>(data: T) => T, number] {
        return undefined;
    }
}

// Paren Types
namespace schema {
    export function createValidator7(schema: any): (new <T>(data: T)=>T )[] {
        return undefined;
    }
}

// Type reference
namespace schema {
    export function createValidator8(schema: any): Array<{ <T>(data: T) : T}> {
        return undefined;
    }
}


namespace schema {
    export class T {
        get createValidator9(): <T>(data: T) => T {
            return undefined;
        }
        
        set createValidator10(v: <T>(data: T) => T) {
        }
    }
}