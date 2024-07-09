// @noImplicitReferences: true

// @Filename: /node_modules/a/index.d.ts
import Foo from "foo/Foo";
export const o: Foo;

// @Filename: /node_modules/a/node_modules/foo/Foo.d.ts
export default class Foo {
    protected source: boolean;
}

// @Filename: /node_modules/a/node_modules/foo/package.json
{ "name": "foo", "version": "1.2.3" }

// @Filename: /node_modules/foo/Foo.d.ts
export default class Foo {
    protected source: boolean;
}

// @Filename: /node_modules/foo/package.json
{ "name": "foo", "version": "1.2.3" }

// @Filename: /index.ts
import Foo from "foo/Foo";
import * as a from "a";

const o: Foo = a.o;
