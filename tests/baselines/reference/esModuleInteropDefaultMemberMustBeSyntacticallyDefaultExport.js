//// [tests/cases/compiler/esModuleInteropDefaultMemberMustBeSyntacticallyDefaultExport.ts] ////

//// [point.d.ts]
declare class Point {
    x: number;
    y: number;

    constructor(x: number, y: number);

    static default: "foo";
}

export = Point;
//// [index.ts]
import Point from "./point";

const C = Point;
const p = new C(1, 2);


//// [index.js]
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const point_1 = __importDefault(require("./point"));
const C = point_1.default;
const p = new C(1, 2);
