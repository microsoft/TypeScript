// @target: es5   

// static name
class StaticName {
    static name: number; // error
    name: string; // ok
}

class StaticNameFn {
    static name() {} // error
    name() {} // ok
}


class StaticLength {
    static length: number; // error
    length: string; // ok
}

class StaticLengthFn {
    static length() {} // error
    length() {} // ok
}


class StaticPrototype {
    static prototype: number; // error
    prototype: string; // ok
}

class StaticPrototypeFn {
    static prototype() {} // error
    prototype() {} // ok
}


class StaticCaller {
    static caller: number; // error
    caller: string; // ok
}

class StaticCallerFn {
    static caller() {} // error
    caller() {} // ok
}


class StaticArguments {
    static arguments: number; // error
    arguments: string; // ok
}

class StaticArgumentsFn {
    static arguments() {} // error
    arguments() {} // ok
}
