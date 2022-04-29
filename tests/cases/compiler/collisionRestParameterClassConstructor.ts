// Constructors
class c1 {
    constructor(_i: number, ...restParameters) { //_i is error
        var _i = 10; // no error
    }
}
class c1NoError {
    constructor(_i: number) { // no error
        var _i = 10; // no error
    }
}

class c2 {
    constructor(...restParameters) {
        var _i = 10; // no error
    }
}
class c2NoError {
    constructor() {
        var _i = 10; // no error
    }
}

class c3 {
    constructor(public _i: number, ...restParameters) { //_i is error
        var _i = 10; // no error
    }
}
class c3NoError {
    constructor(public _i: number) { // no error
        var _i = 10; // no error
    }
}

declare class c4 {
    constructor(_i: number, ...restParameters); // No error - no code gen
}
declare class c4NoError {
    constructor(_i: number);  // no error
}

class c5 {
    constructor(_i: number, ...rest); // no codegen no error
    constructor(_i: string, ...rest); // no codegen no error
    constructor(_i: any, ...rest) { // error
        var _i: any; // no error
    }
}

class c5NoError {
    constructor(_i: number); // no error
    constructor(_i: string); // no error
    constructor(_i: any) { // no error
        var _i: any; // no error
    }
}

declare class c6 {
    constructor(_i: number, ...rest); // no codegen no error
    constructor(_i: string, ...rest); // no codegen no error
}

declare class c6NoError {
    constructor(_i: number); // no error
    constructor(_i: string); // no error
}