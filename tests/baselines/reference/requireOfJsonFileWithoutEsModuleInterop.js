//// [tests/cases/compiler/requireOfJsonFileWithoutEsModuleInterop.ts] ////

//// [file1.ts]
import * as test from "./test.json"

//// [test.json]
{
    "a": true,
    "b": "hello"
}

//// [tests/cases/compiler/out/test.json]
{
    "a": true,
    "b": "hello"
}
//// [tests/cases/compiler/out/file1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
