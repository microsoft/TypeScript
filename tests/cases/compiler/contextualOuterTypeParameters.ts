// @strict: true
// @noemit: true

// https://github.com/microsoft/TypeScript/issues/59450

declare function f(fun: <T>(t: T) => void): void

f(t => {
    type isArray = (typeof t)[] extends string[] ? true : false;
    type IsObject = { x: typeof t } extends { x: string } ? true : false;
});

const fn1: <T>(x: T) => void = t => {
    type isArray = (typeof t)[] extends string[] ? true : false;
    type IsObject = { x: typeof t } extends { x: string } ? true : false;
};

const fn2: <T>(x: T) => void = function test(t) {
    type isArray = (typeof t)[] extends string[] ? true : false;
    type IsObject = { x: typeof t } extends { x: string } ? true : false;
};

const obj: { f: <T>(x: T) => void } = {
    f(t) {
        type isArray = (typeof t)[] extends string[] ? true : false;
        type IsObject = { x: typeof t } extends { x: string } ? true : false;
    }
};
