//// [tests/cases/compiler/packageDeduplicationDuplicateGlobals.ts] ////

//// [package.json]
{ "name": "foo", "version": "1.0.0" }

//// [index.d.ts]
import "globals";
export declare function useFoo(): typeof myGlobal;

//// [package.json]
{ "name": "globals", "version": "1.0.0" }

//// [index.d.ts]
declare var myGlobal: string;

//// [package.json]
{ "name": "foo", "version": "1.0.0" }

//// [index.d.ts]
import "globals";
export declare function useFoo(): typeof myGlobal;

//// [package.json]
{ "name": "globals", "version": "2.0.0" }

//// [index.d.ts]
declare var myGlobal: number;

//// [package.json]
{ "name": "bar", "version": "1.0.0" }

//// [index.d.ts]
import { useFoo } from "foo";
export declare function useBar(): ReturnType<typeof useFoo>;

//// [package.json]
{ "name": "baz", "version": "1.0.0" }

//// [index.d.ts]
import { useFoo } from "foo";
export declare function useBaz(): ReturnType<typeof useFoo>;




//// [index.ts]
import { useBar } from "bar";
import { useBaz } from "baz";

const barResult = useBar();
const bazResult = useBaz();

const x: string = myGlobal;


//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bar_1 = require("bar");
const baz_1 = require("baz");
const barResult = (0, bar_1.useBar)();
const bazResult = (0, baz_1.useBaz)();
const x = myGlobal;
