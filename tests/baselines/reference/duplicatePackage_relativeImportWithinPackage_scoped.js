//// [tests/cases/compiler/duplicatePackage_relativeImportWithinPackage_scoped.ts] ////

//// [package.json]
{
    "name": "@foo/bar",
    "version": "1.2.3"
}

//// [index.d.ts]
export class C {
    private x: number;
}

//// [index.d.ts]
import { C } from "@foo/bar";
export const o: C;

//// [use.d.ts]
import { C } from "./index";
export function use(o: C): void;

//// [index.d.ts]
export class C {
    private x: number;
}

//// [package.json]
{
    "name": "@foo/bar",
    "version": "1.2.3"
}

//// [index.ts]
import { use } from "@foo/bar/use";
import { o } from "a";

use(o);


//// [index.js]
import { use } from "@foo/bar/use";
import { o } from "a";
use(o);
