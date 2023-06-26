//// [tests/cases/compiler/mappedTypeGenericIndexedAccess.ts] ////

//// [mappedTypeGenericIndexedAccess.ts]
// Repro from #49242

type Types = {
    first: { a1: true };
    second: { a2: true };
    third: { a3: true };
}

class Test {
    entries: { [T in keyof Types]?: Types[T][] };

    constructor() {
        this.entries = {};
    }

    addEntry<T extends keyof Types>(name: T, entry: Types[T]) {
        if (!this.entries[name]) {
            this.entries[name] = [];
        }
        this.entries[name]?.push(entry);
    }
}

// Repro from #49338

type TypesMap = {
    [0]: { foo: 'bar'; };
    [1]: { a: 'b'; };
};

type P<T extends keyof TypesMap> = { t: T; } & TypesMap[T];

type TypeHandlers = {
    [T in keyof TypesMap]?: (p: P<T>) => void;
};

const typeHandlers: TypeHandlers = {
    [0]: (p) => console.log(p.foo),
    [1]: (p) => console.log(p.a),
};

const onSomeEvent = <T extends keyof TypesMap>(p: P<T>) =>
    typeHandlers[p.t]?.(p);


//// [mappedTypeGenericIndexedAccess.js]
"use strict";
// Repro from #49242
var _a;
var Test = /** @class */ (function () {
    function Test() {
        this.entries = {};
    }
    Test.prototype.addEntry = function (name, entry) {
        var _a;
        if (!this.entries[name]) {
            this.entries[name] = [];
        }
        (_a = this.entries[name]) === null || _a === void 0 ? void 0 : _a.push(entry);
    };
    return Test;
}());
var typeHandlers = (_a = {},
    _a[0] = function (p) { return console.log(p.foo); },
    _a[1] = function (p) { return console.log(p.a); },
    _a);
var onSomeEvent = function (p) { var _a; return (_a = typeHandlers[p.t]) === null || _a === void 0 ? void 0 : _a.call(typeHandlers, p); };


//// [mappedTypeGenericIndexedAccess.d.ts]
type Types = {
    first: {
        a1: true;
    };
    second: {
        a2: true;
    };
    third: {
        a3: true;
    };
};
declare class Test {
    entries: {
        [T in keyof Types]?: Types[T][];
    };
    constructor();
    addEntry<T extends keyof Types>(name: T, entry: Types[T]): void;
}
type TypesMap = {
    [0]: {
        foo: 'bar';
    };
    [1]: {
        a: 'b';
    };
};
type P<T extends keyof TypesMap> = {
    t: T;
} & TypesMap[T];
type TypeHandlers = {
    [T in keyof TypesMap]?: (p: P<T>) => void;
};
declare const typeHandlers: TypeHandlers;
declare const onSomeEvent: <T extends keyof TypesMap>(p: P<T>) => void | undefined;
