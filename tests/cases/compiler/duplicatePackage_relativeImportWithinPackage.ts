// @noImplicitReferences: true
// @traceResolution: true

// @Filename: /node_modules/a/node_modules/foo/package.json
{
    "name": "foo",
    "version": "1.2.3"
}

// @Filename: /node_modules/a/node_modules/foo/index.d.ts
export class C {
    private x: number;
}

// @Filename: /node_modules/a/index.d.ts
import { C } from "foo";
export const o: C;

// @Filename: /node_modules/foo/use.d.ts
import { C } from "./index";
export function use(o: C): void;

// @Filename: /node_modules/foo/index.d.ts
export class C {
    private x: number;
}

// @Filename: /node_modules/foo/package.json
{
    "name": "foo",
    "version": "1.2.3"
}

// @Filename: /index.ts
import { use } from "foo/use";
import { o } from "a";

use(o);
