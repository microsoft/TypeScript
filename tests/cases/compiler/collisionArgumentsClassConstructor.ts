// Constructors
class c1 {
    constructor(i: number, ...arguments) { // error
        var arguments: any[]; // no error
    }
}
class c12 {
    constructor(arguments: number, ...rest) { // error
        var arguments = 10; // no error
    }
}
class c1NoError {
    constructor(arguments: number) { // no error
        var arguments = 10; // no error
    }
}

class c2 {
    constructor(...restParameters) {
        var arguments = 10; // no error
    }
}
class c2NoError {
    constructor() {
        var arguments = 10; // no error
    }
}

class c3 {
    constructor(public arguments: number, ...restParameters) { //arguments is error
        var arguments = 10; // no error
    }
}
class c3NoError {
    constructor(public arguments: number) { // no error
        var arguments = 10; // no error
    }
}

declare class c4 {
    constructor(i: number, ...arguments); // No error - no code gen
}
declare class c42 {
    constructor(arguments: number, ...rest); // No error - no code gen
}
declare class c4NoError {
    constructor(arguments: number);  // no error
}

class c5 {
    constructor(i: number, ...arguments); // no codegen no error
    constructor(i: string, ...arguments); // no codegen no error
    constructor(i: any, ...arguments) { // error
        var arguments: any[]; // no error
    }
}

class c52 {
    constructor(arguments: number, ...rest); // no codegen no error
    constructor(arguments: string, ...rest); // no codegen no error
    constructor(arguments: any, ...rest) { // error
        var arguments: any; // no error
    }
}

class c5NoError {
    constructor(arguments: number); // no error
    constructor(arguments: string); // no error
    constructor(arguments: any) { // no error
        var arguments: any; // no error
    }
}

declare class c6 {
    constructor(i: number, ...arguments); // no codegen no error
    constructor(i: string, ...arguments); // no codegen no error
}
declare class c62 {
    constructor(arguments: number, ...rest); // no codegen no error
    constructor(arguments: string, ...rest); // no codegen no error
}

declare class c6NoError {
    constructor(arguments: number); // no error
    constructor(arguments: string); // no error
}