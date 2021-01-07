// @module: es2015
// @noTypesAndSymbols: true

// @Filename: /exported.ts
type Foo = number;
export { Foo };

// @Filename: /main.ts
import { Foo } from "./exported";
export default Foo;
