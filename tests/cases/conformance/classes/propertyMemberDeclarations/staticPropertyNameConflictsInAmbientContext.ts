
//@Filename: decl.d.ts
// name
declare class StaticName {
    static name: number; // ok
    name: string; // ok
}

declare class StaticNameFn {
    static name(): string; // ok
    name(): string; // ok
}

// length
declare class StaticLength {
    static length: number; // ok
    length: string; // ok
}

declare class StaticLengthFn {
    static length(): number; // ok
    length(): number; // ok
}

// prototype
declare class StaticPrototype {
    static prototype: number; // ok
    prototype: string; // ok
}

declare class StaticPrototypeFn {
    static prototype: any; // ok
    prototype(): any; // ok
}

// caller
declare class StaticCaller {
    static caller: number; // ok
    caller: string; // ok
}

declare class StaticCallerFn {
    static caller(): any; // ok
    caller(): any; // ok
}

// arguments
declare class StaticArguments {
    static arguments: number; // ok
    arguments: string; // ok
}

declare class StaticArgumentsFn {
    static arguments(): any; // ok
    arguments(): any; // ok
}
