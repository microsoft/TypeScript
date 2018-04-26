//// [objectLiteralSpreadWIthDuplicateIdentifier.ts]
interface Point { x: number; y?: number }
const x = 1
const y = 1
const foo: Point = { x: 1, y: 2 }
const a: Point = { y, y: 1, ...foo}
const b: Point = { x, x: 1, ...foo}
const c: Point = { y, y: 1, ...{ x: 1, y: 1}}
const d: Point = { x, x: 1, ...{ x: 1, y: 1}}


class PointBar { x: number; y?: number }
const bar: PointBar = { x: 1, y: 2 }
const e: PointBar = { y, y: 1, ...bar}
const f: PointBar = { x, x: 1, ...bar}
const g: PointBar = { y, y: 1, ...{ x: 1, y: 1}}
const h: PointBar = { x, x: 1, ...{ x: 1, y: 1}}


//// [objectLiteralSpreadWIthDuplicateIdentifier.js]
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var x = 1;
var y = 1;
var foo = { x: 1, y: 2 };
var a = __assign({ y: y, y: 1 }, foo);
var b = __assign({ x: x, x: 1 }, foo);
var c = __assign({ y: y, y: 1 }, { x: 1, y: 1 });
var d = __assign({ x: x, x: 1 }, { x: 1, y: 1 });
var PointBar = /** @class */ (function () {
    function PointBar() {
    }
    return PointBar;
}());
var bar = { x: 1, y: 2 };
var e = __assign({ y: y, y: 1 }, bar);
var f = __assign({ x: x, x: 1 }, bar);
var g = __assign({ y: y, y: 1 }, { x: 1, y: 1 });
var h = __assign({ x: x, x: 1 }, { x: 1, y: 1 });
