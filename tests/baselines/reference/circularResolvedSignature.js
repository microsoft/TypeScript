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
        foo: (arg) => setState(arg),
        bar: (arg) => setState(arg),
    }));
}


//// [circularResolvedSignature.js]
"use strict";
exports.__esModule = true;
exports.Component = void 0;
function Component() {
    var _a = useState(function () { return ({
        value: "string",
        foo: function (arg) { return setState(arg); },
        bar: function (arg) { return setState(arg); }
    }); }), state = _a[0], setState = _a[1];
}
exports.Component = Component;
