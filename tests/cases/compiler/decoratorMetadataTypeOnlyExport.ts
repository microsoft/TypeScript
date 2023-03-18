// @experimentalDecorators: true
// @emitDecoratorMetadata: true

// @filename: ./a.ts
class Foo {}
export type { Foo };

// @filename: ./b.ts
import { Foo } from "./a";

const Decorator: ClassDecorator = () => undefined;

@Decorator
class Bar {
    constructor(par: Foo) {}
}
