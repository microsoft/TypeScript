//// [tests/cases/compiler/objectBindingPatternContextuallyTypesArgument.ts] ////

//// [objectBindingPatternContextuallyTypesArgument.ts]
declare function id<T>(x: T): T;
const { f = (x: string) => x.length } = id({ f: x => x.charAt });


//// [objectBindingPatternContextuallyTypesArgument.js]
var _a = id({ f: function (x) { return x.charAt; } }).f, f = _a === void 0 ? function (x) { return x.length; } : _a;
