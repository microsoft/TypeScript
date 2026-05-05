//// [tests/cases/compiler/isolatedDeclarationsArrowFunctionDefaultParameter.ts] ////

//// [isolatedDeclarationsArrowFunctionDefaultParameter.ts]
export const foo = (one: string = "DEFAULT", two: string): string => {
    return one + " " + two;
};

export const bar = (one: string | undefined = "DEFAULT", two: string): string => {
    return one + " " + two;
};

// Arrow function where the default parameter is the last one (should be optional)
export const baz = (one: string, two: string | undefined = "DEFAULT"): string => {
    return one + " " + two;
};

// Arrow function where all parameters have defaults
export const qux = (one: string = "DEFAULT", two: string = "DEFAULT"): string => {
    return one + " " + two;
};


//// [isolatedDeclarationsArrowFunctionDefaultParameter.js]
export const foo = (one = "DEFAULT", two) => {
    return one + " " + two;
};
export const bar = (one = "DEFAULT", two) => {
    return one + " " + two;
};
// Arrow function where the default parameter is the last one (should be optional)
export const baz = (one, two = "DEFAULT") => {
    return one + " " + two;
};
// Arrow function where all parameters have defaults
export const qux = (one = "DEFAULT", two = "DEFAULT") => {
    return one + " " + two;
};


//// [isolatedDeclarationsArrowFunctionDefaultParameter.d.ts]
export declare const foo: (one: string | undefined, two: string) => string;
export declare const bar: (one: string | undefined, two: string) => string;
export declare const baz: (one: string, two?: string | undefined) => string;
export declare const qux: (one?: string, two?: string) => string;
