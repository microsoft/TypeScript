// @target: esnext
// @module: preserve
// @noTypesAndSymbols: true

// @filename: /share/types.d.ts
export declare const x: number;

// @filename: /main.ts
/// <reference path="//server/share/types.d.ts" />
/// <reference path="\\server\share\types.d.ts" />
/// <reference path="\\?\UNC\server\share\types.d.ts" />
/// <reference path="\??\UNC\server\share\types.d.ts" />
/// <reference path="./share/types.d.ts" />
import { x } from "./share/types";
x;
