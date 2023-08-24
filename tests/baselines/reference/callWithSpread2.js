//// [tests/cases/conformance/expressions/functionCalls/callWithSpread2.ts] ////

//// [callWithSpread2.ts]
declare function all(a?: number, b?: number): void;
declare function weird(a?: number | string, b?: number | string): void;
declare function prefix(s: string, a?: number, b?: number): void;
declare function rest(s: string, a?: number, b?: number,  ...rest: number[]): void;
declare function normal(s: string): void;
declare function thunk(): string;
declare function prefix2(s: string, n: number, a?: number, b?: number): void;

declare var ns: number[];
declare var mixed: (number | string)[];
declare var tuple: [number, string];

// good
all(...ns)
weird(...ns)
weird(...mixed)
weird(...tuple)
prefix("a", ...ns)
rest("d", ...ns)


// extra arguments
normal("g", ...ns)
thunk(...ns)

// bad
all(...mixed)
all(...tuple)
prefix("b", ...mixed)
prefix("c", ...tuple)
rest("e", ...mixed)
rest("f", ...tuple)
prefix(...ns) // required parameters are required
prefix(...mixed)
prefix(...tuple)
prefix2("g", ...ns);


//// [callWithSpread2.js]
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
// good
all.apply(void 0, ns);
weird.apply(void 0, ns);
weird.apply(void 0, mixed);
weird.apply(void 0, tuple);
prefix.apply(void 0, __spreadArray(["a"], ns, false));
rest.apply(void 0, __spreadArray(["d"], ns, false));
// extra arguments
normal.apply(void 0, __spreadArray(["g"], ns, false));
thunk.apply(void 0, ns);
// bad
all.apply(void 0, mixed);
all.apply(void 0, tuple);
prefix.apply(void 0, __spreadArray(["b"], mixed, false));
prefix.apply(void 0, __spreadArray(["c"], tuple, false));
rest.apply(void 0, __spreadArray(["e"], mixed, false));
rest.apply(void 0, __spreadArray(["f"], tuple, false));
prefix.apply(void 0, ns); // required parameters are required
prefix.apply(void 0, mixed);
prefix.apply(void 0, tuple);
prefix2.apply(void 0, __spreadArray(["g"], ns, false));
