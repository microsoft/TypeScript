//// [circularResolvedSignature.ts]
declare function useState<S>(initialState: (() => S)): [S, (s: S) => void];

type Data = Readonly<{
    value: number;
    foo: (arg: any) => void;
    bar: (arg: any) => void;
}>;

export function Component() {
    const [state, setState] = useState<Data>(() => ({
        value: "string", // this should be a number
        foo: (arg) => setState((prev) => ({ ...prev, arg })),
        bar: (arg) => setState((prev) => ({ ...prev, arg })),
    }));
}


//// [circularResolvedSignature.js]
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.Component = void 0;
function Component() {
    var _a = useState(function () { return ({
        value: "string",
        foo: function (arg) { return setState(function (prev) { return (__assign(__assign({}, prev), { arg: arg })); }); },
        bar: function (arg) { return setState(function (prev) { return (__assign(__assign({}, prev), { arg: arg })); }); }
    }); }), state = _a[0], setState = _a[1];
}
exports.Component = Component;
