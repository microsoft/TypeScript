//// [inlineTypeAliases.ts]
export declare const x: type T = { x: T };

export const y = (null as type T = { x: T });

export function f() {
    return (null as any as (type T = {x: T})).x;
}

export declare const xx: type T = ({ x: {y: T} } & {y: string})["x"];

export const yy = (null as any as type T = ({ x: {y: T} } & {y: string})["x"]);

export function ff() {
    return (null as any as type T = ({ x: {y: T} } & {y: string})["x"]).y.y.y.y.y.y;
}


//// [inlineTypeAliases.js]
"use strict";
exports.__esModule = true;
exports.y = null;
function f() {
    return null.x;
}
exports.f = f;
exports.yy = null;
function ff() {
    return null.y.y.y.y.y.y;
}
exports.ff = ff;


//// [inlineTypeAliases.d.ts]
export declare const x: type T = {
    x: T;
};
export declare const y: type T = {
    x: T;
};
export declare function f(): type T = {
    x: T;
};
export declare const xx: type T = ({
    x: {
        y: T;
    };
} & {
    y: string;
})["x"];
export declare const yy: type Anon = {
    y: Anon;
};
export declare function ff(): type Anon = {
    y: Anon;
};
