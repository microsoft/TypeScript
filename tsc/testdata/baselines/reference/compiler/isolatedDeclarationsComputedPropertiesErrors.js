//// [tests/cases/compiler/isolatedDeclarationsComputedPropertiesErrors.ts] ////

//// [isolatedDeclarationsComputedPropertiesErrors.ts]
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

export const stringKey: string = "key";
export const indexedObject = {
    [stringKey]: Math.random(),
};


//// [isolatedDeclarationsComputedPropertiesErrors.js]
export const prop = Symbol();
export class MyClass {
    [prop] = () => Math.random();
    ["a" + "b"] = 1;
}
export const object = {
    [prop]: Math.random(),
};
export const invalidName = {
    [Math.random()]: 1,
};
export const stringKey = "key";
export const indexedObject = {
    [stringKey]: Math.random(),
};
