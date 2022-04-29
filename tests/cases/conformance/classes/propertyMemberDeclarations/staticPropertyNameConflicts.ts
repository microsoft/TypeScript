// @target: es5
// name
class StaticName {
    static name: number; // error
    name: string; // ok
}

class StaticNameFn {
    static name() {} // error
    name() {} // ok
}

// length
class StaticLength {
    static length: number; // error
    length: string; // ok
}

class StaticLengthFn {
    static length() {} // error
    length() {} // ok
}

// prototype
class StaticPrototype {
    static prototype: number; // error
    prototype: string; // ok
}

class StaticPrototypeFn {
    static prototype() {} // error
    prototype() {} // ok
}

// caller
class StaticCaller {
    static caller: number; // error
    caller: string; // ok
}

class StaticCallerFn {
    static caller() {} // error
    caller() {} // ok
}

// arguments
class StaticArguments {
    static arguments: number; // error
    arguments: string; // ok
}

class StaticArgumentsFn {
    static arguments() {} // error
    arguments() {} // ok
}



// === Static properties on anonymous classes ===

// name
var StaticName_Anonymous = class {
    static name: number; // error
    name: string; // ok
}

var StaticNameFn_Anonymous = class {
    static name() {} // error
    name() {} // ok
}

// length
var StaticLength_Anonymous = class {
    static length: number; // error
    length: string; // ok
}

var StaticLengthFn_Anonymous = class {
    static length() {} // error
    length() {} // ok
}

// prototype
var StaticPrototype_Anonymous = class {
    static prototype: number; // error
    prototype: string; // ok
}

var StaticPrototypeFn_Anonymous = class {
    static prototype() {} // error
    prototype() {} // ok
}

// caller
var StaticCaller_Anonymous = class {
    static caller: number; // error
    caller: string; // ok
}

var StaticCallerFn_Anonymous = class {
    static caller() {} // error
    caller() {} // ok
}

// arguments
var StaticArguments_Anonymous = class {
    static arguments: number; // error
    arguments: string; // ok
}

var StaticArgumentsFn_Anonymous = class {
    static arguments() {} // error
    arguments() {} // ok
}


// === Static properties on default exported classes ===

// name
module TestOnDefaultExportedClass_1 {
    class StaticName {
        static name: number; // error
        name: string; // ok
    }
}

module TestOnDefaultExportedClass_2 {
    class StaticNameFn {
        static name() {} // error
        name() {} // ok
    }
}

// length
module TestOnDefaultExportedClass_3 {
    export default class StaticLength {
        static length: number; // error
        length: string; // ok
    }
}

module TestOnDefaultExportedClass_4 {
    export default class StaticLengthFn {
        static length() {} // error
        length() {} // ok
    }
}

// prototype
module TestOnDefaultExportedClass_5 {    
    export default class StaticPrototype {
        static prototype: number; // error
        prototype: string; // ok
    }
}

module TestOnDefaultExportedClass_6 {
    export default class StaticPrototypeFn {
        static prototype() {} // error
        prototype() {} // ok
    }
}

// caller
module TestOnDefaultExportedClass_7 {
    export default class StaticCaller {
        static caller: number; // error
        caller: string; // ok
    }
}

module TestOnDefaultExportedClass_8 {
    export default class StaticCallerFn {
        static caller() {} // error
        caller() {} // ok
    }
}

// arguments
module TestOnDefaultExportedClass_9 {
    export default class StaticArguments {
        static arguments: number; // error
        arguments: string; // ok
    }
}

module TestOnDefaultExportedClass_10 {
    export default class StaticArgumentsFn {
        static arguments() {} // error
        arguments() {} // ok
    }
}