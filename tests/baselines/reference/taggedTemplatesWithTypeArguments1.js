//// [tests/cases/conformance/es6/templates/taggedTemplatesWithTypeArguments1.ts] ////

//// [taggedTemplatesWithTypeArguments1.ts]
declare function f<T>(strs: TemplateStringsArray, ...callbacks: Array<(x: T) => any>): void;

interface Stuff {
    x: number;
    y: string;
    z: boolean;
}

export const a = f<Stuff> `
    hello
    ${stuff => stuff.x}
    brave
    ${stuff => stuff.y}
    world
    ${stuff => stuff.z}
`;

declare function g<Input, T, U, V>(
    strs: TemplateStringsArray,
    t: (i: Input) => T, u: (i: Input) => U, v: (i: Input) => V): T | U | V;

export const b = g<Stuff, number, string, boolean> `
    hello
    ${stuff => stuff.x}
    brave
    ${stuff => stuff.y}
    world
    ${stuff => stuff.z}
`;

declare let obj: {
    prop: <T>(strs: TemplateStringsArray, x: (input: T) => T) => {
        returnedObjProp: T
    }
}

export let c = obj["prop"]<Stuff> `${(input) => ({ ...input })}`
c.returnedObjProp.x;
c.returnedObjProp.y;
c.returnedObjProp.z;

c = obj.prop<Stuff> `${(input) => ({ ...input })}`
c.returnedObjProp.x;
c.returnedObjProp.y;
c.returnedObjProp.z;

//// [taggedTemplatesWithTypeArguments1.js]
export const a = f `
    hello
    ${stuff => stuff.x}
    brave
    ${stuff => stuff.y}
    world
    ${stuff => stuff.z}
`;
export const b = g `
    hello
    ${stuff => stuff.x}
    brave
    ${stuff => stuff.y}
    world
    ${stuff => stuff.z}
`;
export let c = obj["prop"] `${(input) => ({ ...input })}`;
c.returnedObjProp.x;
c.returnedObjProp.y;
c.returnedObjProp.z;
c = obj.prop `${(input) => ({ ...input })}`;
c.returnedObjProp.x;
c.returnedObjProp.y;
c.returnedObjProp.z;
