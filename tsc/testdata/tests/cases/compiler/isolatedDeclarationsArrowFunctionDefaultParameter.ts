// @declaration: true
// @isolatedDeclarations: true
// @strict: true

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
