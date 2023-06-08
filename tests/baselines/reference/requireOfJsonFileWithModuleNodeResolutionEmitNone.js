//// [tests/cases/compiler/requireOfJsonFileWithModuleNodeResolutionEmitNone.ts] ////

//// [file1.ts]
import * as b from './b.json';

//// [b.json]
{
    "a": true,
    "b": "hello"
}

//// [tests/cases/compiler/out/b.json]
{
    "a": true,
    "b": "hello"
}
//// [tests/cases/compiler/out/file1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
