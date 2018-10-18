// @filename: foo.d.ts
export default 2 + 2;
export as namespace Foo;

// @filename: foo2.d.ts
export = 2 + 2;
export as namespace Foo2;

// @filename: indirection.d.ts
/// <reference path="./foo.d.ts" />
declare module "indirect" {
    export default typeof Foo.default;
}

// @filename: indirection2.d.ts
/// <reference path="./foo2.d.ts" />
declare module "indirect2" {
    export = typeof Foo2;
}

// @filename: consumer.ts
/// <reference path="./indirection.d.ts" />
/// <reference path="./indirection2.d.ts" />
import "indirect";
import "foo";
import "indirect2";
import "foo2";