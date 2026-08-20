//// [tests/cases/compiler/exportDefaultImportedType.ts] ////

//// [exported.ts]
type Foo = number;
export { Foo };

//// [main.ts]
import { Foo } from "./exported";
export default Foo;


//// [exported.js]
export {};
//// [main.js]
export {};
