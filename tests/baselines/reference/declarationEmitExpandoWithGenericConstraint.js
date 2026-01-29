//// [tests/cases/compiler/declarationEmitExpandoWithGenericConstraint.ts] ////

//// [declarationEmitExpandoWithGenericConstraint.ts]
export interface Point {
    readonly x: number;
    readonly y: number;
}

export interface Rect<p extends Point> {
    readonly a: p;
    readonly b: p;
}

export const Point = (x: number, y: number): Point => ({ x, y });
export const Rect = <p extends Point>(a: p, b: p): Rect<p> => ({ a, b });

Point.zero = (): Point => Point(0, 0);

//// [declarationEmitExpandoWithGenericConstraint.js]
export const Point = (x, y) => ({ x, y });
export const Rect = (a, b) => ({ a, b });
Point.zero = () => Point(0, 0);


//// [declarationEmitExpandoWithGenericConstraint.d.ts]
export interface Point {
    readonly x: number;
    readonly y: number;
}
export interface Rect<p extends Point> {
    readonly a: p;
    readonly b: p;
}
export declare const Point: {
    (x: number, y: number): Point;
    zero(): Point;
};
export declare const Rect: <p extends Point>(a: p, b: p) => Rect<p>;
