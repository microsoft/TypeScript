//// [tests/cases/compiler/objectBindingPatternContextuallyTypesArgument.ts] ////

//// [objectBindingPatternContextuallyTypesArgument.ts]
declare function id<T>(x: T): T;
const { f = (x: string) => x.length } = id({ f: x => x.charAt });


//// [objectBindingPatternContextuallyTypesArgument.js]
const { f = (x) => x.length } = id({ f: x => x.charAt });
