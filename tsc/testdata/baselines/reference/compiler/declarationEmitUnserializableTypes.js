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
type localArrow_recursive = () => localArrow_recursive;
type localDeclaration_recursive = () => localDeclaration_recursive;
type localInstantiation_recursive = () => localInstantiation_recursive;
export declare function localArrow(): localArrow_recursive;
export declare function localDeclaration(): localDeclaration_recursive;
export declare function localInstantiation(): () => localInstantiation_recursive;
export declare const object: {
    self(): typeof object;
};
export declare const annotatedObject: {
    self(): typeof annotatedObject;
};
export {};
//// [annotatedLocal.d.ts]
interface Recursive {
    (): Recursive;
}
export declare function local(): Recursive;
export {};
