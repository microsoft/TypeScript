//// [tests/cases/compiler/networkPathReferences.ts] ////

//// [types.d.ts]
export declare const x: number;

//// [main.ts]
/// <reference path="//server/share/types.d.ts" />
/// <reference path="\\server\share\types.d.ts" />
/// <reference path="\\?\UNC\server\share\types.d.ts" />
/// <reference path="\??\UNC\server\share\types.d.ts" />
/// <reference path="./share/types.d.ts" />
import { x } from "./share/types";
x;


//// [main.js]
/// <reference path="//server/share/types.d.ts" />
/// <reference path="\\server\share\types.d.ts" />
/// <reference path="\\?\UNC\server\share\types.d.ts" />
/// <reference path="\??\UNC\server\share\types.d.ts" />
/// <reference path="./share/types.d.ts" />
import { x } from "./share/types";
x;
