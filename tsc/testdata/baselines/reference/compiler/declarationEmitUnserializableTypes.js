//// [tests/cases/compiler/declarationEmitUnserializableTypes.ts] ////

//// [local.ts]
export function localArrow() {
    const inner = () => inner;
    return inner;
}
export function localDeclaration() {
    function inner() { return inner; }
    return inner;
}
export function localInstantiation() {
    function inner<T>(): typeof inner<T> { return inner<T>; }
    return inner<number>;
}
export const object = {
    self() { return object; }
};
export const annotatedObject: { self(): typeof annotatedObject } = {
    self() { return annotatedObject; }
};

//// [growing.ts]
export function grow<T extends object>(value: T) {
    return {
        value,
        deeper: <U extends object>(next: U) => grow<T & U>({ ...value, ...next }),
    };
}

//// [annotatedLocal.ts]
interface Recursive {
    (): Recursive;
}
export function local(): Recursive {
    const inner = () => inner;
    return inner;
}


//// [local.js]
export function localArrow() {
    const inner = () => inner;
    return inner;
}
export function localDeclaration() {
    function inner() { return inner; }
    return inner;
}
export function localInstantiation() {
    function inner() { return inner; }
    return inner;
}
export const object = {
    self() { return object; }
};
export const annotatedObject = {
    self() { return annotatedObject; }
};
//// [growing.js]
export function grow(value) {
    return {
        value,
        deeper: (next) => grow({ ...value, ...next }),
    };
}
//// [annotatedLocal.js]
export function local() {
    const inner = () => inner;
    return inner;
}


//// [local.d.ts]
export declare function localArrow(): () => /*elided*/ any;
export declare function localDeclaration(): () => /*elided*/ any;
export declare function localInstantiation(): () => () => /*elided*/ any;
export declare const object: {
    self(): {
        self(): /*elided*/ any;
    };
};
export declare const annotatedObject: {
    self(): typeof annotatedObject;
};
//// [growing.d.ts]
export declare function grow<T extends object>(value: T): {
    value: T;
    deeper: <U extends object>(next: U) => {
        value: T & U;
        deeper: <U_1 extends object>(next: U_1) => {
            value: T & U & U_1;
            deeper: <U_2 extends object>(next: U_2) => {
                value: T & U & U_1 & U_2;
                deeper: <U_3 extends object>(next: U_3) => {
                    value: T & U & U_1 & U_2 & U_3;
                    deeper: <U_4 extends object>(next: U_4) => {
                        value: T & U & U_1 & U_2 & U_3 & U_4;
                        deeper: <U_5 extends object>(next: U_5) => {
                            value: T & U & U_1 & U_2 & U_3 & U_4 & U_5;
                            deeper: <U_6 extends object>(next: U_6) => {
                                value: T & U & U_1 & U_2 & U_3 & U_4 & U_5 & U_6;
                                deeper: <U_7 extends object>(next: U_7) => {
                                    value: T & U & U_1 & U_2 & U_3 & U_4 & U_5 & U_6 & U_7;
                                    deeper: <U_8 extends object>(next: U_8) => {
                                        value: T & U & U_1 & U_2 & U_3 & U_4 & U_5 & U_6 & U_7 & U_8;
                                        deeper: <U_9 extends object>(next: U_9) => {
                                            value: T & U & U_1 & U_2 & U_3 & U_4 & U_5 & U_6 & U_7 & U_8 & U_9;
                                            deeper: <U_10 extends object>(next: U_10) => /*elided*/ any;
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
        };
    };
};
//// [annotatedLocal.d.ts]
interface Recursive {
    (): Recursive;
}
export declare function local(): Recursive;
export {};
