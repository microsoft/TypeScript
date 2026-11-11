// @module: commonjs, esnext
// @target: es2015
// @strict: true
// @experimentalDecorators: true
// @emitDecoratorMetadata: true

import type Foo from "./missing-default";
import { type Bar } from "./missing-named";
import type { default as Baz } from "./missing-default-specifier";

function dec(_target: unknown, _key: unknown) {}

class C {
    @dec a!: Foo;
    @dec b!: Bar;
    @dec c!: Baz;
}

const x = Foo;
const y = Bar;
const z = Baz;
