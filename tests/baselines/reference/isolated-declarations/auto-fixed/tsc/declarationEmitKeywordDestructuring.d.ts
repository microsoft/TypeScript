//// [tests/cases/compiler/declarationEmitKeywordDestructuring.ts] ////

//// [declarationEmitKeywordDestructuring.ts]
type P = {
    enum: boolean;
    function: boolean;
    abstract: boolean;
    async: boolean;
    await: boolean;
    one: boolean;
};

function f1({ enum: _enum, ...rest }: P): {
    function: boolean;
    abstract: boolean;
    async: boolean;
    await: boolean;
    one: boolean;
} {
    return rest;
}

function f2({ function: _function, ...rest }: P): {
    enum: boolean;
    abstract: boolean;
    async: boolean;
    await: boolean;
    one: boolean;
} {
    return rest;
}

function f3({ abstract: _abstract, ...rest }: P): {
    enum: boolean;
    function: boolean;
    async: boolean;
    await: boolean;
    one: boolean;
} {
    return rest;
}

function f4({ async: _async, ...rest }: P): {
    enum: boolean;
    function: boolean;
    abstract: boolean;
    await: boolean;
    one: boolean;
} {
    return rest;
}

function f5({ await: _await, ...rest }: P): {
    enum: boolean;
    function: boolean;
    abstract: boolean;
    async: boolean;
    one: boolean;
} {
    return rest;
}


/// [Declarations] ////



//// [declarationEmitKeywordDestructuring.d.ts]
type P = {
    enum: boolean;
    function: boolean;
    abstract: boolean;
    async: boolean;
    await: boolean;
    one: boolean;
};
declare function f1({ enum: _enum, ...rest }: P): {
    function: boolean;
    abstract: boolean;
    async: boolean;
    await: boolean;
    one: boolean;
};
declare function f2({ function: _function, ...rest }: P): {
    enum: boolean;
    abstract: boolean;
    async: boolean;
    await: boolean;
    one: boolean;
};
declare function f3({ abstract, ...rest }: P): {
    enum: boolean;
    function: boolean;
    async: boolean;
    await: boolean;
    one: boolean;
};
declare function f4({ async, ...rest }: P): {
    enum: boolean;
    function: boolean;
    abstract: boolean;
    await: boolean;
    one: boolean;
};
declare function f5({ await, ...rest }: P): {
    enum: boolean;
    function: boolean;
    abstract: boolean;
    async: boolean;
    one: boolean;
};
//# sourceMappingURL=declarationEmitKeywordDestructuring.d.ts.map