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
"use strict";
exports.__esModule = true;
exports.Rect = exports.Point = void 0;
var Point = function (x, y) { return ({ x: x, y: y }); };
exports.Point = Point;
var Rect = function (a, b) { return ({ a: a, b: b }); };
exports.Rect = Rect;
exports.Point.zero = function () { return (0, exports.Point)(0, 0); };


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
