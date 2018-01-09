// @noImplicitReferences: true

// @Filename: /node_modules/foo/Foo.d.ts
export default class Foo {
    protected source: boolean;
}

// @Filename: /node_modules/foo/Bar.d.ts
// This is *not* the same!
export const x: number;

// @Filename: /node_modules/foo/package.json
{ "name": "foo", "version": "1.2.3" }

// @Filename: /index.ts
import Foo from "foo/Foo";
import { x } from "foo/Bar";
