//// [declarationsSimple.ts] ////
export const c: number = 1;

export interface A {
    x: number;
}

let expr: { x: number; };

expr = {
    x: 12,
}

export default expr;
//// [declarationsSimple.d.ts] ////
export declare const c: number;
export interface A {
    x: number;
}
declare let expr: {
    x: number;
};
export default expr;
