//// [tests/cases/compiler/processingDiagnostic.ts] ////

//// [index.d.ts]
/// <reference types="cookie-session"/>
export const foo = 1;

//// [package.json]
{
    "name": "foo",
    "version": "1.0.0",
    "types": "index.d.ts"
}
//// [index.ts]
import { foo } from 'foo';
const y = foo;


//// [index.js]
import { foo } from 'foo';
const y = foo;
