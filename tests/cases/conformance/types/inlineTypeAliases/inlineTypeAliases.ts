// @declaration: true
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
