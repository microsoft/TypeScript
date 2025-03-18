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
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rect = exports.Point = void 0;
const Point = (x, y) => ({ x, y });
exports.Point = Point;
const Rect = (a, b) => ({ a, b });
exports.Rect = Rect;
exports.Point.zero = () => (0, exports.Point)(0, 0);
