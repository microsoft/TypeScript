// @isolatedDeclarations: true
// @moduleResolution: node
// @declaration: true
// @strict: true
// @target: esnext

// @Filename: /node_modules/foo/package.json
{
    "name": "foo",
    "types": "index.d.ts"
}

// @Filename: /node_modules/foo/index.d.ts
export interface Foo<T> {
    a: T;
}

// @filename: /bar.ts
import { type Foo } from "foo";
export const bar = <T,>(foo?: Foo<T>): void => { };
