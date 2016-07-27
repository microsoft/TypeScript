// @Filename: declarations.d.ts
declare namespace foo.bar {
    export type X = number;
    export const X: number;
}

declare module "foobar" {
    export = foo.bar;
}

declare module "foobarx" {
    export = foo.bar.X;
}

// @Filename: index.ts
/// <reference path="declarations.d.ts" />
import { X } from "foobar";
import X2 = require("foobarx");
const x: X = X;
const x2: X2 = X2;
