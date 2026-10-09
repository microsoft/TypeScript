// @declaration: true
// @isolatedDeclarations: true
// @strict: true
// @target: esnext

export const prop: unique symbol = Symbol();

export class MyClass {
    [prop] = () => Math.random();
    ["a" + "b"]: number = 1;
}

export const object = {
    [prop]: Math.random(),
};

export const invalidName = {
    [Math.random()]: 1,
};
