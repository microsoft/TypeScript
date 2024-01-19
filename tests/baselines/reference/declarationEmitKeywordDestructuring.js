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

function f1({ enum: _enum, ...rest }: P) {
    return rest;
}

function f2({ function: _function, ...rest }: P) {
    return rest;
}

function f3({ abstract: _abstract, ...rest }: P) {
    return rest;
}

function f4({ async: _async, ...rest }: P) {
    return rest;
}

function f5({ await: _await, ...rest }: P) {
    return rest;
}


//// [declarationEmitKeywordDestructuring.js]
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
function f1(_a) {
    var _enum = _a.enum, rest = __rest(_a, ["enum"]);
    return rest;
}
function f2(_a) {
    var _function = _a.function, rest = __rest(_a, ["function"]);
    return rest;
}
function f3(_a) {
    var _abstract = _a.abstract, rest = __rest(_a, ["abstract"]);
    return rest;
}
function f4(_a) {
    var _async = _a.async, rest = __rest(_a, ["async"]);
    return rest;
}
function f5(_a) {
    var _await = _a.await, rest = __rest(_a, ["await"]);
    return rest;
}


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
declare function f3({ abstract: _abstract, ...rest }: P): {
    enum: boolean;
    function: boolean;
    async: boolean;
    await: boolean;
    one: boolean;
};
declare function f4({ async: _async, ...rest }: P): {
    enum: boolean;
    function: boolean;
    abstract: boolean;
    await: boolean;
    one: boolean;
};
declare function f5({ await: _await, ...rest }: P): {
    enum: boolean;
    function: boolean;
    abstract: boolean;
    async: boolean;
    one: boolean;
};
