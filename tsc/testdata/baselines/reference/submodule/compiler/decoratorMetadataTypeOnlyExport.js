//// [tests/cases/compiler/decoratorMetadataTypeOnlyExport.ts] ////

//// [a.ts]
class Foo {}
export type { Foo };

//// [b.ts]
import { Foo } from "./a";

const Decorator: ClassDecorator = () => undefined;

@Decorator
class Bar {
    constructor(par: Foo) {}
}


//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Foo {
}
//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Decorator = () => undefined;
@Decorator
class Bar {
    constructor(par) { }
}
