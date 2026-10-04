// @module: commonjs
// @target: es2022
// @strict: true
// @noEmit: true

// @Filename: a.ts
class Foo {}

export class Base<T> {
    value!: T;
}

import _Base = Base;

namespace Foo {
    export import Base = _Base;
}

export = Foo;

// @Filename: b.ts
import { Base } from "./a";

class Derived extends Base<string> {}